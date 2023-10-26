import { memo, useState } from 'react';
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
import { Bar, Line } from 'react-chartjs-2';

// PropTypes
AdminHomePage.propTypes = {};

function AdminHomePage(props) {
  // ---- TỔNG SỐ LƯỢNG ĐƠN HÀNG CẦN XÁC NHẬN ---
  const [sumOrder, setSumOrder] = useState(9);

  // ---- Tổng số lượng sản phẩm đang hết hàng ---
  const [phoneHetHang, setPhoneHetHang] = useState(100);

  // ---- REACT - CHART -- BIỂU ĐỒ HIỆN THỊ THÔNG TIN --
  ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend);

  // Tính toán dữ liệu cho biểu đồ
  const currentDate = new Date(); // Lấy ngày hiện tại
  const currentMonth = currentDate.getMonth(); // Lấy tháng hiện tại (từ 0 đến 11)
  const numberOfMonthsToDisplay = 12; // Số tháng bạn muốn hiển thị
  const labels = [];
  const dataForMonths = [];

  for (let i = currentMonth - numberOfMonthsToDisplay + 1; i <= currentMonth; i++) {
    const month = i < 0 ? 12 + i : i; // Xử lý nếu tháng âm (ví dụ: tháng -1 là tháng 11 trước đó)
    labels.push(`Tháng ${month + 1}`); // Thêm nhãn tháng
    // Thêm dữ liệu cho mỗi tháng (ví dụ: dữ liệu của tháng 4, tháng 5, ..., tháng 10)
    // Điều này cần phải tính toán dữ liệu tương ứng với từng tháng.
    // dataForMonths.push(calculateDataForMonth(month));
    dataForMonths.push(month);
  }
  // Dữ liệu cho Bar Chart
  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Tổng số tiền bán',
        data: dataForMonths,
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        borderWidth: 1,
        yAxisID: 'bar-y-axis', // Gán đồ thị Bar vào trục Y 'bar-y-axis'
      },
      {
        label: 'Số lượng đơn hàng',
        data: dataForMonths,
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 2,
        fill: false,
        type: 'line', // Sử dụng kiểu Line Chart cho dataset này
        yAxisID: 'line-y-axis', // Gán đồ thị Line vào trục Y 'line-y-axis'
      },
    ],
  };

  const options = {
    scales: {
      'bar-y-axis': {
        type: 'linear',
        position: 'left',
      },
      'line-y-axis': {
        type: 'linear',
        position: 'right',
      },
    },
  };

  return (
    <Box className={clsx(style.wrapHomePageAdmin)}>
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
        <Typography className={clsx(style.label)}>Hiệu quả kinh doanh </Typography>
        <Box className={clsx(style.contentChart)}>
          <Box className={clsx(style.contentLeft)}>
            <Box className={clsx(style.label1)}></Box>
            <Typography className={clsx(style.label2)}>Doanh số</Typography>
            <Typography className={clsx(style.label3)}>1.000.000 ₫</Typography>
            <Divider className={clsx(style.divider)} />

            <Box className={clsx(style.label4)}></Box>
            <Typography className={clsx(style.label2)}>Đơn hàng</Typography>
            <Typography className={clsx(style.label3)}>10</Typography>
          </Box>

          {/* chart */}
          <Box className={clsx(style.contentRight)}>
            <Bar data={data} options={options} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default memo(AdminHomePage);
