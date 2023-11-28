import { memo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import style from './AdminQuanLyUser.module.scss';
import clsx from 'clsx';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Breadcrumb, Tabs, Popconfirm, Table, Modal, Spin } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';
import { CSVLink, CSVDownload } from 'react-csv';

import iconActiveUser from '~/assets/images/dotvanchuyen.png';
import userApi from '~/apis/userApi.js';
import AdminDonHangLazy from '~/pages/Admin/AdminDonHang/AdminDonHangLazy.jsx'; // mượn layzy dùng chung của addmin đơn hàng
import AddUser from './AddUser';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';

// PropTypes
AdminQuanLyUser.propTypes = {};

function AdminQuanLyUser(props) {
  // --- LƯU THÔNG TIN CHI TIẾT 1 USER KHI CLICK VÀO CHỈNH SỬA --
  const [useDetailsUpdate, setUserDetailsUpdate] = useState({});

  //  ---MPDAL ADD/UPDATE USER --
  const [isModalOpenUser, setIsModalOpenUser] = useState(false);

  // --bật modal user
  const showModalUser = () => {
    setIsModalOpenUser(true);
  };

  // -- đồng ý modal user
  const handleOkUser = () => {
    setIsModalOpenUser(false);
  };

  // đóng modal user
  const handleCancelUser = () => {
    setIsModalOpenUser(false);
  };

  // ---STATE LẤY TẤT CẢ DANH SÁCH USER NO PAGINATIONS --
  const [listAllUsers, setListAllUsers] = useState([]);

  const [loading, setLoading] = useState(true);
  const [spinLoading, setSpinLoading] = useState(false);

  // --STATE ĐỂ GỌI LẠI API ---
  const [reRenderGetAllUsers, setReRenderGetAllUsers] = useState(0);

  //  ---CALL API LẤY TẤT CẢ DANH SÁCH USER --
  useEffect(() => {
    userApi
      .getAllUserNoPagination()
      .then((response) => {
        setListAllUsers(response?.data);
        // --KHI LẤY TÁT CẢ USER THÀNH CÔNG => TẮT LOADING ĐI
        setLoading(false);
      })
      .catch((err) => {
        console.log('lấy tất cả sản user thất bại:', err);
      });
  }, [reRenderGetAllUsers]);

  // ---LẤY THÔNG TIN USER TRONG REDUX => ĐỂ CHECK ACTIVE ADMIN HIỆN TẠI ---
  const userAdmin = useSelector((state) => state?.userAuth?.user);

  //  ---ONCHANGE TAB KHI CLICK THAY ĐỔI GIỮA CÁC TABS --
  const [keyTabs, setKeyTabs] = useState(1);
  const onChangeTabsGetAllProducts = (key) => {
    setKeyTabs(key);
  };

  let dataRenderTableUser = [];
  if (keyTabs === 1) {
    // ---KEY TABS === 1=> LẤY TẤT CẢ SẢN PHẨM ĐIỆN THOẠI
    // dataRenderTable = dataListPhoneAll;
    dataRenderTableUser = listAllUsers;
  } else if (keyTabs === 2) {
    // KEY TABS === 2=> LẤY CÁC USER LÀ ADMIN => ADMIN === TRUE
    dataRenderTableUser = listAllUsers?.filter((item) => {
      return item?.admin === true;
    });
  } else {
    // --- NẾU KEYTABS KHÔNG LỌT VÀO 1 || 2 => THÌ CHO DATA === []
    dataRenderTableUser = [];
  }

  // console.log('danh sách USER RENDER LÀ:', dataRenderTableUser);

  // console.log('danh sách sản phẩm điện thoại theo KEY TABS LÀ:', dataRenderTable);

  //  ------------KHI CLICK XÓA SẢN 1 TÀI KHOẢN NGƯỜI DÙNG ---
  const handleDeleteOneUser = (id) => {
    setSpinLoading(true);
    // --- XÓA 1 USER VÀ RERENDER LẠI PAGES --
    userApi
      .deleteOneUser(id)
      .then((response) => {
        toast.success('Xóa user thành công', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });

        setSpinLoading(false);
        // cập nhật lại page
        setReRenderGetAllUsers(Math.random() * 16000);
      })
      .catch((err) => {
        console.log('xóa USER thất bại');
        setSpinLoading(false);
        toast.error('Xóa user thất bại !', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
      });
  };

  // --------------KHI CLICK VÀO CHỈNH SỬA 1 USER => TÀI KHOẢN NGƯỜI DÙNG --
  const handleUpdateUser = (id) => {
    // console.log('id USER CẦN CẬP NHẬT LÀ:', id);
    setSpinLoading(true);

    // --lấy thông tin user cần update --
    userApi
      .getOneUser(id)
      .then((response) => {
        // console.log('lấy 1 user thành công:', response.data);
        setUserDetailsUpdate(response?.data);
        setSpinLoading(false);
        // -- bật modal lên
        showModalUser();
      })
      .catch((err) => {
        console.log('lấy 1 user thất bại:', err);
        setSpinLoading(false);
      });
  };
  //  --- NỘI DUNG CỦA CÁC TAB HIỂN THỊ => TẤT CẢ VÀ ADMIN ---
  const items = [
    {
      key: 1,
      label: `Tất cả (${listAllUsers?.length})`,
    },
    {
      key: 2,
      label: `Admin (${
        listAllUsers?.filter((item) => {
          return item?.admin === true;
        })?.length
      })`,
    },
  ];

  //  --- CÁC COLUMNS ĐỂ HIỂN THỊ TIÊU ĐỀ TABLE => DANH SÁCH CÁC TÀI KHOẢN USER --
  const columns = [
    {
      title: 'Tên người dùng',
      dataIndex: 'nameUser', // key để hiện thị => data sẽ hiển thị theo key này
      width: 300,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      width: 400,
      // sorter: (a, b) => b.giaban - a.giaban, // sắp xếp theo giá bán
      // showSorterTooltip: false,
    },
    {
      title: 'Admin',
      dataIndex: 'admin',
    },
    {
      title: 'Thao tác',
      dataIndex: 'actions',
    },
  ];

  //  -----DỮ LIỆU CHỈNH SỬA --- ĐỂ HIỂN THỊ TRONG NỘI DUNG CỦA TABLE => TƯƠNG ỨNG VỚI LẠI COLUMNS Ở TRÊN --
  const data = dataRenderTableUser?.map((user) => {
    return {
      key: user?._id,
      nameUser: (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px;',
          }}
        >
          {/* ---NẾU TRONG DANH SÁCH TÀI KHOẢN => CÓ EMAIL ==== TÀI KHOẢN ĐANG ĐĂNG NHẬP => THÌ ACTIVE TÀI KHAORN ĐÓ LÊN -- */}
          {user?.email.trim() === userAdmin?.email.trim() ? (
            <img
              src={iconActiveUser}
              alt="icon-check"
              style={{
                width: '26px',
                objectFit: 'contain',
              }}
            />
          ) : (
            <></>
          )}
          <Typography>{user?.username}</Typography>
        </Box>
      ),
      email: user?.email,
      admin: `${user?.admin}`,
      // Các action như xóa user, chỉnh sửa user
      actions: (
        <Box className={clsx(style.wrapActionTable)}>
          <Popconfirm
            title="Xóa người dùng"
            description="Bạn có chắc muốn xóa người dùng này ?"
            icon={
              <QuestionCircleOutlined
                style={{
                  color: 'red',
                }}
              />
            }
            onConfirm={() => {
              handleDeleteOneUser(user?._id);
            }}
            cancelText="Thoát"
            okText="Đồng ý"
          >
            {/* nếu như là tài khoản ADMIN quang HẢI => không cho xóa và chỉnh sửa */}
            <Button
              variant="contained"
              color="secondary"
              disabled={user?.email?.trim() === 'nguyenquanghai2002.tn@gmail.com' ? true : false}
            >
              Xóa Người Dùng
            </Button>
          </Popconfirm>

          {/* Chỉnh sửa người dùng  => KHÔNG CHO CHỈNH SỬA TÀI KHAORN ADMIN QUANG HẢI*/}
          <Button
            variant="contained"
            sx={{
              color: '#000',
              backgroundColor: '#1de9b6',
              '&:hover': {
                backgroundColor: '#00bfa5',
                color: '#fff',
              },
              // fontSize: '1.4rem !important',
              fontWeight: '500 !important',
            }}
            disabled={user?.email?.trim() === 'nguyenquanghai2002.tn@gmail.com' ? true : false}
            onClick={() => {
              handleUpdateUser(user?._id);
            }}
          >
            Chỉnh sửa
          </Button>
        </Box>
      ),
    };
  });

  // ---------------------------------- EXPORT FILE CSV --------------------------

  const csvData = listAllUsers?.map((item) => {
    return {
      userName: item?.username,
      email: item?.email,
      admin: item?.admin,
      phoneNumber: item?.phoneNumber,
    };
  });

  // ----- Header của file CSV khi tải về ---
  const headersCSV = [
    { label: 'Họ và tên', key: 'userName' },
    { label: 'Email', key: 'email' },
    { label: 'Admin', key: 'admin' },
    { label: 'Số điện thoại', key: 'phoneNumber' },
  ];
  // ---RETURN JSX -----
  // --KHI ĐANG CALL API HIỂN THỊ LOADING CHO TẤT CẢ TOÀN TRANG ---
  // --KHI CLICK XÓA THÌ HIỂN THỊ SPIN --

  return loading ? (
    <AdminDonHangLazy />
  ) : spinLoading ? (
    <Spin>
      <Box className={clsx(style.wrapGetAllUSER)}>
        {/* // breadcrumbAdminGetAllUser */}
        <Box className={clsx(style.breadcrumbAdminGetAllUser)}>
          <Breadcrumb
            className={clsx(style.contentBreadcrumb)}
            items={[
              {
                title: <Link to="/admin/home">Trang chủ</Link>,
              },
              {
                title: 'Danh sách người dùng',
              },
            ]}
          />
        </Box>
        {/* Label */}
        <Typography className={clsx(style.labelContentAdminGetAllUser)}>Danh sách người dùng</Typography>
        {/* Tab bar admin header Users */}
        <Box className={clsx(style.wrapTabbarAdminGetAllUser)}>
          <Tabs
            defaultActiveKey={1}
            items={items}
            onChange={onChangeTabsGetAllProducts}
            type="card"
            // animated={true}
            activeKey={keyTabs}
            className={clsx(style.tabsAdminGetAllUsers)}
          />

          {/* ---DATA ĐỂ HIỂN THỊ DANH SÁCH Users */}
          <Box className={clsx(style.wrapTableContentAdminGetAllUser)}>
            <Box className={clsx(style.wrapCacHanhDongUser)}>
              {/* BUTTON THÊM USERS */}
              <Button variant="contained" className={clsx(style.btnAddUser)}>
                Thêm Người Dùng
              </Button>
            </Box>

            {/* -- DATA HIỂN THỊ TABLE => DANH SÁCH CÁC TÀI KHOẢN ĐÃ ĐĂNG KÍ ---- */}
            <Table
              // rowSelection={rowSelection} // ẩn đi vì user là quan trọng không cho xóa tất xả được
              columns={columns}
              dataSource={data}
              bordered
              pagination={{
                // tùy chỉnh phân trang
                defaultPageSize: 5, // số trang mặc định
                position: ['bottomCenter'],
              }}
              sticky={true}
              className={clsx(style.contentTablesGetAllUser)}
            />
          </Box>
        </Box>

        {/* Toast message */}
        <ToastContainer className={style.toastMessage} />
      </Box>
    </Spin>
  ) : (
    <Box className={clsx(style.wrapGetAllUSER)}>
      {/* // breadcrumbAdminGetAllUser */}
      <Box className={clsx(style.breadcrumbAdminGetAllUser)}>
        <Breadcrumb
          className={clsx(style.contentBreadcrumb)}
          items={[
            {
              title: <Link to="/admin/home">Trang chủ</Link>,
            },
            {
              title: 'Danh sách người dùng',
            },
          ]}
        />
      </Box>
      {/* Label */}
      <Typography className={clsx(style.labelContentAdminGetAllUser)}>Danh sách người dùng</Typography>
      {/* Tab bar admin header Users */}
      <Box className={clsx(style.wrapTabbarAdminGetAllUser)}>
        <Tabs
          defaultActiveKey={1}
          items={items}
          onChange={onChangeTabsGetAllProducts}
          type="card"
          // animated={true}
          activeKey={keyTabs}
          className={clsx(style.tabsAdminGetAllUsers)}
        />

        {/* ---DATA ĐỂ HIỂN THỊ DANH SÁCH Users */}
        <Box className={clsx(style.wrapTableContentAdminGetAllUser)}>
          <Box className={clsx(style.wrapCacHanhDongUser)}>
            {/* BUTTON THÊM USERS  và export file CSV */}
            <Button variant="contained" className={clsx(style.btnAddUser)} onClick={showModalUser}>
              Thêm Người Dùng
            </Button>
            {/* Button export CSV */}
            <CSVLink
              data={csvData}
              headers={headersCSV}
              className={clsx(style.btnExportCSV)}
              filename={'danh_sach_user_HaiTiki.csv'} // tên file tải về
              separator={';'} // phân cách để file csv chuẩn
            >
              <FileDownloadOutlinedIcon className={clsx(style.iconCSV)} />
              Export CSV
            </CSVLink>
          </Box>

          {/* -- DATA HIỂN THỊ TABLE => DANH SÁCH CÁC TÀI KHOẢN ĐÃ ĐĂNG KÍ ---- */}
          <Table
            // rowSelection={rowSelection} // ẩn đi vì user là quan trọng không cho xóa tất xả được
            columns={columns}
            dataSource={data}
            bordered
            pagination={{
              // tùy chỉnh phân trang
              defaultPageSize: 5, // số trang mặc định
              position: ['bottomCenter'],
            }}
            sticky={true}
            className={clsx(style.contentTablesGetAllUser)}
          />
        </Box>
      </Box>

      {/* ---MODAL ADD/UPDATE USER */}
      <Modal
        title={useDetailsUpdate?._id ? 'Cập nhật người dùng' : 'Thêm Người Dùng'}
        open={isModalOpenUser}
        onOk={handleOkUser}
        onCancel={handleCancelUser}
        centered
        className={clsx(style.wrapModalGetAllUser)}
        footer={null}
      >
        <AddUser
          setIsModalOpenUser={setIsModalOpenUser}
          setReRenderGetAllUsers={setReRenderGetAllUsers}
          idUpdateUser={useDetailsUpdate?._id}
          useDetailsUpdate={useDetailsUpdate}
          setUserDetailsUpdate={setUserDetailsUpdate}
        />
      </Modal>
      {/* Toast message */}
      <ToastContainer className={style.toastMessage} />
    </Box>
  );
}

export default memo(AdminQuanLyUser);
