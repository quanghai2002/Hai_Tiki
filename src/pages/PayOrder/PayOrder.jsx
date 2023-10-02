import PropTypes from 'prop-types';
import style from './PayOrder.module.scss';
import clsx from 'clsx';
import { memo, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import ImageLogo from '~/assets/images/haiLoGoTiki2.png';
import { Link } from 'react-router-dom';
import PhoneInTalkIcon from '@mui/icons-material/PhoneInTalk';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import Divider from '@mui/material/Divider';
import { Radio, Space } from 'antd';
import Button from '@mui/material/Button';

import DarkMode from '~/components/DarkMode';
import iconNow from '~/assets/images/iconNow.png';
import { IconCar } from '~/assets/iconSVG.jsx';
import pakageIcon from '~/assets/images/pakageIcon.png';
import paymentTienMat from '~/assets/images/paymentTienMat.png';
import paymentMoMo from '~/assets/images/paymentMoMo.jpg';
import AddressUser from './AddressUser.jsx';
import imageFreeship from '~/assets/images/imageFreeship.png';

// PropTypes
PayOrder.propTypes = {};

function PayOrder(props) {
  // -----Radio => CHỌN PHƯƠNG THỨC THANH TOÁN ----------------------------------
  const [value, setValue] = useState(1);
  const onChangeRadio = (e) => {
    console.log('radio checked', e.target.value);
    setValue(e.target.value);
  };

  // ---- ----------ĐỊA CHỈ GIAO HÀNG KHI CẬP NHẬT -------------------
  const [addressUserShip, setAddressUserShip] = useState('');
  const isAddressUser = Boolean(addressUserShip);
  return (
    <Box className={clsx(style.wrapPayOrder)}>
      {/* Header */}
      <Box
        className={clsx(style.header)}
        sx={{
          backgroundColor: (theme) => theme?.palette?.background?.header,
        }}
      >
        <Box className={clsx(style.contentHeader)}>
          <Box className={clsx(style.wrapLogo)}>
            <Link to="/" className={clsx(style.linkLogo)}>
              <img src={ImageLogo} alt="anh logo" className={clsx(style.img)} />
            </Link>

            <Box className={clsx(style.divider)}></Box>
            <Typography className={clsx(style.title)}>Thanh toán</Typography>
          </Box>

          <Box className={clsx(style.hotline)}>
            <DarkMode />
            <Box className={clsx(style.divider)}></Box>
            <a href="tel:0968107500">
              <Box className={clsx(style.contentHotline)}>
                <Box
                  className={clsx(style.wrapIconPhone)}
                  sx={{
                    backgroundColor: (theme) => theme?.palette?.text?.primary11,
                  }}
                >
                  <PhoneInTalkIcon className={clsx(style.iconPhone)} />
                </Box>
                <Box className={clsx(style.text)}>
                  <Typography className={clsx(style.number)} color={(theme) => theme?.palette?.text?.primary7}>
                    0968.107.500
                  </Typography>

                  <Typography className={clsx(style.textTime)} color={(theme) => theme?.palette?.text?.primary6}>
                    8h - 21h, cả T7 & CN
                  </Typography>
                </Box>
              </Box>
            </a>
          </Box>
        </Box>
      </Box>

      {/* Content PayMents */}
      <Box className={clsx(style.contents)}>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, lg: 2 }}>
          <Grid lg={8.8} rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 2, lg: 2 }}>
            <Box className={clsx(style.wrapContent_PayMent_Info)}>
              <Box className={clsx(style.wrapContent1)}>
                <Box className={clsx(style.BoxAll)}>
                  <Box className={clsx(style.box1)}>
                    <Box className={clsx(style.packageShipping)}>
                      <Box className={clsx(style.leftContent)}>
                        <Box className={clsx(style.headerLeft1)}>
                          <Box className={clsx(style.header1)}>
                            <img src={iconNow} alt="icon now" className={clsx(style.img)} />
                            <Typography className={clsx(style.text)} color={(theme) => theme?.palette?.text?.primary4}>
                              Giao siêu tốc 3h
                            </Typography>
                          </Box>
                          <Box className={clsx(style.header2)}>
                            <Typography className={clsx(style.text1)} color={(theme) => theme?.palette?.text?.primary6}>
                              45.000 ₫
                            </Typography>
                            <Typography className={clsx(style.text2)} color={(theme) => theme?.palette?.text?.primary4}>
                              15.000 ₫
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
                                  <Typography className={clsx(style.text2Label)}>40.000 ₫</Typography>
                                </Box>
                                <Box className={clsx(style.label1)}>
                                  <Typography className={clsx(style.text1Label)}>Khuyến mãi vận chuyển</Typography>
                                  <Typography className={clsx(style.text2Label)}>-25.000 ₫</Typography>
                                </Box>
                                <Divider className={clsx(style.divider)} />
                                <Box className={clsx(style.label1)}>
                                  <Typography className={clsx(style.text1Label, style.textActive)}>
                                    Phí còn lại
                                  </Typography>
                                  <Typography className={clsx(style.text2Label, style.textActive)}>15.000 ₫</Typography>
                                </Box>
                              </Box>
                            </Box>
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                    {/* content */}
                    <Box className={clsx(style.infoPhone)}>
                      <img
                        src="https://salt.tikicdn.com/cache/280x280/ts/product/2a/a1/3f/0316aa8136759cadc84b943a015148a8.jpg.webp"
                        alt="anh"
                        className={clsx(style.img)}
                      />
                      <Box className={clsx(style.infoContent)}>
                        <Typography className={clsx(style.firstLine)} color={(theme) => theme?.palette?.text?.primary6}>
                          Điện Thoại Samsung Galaxy S20 FE (8GB/256GB) - Hàng Chính Hãng - Đã kích hoạt bảo hành điện tử
                          - Xanh Khí Chất
                        </Typography>
                        <Box className={clsx(style.secondLine)}>
                          <Typography
                            className={clsx(style.secondLine_text1)}
                            color={(theme) => theme?.palette?.text?.primary6}
                          >
                            SL: x2
                          </Typography>
                          <Typography className={clsx(style.secondLine_text2)}>6.999.999 ₫</Typography>
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
                    <Typography className={clsx(style.text)}>Gói 1:Giao siêu tốc 3h</Typography>
                  </Box>
                </Box>
              </Box>
              <Box className={clsx(style.wrapContent1)}>
                <Box className={clsx(style.BoxAll)}>
                  <Box className={clsx(style.box1)}>
                    <Box className={clsx(style.packageShipping)}>
                      <Box className={clsx(style.leftContent)}>
                        <Box className={clsx(style.headerLeft1)}>
                          <Box className={clsx(style.header1)}>
                            <img src={iconNow} alt="icon now" className={clsx(style.img)} />
                            <Typography className={clsx(style.text)} color={(theme) => theme?.palette?.text?.primary4}>
                              Giao siêu tốc 3h
                            </Typography>
                          </Box>
                          <Box className={clsx(style.header2)}>
                            <Typography className={clsx(style.text1)} color={(theme) => theme?.palette?.text?.primary6}>
                              45.000 ₫
                            </Typography>
                            <Typography className={clsx(style.text2)} color={(theme) => theme?.palette?.text?.primary4}>
                              15.000 ₫
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
                                  <Typography className={clsx(style.text2Label)}>40.000 ₫</Typography>
                                </Box>
                                <Box className={clsx(style.label1)}>
                                  <Typography className={clsx(style.text1Label)}>Khuyến mãi vận chuyển</Typography>
                                  <Typography className={clsx(style.text2Label)}>-25.000 ₫</Typography>
                                </Box>
                                <Divider className={clsx(style.divider)} />
                                <Box className={clsx(style.label1)}>
                                  <Typography className={clsx(style.text1Label, style.textActive)}>
                                    Phí còn lại
                                  </Typography>
                                  <Typography className={clsx(style.text2Label, style.textActive)}>15.000 ₫</Typography>
                                </Box>
                              </Box>
                            </Box>
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                    {/* content */}
                    <Box className={clsx(style.infoPhone)}>
                      <img
                        src="https://salt.tikicdn.com/cache/280x280/ts/product/2a/a1/3f/0316aa8136759cadc84b943a015148a8.jpg.webp"
                        alt="anh"
                        className={clsx(style.img)}
                      />
                      <Box className={clsx(style.infoContent)}>
                        <Typography className={clsx(style.firstLine)} color={(theme) => theme?.palette?.text?.primary6}>
                          Điện Thoại Samsung Galaxy S20 FE (8GB/256GB) - Hàng Chính Hãng - Đã kích hoạt bảo hành điện tử
                          - Xanh Khí Chất
                        </Typography>
                        <Box className={clsx(style.secondLine)}>
                          <Typography
                            className={clsx(style.secondLine_text1)}
                            color={(theme) => theme?.palette?.text?.primary6}
                          >
                            SL: x2
                          </Typography>
                          <Typography className={clsx(style.secondLine_text2)}>6.999.999 ₫</Typography>
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
                    <Typography className={clsx(style.text)}>Gói 1:Giao siêu tốc 3h</Typography>
                  </Box>
                </Box>
              </Box>
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
                      <img alt="icon" src={paymentMoMo} className={clsx(style.icon)} />
                      <Typography className={clsx(style.textPayMent)} color={(theme) => theme?.palette?.text?.primary4}>
                        Thanh toán bằng ví MoMo
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
                  18.078.000₫
                </Typography>
              </Box>
              <Box className={clsx(style.orderText)}>
                <Typography className={clsx(style.text_order1)} color={(theme) => theme?.palette?.text?.primary6}>
                  Phí vận chuyển
                </Typography>
                <Typography className={clsx(style.text_order2)} color={(theme) => theme?.palette?.text?.primary4}>
                  71.000₫
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
                  -30.000₫
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
                    18.119.000 ₫
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

              <Button variant="contained" className={clsx(style.btnBuyOrder)} color="secondary">
                Đặt hàng
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default memo(PayOrder);
