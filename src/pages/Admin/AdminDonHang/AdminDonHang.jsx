import { memo, useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import style from './AdminDonHang.module.scss';
import clsx from 'clsx';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useReactToPrint } from 'react-to-print';
import { Breadcrumb, Tabs, Popconfirm, Table, Modal, QRCode, Spin } from 'antd';
import { Link } from 'react-router-dom';
import { QuestionCircleOutlined } from '@ant-design/icons';
import AdminDonHangLazy from './AdminDonHangLazy.jsx';
import { format } from 'date-fns';
import moment from 'moment';
import { useDispatch } from 'react-redux';

import orderApi from '~/apis/orderApi.js';
import logoGiaoHangNhanh from '~/assets/images/giaohangnhanh.webp';
import imageMaVach from '~/assets/images/mavachdonhang.png';
import { rerender } from '~/redux/AppBarAdminRerender.js';
// PropTypes
AdminDonHang.propTypes = {};

function AdminDonHang(props) {
  const dispatch = useDispatch();
  // -- THÔNG TIN CHI TIẾT 1 ĐƠN HÀNG ĐỂ IN SẢN PHẨM ---
  const [orderDetailPrint, setOrderDetailPrint] = useState({});

  //  --- KHI CLICK IN SẢN PHẨM THÌ HIỂN THỊ SPIN RA --
  const [isSpinPrintOrder, setIsPrintOrder] = useState(false);
  //  --- DATE HIỂN THỊ NGÀY THÁNG MUA HÀNG TRONG PHIẾU IN --
  const datePrintOrder = new Date();
  //  --- PHIẾU IN THÔNG TIN ĐƠN HÀNG ----
  const componentRefPrint = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRefPrint.current,
  });
  //  ---- MODAL HIỂN THỊ PUPUP KHI CLICK VÀO IN SẢN PHẨM ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  //  --- KHI CLICK NÚT ĐỒNG Ý IN ĐƠN HÀNG THÌ HIỂN THỊ PHIẾU IN ĐƠN HÀNG ĐÓ RA --
  const handleOkPrint = () => {
    setIsModalOpen(false);
    handlePrint();
  };

  //  --KHI HỦY THÌ ĐÓNG MODAL
  const handleCancelPrint = () => {
    setIsModalOpen(false);
  };

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

  // --- DỮ LIỆU ĐỂ HIỂN THỊ CÁC ĐƠN HÀNG -----
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

  //  --- KHI CLICK ĐỒNG Ý HỦY 1 ĐƠN HÀNG => LẤY ID ĐƠN HÀNG CẦN HỦY => ĐỂ CHUẨN BỊ CẬP NHẬT LẠI
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
        setSelectedRowKeys([]);
        // seLoadingDataOrder(false);
        //  dispatch render => để tạo 1 số bất kì để render lại phần appbar
        dispatch(rerender());
      })
      .catch((err) => {
        console.log('hủy đơn hàng thất bại:', err);
        setGoiLaiAPI(Math.random() * 10000);
        seLoadingDataOrder(false);
        dispatch(rerender());
      });
  };

  // ----KHI CLICK XÁC NHẬN 1 ĐƠN HÀNG ---
  const handleXacNhanDonHang = (id) => {
    // console.log('ID đơn hàng cần xác nhận là:', id);
    seLoadingDataOrder(true);

    // -- dữ liệu để chuẩn bị cập nhât ---
    const dataUpdateOrder = {
      _id: id,
      status: {
        code: 2,
        state: 'Đang vận chuyển',
      },
    };

    // --UPDATE CẬP NHẬT 1 ĐƠN HÀNG --
    orderApi
      .updateOrder(dataUpdateOrder)
      .then((response) => {
        // console.log('xác nhận đơn hàng thành công:', response);
        setGoiLaiAPI(Math.random() * 11000);
        // seLoadingDataOrder(false);
        setSelectedRowKeys([]);
        dispatch(rerender());
      })
      .catch((err) => {
        console.log('xác nhận đơn hàng thất bại:', err);
        setGoiLaiAPI(Math.random() * 11000);
        seLoadingDataOrder(false);
        dispatch(rerender());
      });
  };

  // --------IN THÔNG TIN SẢN PHẨM ---
  // ----KHI CLICK XÁC NHẬN KHI CLICK Vào NÚT ---IN SẢN PHẨM --của 1 đơn hàng ---
  const handleInSanPham = (id) => {
    // console.log('ID đơn hàng cần IN là:', id);
    setIsPrintOrder(true);

    // -- LẤY THÔNG TIN CỦA 1 ĐƠN HÀNG---
    orderApi
      .getOneOrderBuyId(id)
      .then((response) => {
        setOrderDetailPrint(response?.data);
        //  hiển thị modal => print
        setIsModalOpen(true);
        setIsPrintOrder(false);
      })
      .catch((err) => {
        console.log('lấy thông tin 1 đơn hàng thất bại', err);
        setIsPrintOrder(false);
      });
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

  // console.log('dataRenderTable:', dataRenderTable);
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

          {/* CHỈ CHO IN PHIẾU KHI ĐƠN HÀNG Ở CHẾ ĐỘ 2 ĐANG VẬN CHUYỂN*/}
          <Button
            variant="contained"
            disabled={phone?.status?.code === 3 || phone?.status?.code === 4 || phone?.status?.code === 1}
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
        dispatch(rerender());
        // seLoadingDataOrder(false);
      })
      .catch((err) => {
        console.log('xác nhận NHIỀU đơn hàng thất bại:', err);
        setGoiLaiAPI(Math.random() * 12000);
        seLoadingDataOrder(false);
        setSelectedRowKeys([]);
        dispatch(rerender());
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
  // --NẾU CLIK VÀO NÚT IN ĐƠN HÀNG HIỂN THỊ SPIN ĐỂ LẤY THÔNG TIN ĐƠN HÀNG --
  return loadingDataOrder ? (
    <AdminDonHangLazy />
  ) : isSpinPrintOrder ? (
    <Spin>
      <Box className={clsx(style.wrapAdminDonHang)}>
        {/* // Breadcrumb */}
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
        {/* --HIỂN THỊ MODAL CHUẨN BỊ IN PHIẾU -- */}
        <Modal
          title="In nhãn vận chuyển"
          open={isModalOpen}
          onOk={handleOkPrint}
          onCancel={handleCancelPrint}
          okText="In phiếu"
          cancelText="Hủy bỏ"
          className={clsx(style.wrapModalPrintOrder)}
          centered
        >
          <Box
            ref={componentRefPrint}
            className={clsx(style.wrapContentPrint)}
            sx={{
              border: '1px solid #000',
              margin: '10px',
            }}
          >
            {/* header print */}
            <Typography
              className={clsx(style.headerPrint)}
              sx={{
                textAlign: 'center',
                fontWeight: '500',
                userSelect: 'none',
                padding: '3px 0',
                borderBottom: '1px dashed #000',
              }}
            >
              HAITIKI - Đối tác lấy hàng:GiaoHangNhanh - Hot line: 1900636677
            </Typography>

            {/* content 1 */}
            <Box
              className={clsx(style.wrapmavach)}
              sx={{
                display: 'flex',
                alignItems: 'center',
                padding: '10px',
                gap: '8px',
              }}
            >
              <Box
                className={clsx(style.left)}
                sx={{
                  width: '120px',
                  border: '1px solid #000',
                  display: ' flex',
                  flexDirection: 'column',
                  justifyContent: ' center',
                  alignItems: 'center',
                  gap: '3px',
                }}
              >
                <Typography
                  className={clsx(style.textLeft)}
                  sx={{
                    borderBottom: '1px dashed #000',
                    width: '100%',
                    textAlign: 'center',
                  }}
                >
                  GHN
                </Typography>
                <Typography
                  className={clsx(style.textLeft)}
                  sx={{
                    borderBottom: '1px dashed #000',
                    width: '100%',
                    textAlign: 'center',
                  }}
                >
                  KV3
                </Typography>
                <Typography className={clsx(style.textLeft)}>258B01</Typography>
              </Box>

              <Box
                className={clsx(style.right)}
                sx={{
                  flex: '1',
                  textAlign: 'center',
                }}
              >
                <Typography className={clsx(style.textRight)}>
                  {datePrintOrder.getHours()}:{datePrintOrder.getMinutes()}{' '}
                  {format(new Date(datePrintOrder), 'dd-MM-yyyy')}
                </Typography>
                <img
                  src={imageMaVach}
                  alt="mã vạch"
                  className={clsx(style.imgmavach)}
                  style={{
                    width: '400px',
                    objectFit: 'contain',
                  }}
                />
                <Typography className={clsx(style.textRight2)}>HAITIKI 0968.107.500</Typography>
              </Box>
            </Box>

            {/* info address giao hàng */}
            <Box
              className={clsx(style.wrapnguoinhan)}
              sx={{
                padding: '10px',
              }}
            >
              <Box
                className={clsx(style.user)}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '3px',
                }}
              >
                <Typography
                  className={clsx(style.text1)}
                  sx={{
                    fontWeight: '500',
                    fontSize: '1.5rem',
                  }}
                >
                  NGƯỜI NHẬN:
                </Typography>
                <Typography
                  className={clsx(style.text2)}
                  sx={{
                    wordBreak: 'break-word',
                    fontWeight: '700',
                    fontSize: '1.5rem',
                  }}
                >
                  NGUYỄN QUANG HẢI
                </Typography>
              </Box>
              <Box
                className={clsx(style.user)}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '3px',
                  borderBottom: '1px dashed #000',
                  paddingBottom: '3px',
                }}
              >
                <Typography
                  className={clsx(style.text1)}
                  sx={{
                    fontWeight: '500',
                    fontSize: '1.5rem',
                  }}
                >
                  SĐT:
                </Typography>
                <Typography
                  className={clsx(style.text2)}
                  sx={{
                    wordBreak: 'break-word',
                    fontWeight: '700',
                    fontSize: '1.5rem',
                  }}
                >
                  09****500
                </Typography>
              </Box>
              <Box className={clsx(style.address)}>
                <Typography
                  className={clsx(style.textAddress)}
                  sx={{
                    fontWeight: '500',
                    fontSize: '1.5rem',
                  }}
                >
                  ĐC:Phường Tiên Phong Thành Phố Phổ Yên Thái Nguyên
                </Typography>
              </Box>
            </Box>

            {/* nội dung qr code */}
            <Box
              className={clsx(style.wrapQRcode)}
              sx={{
                display: 'flex',
                alignItems: 'center',
                borderTop: '1px dashed #000',
                borderBottom: '1px dashed #000',
                marginTop: '10px',
              }}
            >
              <Box
                className={clsx(style.qa1)}
                sx={{
                  flex: '0.5',
                  borderRight: '1px dashed #000',
                  height: ' 70px ',
                }}
              >
                <Typography
                  sx={{
                    height: '50%',
                    borderBottom: '1px dashed #000',
                    color: 'transparent',
                  }}
                >
                  Test
                </Typography>
                <Typography
                  sx={{
                    color: 'transparent',
                  }}
                >
                  Test
                </Typography>
              </Box>
              <Box
                className={clsx(style.qr2)}
                sx={{
                  flex: '1',
                  borderRight: '1px dashed #000',
                  height: ' 70px ',
                }}
              >
                <Typography
                  sx={{
                    height: '50%',
                    borderBottom: '1px dashed #000',
                    color: 'transparent',
                  }}
                >
                  Test
                </Typography>
                <Typography
                  sx={{
                    color: 'transparent',
                  }}
                >
                  Test
                </Typography>
              </Box>
              <Box className={clsx(style.qr3)}>
                <QRCode value={'Nguyễn Quang Hải - 0968.107.500'} className={clsx(style.contentQR)} size={80} />
              </Box>
            </Box>

            {/* tổng giá trị đơn hàng */}
            <Box className={clsx(style.tonggiatridonhang)}>
              <Typography
                className={clsx(style.price)}
                sx={{
                  fontSize: '1.8rem',
                  fontWeight: '700',
                  textAlign: 'center',
                  padding: '8px 0',
                  borderBottom: '1px dashed #000',
                }}
              >
                100.000đ
              </Typography>
            </Box>
            {/* foootprint */}
            <Box
              className={clsx(style.footerPrint)}
              sx={{
                padding: '16px 0',
                textAlign: 'center',
              }}
            >
              <Typography className={clsx(style.textFooter)}>
                {datePrintOrder.getHours()}:{datePrintOrder.getMinutes()}{' '}
                {format(new Date(datePrintOrder), 'dd-MM-yyyy')}
              </Typography>
              <img src={imageMaVach} alt="mã vạch" className={clsx(style.img)} />
            </Box>
          </Box>
        </Modal>
      </Box>
    </Spin>
  ) : (
    <Box className={clsx(style.wrapAdminDonHang)}>
      {/* // Breadcrumb */}
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
      {/* --HIỂN THỊ MODAL CHUẨN BỊ IN PHIẾU -- */}
      <Modal
        title="In nhãn vận chuyển"
        open={isModalOpen}
        onOk={handleOkPrint}
        onCancel={handleCancelPrint}
        okText="In phiếu"
        cancelText="Hủy bỏ"
        className={clsx(style.wrapModalPrintOrder)}
        centered
      >
        <Box
          ref={componentRefPrint}
          className={clsx(style.wrapContentPrint)}
          sx={{
            border: '1px solid #000',
            margin: '10px',
          }}
        >
          {/* header print */}
          <Typography
            className={clsx(style.headerPrint)}
            sx={{
              textAlign: 'center',
              fontWeight: '500',
              userSelect: 'none',
              padding: '3px 0',
              borderBottom: '1px dashed #000',
            }}
          >
            HAITIKI - Đối tác lấy hàng:GiaoHangNhanh - Hot line: 1900636677
          </Typography>

          {/* content 1 */}
          <Box
            className={clsx(style.wrapmavach)}
            sx={{
              display: 'flex',
              alignItems: 'center',
              padding: '10px',
              gap: '8px',
            }}
          >
            <Box
              className={clsx(style.left)}
              sx={{
                width: '120px',
                border: '1px solid #000',
                display: ' flex',
                flexDirection: 'column',
                justifyContent: ' center',
                alignItems: 'center',
                gap: '3px',
              }}
            >
              <Typography
                className={clsx(style.textLeft)}
                sx={{
                  borderBottom: '1px dashed #000',
                  width: '100%',
                  textAlign: 'center',
                }}
              >
                GHN
              </Typography>
              <Typography
                className={clsx(style.textLeft)}
                sx={{
                  borderBottom: '1px dashed #000',
                  width: '100%',
                  textAlign: 'center',
                }}
              >
                KV3
              </Typography>
              <Typography className={clsx(style.textLeft)}>258B01</Typography>
            </Box>

            <Box
              className={clsx(style.right)}
              sx={{
                flex: '1',
                textAlign: 'center',
              }}
            >
              <Typography className={clsx(style.textRight)}>
                {datePrintOrder.getHours()}:{datePrintOrder.getMinutes()}{' '}
                {format(new Date(datePrintOrder), 'dd-MM-yyyy')}
              </Typography>
              <img
                src={imageMaVach}
                alt="mã vạch"
                className={clsx(style.imgmavach)}
                style={{
                  width: '400px',
                  objectFit: 'contain',
                }}
              />
              <Typography className={clsx(style.textRight2)}>HAITIKI 0968.107.500</Typography>
            </Box>
          </Box>

          {/* info address giao hàng */}
          <Box
            className={clsx(style.wrapnguoinhan)}
            sx={{
              padding: '10px',
            }}
          >
            <Box
              className={clsx(style.user)}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: '3px',
              }}
            >
              <Typography
                className={clsx(style.text1)}
                sx={{
                  fontWeight: '500',
                  fontSize: '1.5rem',
                }}
              >
                NGƯỜI NHẬN:
              </Typography>
              <Typography
                className={clsx(style.text2)}
                sx={{
                  wordBreak: 'break-word',
                  fontWeight: '700',
                  fontSize: '1.5rem',
                }}
              >
                {orderDetailPrint?.user?.username}
              </Typography>
            </Box>
            <Box
              className={clsx(style.user)}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: '3px',
                borderBottom: '1px dashed #000',
                paddingBottom: '3px',
              }}
            >
              <Typography
                className={clsx(style.text1)}
                sx={{
                  fontWeight: '500',
                  fontSize: '1.5rem',
                }}
              >
                SĐT:
              </Typography>
              <Typography
                className={clsx(style.text2)}
                sx={{
                  wordBreak: 'break-word',
                  fontWeight: '700',
                  fontSize: '1.5rem',
                }}
              >
                {orderDetailPrint?.user?.phoneNumber?.slice(0, 2)}*****
                {orderDetailPrint?.user?.phoneNumber?.slice(
                  orderDetailPrint?.user?.phoneNumber?.length - 3,
                  orderDetailPrint?.user?.phoneNumber?.length,
                )}
              </Typography>
            </Box>
            <Box className={clsx(style.address)}>
              <Typography
                className={clsx(style.textAddress)}
                sx={{
                  fontWeight: '500',
                  fontSize: '1.5rem',
                }}
              >
                ĐC: {orderDetailPrint?.shipping_address?.Địa_chỉ}, {orderDetailPrint?.shipping_address?.Phường_Xã},
                {orderDetailPrint?.shipping_address?.Quận_Huyện}, {orderDetailPrint?.shipping_address?.Tỉnh_Thành_phố}
              </Typography>
            </Box>
          </Box>

          {/* nội dung qr code */}
          <Box
            className={clsx(style.wrapQRcode)}
            sx={{
              display: 'flex',
              alignItems: 'center',
              borderTop: '1px dashed #000',
              borderBottom: '1px dashed #000',
              marginTop: '10px',
            }}
          >
            <Box
              className={clsx(style.qa1)}
              sx={{
                flex: '0.5',
                borderRight: '1px dashed #000',
                height: ' 120px ',
              }}
            >
              <Typography
                sx={{
                  height: '50%',
                  borderBottom: '1px dashed #000',
                  paddingLeft: '3px',
                }}
              >
                Tên sản phẩm:
              </Typography>
              <Typography sx={{ paddingLeft: '3px' }}>Số lượng:</Typography>
            </Box>
            <Box
              className={clsx(style.qr2)}
              sx={{
                flex: '1',
                borderRight: '1px dashed #000',
                height: ' 120px ',
              }}
            >
              <Typography
                sx={{
                  height: '50%',
                  borderBottom: '1px dashed #000',
                  display: '-webkit-box',
                  WebkitBoxOrient: 'vertical',
                  WebkitLineClamp: '3',
                  overflow: ' hidden',
                  textOverFlow: 'ellipsis',
                  paddingLeft: '3px',
                }}
              >
                {orderDetailPrint?.products?.name}
              </Typography>
              <Typography
                sx={{
                  wordBreak: 'break-word',
                  display: '-webkit-box',
                  WebkitBoxOrient: 'vertical',
                  WebkitLineClamp: '3',
                  overflow: ' hidden',
                  textOverFlow: 'ellipsis',
                  paddingLeft: '3px',
                }}
              >
                {orderDetailPrint?.products?.sumQuantity}
              </Typography>
            </Box>
            <Box className={clsx(style.qr3)}>
              <QRCode value={'Nguyễn Quang Hải - 0968.107.500'} className={clsx(style.contentQR)} size={80} />
            </Box>
          </Box>

          {/* tổng giá trị đơn hàng */}
          <Box className={clsx(style.tonggiatridonhang)}>
            <Typography
              className={clsx(style.price)}
              sx={{
                fontSize: '1.8rem',
                fontWeight: '700',
                textAlign: 'center',
                padding: '8px 0',
                borderBottom: '1px dashed #000',
              }}
            >
              {orderDetailPrint?.payment_method === 'Thanh toán khi nhận hàng'
                ? `${orderDetailPrint?.total_price?.toLocaleString('vn-VN')} đ`
                : '0đ'}
            </Typography>
          </Box>
          {/* foootprint */}
          <Box
            className={clsx(style.footerPrint)}
            sx={{
              padding: '16px 0',
              textAlign: 'center',
            }}
          >
            <Typography className={clsx(style.textFooter)}>
              {datePrintOrder.getHours()}:{datePrintOrder.getMinutes()} {format(new Date(datePrintOrder), 'dd-MM-yyyy')}
            </Typography>
            <img src={imageMaVach} alt="mã vạch" className={clsx(style.img)} />
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}

export default memo(AdminDonHang);
