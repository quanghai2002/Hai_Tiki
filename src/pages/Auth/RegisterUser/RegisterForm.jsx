import clsx from 'clsx';
import style from './Form.module.scss';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useId, useState, memo } from 'react';
import IconButton from '@mui/material/IconButton';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Spin } from 'antd';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import userApi from '~/apis/userApi.js';
import haiLoGoTiki2 from '~/assets/images/haiLoGoTiki2.png';

function RegisterForm() {
  // set loading => khi gửi form
  const [loading, setLoading] = useState(false);
  const [isEmail, setIsEmail] = useState(false);

  // validation form yup => schema
  const emailRegex = /^[a-zA-Z0-9._-]+@([a-zA-Z0-9.-]+\.)+[cC][oO][mM]$/;
  const schema = yup
    .object({
      fullName: yup.string().required('Bạn chưa nhập họ và tên'),
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

  // ----REACT HOOK FORM--------------
  const {
    register,
    formState: { errors },
    handleSubmit,
    setFocus,
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      confirmPassWorld: '',
    },
  });

  useEffect(() => {
    isEmail && setFocus('email');
  });

  // navigate
  const navigate = useNavigate();
  // ------------SUBMIT FORM ĐĂNG KÍ TÀI KHOẢN -------------------
  // datafrom => validation => success => data sau khi đã valiation thành công => register user
  const onSubmit = async (data) => {
    // navigate

    // data => POST => server => đăng kí userName
    const dataRegister = {
      username: data.fullName,
      email: data.email,
      password: data.password,
    };

    // console.log('dataRegister', dataRegister);
    // khi pending bắt đầu ấn đăng kí => setloading => true
    setLoading(true);
    setIsEmail(false);

    // Sau khi có data => POST => server
    try {
      const response = await userApi.postRegister(dataRegister);
      // console.log(response?.message);
      setLoading(false);
      toast.success('Đăng kí tài khoản thành công', {
        position: 'top-right',
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });

      // sau 3s chuyển sang trang => đăng nhập
      setTimeout(() => {
        navigate('/login');
        reset();
      }, 3000);
    } catch (error) {
      // console.log('Đăng kí tài khoản thất bại ! Email đã tồn tại');
      // console.log(error?.response?.data?.message);
      setLoading(false);
      toast.error('Email đã tồn tại !', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
      // foucus => lai email
      setIsEmail(true);
    }
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
  const idInput1 = useId();
  const idInput2 = useId();
  const idInput3 = useId();
  const idInput4 = useId();

  return (
    <div className={clsx(style.wrapForm)}>
      {loading ? (
        //  khi đang ở chế độ loading => hiển thị loading
        <Spin size="large" className={clsx(style.wrapSpinAnt)}>
          <div className={clsx(style.container)}>
            {/* header => đăng ký */}
            <img src={haiLoGoTiki2} alt="icon logo" className={clsx(style.imageLogo)} />
            {/* form đăng kí user */}
            <form onSubmit={handleSubmit(onSubmit)} className={clsx(style.form)}>
              <div className={clsx(style.wrapInput)}>
                <label className={clsx(style.label)} htmlFor={idInput1}>
                  Tên của bạn?
                </label>
                <input
                  id={idInput1}
                  className={clsx(style.input, {
                    [style.errorsInput]: Boolean(errors?.fullName?.message),
                  })}
                  placeholder="Họ và tên của bạn"
                  {...register('fullName')}
                />
                {errors?.fullName?.message && <p className={clsx(style.errorsMessage)}>{errors.fullName.message}</p>}
              </div>
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

              <input className={clsx(style.register, style.activeLoading)} type="submit" value={'Đăng Ký'} />
            </form>
            {/* button chuyển trang => đăng nhập */}
            <div className={clsx(style.switchForm)}>
              <p>Bạn đã có tài khoản? </p>
              <Link to="/login" className={clsx(style.link)}>
                Đăng nhập
              </Link>
            </div>
          </div>
        </Spin>
      ) : (
        // KHÔNG ở chế độ loading => hiển thị bình thường
        <div className={clsx(style.container)}>
          {/* header => đăng ký */}
          <Link to="/">
            <img src={haiLoGoTiki2} alt="icon logo" className={clsx(style.imageLogo)} />
          </Link>

          {/* form đăng kí user */}
          <form onSubmit={handleSubmit(onSubmit)} className={clsx(style.form)}>
            <div className={clsx(style.wrapInput)}>
              <label className={clsx(style.label)} htmlFor={idInput1}>
                Tên của bạn?
              </label>
              <input
                id={idInput1}
                className={clsx(style.input, {
                  [style.errorsInput]: Boolean(errors?.fullName?.message),
                })}
                placeholder="Họ và tên của bạn"
                {...register('fullName')}
              />
              {errors?.fullName?.message && <p className={clsx(style.errorsMessage)}>{errors.fullName.message}</p>}
            </div>
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

            <input className={clsx(style.register)} type="submit" value={'Đăng Ký'} />
          </form>

          {/* button chuyển trang => đăng nhập */}
          <div className={clsx(style.switchForm)}>
            <p className={clsx(style.text)}>Bạn đã có tài khoản? </p>
            <Link to="/login" className={clsx(style.link)}>
              Đăng nhập
            </Link>
          </div>
        </div>
      )}
      <ToastContainer className={style.toastMessage} />;
    </div>
  );
}

export default memo(RegisterForm);
