import { memo, lazy } from 'react';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import style from './PayMentTienMat.style.module.scss';
import clsx from 'clsx';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';

import paymentVNP from '~/assets/images/paymentVNP.png';
import paymenSuccess from '~/assets/images/paymenSuccess.svg';
import chucmung from '~/assets/images/chucmung.svg';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
const HeaderPayOrder = lazy(() => import('~/pages/PayOrder/Component/HeaderPayOrder'));
const FooterPayOrder = lazy(() => import('~/pages/PayOrder/Component/FooterPayOrder'));
// PropTypes
PayMentTienMat.propTypes = {};

function PayMentTienMat(props) {
  // ------Khi CLIK VÀO NÚT BTN VỀ TRANG CHỦ ------------------
  const naviagate = useNavigate();
  const handleBackHomePage = () => {
    naviagate('/');
  };

  // --------LẤY DỮ LIỆU ĐƠN HÀNG VỪA ĐẶT TRONG REDUX ---- ĐÃ LƯU KHI THÊM ĐƠN HÀNG MỚI THÀNH CÔNG-----
  const infoOrderTienMat = useSelector((state) => state?.orderPayTienMat);
  // console.log({ infoOrderTienMat });

  // -------KHI CLICK VÀO NÚT XEM ĐƠN HÀNG -----
  const handleHistoryOrder = () => {
    console.log('xem đơn hàng');
    naviagate('/order/history');
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
                  <Typography className={clsx(style.text2)}>
                    Chuẩn bị tiền mặt {infoOrderTienMat?.total_price.toLocaleString('vi-VN')} ₫
                  </Typography>

                  <Box className={clsx(style.summary)}>
                    <Typography className={clsx(style.method1)} color={(theme) => theme?.palette?.text?.primary6}>
                      Phương thức thanh toán
                    </Typography>
                    <Typography className={clsx(style.method2)} color={(theme) => theme?.palette?.text?.primary4}>
                      Thanh toán tiền mặt
                    </Typography>
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
                        fontSize: '18px !important',
                      }}
                    >
                      {infoOrderTienMat?.total_price.toLocaleString('vi-VN')} ₫
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
                  Mã đơn hàng: {infoOrderTienMat?._id}
                </Typography>
                <Typography
                  className={clsx(style.text2)}
                  color={(theme) => theme?.palette?.text?.primary7}
                  onClick={handleHistoryOrder}
                >
                  Xem đơn hàng
                </Typography>
              </Box>
              {/* <Divider
                sx={{
                  borderColor: (theme) => theme?.palette?.text?.primary12,
                }}
              /> */}
              {/* DANH SÁCH CÁC SẢN PHẨM TRONG ĐƠN HÀNG ĐÓ */}
              <Box className={clsx(style.wrapListProductOrder)}>
                {infoOrderTienMat?.products2?.map((phone) => {
                  return (
                    <Box key={phone?.id}>
                      <Divider
                        sx={{
                          borderColor: (theme) => theme?.palette?.text?.primary12,
                        }}
                      />
                      <Box className={clsx(style.infoPhone)}>
                        <img src={phone?.image} alt="icon anh" className={clsx(style.image)} />
                        <Typography className={clsx(style.name)} color={(theme) => theme?.palette?.text?.primary6}>
                          {phone?.name}
                        </Typography>
                      </Box>
                    </Box>
                  );
                })}
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

export default memo(PayMentTienMat);
