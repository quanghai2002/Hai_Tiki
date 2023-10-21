import { memo, lazy, useEffect, useState } from 'react';
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
import orderApi from '~/apis/orderApi.js';
import { useDispatch, useSelector } from 'react-redux';
import userApi from '~/apis/userApi.js';
import VNPlazy from './VNPlazy.jsx';

// PropTypes
PayMentVNPSuccess.propTypes = {};

function PayMentVNPSuccess(props) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [listOrder, setListOrder] = useState([]);
  //-----  LỌT VÀO ĐÂY ĐỒNG NGHĨA ĐÃ THANH TOÁN VNP ĐƠN HÀNG PREVIEW THÀNH CÔNG -------
  const userLogin = useSelector((state) => state?.userAuth?.user);

  const orderPreviewVNP = useSelector((state) => state?.orderPayVNP);

  console.log('thông tin thanh toán VNP:', listOrder);

  // Kiểm tra xem đây là thanh toán cho 1 đơn hàng hay nhiều đơn hàng
  // --Nếu thanh toán VNP cho 1 đơn hàng thì thanh toán kiểu khác ---

  const lengtOrderVnp = orderPreviewVNP?.products2?.length;
  console.log('số đơn hàng Thanh Toán cho VNP:', lengtOrderVnp);
  // --LƯU THÔNG TIN ĐƠN HÀNG LÊN DATABSE --
  useEffect(() => {
    // ---NẾU SỐ ĐƠN HÀNG LÀ 1 ==> THÌ THÊM 1 ĐƠN HÀNG KIỂU KHÁC --
    if (lengtOrderVnp === 1) {
      console.log('đây là API thanh toán VNP cho 1 ĐƠN HÀNG');
      orderApi
        .addOrderDatabase(orderPreviewVNP)
        .then((response) => {
          // console.log('thêm mới đơn hàng thành công', response);
          setListOrder(response?.data);
          // --- LẤY ID ĐƠN HÀNG ĐÓ ---- VÀ CẬP NHẬT VÀO TRONG USER ----
          const userUpdate = {
            ...userLogin,
            orders: [response?.data?._id],
          };
          // ---THÊM ID ĐƠN HÀNG VÀO TRONG USER ------- ĐỂ POPULATE ----
          userApi
            .updateOneUser(userUpdate)
            .then((res) => {
              // console.log('thêm ID đơn hàng vào user thành công', res);
              setLoading(false);
            })
            .catch((err) => {
              console.log('thêm ID đơn hàng vào user thất bại', err);
              setLoading(false);
            });
        })
        .catch((err) => {
          console.log('thêm mơi đơn hàng thất bại', err);
        });
    } else {
      // --ĐÂY LÀ TRANG THANH TOÁN VNP CHO NHIỀU ĐƠN HÀNG --
      console.log('đây là Thanh Toán VNP cho Nhiều Đơn Hàng');

      //  DANH SÁCH CÁC ĐƠN HÀNG CON ĐỂ CẬP NHẬT LÊN SERVER LÀ:
      const newPhoneCartMany = orderPreviewVNP?.products2?.map((oneCart) => {
        return {
          status: {
            code: 1,
            state: 'Chờ xác nhận',
          },
          total_price: oneCart?.priceAll,
          shipping_address: userLogin?.address,
          payment_method: 'Thanh toán qua VNP',
          user: userLogin?._id,
          products: oneCart,
        };
      });

      // -- THÊM NHIỀU ĐƠN HÀNG CÙNG 1 LÚC =>MỖI ĐƠN HÀNG LÀ 1 SẢN PHẨM -> UPDATE LÊN DATABASSE
      const orders = newPhoneCartMany;
      console.log('danh sách đơn hàng chuẩn bị cập nhật là:', orders);
      orderApi
        .addOrderMany({ orders })
        .then((response) => {
          console.log('thêm mới nhiều đơn hàng VNP thành công:', response);

          //  --SAU KHI THÊM ĐƠN HÀNG THÀNH CÔNG HIỆN THỊ LẠI THÔNG TIN TẤT CẢ ĐƠN HÀNG ---
          const infoDetailsOrderVNP = {
            ...orderPreviewVNP,
            _id: orderPreviewVNP?.products?.id,
          };

          setListOrder(infoDetailsOrderVNP);

          // --- LẤY ID ĐƠN HÀNG ĐÓ ---- VÀ CẬP NHẬT VÀO TRONG USER ----
          const userUpdate = {
            ...userLogin,
            orders: response?.data?.map((item) => {
              return item?._id;
            }),
          };

          // ---THÊM LIST ID ĐƠN HÀNG VÀO TRONG USER ------- ĐỂ POPULATE ----
          userApi
            .updateOneUser(userUpdate)
            .then((res) => {
              console.log('thêm ID đơn hàng vào user thành công', res);
              setLoading(false);
            })
            .catch((err) => {
              console.log('thêm ID đơn hàng vào user thất bại');
              setLoading(false);
            });
        })
        .catch((err) => {
          console.log('thêm mới nhiều đơn hàng VNP thất bại:', err);
          setLoading(false);
        });
    }
  }, [lengtOrderVnp, orderPreviewVNP, userLogin]);

  // ------Khi CLIK VÀO NÚT BTN VỀ TRANG CHỦ ------------------
  const naviagate = useNavigate();
  const handleBackHomePage = () => {
    naviagate('/');
  };

  // --- Khi click handleClickOrderHistory
  const handleClickOrderHistory = () => {
    naviagate('/order/history');
  };
  // render JSX
  return (
    <Box className={clsx(style.wrapPaySuccess)}>
      {/* header */}
      <HeaderPayOrder />
      {/* content */}
      {/* mặc định vào là đang cập nhật thông tin đơn hàng => có lazy nhé */}
      {loading ? (
        <VNPlazy />
      ) : (
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
                      Bạn đã thanh toán {listOrder?.total_price?.toLocaleString('vi-VN')} ₫
                    </Typography>

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
                        {listOrder?.total_price?.toLocaleString('vi-VN')} ₫
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
                    Mã đơn hàng: {listOrder?._id}
                  </Typography>
                  <Typography
                    className={clsx(style.text2)}
                    color={(theme) => theme?.palette?.text?.primary7}
                    onClick={handleClickOrderHistory}
                  >
                    Xem đơn hàng
                  </Typography>
                </Box>

                {/* DANH SÁCH ĐƠN HÀNG ĐÃ MUA */}
                <Box className={clsx(style.wrapListOrderPayVNP)}>
                  {listOrder?.products2?.map((order) => {
                    return (
                      <Box key={order?.id}>
                        <Divider
                          sx={{
                            borderColor: (theme) => theme?.palette?.text?.primary12,
                          }}
                        />
                        <Box className={clsx(style.infoPhone)}>
                          <img src={order?.image} alt="icon anh" className={clsx(style.image)} />
                          <Typography className={clsx(style.name)} color={(theme) => theme?.palette?.text?.primary6}>
                            {order?.name}
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
      )}

      {/* Footer */}
      <FooterPayOrder />
    </Box>
  );
}

export default memo(PayMentVNPSuccess);
