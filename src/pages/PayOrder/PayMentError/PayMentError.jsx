import { memo, lazy, useState } from 'react';
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
import { useDispatch, useSelector } from 'react-redux';
const HeaderPayOrder = lazy(() => import('~/pages/PayOrder/Component/HeaderPayOrder'));
const FooterPayOrder = lazy(() => import('~/pages/PayOrder/Component/FooterPayOrder'));
import orderApi from '~/apis/orderApi.js';
import { addOrderThanhToanTienMat } from '~/redux/OrderTienMat.js';
import userApi from '~/apis/userApi.js';
import { updateUser } from '~/redux/userSlice.js';
import { Spin } from 'antd';
// PropTypes
PayMentError.propTypes = {};

function PayMentError(props) {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  // --LẤY THÔNG TIN USER ĐỂ CHUẨN BỊ CẬP NHẬT  => NẾU CHỌN LẠI THANH TOÁN TIỀN MẶT --
  const userLogin = useSelector((state) => state?.userAuth?.user);
  // console.log({ userLogin });
  // --LẤY DỮ LIỆU ĐÃ LƯU TRONG REDUX -- TẠM THỜI CỦA ĐƠN HÀNG ------
  const dataOrderPreview = useSelector((state) => state?.orderPayVNP);
  // console.log({ dataOrderPreview });
  // --------------KHI CLICK BTN THANH TOÁN LẠI --------------
  const navigate = useNavigate();

  const handleRepayment = () => {
    navigate('/payment');
  };

  //   -------------KHI CLIK THANH TOÁN BẰNG TIỀN MẶT AUTO LÀ THÀNH CÔNG ----------
  const handleClickPayMentTienMat = () => {
    setLoading(true);
    orderApi
      .addOrderDatabase(dataOrderPreview[0])
      .then((response) => {
        // console.log('thanh toán lại bằng tiền mặt VNP', response);
        // --- LẤY ID ĐƠN HÀNG ĐÓ ---- VÀ CẬP NHẬT VÀO TRONG USER ----
        const userUpdate = {
          ...userLogin,
          orders: [response?.data?._id],
        };
        // console.log('THÊM ĐƠN HÀNG MỚI THÀNH CÔNG:', response);
        dispatch(addOrderThanhToanTienMat(response?.data));

        // ---THÊM ID ĐƠN HÀNG VÀO TRONG USER ------- ĐỂ POPULATE ----
        userApi
          .updateOneUser(userUpdate)
          .then((res) => {
            // console.log('thêm ID đơn hàng vào user thành công', res);

            // --CẬP NHẬT LẠI THÔNG TIN USER TRONG REDUX--
            dispatch(updateUser(res?.data));

            setLoading(false);
            //-------- CHUYỂN ĐẾN TRANG THÔNG BÁO THANH TOÁN THÀNH CÔNG TIỀN MẶT---------- YUP
            navigate('/payment/tienmat');
          })
          .catch((err) => {
            console.log('thêm ID đơn hàng vào user thất bại', err);
            setLoading(false);
          });
      })
      .catch((err) => {
        console.log('thanh toán lại lỗi', err);
      });
  };

  return (
    <Box className={clsx(style.wrapPayError)}>
      {/* header */}
      <HeaderPayOrder />

      {/* content */}
      {/* khi đang call API để lưu thông tin thanh toán đơn hàng => hiển thị spin */}
      {loading ? (
        <Spin>
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
                    {dataOrderPreview[0]?.products?.id}
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
                    {dataOrderPreview[0]?.total_price.toLocaleString('vi-VN')} ₫
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
        </Spin>
      ) : (
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
                  {dataOrderPreview[0]?.products?.id}
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
                  {dataOrderPreview[0]?.total_price.toLocaleString('vi-VN')} ₫
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
      )}

      {/* foooter */}
      <FooterPayOrder />
    </Box>
  );
}

export default memo(PayMentError);
