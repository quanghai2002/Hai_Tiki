import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import style from './LoginGoogle.module.scss';
import clsx from 'clsx';
import { useGoogleLogin } from '@react-oauth/google';
import GoogleButton from 'react-google-button';
import userApi from '~/apis/userApi';

SingInGoogle.propTypes = {};

function SingInGoogle() {
  const googleLogin = useGoogleLogin({
    onSuccess: async (response) => {
      const { code } = response;
      // POST REQUEST => SERVER => get -> info user => or save userGoogle => database
      const param = {
        code,
      };

      console.log({ code });
      // try {
      //   // const responseUser = await userApi.loginGoogle(param);
      //   // console.log(responseUser);
      //   // if (responseUser) {
      //   //   console.log('Đăng Nhập Thành Công');
      //   // }
      // } catch (error) {
      //   console.log(error);
      // }
    },
    flow: 'auth-code',
  });
  return (
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
