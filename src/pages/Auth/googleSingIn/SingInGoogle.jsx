import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import style from './LoginGoogle.module.scss';
import clsx from 'clsx';
import { useGoogleLogin } from '@react-oauth/google';
import GoogleButton from 'react-google-button';
import userApi from '~/apis/userApi';
import { ToastContainer, toast } from 'react-toastify';
import { Spin } from 'antd';
import { useNavigate } from 'react-router-dom';

SingInGoogle.propTypes = {};

function SingInGoogle() {
  const [showSpin, setShowSpin] = useState(false);
  const navigate = useNavigate();

  const googleLogin = useGoogleLogin({
    onSuccess: async (response) => {
      const { code } = response;
      // POST REQUEST => SERVER => get -> info user => or save userGoogle => database
      const param = {
        code,
      };
      setShowSpin(true);
      try {
        const responseLoginGoogle = await userApi.loginGoogle(param);
        console.log(responseLoginGoogle);
        setShowSpin(false);
        if (responseLoginGoogle) {
          console.log('Đăng Nhập Thành Công');
          toast.success('Đăng nhập thành công', {
            position: 'top-right',
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
          });

          // sau 4s chuyển sang trang chủ
          setTimeout(() => {
            navigate('/homepage');
          }, 4000);
        }
      } catch (error) {
        setShowSpin(false);
        console.log(error);
        toast.error('Đăng nhập thất bại', {
          position: 'top-right',
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
      }
    },
    flow: 'auth-code',
  });
  return showSpin ? (
    // khi đang đăng nhập => google => hiển thị show spin
    <Spin size="large" className={clsx(style.spinLoginGoogle)}>
      <div className={clsx(style.wrapLoginGoogle)}>
        <GoogleButton type="dark" label="Đăng nhập với Google" className={clsx(style.loginGoogle)} />
      </div>
    </Spin>
  ) : (
    //  không thì để như bình thường
    <div className={clsx(style.wrapLoginGoogle)}>
      <GoogleButton
        type="dark"
        label="Đăng nhập với Google"
        onClick={googleLogin}
        className={clsx(style.loginGoogle)}
      />
    </div>
  );
}

export default SingInGoogle;
