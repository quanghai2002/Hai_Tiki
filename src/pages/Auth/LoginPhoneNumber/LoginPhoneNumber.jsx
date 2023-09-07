import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import style from './LoginPhoneNumber.module.scss';
import clsx from 'clsx';
import OtpInput from 'react-otp-input';
import OTPInput from 'otp-input-react';
import { Button, Spin } from 'antd';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { auth } from './firebase.config';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import userApi from '~/apis/userApi';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { Link } from 'react-router-dom';
import ContentLoader from 'react-content-loader';
import ReactDOM from 'react-dom';
import Countdown from 'react-countdown';

function LoginPhoneNumber() {
  // value OTP
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [phone, setPhone] = useState('');
  const [showOTP, setShowOTP] = useState(false);
  const [user, setUser] = useState(false);
  // hiển thị xác nhận gửi mã khi số điện thoại nhập vào đủ
  const [showSendCode, setShowSendCode] = useState(false);
  const [hideBtn, setHideBtn] = useState(false);
  const inputRef = useRef();

  // sau khi gửi mã 30s sau mới cho gửi tiếp => tránh spam
  const [timeoutSendOtp, setTimeoutSendOtp] = useState(false);

  // nếu số điện thoại lớn hơn 10 số set show send =true
  // || timeoutSendOtp === false
  useEffect(() => {
    if (phone.length >= 10) {
      setShowSendCode(true);

      if (otp.length < 6) {
        setHideBtn(true);
      } else {
        setHideBtn(false);
      }
    } else {
      setShowSendCode(false);
    }
  }, [otp]);

  useEffect(() => {
    if (phone.length >= 10) {
      setShowSendCode(true);
    } else {
      setShowSendCode(false);
    }
  }, [phone]);

  // xác thực capchath=> => send code phone Number
  function onCaptchaVerify() {
    window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
      size: 'invisible',
      callback: () => {
        console.log('xác thực capchat thành công');
        // reCAPTCHA solved, allow signInWithPhoneNumber.
        // ...
      },
      'expired-callback': () => {
        console.log('Xác thực capcha thất bại !');
      },
    });
  }

  // send OTP => phone Number => gửi mã đến điện thoại
  async function onSignup() {
    setLoading(true);

    onCaptchaVerify();

    let appVerifier = window.recaptchaVerifier;
    console.log({ appVerifier });

    const formatPhone = '+' + phone;

    signInWithPhoneNumber(auth, formatPhone, appVerifier)
      // gửi mã thành công
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        setLoading(false);
        // setShowOTP(true);
        // setTimeoutSendOtp(true);
        setTimeoutSendOtp(true);
        setShowOTP(true);
        toast.success('Gửi mã OTP thành công', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
      })
      .catch((error) => {
        // Error; SMS not sent
        console.log(error);
        setLoading(false);

        toast.error('Không gửi được OTP !', {
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

  // verify OTP => xác thực OTP => phone Number
  function onOTPverify() {
    setLoading(true);
    window.confirmationResult
      .confirm(otp)
      .then(async (response) => {
        // setUser(response.user);
        setLoading(false);

        // data phone Number
        // const dataPhoneNumber = await response?.user?.phoneNumber;
        console.log({ response });

        // requets data => server
        // try {
        //   const dataUserLoginPhone = await userApi.loginPhoneNumber({
        //     phone: dataPhoneNumber,
        //   });

        //   console.log({ dataUserLoginPhone });
        //   toast.success('Đăng nhập thành công', {
        //     position: 'top-right',
        //     autoClose: 3000,
        //     hideProgressBar: false,
        //     closeOnClick: true,
        //     pauseOnHover: true,
        //     draggable: true,
        //     progress: undefined,
        //     theme: 'light',
        //   });
        // } catch (error) {
        //   console.log(error);
        // }
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        toast.error('Nhập sai OTP => thử lại !', {
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

  // sau 1 phút mới cho tiếp tục gửi lại mã => tránh firebase => spam => dẫn đến => không gửi được
  // Random component
  const handleStartCountdown = () => {
    // setIsCounting(true);
  };

  // khi countdown hoàn thành
  const handleStopCountdown = () => {
    setTimeoutSendOtp(false);
    console.log('countdown đã hoàn thành');
  };

  // Renderer callback with condition
  const renderer = ({ minutes, seconds, completed }) => {
    // if (completed) {
    // }

    return (
      <span>
        {minutes}:{seconds}
      </span>
    );

    // Render a countdown
  };

  return (
    <>
      <div id="recaptcha-container"></div>

      <div className={clsx(style.wrapLoginPhoneNumber)}>
        {/* // LOGIN width Phone Number */}

        <div className={clsx(style.loginWithPhoneNumber)}>
          <div className={clsx(style.wrapTitle)}>
            <Link to="/login" className={clsx(style.backLoginPhone)}>
              <ArrowBackIosNewIcon className={clsx(style.iconBack)} />
            </Link>
            <h1 className={clsx(style.title)}>Đăng nhập với số điện thoại</h1>
          </div>
          <div className={clsx(style.wrapLabel)}>
            <span className={clsx(style.phone)}>Số điện thoại</span>
            <Link to="/login" className={clsx(style.linkswitchEmail)}>
              <span className={clsx(style.switchEmail)}>Đăng nhập với email</span>
            </Link>
          </div>
          <PhoneInput country="vn" value={phone} onChange={setPhone} className={clsx(style.inputPhone)} />

          {/* khi OTP đang gửi => hiển thị loading Spin */}
          {loading ? (
            <>
              <div className={clsx(style.wrapOtp)}>
                <Button disabled className={clsx(style.btnSendInput)}>
                  <span className={clsx(style.text)}> Gửi mã</span>
                  <Spin className={clsx(style.spinIcon)} />
                </Button>
              </div>
            </>
          ) : (
            // loading => false => hiện thị bình thường
            <div className={clsx(style.wrapOtp)}>
              <Button
                disabled={!showSendCode ? true : false}
                className={clsx(style.btnSendInput, {
                  [style.active]: showSendCode,
                })}
                onClick={onSignup}
              >
                {timeoutSendOtp ? (
                  <span className={clsx(style.wrapSendCode)}>
                    <span className={clsx(style.timeout)}> Gửi lại mã </span>
                    <Countdown date={Date.now() + 60000} renderer={renderer} onComplete={handleStopCountdown} />
                  </span>
                ) : (
                  <span className={clsx(style.text)}> Gửi mã</span>
                )}
              </Button>
            </div>
          )}

          {/*  showOTP hiện thị show OTP => và đăng nhập */}
          {/* verify OTP */}
          {showOTP ? (
            <>
              <div className={clsx(style.verifyPhoneNumber)}>
                <div className={clsx(style.wrapInputOtp)}>
                  <OTPInput
                    value={otp}
                    onChange={setOtp}
                    OTPLength={6}
                    otpType="number"
                    disabled={false}
                    autoFocus
                    // secure
                    className={clsx(style.inputOtp)}
                  />
                </div>
              </div>

              <button
                className={clsx(style.btnPhoneNUmber, {
                  [style.hidenBtn]: hideBtn,
                })}
                onClick={onOTPverify}
              >
                Đăng nhập
              </button>
            </>
          ) : (
            <></>
          )}
        </div>
      </div>

      <ToastContainer className={clsx(style.toastMessage)} />
    </>
  );
}

export default LoginPhoneNumber;
