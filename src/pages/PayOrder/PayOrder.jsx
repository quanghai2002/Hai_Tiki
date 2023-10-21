import PropTypes from 'prop-types';
import style from './PayOrder.module.scss';
import clsx from 'clsx';
import { memo, useEffect, useState, lazy } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import ImageLogo from '~/assets/images/haiLoGoTiki2.png';
import { Link, useNavigate } from 'react-router-dom';
import PhoneInTalkIcon from '@mui/icons-material/PhoneInTalk';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import Divider from '@mui/material/Divider';
import { Radio, Space } from 'antd';
import Button from '@mui/material/Button';
import axios from 'axios';
import { Spin } from 'antd';

import axiosClient from '~/apis/axiosClient';
import BackTop from '~/components/BackTop';
import DarkMode from '~/components/DarkMode';
import iconNow from '~/assets/images/iconNow.png';
import { IconCar } from '~/assets/iconSVG.jsx';
import pakageIcon from '~/assets/images/pakageIcon.png';
import paymentTienMat from '~/assets/images/paymentTienMat.png';
import paymentVNP from '~/assets/images/paymentVNP.png';
import AddressUser from './AddressUser.jsx';
import imageFreeship from '~/assets/images/imageFreeship.png';
import { useDispatch, useSelector } from 'react-redux';
const HeaderPayOrder = lazy(() => import('./Component/HeaderPayOrder'));
const FooterPayOrder = lazy(() => import('./Component/FooterPayOrder'));
import orderApi from '~/apis/orderApi.js';
import userApi from '~/apis/userApi.js';
import { updateUser } from '~/redux/userSlice.js';
import { addOrderThanhToanTienMat } from '~/redux/OrderTienMat.js';
import { addOrderPayVNP } from '~/redux/OrderVNP.js';
import { updatePhoneCart } from '~/redux/GioHang.js';
// PropTypes
PayOrder.propTypes = {};

function PayOrder(props) {
  // --- Lấy các sản phẩm trong giỏ hàng lưu trong redux --
  const listCartPhone = useSelector((state) => state?.gioHang?.cartList);
  // console.log('GIỎ HÀNG:', listCartPhone);
  // ----LẤY THÔNG TIN USER ĐỂ LẤY ID USER => THÊM VÀO TRONG ĐƠN HÀNG + UPDATE USER CÓ ID ĐƠN HÀNG LUÔN ----
  const userLogin = useSelector((state) => state?.userAuth?.user);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  // -------------------LẤY DỮ LIỆU TẠM THỜI TỪ TRONG REDUX ĐỂ RENDER RA MÀN HÌNH-------------------
  // --------DỮ LIỆU NÀY CHƯA ĐƯỢC LƯU VÀO TRONG DATABASE NHÉ-----
  // -----KHI ẤN THANH TOÁN KHI NHẬN HÀNG || VNP => THÀNH CÔNG => MỚI LƯU VÀO DATABASE -----
  const dataBuyPhone = useSelector((state) => state?.orderPreview);

  const dataOrder = {
    freeShip: dataBuyPhone?.freeShip === 0 ? 10000 : dataBuyPhone?.freeShip,
    sumOrderList: dataBuyPhone?.sumOrderList,
    listProductCard: dataBuyPhone?.listProductCard?.map((item) => {
      return {
        id: item?.id,
        image: item?.image,
        name: item?.name,
        priceAll: item?.priceAll,
        priceDefaults: item?.priceDefaults,
        sumQuantity: item?.sumQuantity,
      };
    }),
  };
  // console.log('đơn hàng PREVIEW LÀ:', dataOrder);
  // -----TỔNG TIỀN THỰC TẾ PHẢI THANH TOÁN => SAU KHI TRỪ PHÍ SHIP--------- Phí Ship mặc định là 45.000
  const sumPriceCurrent = Number.parseFloat(dataOrder?.sumOrderList) + 45000 - Number.parseFloat(dataOrder?.freeShip);

  // -----Radio => CHỌN PHƯƠNG THỨC THANH TOÁN KHI ONCHANGE -Mặc Định là 1 Thanh Toán Khi Nhận Hàng----------------
  const [value, setValue] = useState(1);

  const onChangeRadio = (e) => {
    // console.log('radio checked', e.target.value);
    setValue(e.target.value);
  };

  // ---- ------------------ĐỊA CHỈ GIAO HÀNG KHI CẬP NHẬT -------------------
  // ---KIỂM TRA XEM USER ĐÃ CÓ ĐỊA CHỈ GIAO HÀNG HAY CHƯA---------------------

  const [isAddress, setIsAddress] = useState(Boolean(userLogin?.address));

  // ------------khi click THAY ĐỔI ĐỊA CHỈ GIAO HÀNG khi đã tồn tại----------
  // set lại model bằng true để hiện thị modal ra + set lại address === false để hiển thị update user
  const [isModalAddresss, setIsModalAddress] = useState(false);
  const handleChangeThayDoiDiaChiGiaoHang = () => {
    setIsModalAddress(true);
    setIsAddress(false);
  };

  // --------------------------KHI CLICK NÚT ĐẶT HÀNG TRONG TRANG THANH TOÁN -----------------------
  const navigate = useNavigate();
  const handleSubmitAddOrder = () => {
    setLoading(true);

    // --THANH TOÁN BẰNG TIỀN MẶT ---
    // --Nếu chọn phương thức thanh toán là --- 1 ---- => Mặc Định => Thanh Toán Khi NHận hàng
    if (value === 1) {
      // ---CHECK XEM NẾU LÀ THANH TOÁN CHO 1 ĐƠN HÀNG THÌ SẼ INSERT 1 ĐƠN HÀNG VÀO Database
      const isLengthCartPhone = dataOrder?.listProductCard?.length;
      console.log('số lượng sản phẩm  trong 1 đơn hàng là:', isLengthCartPhone);

      //  ---NẾU ĐƠN HÀNG CHỈ CÓ 1 SẢN PHẨM THÌ => THÊM 1 ĐƠN HÀNG BÌNH THƯỜNG ---
      if (isLengthCartPhone === 1) {
        // == NẾU ĐƠN HÀNG CÓ 1 SẢN PHẨM  => INSERT 1 SẢN PHẨM BÌNH THƯỜNG -
        // ----KHI CHỌN THANH TOÁN TIỀN MẶT THÌ LƯU LUÔN ĐƠN HÀNG VÀO DATA BASE ---
        // thông tin đơn hàng để chuẩn bị thêm vào data base
        const infoDetailsOrder = {
          status: {
            code: 1,
            state: 'Chờ xác nhận',
          },
          shipping_address: userLogin?.address,
          payment_method: 'Thanh toán khi nhận hàng',
          user: userLogin?._id,
          total_price: sumPriceCurrent,
          products: dataOrder?.listProductCard[0], // lưu 1 sản phẩm cho 1 đơn hàng => để sau xem lịch sử đơn hàng
          products2: dataOrder?.listProductCard, // lưu 1 [] để hiển thị ra màn hình trong redux thôi nhé
        };
        // ---------THÊM 1 ĐƠN HÀNG MỚI VÀO DATA BASE -------
        orderApi
          .addOrderDatabase(infoDetailsOrder)
          .then((response) => {
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
                setLoading(false);

                // --CẬP NHẬT LẠI THÔNG TIN USER TRONG REDUX--
                dispatch(updateUser(res?.data));

                //-------- CHUYỂN ĐẾN TRANG THÔNG BÁO THANH TOÁN THÀNH CÔNG---------- YUP
                navigate('/payment/tienmat');
              })
              .catch((err) => {
                console.log('thêm ID đơn hàng vào user thất bại');
                setLoading(false);
              });
            // console.log({ userUpdate });
          })
          .catch((err) => {
            console.log('thêm đơn hàng THẤT BẠI', err);
            setLoading(false);
          });
      } else {
        // --XỬ LÝ THANH TOÁN TIỀN MẶT CHO NHIỀU SẢN PHẨM TRONG 1 ĐƠN HÀNG ----
        // ---TÁCH MỖI SẢN PHẨM SẼ THÊM LÀ 1 ĐƠN HÀNG RIÊNG ---

        // --DANH SÁCH ID CÁC SẢN PHẨM ĐƯỢC CHỌN ĐỂ MUA => ĐỂ SAU ĐÓ XÓA CÁC SẢN PHẨM ĐÃ THANH TOÁN THÀNH CÔNG TRONG ĐƠN HÀNG-
        const listIdPhone = dataOrder?.listProductCard?.map((item) => {
          return item?.id;
        });

        // console.log('dách sách id các sản phẩm được chọn để mua là:', listIdPhone);

        // --DANH SÁCH CÁC ĐƠN HÀNG ĐỂ CHUẨN BỊ UPDATE LÊN DATABAE --
        const newPhoneCartMany = dataOrder?.listProductCard?.map((oneCart) => {
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

        // console.log('danh sách sản phẩm chuẩn bị cập nhật lên trên server', orders);
        orderApi
          .addOrderMany({ orders })
          .then((response) => {
            // ---KHI THANH TOÁN THÀNH CÔNG XÓA CÁC SẢN PHẨM ĐÃ THANH TOÁN ĐÓ TRONG GIỎ HÀNG REDUX ĐI --
            const newCartBuyPhone = listCartPhone?.filter((item) => {
              return !listIdPhone?.includes(item?._id);
            });

            // console.log('danh sách GIỎ HÀNG SAU KHI THANH TOÁN LÀ:', newCartBuyPhone);
            dispatch(updatePhoneCart(newCartBuyPhone));

            // THÊM ĐƠN HÀNG ĐỂ LƯU TRONG REDUX ĐỂ HIỂN THỊ RA MÀN HÌNH TRONG CHỖ THANH TOÁN TIỀN MẶT ---
            const listOrderCartThanhToanTienMat = {
              total_price: dataOrder?.sumOrderList,
              payment_method: 'Thanh toán khi nhận hàng',
              _id: listIdPhone[0],
              products2: dataOrder?.listProductCard,
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
    }

    // --THAH TOÁN VNP --
    // Đây là -- 2 --- => Thanh Toán Bằng VNP ----
    else {
      // thông tin đơn hàng khi thanh toán bằng VNP ---
      const infoDetailsOrder = {
        status: {
          code: 1,
          state: 'Chờ xác nhận',
        },
        shipping_address: userLogin?.address,
        payment_method: 'Thanh toán qua VNP',
        user: userLogin?._id,
        total_price: sumPriceCurrent,
        products: dataOrder?.listProductCard[0], // lưu cái này để sau lấy tất cả các đơn hàng => môi đơn hàng 1 sản phẩm => lịch sử mua hàng
        products2: dataOrder?.listProductCard, // lưu cái này để render ra màn hình thanh toán thành công
      };
      // Lưu thông tin tạm thời của đơn hàng VNP vào trong redux
      dispatch(addOrderPayVNP(infoDetailsOrder));

      //  ---chuyển đến trang thanh toán VNP => Chuyền tổng giá trị cần thanh toán cho đơn hàng vào ---
      axiosClient
        .post('/payment/create_payment_url', {
          amount: sumPriceCurrent,
        })
        .then((res) => {
          console.log('thanh công', res);
          window.location.href = res?.urlRedirect;
        })
        .catch((err) => {
          console.log('thất bại', err);
        });
    }
  };

  return (
    // Khi đang API thêm đơn hàng và cập nhật ID vào trong User thì => hiển thị Loading
    loading ? (
      <Spin>
        <Box className={clsx(style.wrapPayOrder)}>
          {/* Header */}
          <HeaderPayOrder />

          {/* Content PayMents */}
          <Box className={clsx(style.contents)}>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, lg: 2 }}>
              <Grid lg={8.8} rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 2, lg: 2 }}>
                {/* danh sách các sản phẩm có => map qua để  */}
                <Box className={clsx(style.wrapContent_PayMent_Info)}>
                  {dataOrder?.listProductCard?.map((item, index) => {
                    return (
                      <Box className={clsx(style.wrapContent1)} key={item?.id}>
                        <Box className={clsx(style.BoxAll)}>
                          {/* box 1 */}
                          <Box className={clsx(style.box1)}>
                            <Box className={clsx(style.packageShipping)}>
                              <Box className={clsx(style.leftContent)}>
                                <Box className={clsx(style.headerLeft1)}>
                                  <Box className={clsx(style.header1)}>
                                    <img src={iconNow} alt="icon now" className={clsx(style.img)} />
                                    <Typography
                                      className={clsx(style.text)}
                                      color={(theme) => theme?.palette?.text?.primary4}
                                    >
                                      Giao siêu tốc 3h
                                    </Typography>
                                  </Box>
                                  <Box className={clsx(style.header2)}>
                                    <Typography
                                      className={clsx(style.text1)}
                                      color={(theme) => theme?.palette?.text?.primary6}
                                    >
                                      45.000 ₫
                                    </Typography>
                                    <Typography
                                      className={clsx(style.text2)}
                                      color={(theme) => theme?.palette?.text?.primary4}
                                    >
                                      {Number.parseFloat(45000 - Number.parseFloat(dataOrder?.freeShip)).toLocaleString(
                                        'vn-VN',
                                      )}{' '}
                                      ₫
                                    </Typography>
                                    <Box className={clsx(style.wrapIcon)}>
                                      <InfoOutlinedIcon
                                        className={clsx(style.iconInfo)}
                                        sx={{
                                          color: (theme) => theme?.palette?.text?.primary6,
                                        }}
                                      />
                                      {/* hover */}
                                      <Box className={clsx(style.hover)}>
                                        <Box className={clsx(style.label1)}>
                                          <Typography className={clsx(style.text1Label)}>Phí ban đầu</Typography>
                                          <Typography className={clsx(style.text2Label)}>45.000 ₫</Typography>
                                        </Box>
                                        <Box className={clsx(style.label1)}>
                                          <Typography className={clsx(style.text1Label)}>
                                            Khuyến mãi vận chuyển
                                          </Typography>
                                          <Typography className={clsx(style.text2Label)}>
                                            - {dataOrder?.freeShip?.toLocaleString('vn-VN')} ₫
                                          </Typography>
                                        </Box>
                                        <Divider className={clsx(style.divider)} />
                                        <Box className={clsx(style.label1)}>
                                          <Typography className={clsx(style.text1Label, style.textActive)}>
                                            Phí còn lại
                                          </Typography>
                                          <Typography className={clsx(style.text2Label, style.textActive)}>
                                            {Number.parseFloat(
                                              45000 - Number.parseFloat(dataOrder?.freeShip),
                                            ).toLocaleString('vn-VN')}
                                            ₫
                                          </Typography>
                                        </Box>
                                      </Box>
                                    </Box>
                                  </Box>
                                </Box>
                              </Box>
                            </Box>
                            {/* content */}
                            <Box className={clsx(style.infoPhone)}>
                              <img src={item?.image} alt="anh" className={clsx(style.img)} />
                              <Box className={clsx(style.infoContent)}>
                                <Typography
                                  className={clsx(style.firstLine)}
                                  color={(theme) => theme?.palette?.text?.primary6}
                                >
                                  {item?.name}
                                </Typography>
                                <Box className={clsx(style.secondLine)}>
                                  <Typography
                                    className={clsx(style.secondLine_text1)}
                                    color={(theme) => theme?.palette?.text?.primary6}
                                  >
                                    SL: x{item?.sumQuantity}
                                  </Typography>
                                  <Typography
                                    className={clsx(style.secondLine_text2)}
                                    color={(theme) => theme?.palette?.text?.primary6}
                                  >
                                    {item?.priceAll?.toLocaleString('vn-VN')} ₫
                                  </Typography>
                                </Box>
                              </Box>
                            </Box>
                          </Box>

                          {/* Box 2 */}
                          <Box>
                            <Box className={clsx(style.box2)}>
                              <IconCar className={clsx(style.iconCarOto)} />
                              <Typography
                                className={clsx(style.text)}
                                color={(theme) => theme?.palette?.text?.primary6}
                              >
                                Được giao bởi TikiNOW Smart Logistics (giao từ Hà Nội)
                              </Typography>
                            </Box>
                          </Box>

                          {/* Pakage Title */}
                          <Box className={clsx(style.wrapPakageTitle)}>
                            <img src={pakageIcon} alt="icon pakage" className={clsx(style.iconImage)} />
                            <Typography className={clsx(style.text)}>Gói {index + 1}:Giao siêu tốc 3h</Typography>
                          </Box>
                        </Box>
                      </Box>
                    );
                  })}
                </Box>
                {/* Chọn Phương thức thanh toán */}
                <Box className={clsx(style.paymentMethod)}>
                  <Typography className={clsx(style.labelPayments)} color={(theme) => theme?.palette?.text?.primary4}>
                    Chọn hình thức thanh toán
                  </Typography>
                  <Radio.Group onChange={onChangeRadio} value={value} buttonStyle="outline">
                    <Space direction="vertical">
                      <Radio value={1} className={clsx(style.radio)}>
                        <Box className={clsx(style.wrapContent)}>
                          <img alt="icon" src={paymentTienMat} className={clsx(style.icon)} />
                          <Typography
                            className={clsx(style.textPayMent)}
                            color={(theme) => theme?.palette?.text?.primary4}
                          >
                            Thanh toán tiền mặt khi nhận hàng
                          </Typography>
                        </Box>
                      </Radio>
                      <Radio value={2}>
                        <Box className={clsx(style.wrapContent)}>
                          <img alt="icon" src={paymentVNP} className={clsx(style.icon)} />
                          <Typography
                            className={clsx(style.textPayMent)}
                            color={(theme) => theme?.palette?.text?.primary4}
                          >
                            Thanh toán bằng VNPAY
                          </Typography>
                        </Box>
                      </Radio>
                    </Space>
                  </Radio.Group>
                </Box>
              </Grid>

              {/* grid phần 2 */}
              <Grid lg={3.2} rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 2, lg: 2 }}>
                {/* Địa chỉ giao hàng */}
                <Box className={clsx(style.actionAddress)}>
                  {/* nếu đã có địa chỉ giao hàng => hiển thị ĐỊA CHỈ GIAO HÀNG ra màn hình */}
                  {isAddress ? (
                    <Box className={clsx(style.wrapAddressCard)}>
                      <Box className={clsx(style.col1)}>
                        <Typography
                          className={clsx(style.text, style.text1)}
                          color={(theme) => theme?.palette?.text?.primary6}
                        >
                          Giao tới
                        </Typography>
                        <Typography
                          className={clsx(style.text, style.text2)}
                          onClick={handleChangeThayDoiDiaChiGiaoHang}
                        >
                          Thay đổi
                        </Typography>
                      </Box>
                      <Box className={clsx(style.col2)}>
                        <Typography
                          className={clsx(style.text, style.text1)}
                          color={(theme) => theme?.palette?.text?.primary4}
                        >
                          {userLogin?.username}
                        </Typography>
                        <i className={clsx(style.i)}></i>
                        <Typography
                          className={clsx(style.text, style.text2)}
                          color={(theme) => theme?.palette?.text?.primary4}
                        >
                          {userLogin?.phoneNumber}
                        </Typography>
                      </Box>
                      <Box className={clsx(style.col3)}>
                        <Typography
                          className={clsx(style.text, style.text2)}
                          color={(theme) => theme?.palette?.text?.primary6}
                        >
                          <span className={clsx(style.text1)}>Nhà</span>
                          {userLogin?.address?.Địa_chỉ},{userLogin?.address?.Phường_Xã},{userLogin?.address?.Quận_Huyện}
                          ,{userLogin?.address?.Tỉnh_Thành_phố}
                        </Typography>
                      </Box>
                    </Box>
                  ) : (
                    // nếu chưa có địa chỉ giao hàng => cho chọn địa chỉ giao hàng => và lưu địa chỉ giao hàng lại trong server
                    <AddressUser isModalAddresss={isModalAddresss} setIsAddress={setIsAddress} />
                  )}
                </Box>

                {/* Nút đặt hàng => BTN đặt hàng */}
                <Box className={clsx(style.wrapBtnOrder)}>
                  <Typography className={clsx(style.textOrder)} color={(theme) => theme?.palette?.text?.primary4}>
                    Đơn hàng
                  </Typography>
                  <Divider
                    className={clsx(style.divider)}
                    sx={{
                      borderColor: (theme) => theme?.palette?.text?.primary6,
                    }}
                  />
                  <Box className={clsx(style.orderText)}>
                    <Typography className={clsx(style.text_order1)} color={(theme) => theme?.palette?.text?.primary6}>
                      Tạm tính
                    </Typography>
                    <Typography className={clsx(style.text_order2)} color={(theme) => theme?.palette?.text?.primary4}>
                      {dataOrder?.sumOrderList.toLocaleString('vn-VN')}₫
                    </Typography>
                  </Box>
                  <Box className={clsx(style.orderText)}>
                    <Typography className={clsx(style.text_order1)} color={(theme) => theme?.palette?.text?.primary6}>
                      Phí vận chuyển
                    </Typography>
                    <Typography className={clsx(style.text_order2)} color={(theme) => theme?.palette?.text?.primary4}>
                      45.000₫
                    </Typography>
                  </Box>
                  <Box className={clsx(style.orderText)}>
                    <Typography className={clsx(style.text_order1)} color={(theme) => theme?.palette?.text?.primary6}>
                      Khuyến mãi vận chuyển
                    </Typography>
                    <Typography
                      className={clsx(style.text_order2)}
                      sx={{
                        color: 'rgb(0, 171, 86)',
                      }}
                    >
                      -{dataOrder?.freeShip.toLocaleString('vn-VN')}₫
                    </Typography>
                  </Box>
                  <Divider
                    className={clsx(style.divider)}
                    sx={{
                      borderColor: (theme) => theme?.palette?.text?.primary6,
                    }}
                  />
                  <Box className={clsx(style.sumPrice)}>
                    <Typography className={clsx(style.sumPriceText)} color={(theme) => theme?.palette?.text?.primary4}>
                      Tổng tiền
                    </Typography>
                    <Box className={clsx(style.sumPriceNumber)}>
                      <Typography className={clsx(style.labelSumNumber)} textAlign="right">
                        {sumPriceCurrent.toLocaleString('vn-VN')} ₫
                      </Typography>
                      <Typography className={clsx(style.vatNumber)} color={(theme) => theme?.palette?.text?.primary6}>
                        (Đã bao gồm VAT nếu có)
                      </Typography>
                    </Box>
                  </Box>

                  <Box className={clsx(style.wrapFreeShip)}>
                    <img src={imageFreeship} alt="icon freeship" className={clsx(style.img)} />
                    <Typography className={clsx(style.text)} color={(theme) => theme?.palette?.text?.primary4}>
                      đã được áp dụng!
                    </Typography>
                  </Box>

                  <Button
                    variant="contained"
                    className={clsx(style.btnBuyOrder)}
                    color="secondary"
                    onClick={handleSubmitAddOrder}
                    disabled={isAddress === false ? true : false}
                  >
                    Đặt hàng
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Box>

          {/* Footer PayOrder */}
          <FooterPayOrder />
          {/* Back top */}
          <BackTop />
        </Box>
      </Spin>
    ) : (
      // Khi bình thường thì hiển thị Bình Thường
      <Box className={clsx(style.wrapPayOrder)}>
        {/* Header */}
        <HeaderPayOrder />

        {/* Content PayMents */}
        <Box className={clsx(style.contents)}>
          <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, lg: 2 }}>
            <Grid lg={8.8} rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 2, lg: 2 }}>
              {/* danh sách các sản phẩm có => map qua để  */}
              <Box className={clsx(style.wrapContent_PayMent_Info)}>
                {dataOrder?.listProductCard?.map((item, index) => {
                  return (
                    <Box className={clsx(style.wrapContent1)} key={item?.id}>
                      <Box className={clsx(style.BoxAll)}>
                        {/* box 1 */}
                        <Box className={clsx(style.box1)}>
                          <Box className={clsx(style.packageShipping)}>
                            <Box className={clsx(style.leftContent)}>
                              <Box className={clsx(style.headerLeft1)}>
                                <Box className={clsx(style.header1)}>
                                  <img src={iconNow} alt="icon now" className={clsx(style.img)} />
                                  <Typography
                                    className={clsx(style.text)}
                                    color={(theme) => theme?.palette?.text?.primary4}
                                  >
                                    Giao siêu tốc 3h
                                  </Typography>
                                </Box>
                                <Box className={clsx(style.header2)}>
                                  <Typography
                                    className={clsx(style.text1)}
                                    color={(theme) => theme?.palette?.text?.primary6}
                                  >
                                    45.000 ₫
                                  </Typography>
                                  <Typography
                                    className={clsx(style.text2)}
                                    color={(theme) => theme?.palette?.text?.primary4}
                                  >
                                    {Number.parseFloat(45000 - Number.parseFloat(dataOrder?.freeShip)).toLocaleString(
                                      'vn-VN',
                                    )}{' '}
                                    ₫
                                  </Typography>
                                  <Box className={clsx(style.wrapIcon)}>
                                    <InfoOutlinedIcon
                                      className={clsx(style.iconInfo)}
                                      sx={{
                                        color: (theme) => theme?.palette?.text?.primary6,
                                      }}
                                    />
                                    {/* hover */}
                                    <Box className={clsx(style.hover)}>
                                      <Box className={clsx(style.label1)}>
                                        <Typography className={clsx(style.text1Label)}>Phí ban đầu</Typography>
                                        <Typography className={clsx(style.text2Label)}>45.000 ₫</Typography>
                                      </Box>
                                      <Box className={clsx(style.label1)}>
                                        <Typography className={clsx(style.text1Label)}>
                                          Khuyến mãi vận chuyển
                                        </Typography>
                                        <Typography className={clsx(style.text2Label)}>
                                          - {dataOrder?.freeShip?.toLocaleString('vn-VN')} ₫
                                        </Typography>
                                      </Box>
                                      <Divider className={clsx(style.divider)} />
                                      <Box className={clsx(style.label1)}>
                                        <Typography className={clsx(style.text1Label, style.textActive)}>
                                          Phí còn lại
                                        </Typography>
                                        <Typography className={clsx(style.text2Label, style.textActive)}>
                                          {Number.parseFloat(
                                            45000 - Number.parseFloat(dataOrder?.freeShip),
                                          ).toLocaleString('vn-VN')}
                                          ₫
                                        </Typography>
                                      </Box>
                                    </Box>
                                  </Box>
                                </Box>
                              </Box>
                            </Box>
                          </Box>
                          {/* content */}
                          <Box className={clsx(style.infoPhone)}>
                            <img src={item?.image} alt="anh" className={clsx(style.img)} />
                            <Box className={clsx(style.infoContent)}>
                              <Typography
                                className={clsx(style.firstLine)}
                                color={(theme) => theme?.palette?.text?.primary6}
                              >
                                {item?.name}
                              </Typography>
                              <Box className={clsx(style.secondLine)}>
                                <Typography
                                  className={clsx(style.secondLine_text1)}
                                  color={(theme) => theme?.palette?.text?.primary6}
                                >
                                  SL: x{item?.sumQuantity}
                                </Typography>
                                <Typography
                                  className={clsx(style.secondLine_text2)}
                                  color={(theme) => theme?.palette?.text?.primary6}
                                >
                                  {item?.priceAll?.toLocaleString('vn-VN')} ₫
                                </Typography>
                              </Box>
                            </Box>
                          </Box>
                        </Box>

                        {/* Box 2 */}
                        <Box>
                          <Box className={clsx(style.box2)}>
                            <IconCar className={clsx(style.iconCarOto)} />
                            <Typography className={clsx(style.text)} color={(theme) => theme?.palette?.text?.primary6}>
                              Được giao bởi TikiNOW Smart Logistics (giao từ Hà Nội)
                            </Typography>
                          </Box>
                        </Box>

                        {/* Pakage Title */}
                        <Box className={clsx(style.wrapPakageTitle)}>
                          <img src={pakageIcon} alt="icon pakage" className={clsx(style.iconImage)} />
                          <Typography className={clsx(style.text)}>Gói {index + 1}:Giao siêu tốc 3h</Typography>
                        </Box>
                      </Box>
                    </Box>
                  );
                })}
              </Box>
              {/* Chọn Phương thức thanh toán */}
              <Box className={clsx(style.paymentMethod)}>
                <Typography className={clsx(style.labelPayments)} color={(theme) => theme?.palette?.text?.primary4}>
                  Chọn hình thức thanh toán
                </Typography>
                <Radio.Group onChange={onChangeRadio} value={value} buttonStyle="outline">
                  <Space direction="vertical">
                    <Radio value={1} className={clsx(style.radio)}>
                      <Box className={clsx(style.wrapContent)}>
                        <img alt="icon" src={paymentTienMat} className={clsx(style.icon)} />
                        <Typography
                          className={clsx(style.textPayMent)}
                          color={(theme) => theme?.palette?.text?.primary4}
                        >
                          Thanh toán tiền mặt khi nhận hàng
                        </Typography>
                      </Box>
                    </Radio>
                    <Radio value={2}>
                      <Box className={clsx(style.wrapContent)}>
                        <img alt="icon" src={paymentVNP} className={clsx(style.icon)} />
                        <Typography
                          className={clsx(style.textPayMent)}
                          color={(theme) => theme?.palette?.text?.primary4}
                        >
                          Thanh toán bằng VNPAY
                        </Typography>
                      </Box>
                    </Radio>
                  </Space>
                </Radio.Group>
              </Box>
            </Grid>

            {/* grid phần 2 */}
            <Grid lg={3.2} rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 2, lg: 2 }}>
              {/* Địa chỉ giao hàng */}
              <Box className={clsx(style.actionAddress)}>
                {/* nếu đã có địa chỉ giao hàng => hiển thị ĐỊA CHỈ GIAO HÀNG ra màn hình */}
                {isAddress ? (
                  <Box className={clsx(style.wrapAddressCard)}>
                    <Box className={clsx(style.col1)}>
                      <Typography
                        className={clsx(style.text, style.text1)}
                        color={(theme) => theme?.palette?.text?.primary6}
                      >
                        Giao tới
                      </Typography>
                      <Typography className={clsx(style.text, style.text2)} onClick={handleChangeThayDoiDiaChiGiaoHang}>
                        Thay đổi
                      </Typography>
                    </Box>
                    <Box className={clsx(style.col2)}>
                      <Typography
                        className={clsx(style.text, style.text1)}
                        color={(theme) => theme?.palette?.text?.primary4}
                      >
                        {userLogin?.username}
                      </Typography>
                      <i className={clsx(style.i)}></i>
                      <Typography
                        className={clsx(style.text, style.text2)}
                        color={(theme) => theme?.palette?.text?.primary4}
                      >
                        {userLogin?.phoneNumber}
                      </Typography>
                    </Box>
                    <Box className={clsx(style.col3)}>
                      <Typography
                        className={clsx(style.text, style.text2)}
                        color={(theme) => theme?.palette?.text?.primary6}
                      >
                        <span className={clsx(style.text1)}>Nhà</span>
                        {userLogin?.address?.Địa_chỉ},{userLogin?.address?.Phường_Xã},{userLogin?.address?.Quận_Huyện},
                        {userLogin?.address?.Tỉnh_Thành_phố}
                      </Typography>
                    </Box>
                  </Box>
                ) : (
                  // nếu chưa có địa chỉ giao hàng => cho chọn địa chỉ giao hàng => và lưu địa chỉ giao hàng lại trong server
                  <AddressUser isModalAddresss={isModalAddresss} setIsAddress={setIsAddress} />
                )}
              </Box>

              {/* Nút đặt hàng => BTN đặt hàng */}
              <Box className={clsx(style.wrapBtnOrder)}>
                <Typography className={clsx(style.textOrder)} color={(theme) => theme?.palette?.text?.primary4}>
                  Đơn hàng
                </Typography>
                <Divider
                  className={clsx(style.divider)}
                  sx={{
                    borderColor: (theme) => theme?.palette?.text?.primary6,
                  }}
                />
                <Box className={clsx(style.orderText)}>
                  <Typography className={clsx(style.text_order1)} color={(theme) => theme?.palette?.text?.primary6}>
                    Tạm tính
                  </Typography>
                  <Typography className={clsx(style.text_order2)} color={(theme) => theme?.palette?.text?.primary4}>
                    {dataOrder?.sumOrderList.toLocaleString('vn-VN')}₫
                  </Typography>
                </Box>
                <Box className={clsx(style.orderText)}>
                  <Typography className={clsx(style.text_order1)} color={(theme) => theme?.palette?.text?.primary6}>
                    Phí vận chuyển
                  </Typography>
                  <Typography className={clsx(style.text_order2)} color={(theme) => theme?.palette?.text?.primary4}>
                    45.000₫
                  </Typography>
                </Box>
                <Box className={clsx(style.orderText)}>
                  <Typography className={clsx(style.text_order1)} color={(theme) => theme?.palette?.text?.primary6}>
                    Khuyến mãi vận chuyển
                  </Typography>
                  <Typography
                    className={clsx(style.text_order2)}
                    sx={{
                      color: 'rgb(0, 171, 86)',
                    }}
                  >
                    -{dataOrder?.freeShip.toLocaleString('vn-VN')}₫
                  </Typography>
                </Box>
                <Divider
                  className={clsx(style.divider)}
                  sx={{
                    borderColor: (theme) => theme?.palette?.text?.primary6,
                  }}
                />
                <Box className={clsx(style.sumPrice)}>
                  <Typography className={clsx(style.sumPriceText)} color={(theme) => theme?.palette?.text?.primary4}>
                    Tổng tiền
                  </Typography>
                  <Box className={clsx(style.sumPriceNumber)}>
                    <Typography className={clsx(style.labelSumNumber)} textAlign="right">
                      {sumPriceCurrent.toLocaleString('vn-VN')} ₫
                    </Typography>
                    <Typography className={clsx(style.vatNumber)} color={(theme) => theme?.palette?.text?.primary6}>
                      (Đã bao gồm VAT nếu có)
                    </Typography>
                  </Box>
                </Box>

                <Box className={clsx(style.wrapFreeShip)}>
                  <img src={imageFreeship} alt="icon freeship" className={clsx(style.img)} />
                  <Typography className={clsx(style.text)} color={(theme) => theme?.palette?.text?.primary4}>
                    đã được áp dụng!
                  </Typography>
                </Box>

                <Button
                  variant="contained"
                  className={clsx(style.btnBuyOrder)}
                  color="secondary"
                  onClick={handleSubmitAddOrder}
                  disabled={isAddress === false ? true : false}
                >
                  Đặt hàng
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>

        {/* Footer PayOrder */}
        <FooterPayOrder />
        {/* Back top */}
        <BackTop />
      </Box>
    )
  );
}

export default memo(PayOrder);
