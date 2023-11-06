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
import { updatePhoneCart } from '~/redux/GioHang.js';
// PropTypes
PayMentError.propTypes = {};

function PayMentError(props) {
  // --- Lấy các sản phẩm trong giỏ hàng lưu trong redux --
  const listCartPhone = useSelector((state) => state?.gioHang?.cartList);

  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  // --LẤY THÔNG TIN USER ĐỂ CHUẨN BỊ CẬP NHẬT  => NẾU CHỌN LẠI THANH TOÁN TIỀN MẶT --
  const userLogin = useSelector((state) => state?.userAuth?.user);
  // console.log({ userLogin });
  // --LẤY DỮ LIỆU ĐÃ LƯU TRONG REDUX -- TẠM THỜI CỦA ĐƠN HÀNG ------
  const dataOrderPreview = useSelector((state) => state?.orderPayVNP);
  // console.log('thông tin thanh toán VNP THẤT BẠI', dataOrderPreview);

  // --------------KHI CLICK BTN THANH TOÁN LẠI --------------
  const navigate = useNavigate();
  const handleRepayment = () => {
    navigate('/payment');
  };

  // số lượng sản phẩm trong 1 đơn hàng để xem thanh toán lại bằng tiền mặt như thế nào.
  const lengthPayThanhToanLai = dataOrderPreview?.products2?.length;
  // console.log('số lượng sản phẩm để thanh toán lại VNP:', lengthPayThanhToanLai);

  //   -------------KHI CLIK THANH TOÁN BẰNG TIỀN MẶT AUTO LÀ THÀNH CÔNG ----------
  const handleClickPayMentTienMat = () => {
    // -- nếu là 1 đơn hàng thì sẽ thêm thông tin thanh toán lại như thế này
    setLoading(true);

    if (lengthPayThanhToanLai === 1) {
      // console.log('thanh toán lại bằng KHI CÓ 1 SẢN PHẨM');
      // --DỮ LIỆU CHUẨN BỊ ĐỂ THÊM MỚI 1 ĐƠN HÀNG => sửa thanh toán VNP = Tiền mặt
      const newDataOrderPreview = {
        ...dataOrderPreview,
        payment_method: 'Thanh toán khi nhận hàng',
      };
      orderApi
        .addOrderDatabase(newDataOrderPreview)
        .then((response) => {
          // console.log('thanh toán lại bằng tiền mặt VNP', response);
          // --- LẤY ID ĐƠN HÀNG ĐÓ ---- VÀ CẬP NHẬT VÀO TRONG USER ----
          const userUpdate = {
            ...userLogin,
            orders: [response?.data?._id],
          };
          // console.log('THANH TOÁN LẠI ĐƠN HÀNG BẰNG TIỀN MẶT THÀNH CÔNG:', response);
          dispatch(addOrderThanhToanTienMat(response?.data));

          // ---THÊM ID ĐƠN HÀNG VÀO TRONG USER ------- ĐỂ POPULATE ----
          userApi
            .updateOneUser(userUpdate)
            .then((res) => {
              // console.log('thêm ID đơn hàng vào user thành công', res);

              // --CẬP NHẬT LẠI THÔNG TIN USER TRONG REDUX--
              dispatch(updateUser(res?.data));

              // --XÓA 1 ĐƠN HÀNG NẾU ĐƠN HÀNG ĐÓ CÓ TỒN TẠI TRONG GIỎ HÀNG CŨ
              // --NẾU THANH TOÁN 1 SẢN PHẨM --
              // --TÌM SẢN PHẨM ĐÓ TRONG REDUX XEM CÓ TRONG ĐƠN HÀNG CHƯA => NẾU CÓ SAU KHI THANH TOÁN THÌ XÓA ĐI --
              const idDelePhone = dataOrderPreview?.products?.id;
              // console.log('ID đơn hàng cần xóa là:', idDelePhone);

              const cartUpdate = listCartPhone?.filter((item) => {
                return item?._id !== idDelePhone;
              });
              // console.log('danh sách giỏ hàng cũ:', listCartPhone);
              // console.log('danh sách giỏ hàng hiện tại là:', cartUpdate);
              dispatch(updatePhoneCart(cartUpdate));

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
    } else {
      // ĐÂY LÀ THANH TOÁN LẠI VNP CHO NHIỀU SẢN PHẨM
      console.log('đây là thanh toán lại VNP cho nhiều đơn hàng');

      // -- DANH SÁCH SẢN PHẨM ĐỂ CHUẨN BỊ THANH TOÁN LẠI BẰNG TIỀN MẶT
      const newPhoneCartMany = dataOrderPreview?.products2?.map((oneCart) => {
        return {
          status: {
            code: 1,
            state: 'Chờ xác nhận',
          },
          total_price: oneCart?.priceAll,
          shipping_address: userLogin?.address,
          payment_method: 'Thanh toán khi nhận hàng',
          user: userLogin?._id,
          products: oneCart,
        };
      });

      // -- THÊM NHIỀU ĐƠN HÀNG CÙNG 1 LÚC =>MỖI ĐƠN HÀNG LÀ 1 SẢN PHẨM -> UPDATE LÊN DATABASSE
      const orders = newPhoneCartMany;

      // console.log('danh sách chuẩn bị thanh toán lại là:', orders);

      // --CẬP NHẬT THÔNG TIN ĐƠN HÀNG LÊN DATABASE Khi yêu cầu Thanh Toán Lại
      orderApi
        .addOrderMany({ orders })
        .then((response) => {
          // --DANH SÁCH ID CÁC SẢN PHẨM ĐƯỢC CHỌN ĐỂ MUA => ĐỂ SAU ĐÓ XÓA CÁC SẢN PHẨM ĐÃ THANH TOÁN THÀNH CÔNG TRONG ĐƠN HÀNG-
          const listIdPhone = dataOrderPreview?.products2?.map((item) => {
            return item?.id;
          });

          // ---KHI THANH TOÁN THÀNH CÔNG XÓA CÁC SẢN PHẨM ĐÃ THANH TOÁN ĐÓ TRONG GIỎ HÀNG REDUX ĐI --
          const newCartBuyPhone = listCartPhone?.filter((item) => {
            return !listIdPhone?.includes(item?._id);
          });

          dispatch(updatePhoneCart(newCartBuyPhone));

          // THÊM ĐƠN HÀNG ĐỂ LƯU TRONG REDUX ĐỂ HIỂN THỊ RA MÀN HÌNH TRONG CHỖ THANH TOÁN TIỀN MẶT ---
          const listOrderCartThanhToanTienMat = {
            total_price: dataOrderPreview?.total_price,
            payment_method: 'Thanh toán khi nhận hàng',
            _id: dataOrderPreview?.products2[0]?.id,
            products2: dataOrderPreview?.products2,
          };

          // console.log('ĐƠN HÀNG ĐỂ HIỂN THỊ RA MÀN HÌNH THANH TOÁN THÀNH CÔNG LÀ:', listOrderCartThanhToanTienMat);
          dispatch(addOrderThanhToanTienMat(listOrderCartThanhToanTienMat));

          //  lấy ID CÁC ĐƠN HÀNG VỪA ĐƯỢC THÊM => ĐỂ CẬP NHẬT VÀO TRONG USER NHÉ ---
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
              // console.log('thêm ID đơn hàng vào user thành công', res);
              setLoading(false);
              // --CẬP NHẬT LẠI THÔNG TIN USER TRONG REDUX--
              dispatch(updateUser(res?.data));

              //-------- CHUYỂN ĐẾN TRANG THÔNG BÁO THANH TOÁN TIỀN MẶT THÀNH CÔNG---------- YUP
              navigate('/payment/tienmat');
            })
            .catch((err) => {
              console.log('thêm ID đơn hàng vào user thất bại');
              setLoading(false);
            });
        })
        .catch((err) => {
          console.log('thêm mới nhiều đơn hàng thất bại:', err);
          setLoading(false);
        });
    }
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
                    {dataOrderPreview?.products2[0].id}
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
                    {dataOrderPreview?.total_price.toLocaleString('vi-VN')} ₫
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
                  {dataOrderPreview?.products2[0]?.id}
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
                  {dataOrderPreview?.total_price.toLocaleString('vi-VN')} ₫
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
