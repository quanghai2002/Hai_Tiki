import { memo, useEffect, useId, useState } from 'react';
import PropTypes from 'prop-types';
import style from './AddUser.module.scss';
import clsx from 'clsx';
import Box from '@mui/material/Box';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { Form, Input, Upload, Select, Spin, Modal, Breadcrumb } from 'antd';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import userApi from '~/apis/userApi.js';

import { useDispatch } from 'react-redux';

// PropTypes
AddUser.propTypes = {
  setIsModalOpenUser: PropTypes.func,
  setReRenderGetAllUsers: PropTypes.func,
  idUpdateUser: PropTypes.string,
  useDetailsUpdate: PropTypes.object,
  setUserDetailsUpdate: PropTypes.func,
};

function AddUser({ setIsModalOpenUser, setReRenderGetAllUsers, idUpdateUser, useDetailsUpdate, setUserDetailsUpdate }) {
  // ---Xem có ID user truyên xuống không --
  // console.log('id user cập nhật là:', idUpdateUser);
  // console.log('thông tin USER CẬP NHẬT LÀ:', useDetailsUpdate);

  const [loading, setLoading] = useState(false);

  // -------------------------------------YUP VALIDATION ---------------------------
  const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
  const schema = yup.object().shape({
    email: yup.string().required('Vui lòng nhập email !').matches(emailRegex, 'Vui lòng nhập định dạng email hợp lệ !'),
    nameUser: yup.string().required('Vui lòng nhập tên người dùng !').min(3, 'Nhập tối thiểu 3 kí tự'),
    password: yup.string().required('Vui lòng nhập mật khẩu !').min(8, 'Nhập tối thiểu 8 kí tự'),
    admin: yup.string().required('Vui lòng chọn loại tài khoản !'),
  });

  // -------------------------------------REACT HOOK FORM ---------------------
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    // nếu có data => truyền vào => lấy data đó, còn mặc đinh là ''
    defaultValues: {
      email: idUpdateUser ? useDetailsUpdate?.email : '',
      nameUser: idUpdateUser ? useDetailsUpdate?.username : '',
      password: idUpdateUser ? useDetailsUpdate?.password : '',
      admin: idUpdateUser ? useDetailsUpdate?.admin : false,
    },
  });

  // ---KHI CLICK THÊM USER ---|| CẬP NHẬT USER
  const onSubmitAddUser = (data) => {
    // ---NẾU CÓ ID USER TRUYỀN XUỐNG SẼ LÀ CẬP NHẬT --
    // ---CÒN LẠI LÀ THÊM USER ---

    // --ĐÂY LÀ CẬP NHẬT USER--
    if (idUpdateUser) {
      setLoading(true);
      // console.log('đây là cập nhật USER');

      // --- DATA CHUẨN BỊ ĐỂ CẬP NHẬT 1 USER ---
      const dataUpdateUser = {
        _id: idUpdateUser,
        email: data?.email.trim(),
        username: data?.nameUser.trim(),
        password: data?.password.trim(),
        admin: data?.admin.trim() === 'true' ? true : false,
      };
      // console.log('dữ liệu cập nhật user là:', dataUpdateUser);

      // --CALL API CẬP NHẬT DỮ LIỆU USER --
      userApi
        .updateOneUser(dataUpdateUser)
        .then((res) => {
          // console.log('cập nhật user thành công', res);
          // toast message success
          toast.success('Cập nhật User thành công', {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
          });

          // --Đóng modal --Khi Thêm mới thành công
          setIsModalOpenUser(false);

          // cập nhật lại page => get all user
          setReRenderGetAllUsers(Math.random() * 19000);

          // --Cập nhật thành công set lại thông tin user == {}
          setUserDetailsUpdate({});

          setLoading(false);
        })
        .catch((err) => {
          console.log('cập nhật User thất bại:', err);
          setLoading(false);

          // toast message error
          toast.error('Cập nhật User thất bại !', {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
          });

          setUserDetailsUpdate({});
        });
    }
    // Đây là THÊM MỚI USER
    else {
      setLoading(true);
      // console.log('Đây là Thêm mới User');

      // --- DATA CHUẨN BỊ ĐỂ THÊM MỚI 1 USER ---
      const dataCreateUser = {
        email: data?.email.trim(),
        username: data?.nameUser.trim(),
        password: data?.password.trim(),
        admin: data?.admin.trim() === 'true' ? true : false,
      };
      // console.log('dữ liệu để thêm user là:', dataCreateUser);

      // --------------REGISTER USER ----------Thêm mới tài khoản USER ----
      userApi
        .postRegister(dataCreateUser)
        .then((response) => {
          // console.log('đăng kí USER thành công', response);

          // toast message success
          toast.success('Thêm User thành công', {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
          });

          // --Đóng modal --Khi Thêm mới thành công
          setIsModalOpenUser(false);

          // cập nhật lại page => get all user
          setReRenderGetAllUsers(Math.random() * 18000);

          setLoading(false);
        })
        .catch((err) => {
          console.log('thêm user thất bại:', err);
          setLoading(false);

          // toast message error
          toast.error('Thêm User thất bại.Email đã tồn tại !', {
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
    }
  };
  // ---RETURN JSX ---
  // ---KHI CLICK CẬP NHẬT / UPDATE THÌ BẬT SPIN LÊN --
  return loading ? (
    <Spin>
      <Box
        sx={{
          backgroundColor: '#ffff',
          borderRadius: '8px',
          overflow: 'hidden',
          maxWidth: 936,
          margin: 'auto',
        }}
      >
        <Paper sx={{ maxWidth: 936, maxHeight: 520, marginRight: '6px', overflow: 'auto', boxShadow: 'none' }}>
          <Form onFinish={handleSubmit(onSubmitAddUser)} className={clsx(style.wrapFormAddUser)}>
            {/* email */}
            <Form.Item
              label="Email"
              name="email"
              validateStatus={errors.email ? 'error' : ''}
              help={errors.email && errors.email.message}
              htmlFor="email"
            >
              <Controller
                name="email"
                control={control}
                render={({ field }) => <Input {...field} placeholder="Nhập email" id="email" allowClear={true} />}
              />
            </Form.Item>
            {/* tên user */}
            <Form.Item
              label="Tên người dùng"
              name="nameUser"
              validateStatus={errors.nameUser ? 'error' : ''}
              help={errors.nameUser && errors.nameUser.message}
              htmlFor="nameUser"
            >
              <Controller
                name="nameUser"
                control={control}
                render={({ field }) => (
                  <Input {...field} placeholder="Tên người dùng" id="nameUser" allowClear={true} />
                )}
              />
            </Form.Item>
            {/* password */}
            <Form.Item
              label="Mật khẩu"
              name="password"
              validateStatus={errors.password ? 'error' : ''}
              help={errors.password && errors.password.message}
              htmlFor="password"
            >
              <Controller
                name="password"
                control={control}
                render={({ field }) => <Input {...field} placeholder="Nhập mật khẩu" id="password" allowClear={true} />}
              />
            </Form.Item>

            {/* Admin*/}
            <Form.Item
              label="Chọn loại tài khoản"
              name="admin"
              validateStatus={errors.admin ? 'error' : ''}
              help={errors.admin && errors.admin.message}
              htmlFor="admin"
            >
              <Controller
                name="admin"
                control={control}
                render={({ field }) => {
                  return (
                    <Select
                      {...field}
                      className={clsx(style.inputSelect)}
                      placeholder="Chọn loại tài khoản"
                      id="admin"
                      options={[
                        {
                          value: false,
                          label: 'Người dùng',
                        },
                        {
                          value: true,
                          label: 'Admin',
                        },
                      ]}
                    />
                  );
                  // <Input {...field} placeholder="Nhập thông số admin" id="RAM" type="number" min={0} />
                }}
              />
            </Form.Item>
            {/* button submit */}
            <Form.Item>
              {/* nếu có ID uset=>> truyền phone xuống => hiện thị nút Update => còn lại mặc định là thêm user */}
              {idUpdateUser ? (
                <Box className={clsx(style.wrapBtnActionFormUpdateUser)}>
                  <Button
                    color="secondary"
                    variant="contained"
                    className={clsx(style.btnHuy)}
                    // onClick={() => {
                    //   setIsModalOpen(false);
                    // }}
                  >
                    Hủy
                  </Button>
                  <Button type="primary" htmltype="submit" variant="contained" className={clsx(style.btnAdd)}>
                    Cập nhật
                  </Button>
                </Box>
              ) : (
                <Button type="primary" htmltype="submit" variant="contained" className={clsx(style.btnAddUser)}>
                  Thêm người dùng
                </Button>
              )}
            </Form.Item>
          </Form>
        </Paper>
      </Box>
    </Spin>
  ) : (
    <Box
      sx={{
        backgroundColor: '#ffff',
        borderRadius: '8px',
        overflow: 'hidden',
        maxWidth: 936,
        margin: 'auto',
      }}
    >
      <Paper
        sx={{ maxWidth: 936, maxHeight: 520, marginRight: '6px', overflow: 'auto', boxShadow: 'none' }}
        className={clsx(style.wrapToastMessage)}
      >
        <Form onFinish={handleSubmit(onSubmitAddUser)} className={clsx(style.wrapFormAddUser)}>
          {/* email */}
          <Form.Item
            label="Email"
            name="email"
            validateStatus={errors.email ? 'error' : ''}
            help={errors.email && errors.email.message}
            htmlFor="email"
          >
            <Controller
              name="email"
              control={control}
              render={({ field }) => <Input {...field} placeholder="Nhập email" id="email" allowClear={true} />}
            />
          </Form.Item>
          {/* tên user */}
          <Form.Item
            label="Tên người dùng"
            name="nameUser"
            validateStatus={errors.nameUser ? 'error' : ''}
            help={errors.nameUser && errors.nameUser.message}
            htmlFor="nameUser"
          >
            <Controller
              name="nameUser"
              control={control}
              render={({ field }) => <Input {...field} placeholder="Tên người dùng" id="nameUser" allowClear={true} />}
            />
          </Form.Item>
          {/* password */}
          <Form.Item
            label="Mật khẩu"
            name="password"
            validateStatus={errors.password ? 'error' : ''}
            help={errors.password && errors.password.message}
            htmlFor="password"
          >
            <Controller
              name="password"
              control={control}
              render={({ field }) => <Input {...field} placeholder="Nhập mật khẩu" id="password" allowClear={true} />}
            />
          </Form.Item>

          {/* Admin*/}
          <Form.Item
            label="Chọn loại tài khoản"
            name="admin"
            validateStatus={errors.admin ? 'error' : ''}
            help={errors.admin && errors.admin.message}
            htmlFor="admin"
          >
            <Controller
              name="admin"
              control={control}
              render={({ field }) => {
                return (
                  <Select
                    {...field}
                    className={clsx(style.inputSelect)}
                    placeholder="Chọn loại tài khoản"
                    id="admin"
                    options={[
                      {
                        value: false,
                        label: 'Người dùng',
                      },
                      {
                        value: true,
                        label: 'Admin',
                      },
                    ]}
                  />
                );
                // <Input {...field} placeholder="Nhập thông số admin" id="RAM" type="number" min={0} />
              }}
            />
          </Form.Item>
          {/* button submit */}
          <Form.Item>
            {/* nếu có ID uset=>> truyền phone xuống => hiện thị nút Update => còn lại mặc định là thêm user */}
            {idUpdateUser ? (
              <Box className={clsx(style.wrapBtnActionFormUpdateUser)}>
                <Button
                  color="secondary"
                  variant="contained"
                  className={clsx(style.btnHuy)}
                  onClick={() => {
                    setIsModalOpenUser(false);
                  }}
                >
                  Hủy
                </Button>
                <Button type="primary" htmltype="submit" variant="contained" className={clsx(style.btnAdd)}>
                  Cập nhật
                </Button>
              </Box>
            ) : (
              <Button type="primary" htmltype="submit" variant="contained" className={clsx(style.btnAddUser)}>
                Thêm người dùng
              </Button>
            )}
          </Form.Item>
        </Form>

        {/* Toast message */}
        <ToastContainer className={style.toastMessage} />
      </Paper>
    </Box>
  );
}

export default memo(AddUser);
