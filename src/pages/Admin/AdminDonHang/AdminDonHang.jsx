import { memo, useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import style from './AdminDonHang.module.scss';
import clsx from 'clsx';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useReactToPrint } from 'react-to-print';
import { Breadcrumb, Tabs, Popconfirm, Table } from 'antd';
import { Link } from 'react-router-dom';
import { QuestionCircleOutlined } from '@ant-design/icons';
import AdminDonHangLazy from './AdminDonHangLazy.jsx';
import { format } from 'date-fns';
import moment from 'moment';

import orderApi from '~/apis/orderApi.js';
import logoGiaoHangNhanh from '~/assets/images/giaohangnhanh.webp';
// PropTypes
AdminDonHang.propTypes = {};

function AdminDonHang(props) {
  //  ----LẤY DỮ LIỆU TẤT CẢ ĐƠN HÀNG TỪ API ---- ĐỂ HIỂN THỊ - RA MÀN HÌNH TABLE
  const [dataOrder, setDataOrder] = useState([]);
  const [loadingDataOrder, seLoadingDataOrder] = useState(true); // loading => hiển thị khi đang lấy dữ liệu đơn hàng từ API
  const [dieukiengoilaiAPI, setGoiLaiAPI] = useState(1); // set cái này để gọi lại API lấy dữ liệu đơn hàng khi hủy hoặc xác nhận

  //  --- CALL API ĐỂ HIỆN THỊ DỮ LIỆU RA MÀN HÌNH --
  useEffect(() => {
    orderApi
      ?.getAllOrderNopagination()
      .then((response) => {
        setDataOrder(response?.data);
        seLoadingDataOrder(false);
      })
      .catch((err) => {
        console.log('không lấy đc tất cả đơn hàng', err);
        seLoadingDataOrder(false);
      });
  }, [dieukiengoilaiAPI]);

  // console.log('danh sách đơn hàng:', dataOrder);
  //  ---ONCHANGE TAB KHI CLICK THAY ĐỔI GIỮA CÁC TABS --
  const [keyTabs, setKeyTabs] = useState(1);
  const onChangeTabs = (key) => {
    setKeyTabs(key);
  };

  // console.log('key của tabs hiện tại là:', keyTabs);

  // --- DƯ LIỆU ĐỂ HIỂN THỊ CÁC ĐƠN HÀNG ---
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  //  --- CÁC COLUMNS ĐỂ HIỂN THỊ => RA MÀN HÌNH ---- Render
  const columns = [
    {
      title: 'Mã đơn hàng ',
      dataIndex: 'madonhang', // key để hiện thị => data sẽ hiển thị theo key này
    },
    {
      title: 'Ngày đặt hàng ',
      dataIndex: 'ngaydathang',
      // sắp xếp đơn hàng theo ngày tháng => dùng moment => để sắp xếp đúng theo kiểu ngày / tháng / năm
      sorter: (a, b) => {
        const dateA = moment(a.ngaydathang, 'DD-MM-YYYY');
        const dateB = moment(b.ngaydathang, 'DD-MM-YYYY');
        // return dateA.isBefore(dateB) ? -1 : dateA.isAfter(dateB) ? 1 : 0; // sắp xếp tăng dần => theo ngày tháng
        return dateA.isBefore(dateB) ? 1 : dateA.isAfter(dateB) ? -1 : 0; // sắp xếp giảm dần => theo ngày tháng
      },
      showSorterTooltip: false,
    },
    {
      title: 'Hình thức giao hàng',
      dataIndex: 'hinhthucgiaohang',
    },
    {
      title: 'Hình thức thanh toán',
      dataIndex: 'hinhthucthanhtoan',
    },
    {
      title: 'Khách hàng phải trả',
      dataIndex: 'sumprice',
      sorter: (a, b) => b.sumprice - a.sumprice, // Sắp xếp theo số tiền giảm dần
      showSorterTooltip: false,
    },
    {
      title: 'Thao tác',
      dataIndex: 'actions',
    },
  ];

  //  --- KHI CLICK ĐỒNG Ý HỦY ĐƠN HÀNG => LẤY ID ĐƠN HÀNG CẦN HỦY => ĐỂ CHUẨN BỊ CẬP NHẬT LẠI
  const handleConfirmHuyDonhang = (id) => {
    seLoadingDataOrder(true);

    // -- dữ liệu để chuẩn bị cập nhât ---
    const dataUpdateOrder = {
      _id: id,
      status: {
        code: 4,
        state: 'Đã hủy',
      },
    };

    // --UPDATE CẬP NHẬT ĐƠN HÀNG --
    orderApi
      .updateOrder(dataUpdateOrder)
      .then((response) => {
        setGoiLaiAPI(Math.random() * 10000);
        // seLoadingDataOrder(false);
      })
      .catch((err) => {
        console.log('hủy đơn hàng thất bại:', err);
        setGoiLaiAPI(Math.random() * 10000);
        seLoadingDataOrder(false);
      });
  };

  // ----KHI CLICK XÁC NHẬN 1 ĐƠN HÀNG ---
  const handleXacNhanDonHang = (id) => {
    console.log('ID đơn hàng cần xác nhận là:', id);
    seLoadingDataOrder(true);

    // -- dữ liệu để chuẩn bị cập nhât ---
    const dataUpdateOrder = {
      _id: id,
      status: {
        code: 2,
        state: 'Đang vận chuyển',
      },
    };

    // --UPDATE CẬP NHẬT ĐƠN HÀNG --
    orderApi
      .updateOrder(dataUpdateOrder)
      .then((response) => {
        console.log('xác nhận đơn hàng thành công:', response);
        setGoiLaiAPI(Math.random() * 11000);
        // seLoadingDataOrder(false);
      })
      .catch((err) => {
        console.log('xác nhận đơn hàng thất bại:', err);
        setGoiLaiAPI(Math.random() * 11000);
        seLoadingDataOrder(false);
      });
  };

  // ----KHI CLICK XÁC NHẬN KHI CLICK Vào NÚT IN Sản phẩm của 1 đơn hàng ---
  const handleInSanPham = (id) => {
    console.log('ID đơn hàng cần IN là:', id);
  };

  // -- DỮ LIỆU DATA LỌC QUA KHI CÁC KEY TAB LÀ CÁC GIÁ TRỊ KHÁC NHAU --
  let dataRenderTable = [];
  // ---NẾU key ===1 => lấy tất cả đơn hàng
  if (keyTabs === 1) {
    dataRenderTable = dataOrder;
  } else if (keyTabs === 2) {
    // --FILTER RA CÁC ĐƠN HÀNG CHỜ XÁC NHẬN
    dataRenderTable = dataOrder?.filter((item) => {
      return item?.status?.code === 1;
    });
  } else if (keyTabs === 3) {
    // --FILTER RA CÁC ĐƠN HÀNG CHỜ ĐANG VẬN CHUYỂN
    dataRenderTable = dataOrder?.filter((item) => {
      return item?.status?.code === 2;
    });
  } else if (keyTabs === 4) {
    // --FILTER RA CÁC ĐƠN HÀNG CHỜ ĐÃ GIAO HÀNG
    dataRenderTable = dataOrder?.filter((item) => {
      return item?.status?.code === 3;
    });
  } else if (keyTabs === 5) {
    // --FILTER RA CÁC ĐƠN HÀNG ĐÃ HỦY
    dataRenderTable = dataOrder?.filter((item) => {
      return item?.status?.code === 4;
    });
  }

  console.log('dataRenderTable:', dataRenderTable);
  // ----- dữ liệu để hiển thị vào trong table --- MAP QUA TẤT CẢ ĐƠN HÀNG THẬT ĐỂ LẤY ---
  const data = dataRenderTable?.map((phone) => {
    return {
      key: phone?._id,
      madonhang: phone?._id,
      ngaydathang: format(new Date(phone?.createdAt), 'dd-MM-yyyy'), // Format lại định dạng =>>> ngày / tháng / năm
      hinhthucgiaohang: (
        <Box className={clsx(style.wrapImageGiaoHangNhanh)}>
          <img src={logoGiaoHangNhanh} alt="logo giao hàng nhanh" />
        </Box>
      ),
      hinhthucthanhtoan: phone?.payment_method,
      sumprice: phone?.payment_method === 'Thanh toán khi nhận hàng' ? phone?.total_price : 0, // nếu thanh toán khi nhận hàng => hiện thị tổng tiền => còn lại nếu thanh toán bằng VNP => không cần trả tiền mặt

      // --- Chỉ cho hiển thị Hủy đơn hàng, xác nhận đơn hàng, in phiếu khi đơn hàng đang ở chế độ xác nhận thôi
      actions: (
        <Box className={clsx(style.wrapActionTable)}>
          <Popconfirm
            title="Hủy đơn hàng"
            description="Bạn có chắc muốn hủy đơn hàng này ?"
            icon={
              <QuestionCircleOutlined
                style={{
                  color: 'red',
                }}
              />
            }
            onConfirm={() => {
              handleConfirmHuyDonhang(phone?._id);
            }}
            cancelText="Thoát"
            okText="Đồng ý"
          >
            {/* sẽ ẩn => button hủy đơn hàng khi đơn hàng có trạng thái khác !== 1 => có nghĩa là chỉ cho hủy đơn hàng khi === 1 => chờ xác nhận */}
            <Button variant="contained" color="secondary" disabled={phone?.status?.code !== 1}>
              Hủy đơn hàng
            </Button>
          </Popconfirm>

          {/* Nút Xác nhận đơn hàng cũng thế => chỉ cho xác nhận khi đơn hàng có trạng thái  ===1 => Đang ở chế độ XÁC NHẬN => nếu khác 1 thì ẩn đi */}
          <Button
            variant="contained"
            sx={{
              backgroundColor: '#52c41a',
              '&:hover': {
                backgroundColor: '#389e0d',
              },
            }}
            disabled={phone?.status?.code !== 1}
            onClick={() => {
              handleXacNhanDonHang(phone?._id);
            }}
          >
            Xác nhận đơn hàng
          </Button>
          {/* In phiếu cũng thế chỉ cho hiên thị In phiêu khi đang === 1 => nếu khác 1 thì ẩn đi */}
          <Button
            variant="contained"
            disabled={phone?.status?.code !== 1}
            onClick={() => {
              handleInSanPham(phone?._id);
            }}
          >
            In phiếu
          </Button>
        </Box>
      ),
    };
  });

  // ---NỘI DUNG CỦA CÁC TABS Ở ĐÂY -- React Node
  const items = [
    {
      key: 1,
      label: `Tất cả (${dataOrder?.length})`,
      // children: 'Tất cả đơn hàng',
      // disabled: true,
    },
    {
      key: 2,
      label: `Chờ xác nhận (${
        dataOrder?.filter((item) => {
          return item?.status?.code === 1;
        })?.length
      })`,
    },
    {
      key: 3,
      label: `Đang vận chuyển (${
        dataOrder?.filter((item) => {
          return item?.status?.code === 2;
        })?.length
      })`,
    },
    {
      key: 4,
      label: `Đã giao hàng (${
        dataOrder?.filter((item) => {
          return item?.status?.code === 3;
        })?.length
      })`,
    },
    {
      key: 5,
      label: `Đã huỷ(${
        dataOrder?.filter((item) => {
          return item?.status?.code === 4;
        })?.length
      })`,
    },
  ];

  // --- KHI CLICK VÀO BUTTON XÁC NHẬN ĐỒNG Ý CHẤP NHẬN TẤT CẢ ĐƠN HÀNG ---
  const handleClickXacNhanAll = () => {
    seLoadingDataOrder(true);

    // -- dữ liệu để chuẩn bị cập nhât XÁC NHẬN TẤT CẢ ĐƠN HÀNG ---
    const dataUpdateOrderAll = selectedRowKeys?.map((item) => {
      return {
        _id: item,
        status: {
          code: 2,
          state: 'Đang vận chuyển',
        },
      };
    });
    // console.log('dữ liệu cập nhật tất cả đơn hàng là:', dataUpdateOrderAll);

    // --UPDATE CẬP NHẬT => XÁC NHẬN NHIỀU => ĐƠN HÀNG --
    orderApi
      .updateManyOrder(dataUpdateOrderAll)
      .then((response) => {
        // console.log('XÁC NHẬN NHIỀU ĐƠN HÀNG THÀNH CÔNG:', response);
        setGoiLaiAPI(Math.random() * 12000);
        setSelectedRowKeys([]);
        // seLoadingDataOrder(false);
      })
      .catch((err) => {
        console.log('xác nhận NHIỀU đơn hàng thất bại:', err);
        setGoiLaiAPI(Math.random() * 12000);
        seLoadingDataOrder(false);
        setSelectedRowKeys([]);
      });
  };

  // -- Khi thay đổi các giá trị check box
  const onSelectChange = (newSelectedRowKeys) => {
    //  nếu như tab === 2 thì mới cho set
    if (keyTabs === 2) {
      setSelectedRowKeys(newSelectedRowKeys);
    }
  };

  // --KHI CÓ SỰ -- thay đổi của các hàng ---
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  //  -- ĐIỀU KIỆN ĐỂ HIỆN THỊ NÚT BUTTON CÓ RENDER HAY KHÔNG --
  const hasSelected = selectedRowKeys?.length > 0;

  //   --- RETURN JSX ---
  //  --- NẾU ĐANG LOADING => HIỂN THỊ DATA LAZY CỦA ĐƠN HÀNG --
  return loadingDataOrder ? (
    <AdminDonHangLazy />
  ) : (
    <Box className={clsx(style.wrapAdminDonHang)}>
      {/* Breadcrumb */}
      <Box className={clsx(style.breadcrumbAdminDonHang)}>
        <Breadcrumb
          className={clsx(style.contentBreadcrumb)}
          items={[
            {
              title: <Link to="/admin/home">Trang chủ</Link>,
            },
            {
              title: 'Đơn hàng',
            },
          ]}
        />
      </Box>
      {/* Label */}
      <Typography className={clsx(style.labelContentAdminDonhang)}>Danh sách đơn hàng</Typography>
      {/* Tab bar admin header */}
      <Box className={clsx(style.wrapTabbarAdminDonHang)}>
        <Tabs
          defaultActiveKey={1}
          items={items}
          onChange={onChangeTabs}
          type="card"
          // animated={true}
          activeKey={keyTabs}
          className={clsx(style.tabsAdminDonHang)}
        />

        {/* ---DATA ĐỂ HIỂN THỊ DANH SÁCH ĐƠN HÀNG */}
        <Box className={clsx(style.wrapTableContentAdmin)}>
          {/* chỉ cho hiển thị => xác nhận tất cả đơn hàng khi key ===2 => khi đang ở chế độ cần xác nhận */}
          {keyTabs === 2 ? (
            <Box
              style={{
                marginBottom: 16,
              }}
              className={clsx(style.wrapInfoHeader)}
            >
              {/* button xác nhận all */}
              <Button
                color="primary"
                variant="contained"
                onClick={handleClickXacNhanAll}
                disabled={!hasSelected}
                className={clsx(style.buttonXacnhanAll)}
              >
                Xác nhận hàng loạt
              </Button>
              {/* Text hiện thị số lượng sản phẩm đã chọn */}
              <Typography
                style={{
                  marginLeft: 8,
                }}
                className={clsx(style.textSoLuongXacNhan)}
              >
                {hasSelected ? `Đã chọn ${selectedRowKeys?.length} đơn hàng` : ''}
              </Typography>
            </Box>
          ) : (
            <></>
          )}

          {/* -- DATA HIỂN THỊ TABLE ---- */}
          <Table
            rowSelection={keyTabs === 2 ? rowSelection : null} //  chỉ cho chọn check box khi ở tab 2 => còn lại là ẩn đi
            columns={columns}
            dataSource={data}
            bordered
            pagination={{
              // tùy chỉnh phân trang
              defaultPageSize: 5, // số trang mặc định
              position: ['bottomCenter'],
            }}
            sticky={true}
            className={clsx(style.contentTables)}
          />
        </Box>
      </Box>
    </Box>
  );
}

export default memo(AdminDonHang);
