import { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import style from './AdminHomePage.module.scss';
import clsx from 'clsx';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import Divider from '@mui/material/Divider';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import orderApi from '~/apis/orderApi.js';
import phoneApi from '~/apis/phoneApi.js';
import { format } from 'date-fns';

import AdminHomePageLazy from './AdminHomePageLazy.jsx';

// PropTypes
AdminHomePage.propTypes = {};

function AdminHomePage(props) {
  const [loading, setLoading] = useState(true);
  // --STATE LẤY TẤT CẢ ĐƠN HÀNG KHÔNG CẦN PHÂN TRANG ---
  const [listAllOrders, setListAllOrders] = useState([]);

  //  --LẤY TẤT CẢ SẢN PHẨM ĐIỆN THOẠI ---
  const [listAllDienThoai, setListAllDienThoai] = useState([]);

  // ---- TỔNG SỐ LƯỢNG ĐƠN HÀNG CẦN XÁC NHẬN ---
  const allOrderXacNhan = listAllOrders?.filter((item) => {
    return item?.status?.code === 1;
  });
  const sumOrder = allOrderXacNhan?.length;

  // ---- Tổng số lượng sản phẩm đang hết hàng ---
  const phoneHetHang = listAllDienThoai?.filter((phone) => {
    return phone?.stock_quantity === 0;
  })?.length;

  //  --- Tổng Doanh Số ---
  const listALLSumDoanhSo = listAllOrders?.map((item) => {
    return item?.total_price;
  });
  const sumDoanhSo = listALLSumDoanhSo?.reduce((total, item) => {
    return total + item;
  }, 0);

  //  --- Tổng số đơn hàng ---
  const sumDonHang = listAllOrders?.length;

  //  --- CALL API ĐỂ HIỆN THỊ DỮ LIỆU RA MÀN HÌNH --
  useEffect(() => {
    orderApi
      ?.getAllOrderNopagination()
      .then((response) => {
        // console.log('lấy tất cả đơn hàng không phân trang thành công:', response);
        setListAllOrders(response?.data);
        //  --LẤY TÁT CẢ SẢN PHẨM ĐIỆN THOẠI ---
        phoneApi
          .getAllPhonesNoPagiNation()
          .then((res) => {
            setListAllDienThoai(res?.data);
            setLoading(false);
          })
          .catch((error) => {
            console.log('lấy tất cả sản phẩm thất bại', error);
            setLoading(false);
          });
      })
      .catch((err) => {
        console.log('không lấy đc tất cả đơn hàng', err);
        setLoading(false);
      });
  }, []);

  // ---- REACT - CHART -- BIỂU ĐỒ HIỆN THỊ THÔNG TIN --
  ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend);

  //  ---- PHẦN TÍNH TOÁN DỮ LIỆU CHO REACT- CHART ----
  const currentDate = new Date(); // Lấy ngày hiện tại
  const yearCurent = currentDate.getFullYear(); // lấy năm hiện tại
  const numberOfDaysToDisplay = 16; // Số ngày bạn muốn hiển thị => lịch sử => hiển thị trong vòng 16 days
  const labels = []; // label hiển thị dươi trục x => ngày / tháng
  const backgroundColors = []; // bảng màu của DOANH THU /1 NGÀY => NGÀY HIỆN TẠI THÌ ĐƯỢC ACTIVE NÊN

  //  -- LẶP QUA SỐ NGÀY BẠN MUỐN CHO XEM --- 16 DAYS
  for (let i = 0; i < numberOfDaysToDisplay; i++) {
    const date = new Date(currentDate);
    date.setDate(currentDate.getDate() - i); // Giảm ngày để lấy các ngày trước đó
    const day = date.getDate(); // Lấy ngày trong tháng
    const month = date.getMonth(); // Lấy tháng
    labels.unshift(`${day}/${month + 1}`); // Thêm nhãn ngày / tháng => để hiên thị
    // Thêm dữ liệu cho mỗi ngày (cần tính toán dữ liệu tương ứng với từng ngày)

    // --- Nếu đang ở ngày hiện tại thì => Active => Cho màu khác ---
    const isCurrentDay = day === currentDate.getDate(); // Kiểm tra xem ngày hiện tại không
    if (isCurrentDay) {
      const backgroundColor = 'rgb(24,144,255)';
      backgroundColors.unshift(backgroundColor); // Nếu là ngày hiện tại => thêm mã màu khác
    } else {
      const backgroundColor = 'rgba(53, 162, 235, 0.5)';
      backgroundColors.unshift(backgroundColor); // vì react-chart hỗ trợ backgroundColor là 1 [] các màu tương ứng
    }
  }

  //  ---TÍNH TOÁN ĐỂ TÍNH TỔNG TIỀN CÁC ĐƠN HÀNG TRONG VÒNG 1 NGÀY => LẤY 16 NGÀY GÂN ĐÂY NHÂT

  //  -- DANH SÁCH DOANH SỐ VÀ TỔNG SÔ ĐƠN HÀNG TRONG 1 NGÀY TRONG VÒNG 16 NGÀY QUA
  const dailySales = [];

  //  -Formart lại thành năm-tháng-ngày
  function formatDate(date) {
    return format(date, 'yyyy-MM-dd');
  }

  // Tạo một danh sách các ngày mà bạn muốn kiểm tra
  // -- DANH SÁCH CÁC NGÀY TRONG VÒNG 16 NGÀY QUA --Kể từ ngày hôm nay
  const todayCurent = new Date(); // lấy ngày hiện tại
  const daysToCheck = [];
  for (let i = 0; i < 16; i++) {
    const date = new Date(todayCurent);
    date.setDate(todayCurent.getDate() - i);
    daysToCheck.push(formatDate(date)); // Hàm formatDate chuyển ngày thàng về chuỗi theo định dạng 'YYYY-MM-DD'
  }

  // Tạo một mảng để theo dõi những ngày đã được kiểm tra => lưu những ngày của các đơn hàng
  const checkedDays = [];

  // Lặp qua tất cả đơn hàng => để tính tổng đơn hàng theo thời gian
  listAllOrders?.forEach((order) => {
    const dateOrder = new Date(order?.createdAt); // Ngày Tạo Đơn Hàng
    const today = new Date(); // Lấy ngày hiện tại
    const differenceInDays = Math.floor((today - dateOrder) / (1000 * 60 * 60 * 24)); // Tính số ngày chênh lệch giữa ngày hôm nay và ngày đặt đơn hàng

    if (differenceInDays >= 0 && differenceInDays < 16) {
      const day = dateOrder.getDate();
      const month = dateOrder.getMonth();
      const year = dateOrder.getFullYear();
      const totalPrice = order?.total_price;
      const dateKey = `${year}-${month + 1}-${day}`; // Tạo key dựa trên ngày, tháng và năm của đơn hàng được tạo

      // Đánh dấu ngày đã được kiểm tra => Thêm key Ngày-Tháng-Năm của đơn hàng đó vào CheckDay => ngày đơn hàng ngày đó đã được kiểm tra
      checkedDays.push(dateKey);

      // Tìm xem ngày đã tồn tại trong mảng dailySales chưa
      const existingDate = dailySales?.find((item) => item?.date === dateKey);

      if (existingDate) {
        // Nếu ngày đã tồn tại, cộng tổng tiền vào ngày đó => và cộng thêm số lượng tổng đơn hàng trong 1 ngày đó
        existingDate.total += totalPrice;
        existingDate.totalOrders += 1;
      } else {
        // Nếu ngày chưa tồn tại, thêm vào mảng dailySales
        dailySales.push({
          date: dateKey,
          total: totalPrice,
          totalOrders: 1,
        });
      }
    }
  });

  // Kiểm tra và thêm dữ liệu cho các ngày chưa được kiểm tra => những ngày
  // Nếu đơn hàng không có ở những ngày trong khoảng 16 ngày từ hôm nay trở => về trước => thì mặc định tổng daonh thu, và tổng đơn hàng === 0
  daysToCheck?.forEach((dayToCheck) => {
    if (!checkedDays?.includes(dayToCheck)) {
      dailySales.push({
        date: dayToCheck,
        total: 0,
        totalOrders: 0,
      });
    }
  });

  // Sắp xếp danh sách tổng daonh thu và tổng đơn hàng lại
  //  -- ĐÂY LÀ DANH SÁCH TỔNG ĐƠN HÀNG, DAONH THU TRONG 1 NGÀY
  dailySales.sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateA - dateB;
  });

  // console.log('tổng đơn hàng trong 1 ngày là:', dailySales);

  // --TỔNG DOANH THU TRONG 1 NGÀY ---
  const sumPriceFordays = dailySales?.map((item) => {
    return item?.total;
  });

  // ---TỔNG ĐƠN HÀNG TRONG 1 NGÀY ---
  const sumPriceOrderDAY = dailySales?.map((item) => {
    return item?.totalOrders;
  });

  // Dữ liệu cho Bar Chart
  //  ---DỮ LIỆU CHO REACT-CHART
  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Đơn hàng',
        data: sumPriceOrderDAY, // DANH SÁCH TỔNG HƠN HÀNG TRONG 1 NGÀY
        borderColor: 'rgb(255, 99, 132)',
        borderWidth: 3,
        fill: false,
        backgroundColor: 'rgba(255, 99, 132, 1)',
        type: 'line', // Sử dụng kiểu Line Chart cho dataset này
        yAxisID: 'line-y-axis', // Gán đồ thị Line vào trục Y 'line-y-axis'
        zIndex: 10, // Đặt zIndex lớn hơn để đảm bảo hiển thị trước
      },
      {
        label: 'Doanh thu',
        data: sumPriceFordays, // Danh Sách Tổng Doanh Thu Của từng ngày
        backgroundColor: backgroundColors,
        borderWidth: 1,
        yAxisID: 'bar-y-axis', // Gán đồ thị Bar vào trục Y 'bar-y-axis'
        zIndex: 2,
        type: 'bar', // Sử dụng kiểu Bar Chart cho dataset này
      },
    ],
  };

  // Các option tùy chọn
  const options = {
    scales: {
      'bar-y-axis': {
        type: 'linear',
        position: 'left', // trục Y của Doanh Thu => bên trái
        ticks: {
          callback: function (value, index, values) {
            return value.toLocaleString('vn-VN') + ' đ';
          },
        },
        // title: {
        //   display: true,
        //   text: 'Doanh Thu',
        //   align: 'center',
        // },
      },
      'line-y-axis': {
        type: 'linear',
        position: 'right', // Truc Y của đơn hàng => bên phải
      },
    },
  };

  return (
    <Box className={clsx(style.wrapHomePageAdmin)}>
      {/* Nếu đang tải dữ liệu thì hiển thị lazy */}
      {loading ? (
        <AdminHomePageLazy />
      ) : (
        <>
          {/* Những việc cần làm */}
          <Box className={clsx(style.workingHomePageAdmin)}>
            <Typography className={clsx(style.workingText)}>Những việc cần làm</Typography>
            <Box className={clsx(style.wrapContentWorking)}>
              <Link className={clsx(style.textLinkWork)} to="/admin/order">
                <Box className={clsx(style.contentItem)}>
                  <Typography className={clsx(style.label1)}>Đơn hàng cần xác nhận</Typography>
                  <Typography className={clsx(style.label2)}>{sumOrder < 99 ? sumOrder : '99+'}</Typography>
                </Box>
              </Link>
              <Link className={clsx(style.textLinkWork)} to="/admin/getallproducts">
                <Box className={clsx(style.contentItem)}>
                  <Typography className={clsx(style.label1)}>Sản phẩm hết hàng</Typography>
                  <Typography className={clsx(style.label2)}>{phoneHetHang < 99 ? phoneHetHang : '99+'}</Typography>
                </Box>
              </Link>
            </Box>
          </Box>

          {/* React chart */}
          <Box className={clsx(style.wrapReactChart)}>
            {/* hiệu quả kinh doanh */}
            <Box className={clsx(style.wrapHieuquakd)}>
              <Typography className={clsx(style.label)}>Hiệu quả kinh doanh </Typography>
              <Typography className={clsx(style.label2)}>
                {numberOfDaysToDisplay} ngày qua: {labels[0]}/{yearCurent} - {labels[labels?.length - 1]}/{yearCurent}
              </Typography>
            </Box>
            <Box className={clsx(style.contentChart)}>
              <Box className={clsx(style.contentLeft)}>
                <Box className={clsx(style.label1)}></Box>
                <Typography className={clsx(style.label2)}>Tổng doanh số</Typography>
                <Typography className={clsx(style.label3)}>{sumDoanhSo?.toLocaleString('vn-VN')} ₫</Typography>
                <Divider className={clsx(style.divider)} />

                <Box className={clsx(style.label4)}></Box>
                <Typography className={clsx(style.label2)}>Tổng đơn hàng</Typography>
                <Typography className={clsx(style.label3)}>{sumDonHang}</Typography>
              </Box>

              {/* chart */}
              <Box className={clsx(style.contentRight)}>
                <Box className={clsx(style.wrapTitleChart)}>
                  <Typography className={clsx(style.label)}>Doanh Thu</Typography>
                  <Typography className={clsx(style.label)}>Đơn hàng</Typography>
                </Box>
                <Bar data={data} options={options} />
              </Box>
            </Box>
          </Box>
        </>
      )}
    </Box>
  );
}

export default memo(AdminHomePage);
