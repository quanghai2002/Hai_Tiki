import React, { memo, lazy } from 'react';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import style from './PayMentError.style.module.scss';
import clsx from 'clsx';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';

import thanhtoanKoThanhCong from '~/assets/images/thanhtoanThanhCong.jpg';
import paymentVNP from '~/assets/images/paymentVNP.png';
import { useNavigate } from 'react-router-dom';
const HeaderPayOrder = lazy(() => import('~/pages/PayOrder/Component/HeaderPayOrder'));
const FooterPayOrder = lazy(() => import('~/pages/PayOrder/Component/FooterPayOrder'));
// PropTypes
PayMentError.propTypes = {};

function PayMentError(props) {
  // --------------KHI CLICK BTN THANH TOÁN LẠI --------------
  const naviagate = useNavigate();
  const handleRepayment = () => {
    naviagate('/payment');
  };

  //   -------------KHI CLIK THANH TOÁN BẰNG TIỀN MẶT ----------
  const handleClickPayMentTienMat = () => {
    naviagate('/payment/tienmat');
  };
  return (
    <Box className={clsx(style.wrapPayError)}>
      {/* header */}
      <HeaderPayOrder />

      {/* content */}
      <Box className={clsx(style.content)}>
        <Box className={clsx(style.content2)}>
          <img src={thanhtoanKoThanhCong} alt="thanh toan that bai" className={clsx(style.img)} />
          <Box className={clsx(style.wrapError)}>
            <Typography className={clsx(style.label)}>Thanh toán không thành công</Typography>
            <Box className={clsx(style.errorBlock)}>
              <Typography className={clsx(style.lable1)}>Thanh toán thất bại.</Typography>
              <Typography className={clsx(style.lable2)} color={(theme) => theme?.palette?.text?.primary4}>
                Vui lòng thanh toán lại hoặc chọn phương thức thanh toán khác
              </Typography>
            </Box>
            <Box className={clsx(style.infoCard)}>
              <Typography className={clsx(style.left)} color={(theme) => theme?.palette?.text?.primary6}>
                Mã đơn hàng
              </Typography>
              <Typography className={clsx(style.right)} color={(theme) => theme?.palette?.text?.primary4}>
                617417973
              </Typography>
            </Box>
            <Divider
              className={clsx(style.divider)}
              sx={{
                borderColor: (theme) => theme?.palette?.text?.primary12,
              }}
            />
            <Box className={clsx(style.infoCard)}>
              <Typography className={clsx(style.left)} color={(theme) => theme?.palette?.text?.primary6}>
                Phương thức thanh toán
              </Typography>
              <Box className={clsx(style.mothodPay)}>
                <img src={paymentVNP} className={clsx(style.icon)} alt="vnp icon" />
                <Typography className={clsx(style.right)} color={(theme) => theme?.palette?.text?.primary4}>
                  VNPAY
                </Typography>
              </Box>
            </Box>
            <Divider
              className={clsx(style.divider)}
              sx={{
                borderColor: (theme) => theme?.palette?.text?.primary12,
              }}
            />
            <Box className={clsx(style.infoCard)}>
              <Typography className={clsx(style.left)} color={(theme) => theme?.palette?.text?.primary6}>
                Tổng tiền
              </Typography>
              <Typography className={clsx(style.right)} color={(theme) => theme?.palette?.text?.primary4}>
                54.000 ₫
              </Typography>
            </Box>

            <Box className={clsx(style.wapBtn)}>
              <Button
                className={clsx(style.btnAddError)}
                color="secondary"
                variant="contained"
                onClick={handleRepayment}
              >
                Thanh toán lại
              </Button>
              <Button className={clsx(style.btnAddError)} variant="outlined" onClick={handleClickPayMentTienMat}>
                Trả Tiền Mặt Khi Nhận Hàng
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* foooter */}
      <FooterPayOrder />
    </Box>
  );
}

export default memo(PayMentError);
