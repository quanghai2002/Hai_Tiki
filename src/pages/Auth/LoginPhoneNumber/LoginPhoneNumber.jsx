import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import style from './LoginPhoneNumber.module.scss';
import clsx from 'clsx';
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
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Box from '@mui/material/Box';

// set tokenCookie
import setTokenCookie from '~/utils/setTokenCookie.js';
import setRefreshToken from '~/utils/setRefreshToken';
import haiLoGoTiki2 from '~/assets/images/haiLoGoTiki2.png';
// action login
import { login } from '~/redux/userSlice.js';

function LoginPhoneNumber() {
  const dispatch = useDispatch();

  // fix thời gian đếm ngược => luôn là 60s
  // const [startTime, setStartTime] = useState(Date.now());
  const navigate = useNavigate();
  // value OTP
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [phone, setPhone] = useState('');
  const [showOTP, setShowOTP] = useState(false);
  // hiển thị xác nhận gửi mã khi số điện thoại nhập vào đủ
  const [showSendCode, setShowSendCode] = useState(false);
  const [hideBtn, setHideBtn] = useState(false);
  // sau khi gửi mã 30s sau mới cho gửi tiếp => tránh spam
  const [timeoutSendOtp, setTimeoutSendOtp] = useState(false);
  const [showSpin, setShowSpin] = useState(false);

  // nếu số điện thoại lớn hơn 10 số set show send =true
  // || timeoutSendOtp === false
  useEffect(() => {
    if (phone.length >= 10) {
      setShowSendCode(true);
    } else {
      setShowSendCode(false);
    }

    if (otp.length < 6) {
      setHideBtn(true);
    } else {
      setHideBtn(false);
    }
  }, [otp, phone]);

  // xác thực capchath=> => send code phone Number
  function onCaptchaVerify() {
    if (!window.recaptchaverifier) {
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
  }

  // send OTP => phone Number => gửi mã đến điện thoại
  function onSignup() {
    setLoading(true);

    onCaptchaVerify();
    let appVerifier = window.recaptchaVerifier;

    const formatPhone = '+' + phone;

    signInWithPhoneNumber(auth, formatPhone, appVerifier)
      // gửi mã thành công
      .then((confirmationResult) => {
        console.log('đã lợt vào đây để gửi mã');
        window.confirmationResult = confirmationResult;
        setLoading(false);

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

  // ----------verify OTP => xác thực OTP => phone Number
  async function onOTPverify() {
    setLoading(true);
    setShowSpin(true);
    window.confirmationResult
      .confirm(otp)
      .then(async (response) => {
        // setUser(response.user);
        // setLoading(false);

        // data phone Number
        const dataPhoneNumber = response?.user?.phoneNumber;

        // requets data => server
        try {
          const dataUserLoginPhone = await userApi.loginPhoneNumber({
            phone: dataPhoneNumber,
          });

          // console.log('data Login Phone Number:', dataUserLoginPhone);
          // --- CHUẨN BỊ DỮ LIỆU ĐỂ LƯU THÔNG TIN UESER VÀO SERER THÌ MỚI MUA ĐƯỢC SẢN PHẨM NHÉ --
          const dataRegisterPhoneNumber = {
            username: dataUserLoginPhone?.data?.phoneNumber,
            email: `${dataUserLoginPhone?.data?.phoneNumber}${Math.random(1000009999)}@gmail.com`,
            password: dataUserLoginPhone?.data?.phoneNumber,
          };

          // console.log({ dataRegisterPhoneNumber });

          //  --- LƯU THÔNG TIN LÊN SERVER ---
          userApi
            .postRegister(dataRegisterPhoneNumber)
            .then((res) => {
              // console.log('đăng kí thành công tk số điện thoại THANH CÔNG:', res);
              setShowSpin(false);
              // ---------LƯU THÔNG TIN USER VÀO REDUX-----------
              dispatch(login(res?.data));
              // sau 3s chuyển sang trang chủ
              setTimeout(() => {
                navigate('/');
              }, 3000);
              // hiện toast message
              toast.success('Đăng nhập thành công', {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'light',
              });
              setShowSpin(false);
            })
            .catch((err) => {
              console.log('đăng kí tài khoản số điện thoại thất bại:', err);
              setShowSpin(false);
            });

          // -----------------LƯU TOKEN VÀO COOKIE ------------------
          // lưu Access token => vào cookies => assetsToken
          const token = dataUserLoginPhone?.token;
          setTokenCookie(token);

          // refreshToken => lưu cookies => refresh token
          const refreshToken = dataUserLoginPhone?.refreshToken;
          setRefreshToken(refreshToken);
        } catch (error) {
          console.log(error);
        }
      })
      .catch((err) => {
        console.log(err);
        setShowSpin(false);
        // setLoading(false);
        toast.error('Nhập sai OTP vui lòng thử lại !', {
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

  return (
    <>
      <div id="recaptcha-container"></div>

      <div className={clsx(style.wrapLoginPhoneNumber)}>
        {/* // LOGIN width Phone Number */}
        <div className={clsx(style.loginWithPhoneNumber)}>
          {/*  showOTP hiện thị show OTP => và đăng nhập */}

          {showOTP ? (
            <>
              {showSpin ? (
                // khi đang gửi requet => server => SHOW Spin ra
                <Spin size="large" className={clsx(style.wrapSpinAnt)}>
                  <div className={clsx(style.wrapTitle)}>
                    <Link to="/">
                      <img alt="icon" src={haiLoGoTiki2} className={clsx(style.img)} />
                    </Link>
                    <Link to="/login" className={clsx(style.backLoginPhone)}>
                      <ArrowBackIosNewIcon className={clsx(style.iconBack)} />
                    </Link>
                    <h1 className={clsx(style.title)}>Xác minh OTP</h1>
                  </div>
                  <div className={clsx(style.wrapLabel)}>
                    <Link className={clsx(style.linkswitchEmail)}>
                      <span className={clsx(style.phone, style.switchEmail)}></span>
                    </Link>
                    <Link to="/login" className={clsx(style.linkswitchEmail)}>
                      <span className={clsx(style.switchEmail)}>Đăng nhập với email</span>
                    </Link>
                  </div>
                  {/* verify OTP */}
                  <div className={clsx(style.verifyPhoneNumber)}>
                    <div className={clsx(style.wrapInputOtp)}>
                      <OTPInput
                        value={otp}
                        onChange={setOtp}
                        OTPLength={6}
                        otpType="number"
                        disabled={false}
                        // secure
                        className={clsx(style.inputOtp)}
                      />
                    </div>
                  </div>

                  <button
                    className={clsx(style.btnPhoneNUmber, {
                      [style.hidenBtn]: hideBtn,
                    })}
                  >
                    Đăng nhập
                  </button>
                </Spin>
              ) : (
                /// khi không hiện thị show SPIN => để như bình thường
                <>
                  <div className={clsx(style.wrapTitle)}>
                    <Link to="/">
                      <img alt="icon" src={haiLoGoTiki2} className={clsx(style.img)} />
                    </Link>
                    <Link to="/login" className={clsx(style.backLoginPhone)}>
                      <ArrowBackIosNewIcon className={clsx(style.iconBack)} />
                    </Link>
                    <h1 className={clsx(style.title)}>Xác minh OTP</h1>
                  </div>
                  <div className={clsx(style.wrapLabel)}>
                    <Link className={clsx(style.linkswitchEmail)}>
                      <span className={clsx(style.phone, style.switchEmail)}></span>
                    </Link>
                    <Link to="/login" className={clsx(style.linkswitchEmail)}>
                      <span className={clsx(style.switchEmail)}>Đăng nhập với email</span>
                    </Link>
                  </div>

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
              )}
            </>
          ) : (
            <>
              <div className={clsx(style.wrapTitle)}>
                <Link to="/">
                  <img alt="logo" src={haiLoGoTiki2} className={clsx(style.img)} />
                </Link>
                <Box className={clsx(style.wrapContent)}>
                  <Link to="/login" className={clsx(style.backLoginPhone)}>
                    <ArrowBackIosNewIcon className={clsx(style.iconBack)} />
                  </Link>
                  <h1 className={clsx(style.title)}>Đăng nhập với số điện thoại</h1>
                </Box>
              </div>
              <div className={clsx(style.wrapLabel)}>
                <span className={clsx(style.phone)}>Số điện thoại</span>
                <Link to="/login" className={clsx(style.linkswitchEmail)}>
                  <span className={clsx(style.switchEmail)}>Đăng nhập với email</span>
                </Link>
              </div>
              <PhoneInput country="vn" value={phone} onChange={setPhone} className={clsx(style.inputPhone)} />
              {/* khi OTP đang gửi => hiển thị loading Spin  ở BUTTON*/}
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
                // timeoutSendOtp
                !timeoutSendOtp && (
                  <div className={clsx(style.wrapOtp)}>
                    <Button
                      disabled={!showSendCode ? true : false}
                      className={clsx(style.btnSendInput, {
                        [style.active]: showSendCode,
                      })}
                      onClick={onSignup}
                    >
                      <span className={clsx(style.text)}> Gửi mã</span>
                    </Button>
                  </div>
                )
              )}
            </>
          )}
        </div>
      </div>

      <ToastContainer className={clsx(style.toastMessage)} />
    </>
  );
}

export default LoginPhoneNumber;
