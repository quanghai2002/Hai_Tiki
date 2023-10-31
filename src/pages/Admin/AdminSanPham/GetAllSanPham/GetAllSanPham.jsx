import { memo, useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import style from './GetAllSanPham.module.scss';
import clsx from 'clsx';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Breadcrumb, Tabs, Popconfirm, Table, Modal, Spin } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux';

import AdminDonHangLazy from '~/pages/Admin/AdminDonHang/AdminDonHangLazy.jsx'; // mượn layzy dùng chung của addmin đơn hàng
import { rerender } from '~/redux/AppBarAdminRerender.js';
import phoneApi from '~/apis/phoneApi.js';
import AddSanPham from '../AddSanPham';

// PropTypes
GetAllSanPham.propTypes = {};

function GetAllSanPham(props) {
  // ---KHI CLIK CẬP NHẬT SẢN PHẨM TRONG UPDATE PHONE --
  const [isUpdatePhone, setIsUpdatePhone] = useState(false);
  // --Modal update sản phẩm --
  const [isModalOpen, setIsModalOpen] = useState(false);
  // --Bật Modal--
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const dispatch = useDispatch();

  // --ĐÂY LÀ LOADING CHO CẢ TRANG --
  const [loading, setLoading] = useState(true);

  // loading khi click chỉnh sửa sản phẩm => lấy thông tin 1 sản phẩm để cập nhât --
  const [spinUpdatePhone, setSpinUpdatePhone] = useState(false);
  // ---THÔNG TIN 1 SẢN PHẨM ĐIỆN THOẠI CHUẨN BỊ CẦN CẬP NHẬT LÀ ---
  const [detailsOnePhone, setDetailsOnePhone] = useState({});

  // --- STAT ĐỂ RENDER LẠI => LẤY LẠI CÁC SẢN PHẨM --
  const [statRerenderApp, setRerenderApp] = useState(0);

  //  ---ONCHANGE TAB KHI CLICK THAY ĐỔI GIỮA CÁC TABS --
  const [keyTabs, setKeyTabs] = useState(1);
  const onChangeTabsGetAllProducts = (key) => {
    setKeyTabs(key);
  };

  //  ---DỮ LIỆU TẤT CẢ CÁC SẢN PHẨM ĐIỆN THOẠI KHÔNG PHÂN TRANG => VÌ table antd đã hỗ trợ phân trang rồi --
  const [dataListPhoneAll, setDataListPhoneAll] = useState([]);

  // --CALL API LẤY DATA DỮ LIỆU VỀ --
  useEffect(() => {
    phoneApi
      .getAllPhonesNoPagiNation()
      .then((response) => {
        setDataListPhoneAll(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log('lấy tất cả sản phẩm thất bại', err);
        setLoading(false);
      });
  }, [statRerenderApp]);

  // console.log('danh sách điện thoại là:', dataListPhoneAll);

  // --- KHI CLICK THAY ĐỔI VÀO CÁC Ô CHECKBOX -----
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  //  -- ĐIỀU KIỆN ĐỂ HIỆN THỊ NÚT BUTTON XÓA TẤT CẢ => CÓ RENDER HAY KHÔNG --
  const hasSelected = selectedRowKeys?.length > 0;

  // -- Khi thay đổi các giá trị check box
  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  // --KHI CÓ SỰ -- thay đổi của các ô check box ---
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  //  ---- DỮ LIỆU ĐỂ HIỂN THỊ RA TRONG => NỘI DUNG CỦA TABLE --- PHỤ THUỘC VÀO KEY TAB ĐỂ LẤY DỮ LIỆU CHUẨN => theo các tabs
  let dataRenderTable = [];
  if (keyTabs === 1) {
    // ---KEY TABS === 1=> LẤY TẤT CẢ SẢN PHẨM ĐIỆN THOẠI
    dataRenderTable = dataListPhoneAll;
  } else if (keyTabs === 2) {
    // KEY TABS === 2=> LẤY CÁC SẢN PHẨM HẾT HÀNG
    dataRenderTable = dataListPhoneAll?.filter((item) => {
      return item?.stock_quantity === 0;
    });
  } else {
    // --- NẾU KEYTABS KHÔNG LỌT VÀO 1 || 2 => THÌ CHO DATA === []
    dataRenderTable = [];
  }

  // console.log('danh sách sản phẩm điện thoại theo KEY TABS LÀ:', dataRenderTable);
  //  --- NỘI DUNG CỦA CÁC TAB HIỂN THỊ => TẤT CẢ VÀ HẾT HÀNG ---
  const items = [
    {
      key: 1,
      label: `Tất cả (${dataListPhoneAll?.length})`,
    },
    {
      key: 2,
      label: `Hết hàng (${
        dataListPhoneAll?.filter((item) => {
          return item?.stock_quantity === 0;
        })?.length
      })`,
    },
  ];

  //  --- KHI CLICK NÚT XÓA TẤT CẢ HOẶC XÓA NHIỂU SẢN PHẨM  ---
  const handleConfirmDeleteAll = () => {
    // console.log('danh sách ID sản phẩm xần xóa là:', selectedRowKeys);
    setLoading(true);

    // data để chuẩn bị xóa nhiều sản phẩm là
    const dataDeleteAll = {
      idsListDelete: selectedRowKeys?.map((item) => {
        return item;
      }),
    };

    // --XÓA NHIỀU SẢN PHẨM LÊN API --
    phoneApi
      .deletePhones(dataDeleteAll)
      .then((response) => {
        toast.success('Xóa sản phẩm thành công', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
        // set cái này để thay đổi => gể gọi lại API khi xóa thành công
        setRerenderApp(Math.random() * 17000);
        // --để gọi lại API app bar
        dispatch(rerender(Math.random() * 11000));
        setSelectedRowKeys([]);
      })
      .catch((err) => {
        console.log('xóa nhiều sản phẩm thất bại');
        toast.error('Xóa sản phẩm thất bại !', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });

        setLoading(false);
      });
  };

  // --- KHI CLICK XÓA 1 SẢN PHẨM ----
  const handleConfirmXoa1SanPham = (id) => {
    setLoading(true);
    // console.log('1 ID sản phẩm cần xóa là:', id);
    phoneApi
      .deleteOnePhone(id)
      .then((res) => {
        toast.success('Xóa 1 sản phẩm thành công', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
        // set cái này để thay đổi => gể gọi lại API khi xóa thành công
        setRerenderApp(Math.random() * 16000);
        // --để gọi lại API app bar
        dispatch(rerender(Math.random() * 10000));
        setSelectedRowKeys([]);
      })
      .catch((err) => {
        console.log('xóa 1 sản phẩm thất bại:', err);
        toast.error('Xóa sản phẩm thất bại !', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });

        setLoading(false);
      });
  };

  // --- KHI CLICK CHỈNH SỬA 1 SẢN PHẨM-------
  const handleChinhSua1SP = (id) => {
    setSpinUpdatePhone(true);
    // console.log('1 ID sản phẩm cần CHỈNH SỬA là:', id);

    // --CALL API LẤY 1 SẢN PHẨM ĐIỆN THOAI => ĐỂ CẬP NHÂT ---
    phoneApi
      .getPhoneBuyID(id)
      .then((response) => {
        // console.log('lấy 1 SẢN PHẨM THÀNH CÔNG:', response.data);
        setDetailsOnePhone(response?.data);
        setSpinUpdatePhone(false);
        showModal();
      })
      .catch((err) => {
        console.log('lấy 1 sản phẩm điện thoại thất bại:', err);
        setSpinUpdatePhone(false);
      });
  };

  //  --- CÁC COLUMNS ĐỂ HIỂN THỊ TIÊU ĐỀ TABLE => DANH SÁCH SẢN PHẨM
  const columns = [
    {
      title: 'Sản phẩm',
      dataIndex: 'sanpham', // key để hiện thị => data sẽ hiển thị theo key này
      width: 300,
    },
    {
      title: 'Giá bán ',
      dataIndex: 'giaban',
      sorter: (a, b) => b.giaban - a.giaban, // sắp xếp theo giá bán
      showSorterTooltip: false,
    },
    {
      title: 'Số lượng tồn kho',
      dataIndex: 'soluongtonkho',
      sorter: (a, b) => b.soluongtonkho - a.soluongtonkho, // Sắp xếp theo số lượng tồn kho
      showSorterTooltip: false,
    },
    {
      title: 'Danh mục sản phẩm',
      dataIndex: 'danhmucsanpham',
    },
    {
      title: 'Thương hiệu',
      dataIndex: 'thuonghieu',
    },
    {
      title: 'Thao tác',
      dataIndex: 'actions',
    },
  ];
  //  ---DỮ LIỆU CHỈNH ĐỂ HIỂN THỊ TRONG NỘI DUNG CỦA TABLE => TƯƠNG ỨNG VỚI LẠI COLUMNS Ở TRÊN --
  const data = dataRenderTable?.map((phone) => {
    return {
      key: phone?._id,
      sanpham: (
        <Box
          sx={{
            display: 'flex',
            gap: '6px',
          }}
        >
          <img
            src={phone?.image_urls[0]}
            alt="anh"
            style={{
              width: '60px',
              objectFit: 'contain',
            }}
          />

          <Typography
            sx={{
              fontSize: '1.4rem',
              display: '-webkit-box',
              WebkitBoxOrient: 'vertical',
              WebkitLineClamp: '3',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              wordBreak: 'break-word',
            }}
          >
            {phone?.name}
          </Typography>
        </Box>
      ),
      giaban: phone?.price,
      soluongtonkho: phone?.stock_quantity,
      danhmucsanpham: 'Điện thoại di động',
      thuonghieu: phone?.brand?.name,
      // Các action như xóa sản phẩm, chỉnh sửa sản phẩm
      actions: (
        <Box className={clsx(style.wrapActionTable)}>
          <Popconfirm
            title="Xóa sản phẩm"
            description="Bạn có chắc muốn xóa sản phẩm này ?"
            icon={
              <QuestionCircleOutlined
                style={{
                  color: 'red',
                }}
              />
            }
            onConfirm={() => {
              handleConfirmXoa1SanPham(phone?._id);
            }}
            cancelText="Thoát"
            okText="Đồng ý"
          >
            {/* sẽ ẩn => button hủy đơn hàng khi đơn hàng có trạng thái khác !== 1 => có nghĩa là chỉ cho hủy đơn hàng khi === 1 => chờ xác nhận */}
            <Button variant="contained" color="secondary">
              Xóa sản phẩm
            </Button>
          </Popconfirm>

          {/* Chỉnh sửa sản phẩm */}
          <Button
            variant="contained"
            sx={{
              color: '#000',
              backgroundColor: '#ffeb3b',
              '&:hover': {
                backgroundColor: '#b2a429',
                color: '#fff',
              },
              fontSize: '1.4rem !important',
              fontWeight: '500 !important',
            }}
            onClick={() => {
              handleChinhSua1SP(phone?._id);
            }}
          >
            Chỉnh sửa
          </Button>
        </Box>
      ),
    };
  });

  // ----------------------------------------------------UPDATE-CẬP NHẬT SẢN PHẨM ------------------------------------

  // -- RETURN JSX --
  // --- KHI ĐANG CALL API THÌ HIỂN THỊ LAZY ---
  // ---KHI CLICK CHỈNH SỬA SẢN PHẨM THÌ HIỂN THỊ SPIN ---
  return loading ? (
    <AdminDonHangLazy />
  ) : (
    <Box className={clsx(style.wrapGetAllProducts)}>
      {spinUpdatePhone ? (
        <Spin>
          {/* // breadcrumbAdminGetAllSanPham */}
          <Box className={clsx(style.breadcrumbAdminGetAllSanPham)}>
            <Breadcrumb
              className={clsx(style.contentBreadcrumb)}
              items={[
                {
                  title: <Link to="/admin/home">Trang chủ</Link>,
                },
                {
                  title: 'Danh sách sản phẩm',
                },
              ]}
            />
          </Box>
          {/* Label */}
          <Typography className={clsx(style.labelContentAdminGetAllSanPham)}>Danh sách sản phẩm</Typography>
          {/* Tab bar admin header */}
          <Box className={clsx(style.wrapTabbarAdminGetAllSanPham)}>
            <Tabs
              defaultActiveKey={1}
              items={items}
              onChange={onChangeTabsGetAllProducts}
              type="card"
              // animated={true}
              activeKey={keyTabs}
              className={clsx(style.tabsAdminGetAllSanPham)}
            />

            {/* ---DATA ĐỂ HIỂN THỊ DANH SÁCH SẢN PHẨM */}
            <Box className={clsx(style.wrapTableContentAdminGetAllSanPham)}>
              <Box className={clsx(style.wrapCacHanhDong)}>
                {/*--- HIỂN THỊ XÓA NHIỀU SẢN PHẨM-- */}
                <Box className={clsx(style.wrapInfoHeader)}>
                  {/* button XÁC NHẬN XÓA NHIỀU */}
                  <Popconfirm
                    title="Xóa sản phẩm"
                    description="Bạn có chắc muốn xóa sản phẩm này ?"
                    icon={
                      <QuestionCircleOutlined
                        style={{
                          color: 'red',
                        }}
                      />
                    }
                    onConfirm={handleConfirmDeleteAll}
                    cancelText="Thoát"
                    okText="Đồng ý"
                  >
                    <Button
                      color="secondary"
                      variant="contained"
                      // onClick={handleClickXacNhanAll}
                      disabled={!hasSelected}
                      className={clsx(style.buttonXacnhanAll)}
                    >
                      Xóa tất cả
                    </Button>
                  </Popconfirm>
                  {/* Text hiện thị số lượng sản phẩm đã chọn */}
                  <Typography
                    style={{
                      marginLeft: 8,
                    }}
                    className={clsx(style.textSoLuongXacNhan)}
                  >
                    {hasSelected ? `Đã chọn ${selectedRowKeys?.length} sản phẩm` : ''}
                  </Typography>
                </Box>

                {/* BUTTON THÊM SẢN PHẨM */}
                <Link to="/admin/addproducts" className={clsx(style.linkBTNthemSanPham)}>
                  <Button variant="contained" className={clsx(style.btn)}>
                    Thêm sản phẩm
                  </Button>
                </Link>
              </Box>

              {/* -- DATA HIỂN THỊ TABLE ---- */}
              <Table
                rowSelection={rowSelection}
                columns={columns}
                dataSource={data}
                bordered
                pagination={{
                  // tùy chỉnh phân trang
                  defaultPageSize: 5, // số trang mặc định
                  position: ['bottomCenter'],
                }}
                sticky={true}
                className={clsx(style.contentTablesGetAllSanPham)}
              />
            </Box>
          </Box>

          {/* Toast message */}
          <ToastContainer className={style.toastMessage} />
        </Spin>
      ) : (
        <>
          {/* // breadcrumbAdminGetAllSanPham */}
          <Box className={clsx(style.breadcrumbAdminGetAllSanPham)}>
            <Breadcrumb
              className={clsx(style.contentBreadcrumb)}
              items={[
                {
                  title: <Link to="/admin/home">Trang chủ</Link>,
                },
                {
                  title: 'Danh sách sản phẩm',
                },
              ]}
            />
          </Box>
          {/* Label */}
          <Typography className={clsx(style.labelContentAdminGetAllSanPham)}>Danh sách sản phẩm</Typography>
          {/* Tab bar admin header */}
          <Box className={clsx(style.wrapTabbarAdminGetAllSanPham)}>
            <Tabs
              defaultActiveKey={1}
              items={items}
              onChange={onChangeTabsGetAllProducts}
              type="card"
              // animated={true}
              activeKey={keyTabs}
              className={clsx(style.tabsAdminGetAllSanPham)}
            />

            {/* ---DATA ĐỂ HIỂN THỊ DANH SÁCH SẢN PHẨM */}
            <Box className={clsx(style.wrapTableContentAdminGetAllSanPham)}>
              <Box className={clsx(style.wrapCacHanhDong)}>
                {/*--- HIỂN THỊ XÓA NHIỀU SẢN PHẨM-- */}
                <Box className={clsx(style.wrapInfoHeader)}>
                  {/* button XÁC NHẬN XÓA NHIỀU */}
                  <Popconfirm
                    title="Xóa sản phẩm"
                    description="Bạn có chắc muốn xóa sản phẩm này ?"
                    icon={
                      <QuestionCircleOutlined
                        style={{
                          color: 'red',
                        }}
                      />
                    }
                    onConfirm={handleConfirmDeleteAll}
                    cancelText="Thoát"
                    okText="Đồng ý"
                  >
                    <Button
                      color="secondary"
                      variant="contained"
                      // onClick={handleClickXacNhanAll}
                      disabled={!hasSelected}
                      className={clsx(style.buttonXacnhanAll)}
                    >
                      Xóa tất cả
                    </Button>
                  </Popconfirm>
                  {/* Text hiện thị số lượng sản phẩm đã chọn */}
                  <Typography
                    style={{
                      marginLeft: 8,
                    }}
                    className={clsx(style.textSoLuongXacNhan)}
                  >
                    {hasSelected ? `Đã chọn ${selectedRowKeys?.length} sản phẩm` : ''}
                  </Typography>
                </Box>

                {/* BUTTON THÊM SẢN PHẨM */}
                <Link to="/admin/addproducts" className={clsx(style.linkBTNthemSanPham)}>
                  <Button variant="contained" className={clsx(style.btn)}>
                    Thêm sản phẩm
                  </Button>
                </Link>
              </Box>

              {/* -- DATA HIỂN THỊ TABLE ---- */}
              <Table
                rowSelection={rowSelection}
                columns={columns}
                dataSource={data}
                bordered
                pagination={{
                  // tùy chỉnh phân trang
                  defaultPageSize: 5, // số trang mặc định
                  position: ['bottomCenter'],
                }}
                sticky={true}
                className={clsx(style.contentTablesGetAllSanPham)}
              />
            </Box>
          </Box>
          {/* --UPDATE -- CẬP NHẬT --- SẢN PHẨM --- */}

          {/* đang test SPIN */}

          <Modal
            title="Cập nhật sản phẩm"
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
            centered
            footer={null}
            className={clsx(style.wrapModalChangUpdatePhoneAdmin)}
          >
            {/*  --NẾU KHI CLICK ĐỒNG Ý CẬP NHẬT SẢN PHẨM--- */}
            {isUpdatePhone ? (
              <Spin>
                {detailsOnePhone?.name && (
                  <AddSanPham
                    phoneBuyId={detailsOnePhone}
                    idUpdate={detailsOnePhone?._id}
                    setIsModalOpen={setIsModalOpen}
                  />
                )}
              </Spin>
            ) : (
              detailsOnePhone?.name && (
                <AddSanPham
                  phoneBuyId={detailsOnePhone}
                  idUpdate={detailsOnePhone?._id}
                  setIsModalOpen={setIsModalOpen}
                  setIsUpdatePhone={setIsUpdatePhone}
                  setRerenderApp={setRerenderApp}
                />
              )
            )}
          </Modal>

          {/* Toast message */}
          <ToastContainer className={style.toastMessage} />
        </>
      )}
    </Box>
  );
}

export default memo(GetAllSanPham);
