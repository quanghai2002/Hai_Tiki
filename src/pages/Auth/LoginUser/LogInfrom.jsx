import clsx from 'clsx';
import style from './Form.module.scss';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { Suspense, useEffect, useId, useState, memo, useRef } from 'react';
import IconButton from '@mui/material/IconButton';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { Box, CircularProgress } from '@mui/material';
import Button from '@mui/material/Button';
import { Spin } from 'antd';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PermPhoneMsgIcon from '@mui/icons-material/PermPhoneMsg';

import haiLoGoTiki2 from '~/assets/images/haiLoGoTiki2.png';
import userApi from '~/apis/userApi';
import SingInGoogle from '~/pages/Auth/googleSingIn';
import setTokenCookie from '~/utils/setTokenCookie.js';
import setRefreshToken from '~/utils/setRefreshToken';
import removeToken from '~/utils/removeToken';
import getTokenCookie from '~/utils/getTokenCookie';
import getrefreshToken from '~/utils/getRefreshToken';
import { useDispatch } from 'react-redux';
import { login } from '~/redux/userSlice.js';

// import { loginPending, loginFulfilled, loginRejected } from '~/redux/userSlice.js';

function LogInForm() {
  // redux
  // const dispatch = useDispatch();
  // loading
  // const isLoading = useSelector((state) => state.user?.isLoading);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // dispatch => gửi dispatch => đến redux
  // const dispatch = useDispatch();

  // validation form yup
  const emailRegex = /^[a-zA-Z0-9._-]+@([a-zA-Z0-9.-]+\.)+[cC][oO][mM]$/;
  const schema = yup
    .object({
      email: yup
        .string()
        .email('Nhập đúng định dạng email')
        .matches(emailRegex, 'Nhập đúng định dạng email')
        .required('Bạn chưa nhập email'),
      password: yup.string().required('Bạn chưa nhập mật khẩu').min(8, 'Nhập tối thiểu 8 kí tự'),
      confirmPassWorld: yup
        .string()
        .required('Bạn chưa nhập xác nhận mật khẩu')
        .oneOf([yup.ref('password')], 'Nhập lại đúng mật khẩu'),
    })
    .required();

  // react-hook-form
  const {
    register,
    formState: { errors },
    handleSubmit,
    setFocus,
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassWorld: '',
    },
  });

  // datafrom => validation => success
  // const navigate = useNavigate();

  // -------------ĐĂNG NHẬP --- BẰNG EMAIL ---------
  // sau khi đã validaiton thành công => POST => LOGIN
  const onSubmit = async (data) => {
    // data => LOGIN => Email
    const dataLoginEmail = {
      email: data?.email.trim(),
      password: data?.password.trim(),
    };

    setIsLoading(true);
    // POST => Login
    try {
      // data User trả về khi đăng nhập thành công
      const response = await userApi.loginEmail(dataLoginEmail);

      //-------------------ĐĂNG NHẬP THÀNH CÔNG LƯU 2 LOẠI TOKEN: ACCESS TOKEN AND REFRESH TOKEN-----------
      // --LƯU ACCSESS TOKEN VAO COOKIE------
      const token = response?.token;
      setTokenCookie(token);
      // refreshToken => lưu cookies => refresh token
      const refreshToken = response?.refreshToken;
      setRefreshToken(refreshToken);

      // setLoading => false
      setIsLoading(false);

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

      // --------------------------ĐĂNG NHẬP THÀNH CÔNG LƯU THÔNG TIN USER VÀO REDUX -----------------
      // console.log({ response });
      dispatch(login(response?.data));
      // ----------------------------- SAU 3S SAU CHUYỂN VỀ TRANG CHỦ --------------------
      setTimeout(() => {
        navigate('/');
      }, 3000);
      // sau 3s chuyển sang trang chủ
    } catch (error) {
      // console.log(error);
      setIsLoading(false);
      toast.error('Sai Email hoặc mật khẩu', {
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

    // -------------NẾU ĐĂNG NHẬP THẤT BẠI -- KIỂM TRA CÓ NÊN XÓA -- TOKEN CŨ NẾU CÓ -----------------
    // const isAccessToken = getTokenCookie();
    // console.log('isAccessToken', Boolean(isAccessToken));

    // const isRefreshToken = getrefreshToken();
    // console.log('isRefreshToken', Boolean(isRefreshToken));
  };

  // showPassWord
  const [showPassworld, setShowPassworld] = useState(true);
  const [confirmPassWorld, setconfirmPassWorld] = useState(true);
  const handleShowPassworld = () => {
    setFocus('password');
    setShowPassworld((prev) => {
      return !prev;
    });
  };
  const handleconfirmPassWorld = () => {
    setFocus('confirmPassWorld');
    setconfirmPassWorld((prev) => {
      return !prev;
    });
  };

  // id, html for
  // const idInput1 = useId();
  const idInput2 = useId();
  const idInput3 = useId();
  const idInput4 = useId();

  return (
    <div className={clsx(style.wrapForm)}>
      {/* nếu là => loading => hiển thị => loading */}
      {isLoading ? (
        <Spin size="large" className={clsx(style.wrapSpinAnt)}>
          <div className={clsx(style.container)}>
            <Link to="/">
              <img src={haiLoGoTiki2} alt="icon logo" className={clsx(style.imageLogo)} />
            </Link>
            <form onSubmit={handleSubmit(onSubmit)} className={clsx(style.form)}>
              <div className={clsx(style.wrapInput)}>
                <label className={clsx(style.label)} htmlFor={idInput2}>
                  Email
                </label>
                <input
                  // type="email"
                  id={idInput2}
                  className={clsx(style.input, {
                    [style.errorsInput]: Boolean(errors?.email?.message),
                  })}
                  placeholder="Địa chỉ email"
                  {...register('email')}
                />

                {errors?.email?.message && <p className={clsx(style.errorsMessage)}>{errors.email.message}</p>}
              </div>
              <div className={clsx(style.wrapInput)}>
                <label className={clsx(style.label)} htmlFor={idInput3}>
                  Mật khẩu
                </label>

                <div className={clsx(style.wrapShowPass)}>
                  <input
                    type={showPassworld ? 'password' : 'text'}
                    id={idInput3}
                    className={clsx(style.input, {
                      [style.errorsInput]: Boolean(errors?.password?.message),
                    })}
                    placeholder="Mật khẩu"
                    {...register('password')}
                  />
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleShowPassworld}
                    edge="end"
                    className={clsx(style.showPassword)}
                  >
                    {showPassworld ? (
                      <Visibility className={clsx(style.icon)} />
                    ) : (
                      <VisibilityOff className={clsx(style.icon)} />
                    )}
                  </IconButton>
                </div>
                {errors?.password?.message && <p className={clsx(style.errorsMessage)}>{errors.password.message}</p>}
                {/* <p className={clsx(style.errorsMessage)}>Vui lòng nhập vào tên của bạn !</p> */}
              </div>

              <div className={clsx(style.wrapInput)}>
                <label className={clsx(style.label)} htmlFor={idInput4}>
                  Nhập lại mật khẩu
                </label>
                <div className={clsx(style.wrapShowPass)}>
                  <input
                    id={idInput4}
                    type={confirmPassWorld ? 'password' : 'text'}
                    className={clsx(style.input, {
                      [style.errorsInput]: Boolean(errors?.confirmPassWorld?.message),
                    })}
                    placeholder="Nhập lại mật khẩu"
                    {...register('confirmPassWorld')}
                  />
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleconfirmPassWorld}
                    edge="end"
                    className={clsx(style.showPassword)}
                  >
                    {confirmPassWorld ? (
                      <Visibility className={clsx(style.icon)} />
                    ) : (
                      <VisibilityOff className={clsx(style.icon)} />
                    )}
                  </IconButton>
                </div>

                {errors?.confirmPassWorld?.message && (
                  <p className={clsx(style.errorsMessage)}>{errors.confirmPassWorld.message}</p>
                )}
                {/* <p className={clsx(style.errorsMessage)}>Vui lòng nhập vào tên của bạn !</p> */}
              </div>

              <input className={clsx(style.register, style.activeLoading)} type="submit" value={'Đăng Nhập'} />
            </form>

            {/* login google */}
            <div className={clsx(style.loginGoogle)}>
              <SingInGoogle />
            </div>

            {/* Login PHONE Number */}
            <Link
              to="/loginPhoneNumber"
              style={{
                width: '100%',
              }}
            >
              <Button
                startIcon={<PermPhoneMsgIcon />}
                size="large"
                variant="contained"
                className={clsx(style.btnLoginPhoneNumber)}
              >
                <span>Đăng nhập với số điện thoại</span>
              </Button>
            </Link>

            <div className={clsx(style.switchForm)}>
              <p>Bạn chưa có tài khoản? </p>
              <Link to="/register" className={clsx(style.link)}>
                Đăng kí
              </Link>
            </div>
          </div>
        </Spin>
      ) : (
        // nếu không là loading => thì để bình thường

        <div className={clsx(style.container)}>
          <Link to="/">
            <img src={haiLoGoTiki2} alt="icon logo" className={clsx(style.imageLogo)} />
          </Link>
          <form onSubmit={handleSubmit(onSubmit)} className={clsx(style.form)}>
            <div className={clsx(style.wrapInput)}>
              <label className={clsx(style.label)} htmlFor={idInput2}>
                Email
              </label>
              <input
                // type="email"
                id={idInput2}
                className={clsx(style.input, {
                  [style.errorsInput]: Boolean(errors?.email?.message),
                })}
                placeholder="Địa chỉ email"
                {...register('email')}
              />

              {errors?.email?.message && <p className={clsx(style.errorsMessage)}>{errors.email.message}</p>}
            </div>
            <div className={clsx(style.wrapInput)}>
              <label className={clsx(style.label)} htmlFor={idInput3}>
                Mật khẩu
              </label>

              <div className={clsx(style.wrapShowPass)}>
                <input
                  type={showPassworld ? 'password' : 'text'}
                  id={idInput3}
                  className={clsx(style.input, {
                    [style.errorsInput]: Boolean(errors?.password?.message),
                  })}
                  placeholder="Mật khẩu"
                  {...register('password')}
                />
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleShowPassworld}
                  edge="end"
                  className={clsx(style.showPassword)}
                >
                  {showPassworld ? (
                    <Visibility className={clsx(style.icon)} />
                  ) : (
                    <VisibilityOff className={clsx(style.icon)} />
                  )}
                </IconButton>
              </div>
              {errors?.password?.message && <p className={clsx(style.errorsMessage)}>{errors.password.message}</p>}
              {/* <p className={clsx(style.errorsMessage)}>Vui lòng nhập vào tên của bạn !</p> */}
            </div>

            <div className={clsx(style.wrapInput)}>
              <label className={clsx(style.label)} htmlFor={idInput4}>
                Nhập lại mật khẩu
              </label>
              <div className={clsx(style.wrapShowPass)}>
                <input
                  id={idInput4}
                  type={confirmPassWorld ? 'password' : 'text'}
                  className={clsx(style.input, {
                    [style.errorsInput]: Boolean(errors?.confirmPassWorld?.message),
                  })}
                  placeholder="Nhập lại mật khẩu"
                  {...register('confirmPassWorld')}
                />
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleconfirmPassWorld}
                  edge="end"
                  className={clsx(style.showPassword)}
                >
                  {confirmPassWorld ? (
                    <Visibility className={clsx(style.icon)} />
                  ) : (
                    <VisibilityOff className={clsx(style.icon)} />
                  )}
                </IconButton>
              </div>

              {errors?.confirmPassWorld?.message && (
                <p className={clsx(style.errorsMessage)}>{errors.confirmPassWorld.message}</p>
              )}
              {/* <p className={clsx(style.errorsMessage)}>Vui lòng nhập vào tên của bạn !</p> */}
            </div>

            <input className={clsx(style.register)} type="submit" value={'Đăng Nhập'} />
            {/* login google */}
            <div className={clsx(style.loginGoogle)}>
              <SingInGoogle />
            </div>
            {/* Login PHONE Number */}
            <Link
              to="/loginphonenumber"
              style={{
                width: '100%',
              }}
            >
              <Button
                startIcon={<PermPhoneMsgIcon />}
                size="large"
                variant="contained"
                className={clsx(style.btnLoginPhoneNumber)}
              >
                <span>Đăng nhập với số điện thoại</span>
              </Button>
            </Link>
          </form>

          {/* action => switch => login || register */}
          <div className={clsx(style.switchForm)}>
            <p>Bạn chưa có tài khoản? </p>
            <Link to="/register" className={clsx(style.link)}>
              Đăng kí
            </Link>
          </div>
        </div>
      )}
      <ToastContainer className={style.toastMessage} />
    </div>
  );
}

export default memo(LogInForm);
