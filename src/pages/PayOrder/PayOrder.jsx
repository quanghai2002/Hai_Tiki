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
import axiosClient from '~/apis/axiosClient';
import axios from 'axios';
import BackTop from '~/components/BackTop';

import DarkMode from '~/components/DarkMode';
import iconNow from '~/assets/images/iconNow.png';
import { IconCar } from '~/assets/iconSVG.jsx';
import pakageIcon from '~/assets/images/pakageIcon.png';
import paymentTienMat from '~/assets/images/paymentTienMat.png';
import paymentVNP from '~/assets/images/paymentVNP.png';
import AddressUser from './AddressUser.jsx';
import imageFreeship from '~/assets/images/imageFreeship.png';
const HeaderPayOrder = lazy(() => import('./Component/HeaderPayOrder'));
const FooterPayOrder = lazy(() => import('./Component/FooterPayOrder'));

// PropTypes
PayOrder.propTypes = {};

function PayOrder(props) {
  // -----------------------data TEST ĐỂ RENDER RA MÀ HÌNH THANH TOÁN -------------
  const dataOrder = {
    freeShip: 10000,
    sumOrderList: 699999,
    listProductCard: [
      {
        id: 1,
        image: 'https://salt.tikicdn.com/cache/280x280/ts/product/e5/55/3c/a00e836b2d4131f18c546166f7f05cb0.jpeg.webp',
        name: 'Điện thoại Realme C55 (6GB/128GB) - Hàng chính hãng -  Đen',
        priceAll: 10000,
        priceDefaults: 2000,
        sumQuantity: 5,
      },
      {
        id: 2,
        image: 'https://salt.tikicdn.com/cache/280x280/ts/product/fd/4d/66/f30dc912aa333f0b7b76f6ca28f6e409.png.webp',
        name: 'Điện thoại Xiaomi Redmi 10C (4GB/128GB)',
        priceAll: 300000,
        priceDefaults: 100000,
        sumQuantity: 3,
      },
      {
        id: 3,
        image: 'https://salt.tikicdn.com/cache/280x280/ts/product/19/84/0e/b8ba4857452cc85b7b2bcb4b3ff162f6.jpg.webp',
        name: 'Điện thoại Realme C33 (3GB/32GB) - Hàng chính hãng',
        priceAll: 60000,
        priceDefaults: 10000,
        sumQuantity: 6,
      },
    ],
  };

  // -----TỔNG TIỀN THỰC TẾ PHẢI THANH TOÁN => SAU KHI TRỪ PHÍ SHIP---------
  const sumPriceCurrent = Number.parseFloat(dataOrder?.sumOrderList) + 50000 - Number.parseFloat(dataOrder?.freeShip);
  // -----Radio => CHỌN PHƯƠNG THỨC THANH TOÁN ----------------------------------
  const [value, setValue] = useState(1);

  const onChangeRadio = (e) => {
    // console.log('radio checked', e.target.value);
    setValue(e.target.value);
  };

  // ---- ----------ĐỊA CHỈ GIAO HÀNG KHI CẬP NHẬT -------------------
  const [addressUserShip, setAddressUserShip] = useState('');
  const isAddressUser = Boolean(addressUserShip);
  // console.log('isAddressUser', isAddressUser);

  // ------------------------KHI CLICK NÚT ĐẶT HÀNG -----------------------
  const navigate = useNavigate();
  const handleSubmitAddOrder = () => {
    console.log('giá trị lựa chọn phương thức thanh toán', value);
    // --Nếu chọn phương thức thanh toán là 1 => Mặc Định => Thanh Toán Khi NHận hàng
    if (value === 1) {
      navigate('/payment/tienmat');
    }
    // Đây là 2 => Thanh Toán Bằng VNP
    else {
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
                                      <Typography className={clsx(style.text1Label)}>Khuyến mãi vận chuyển</Typography>
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
                              <Typography className={clsx(style.secondLine_text2)}>
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
                      <Typography className={clsx(style.textPayMent)} color={(theme) => theme?.palette?.text?.primary4}>
                        Thanh toán tiền mặt khi nhận hàng
                      </Typography>
                    </Box>
                  </Radio>
                  <Radio value={2}>
                    <Box className={clsx(style.wrapContent)}>
                      <img alt="icon" src={paymentVNP} className={clsx(style.icon)} />
                      <Typography className={clsx(style.textPayMent)} color={(theme) => theme?.palette?.text?.primary4}>
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
              {isAddressUser ? (
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
                      onClick={() => {
                        setAddressUserShip('');
                      }}
                    >
                      Thay đổi
                    </Typography>
                  </Box>
                  <Box className={clsx(style.col2)}>
                    <Typography
                      className={clsx(style.text, style.text1)}
                      color={(theme) => theme?.palette?.text?.primary4}
                    >
                      {addressUserShip?.nameUser}
                    </Typography>
                    <i className={clsx(style.i)}></i>
                    <Typography
                      className={clsx(style.text, style.text2)}
                      color={(theme) => theme?.palette?.text?.primary4}
                    >
                      {addressUserShip?.phoneNumber}
                    </Typography>
                  </Box>
                  <Box className={clsx(style.col3)}>
                    <Typography
                      className={clsx(style.text, style.text2)}
                      color={(theme) => theme?.palette?.text?.primary6}
                    >
                      <span className={clsx(style.text1)}>Nhà</span>
                      {addressUserShip?.diachi_cuthe},{addressUserShip?.phuongxa},{addressUserShip?.quanhuyen},
                      {addressUserShip?.thanhpho}
                    </Typography>
                  </Box>
                </Box>
              ) : (
                <AddressUser setAddressUserShip={setAddressUserShip} />
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
                  50.000₫
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
                disabled={isAddressUser === false ? true : false}
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
  );
}

export default memo(PayOrder);
