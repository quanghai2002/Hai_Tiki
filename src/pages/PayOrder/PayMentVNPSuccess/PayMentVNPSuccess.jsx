import { memo, lazy } from 'react';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import style from './PayMentVNPSuccess.style.module.scss';
import clsx from 'clsx';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';

import paymentVNP from '~/assets/images/paymentVNP.png';
import paymenSuccess from '~/assets/images/paymenSuccess.svg';
import { useNavigate } from 'react-router-dom';
const HeaderPayOrder = lazy(() => import('~/pages/PayOrder/Component/HeaderPayOrder'));
const FooterPayOrder = lazy(() => import('~/pages/PayOrder/Component/FooterPayOrder'));
// PropTypes
PayMentVNPSuccess.propTypes = {};

function PayMentVNPSuccess(props) {
  // ------Khi CLIK VÀO NÚT BTN VỀ TRANG CHỦ ------------------
  const naviagate = useNavigate();
  const handleBackHomePage = () => {
    naviagate('/');
  };

  // render JSX
  return (
    <Box className={clsx(style.wrapPaySuccess)}>
      {/* header */}
      <HeaderPayOrder />
      {/* content */}
      <Box className={clsx(style.wrapContent)}>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, lg: 3 }}>
          <Grid lg={8}>
            <Box className={clsx(style.content)}>
              <Box className={clsx(style.hederBackground)}></Box>
              {/*  */}
              <Box className={clsx(style.subTitle)}>
                <img src={paymenSuccess} alt="icon chuc mung" className={clsx(style.img)} />
                <Box className={style.textContent}>
                  <Typography className={clsx(style.text)}>Yay, đặt hàng thành công!</Typography>
                  <Typography className={clsx(style.text2)}>Bạn đã thanh toán 54.000 ₫</Typography>

                  <Box className={clsx(style.summary)}>
                    <Typography className={clsx(style.method1)} color={(theme) => theme?.palette?.text?.primary6}>
                      Phương thức thanh toán
                    </Typography>
                    <Box className={clsx(style.paymentVNP)}>
                      <img src={paymentVNP} alt="icon VNP" className={clsx(style.imgVNP)} />
                      <Typography className={clsx(style.method2)} color={(theme) => theme?.palette?.text?.primary4}>
                        VNPAY
                      </Typography>
                    </Box>
                  </Box>
                  <Divider
                    sx={{
                      borderColor: (theme) => theme?.palette?.text?.primary12,
                    }}
                  />
                  <Box className={clsx(style.summary)}>
                    <Typography className={clsx(style.method1)} color={(theme) => theme?.palette?.text?.primary6}>
                      Tổng cộng
                    </Typography>
                    <Typography
                      className={clsx(style.method2)}
                      color={(theme) => theme?.palette?.text?.primary4}
                      sx={{
                        fontWeight: '500',
                        fontSize: '18px',
                      }}
                    >
                      54.000 ₫
                    </Typography>
                  </Box>
                  <Box className={clsx(style.summaryVat)}>
                    <Typography
                      className={clsx(style.method1)}
                      color={(theme) => theme?.palette?.text?.primary6}
                    ></Typography>
                    <Typography className={clsx(style.vat)} color={(theme) => theme?.palette?.text?.primary6}>
                      (Đã bao gồm VAT nếu có)
                    </Typography>
                  </Box>

                  <Button className={clsx(style.btnBack)} variant="outlined" onClick={handleBackHomePage}>
                    Quay về trang chủ
                  </Button>
                </Box>
              </Box>
            </Box>
          </Grid>

          {/*  */}
          <Grid lg={4}>
            <Box className={clsx(style.content2)}>
              <Box className={clsx(style.orderPakageHeader)}>
                <Typography className={clsx(style.text1)} color={(theme) => theme?.palette?.text?.primary4}>
                  Mã đơn hàng: 900797587
                </Typography>
                <Typography className={clsx(style.text2)} color={(theme) => theme?.palette?.text?.primary7}>
                  Xem đơn hàng
                </Typography>
              </Box>
              <Divider
                sx={{
                  borderColor: (theme) => theme?.palette?.text?.primary12,
                }}
              />
              <Box className={clsx(style.infoPhone)}>
                <img
                  src="https://salt.tikicdn.com/cache/96x96/ts/product/fc/e3/3c/59eb482a1fd85fd9bd38534a7a6b2577.png.webp"
                  alt="icon anh"
                  className={clsx(style.image)}
                />
                <Typography className={clsx(style.name)} color={(theme) => theme?.palette?.text?.primary6}>
                  Kẹo dẻo trái cây hỗn hợp - Welch's Mixed Fruit Snack Chứa Vitamin A,C,E Giúp ăn ngon + bổ + khỏe
                  (22,7g/gói)- Massel Official - 1 gói lẻ
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>

      {/* Footer */}
      <FooterPayOrder />
    </Box>
  );
}

export default memo(PayMentVNPSuccess);
