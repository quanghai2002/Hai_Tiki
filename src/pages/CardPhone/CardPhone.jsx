import PropTypes from 'prop-types';
import style from './CardPhone.module.scss';
import clsx from 'clsx';
import { memo, lazy, useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import { FloatButton } from 'antd';
import { Steps } from 'antd';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Button from '@mui/material/Button';
import { Checkbox } from 'antd';
import { Tooltip } from 'antd';
import Divider from '@mui/material/Divider';

import removeIcon from '~/assets/images/removeIcon.svg';
const Header = lazy(() => import('~/components/Header'));
const Footer = lazy(() => import('~/components/Footer'));
const OneCard = lazy(() => import('./OneCard.jsx'));

// prop types
CardPhone.propTypes = {};

// text list card => để render => giỏ các sản phẩm trong giỏ hàng
const listCardTest = [
  {
    id: '1',
    name: 'Điện thoại Realme C55 (6GB/128GB) - Hàng chính hãng -  Đen',
    url: 'https://salt.tikicdn.com/cache/280x280/ts/product/e5/55/3c/a00e836b2d4131f18c546166f7f05cb0.jpeg.webp',
    price: 100000,
    quantity: 8,
  },
  {
    id: '2',
    name: 'Điện thoại Xiaomi Redmi 10C (4GB/128GB)',
    url: 'https://salt.tikicdn.com/cache/280x280/ts/product/fd/4d/66/f30dc912aa333f0b7b76f6ca28f6e409.png.webp',
    price: 5000,
    quantity: 16,
  },
  {
    id: '3',
    name: 'Điện thoại Realme C33 (3GB/32GB) - Hàng chính hãng',
    url: 'https://salt.tikicdn.com/cache/280x280/ts/product/19/84/0e/b8ba4857452cc85b7b2bcb4b3ff162f6.jpg.webp',
    price: 2000,
    quantity: 3,
  },
  {
    id: '4',
    name: 'Điện thoại Realme C33 (3GB/32GB) - Hàng chính hãng',
    url: 'https://salt.tikicdn.com/cache/280x280/ts/product/19/84/0e/b8ba4857452cc85b7b2bcb4b3ff162f6.jpg.webp',
    price: 10000,
    quantity: 3,
  },
];

function CardPhone(props) {
  // trạng thái của thanh tiến trình => process => khi chọn mua hàng
  const [valueProcessStep, setvalueProcessStep] = useState(0);
  // console.log({ valueProcessStep });

  // action checked => kiểm tra xem trạng thái của checkaAll tất cả sản phẩm
  const [checkAll, setCheckAll] = useState(false);
  const [listID, setListId] = useState([]);
  const [listChecked, setListChecked] = useState([]);

  // console.log('listID', listID);

  const [listCheckedBox, setListCheckedBox] = useState([]);

  // khi click vào nút check all sản phẩm
  const handleCheckAll = () => {
    setCheckAll((prev) => {
      return !prev;
    });
    setListCheckedBox([]);
  };

  // nếu như các nút check bên trong => bằng tổng số đơn hàng => setCheckAll => Bằng True
  useEffect(() => {
    if (listCardTest?.length === listChecked?.length) {
      setCheckAll(true);
    } else {
      setCheckAll(false);
    }
  }, [listChecked]);

  /* -------------------------------- TỔNG GIÁ TRỊ ĐƠN HÀNG------------------   */

  // TỔNG giá trị đơn hàng => khi click chọn tất cả
  const [listSumPriceCheckAll, setListSumPriceCheckAll] = useState([]);
  // console.log('listSumPriceCheckAll', listSumPriceCheckAll);

  // kiểm tra xem tổng giá trị đơn hàng để check xem có được freeship không
  const [sumPriceCard, setSumPriceCard] = useState([]);
  const [total, setTotal] = useState(0);
  useEffect(() => {
    console.log('sumPriceCard', sumPriceCard);
    const newTotal = sumPriceCard?.reduce((total, item) => {
      return total + item?.newSumPrice;
    }, 0);
    // console.log('newTotal', newTotal);
    setTotal(newTotal);

    // set các step bước nhảy
    if (newTotal >= 149000 && newTotal < 299000) {
      setvalueProcessStep(1);
    } else if (newTotal >= 299000) {
      setvalueProcessStep(2);
    } else {
      setvalueProcessStep(0);
    }
  }, [sumPriceCard]);

  return (
    <Box>
      {/* header and navigation */}
      <Header />

      {/* card phone */}
      <Box className={clsx(style.wrapCardPhone)}>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 2, lg: 2 }}>
          {/* header card => label  */}
          <Grid lg={12}>
            <Typography className={clsx(style.headerCard)}>Giỏ hàng</Typography>
          </Grid>

          {/* wrap list card => danh sách đơn hàng trong => giỏ hàng */}
          <Grid container lg={8.8} rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 2, lg: 2 }}>
            {/* contents list => card*/}
            <Grid lg={12}>
              {/* step các các mức fresship */}
              <Box
                className={clsx(style.wrapStepCard)}
                sx={{
                  '&::before': {
                    backgroundColor: (theme) => theme?.palette?.background?.default,
                  },
                }}
              >
                <Steps
                  current={valueProcessStep}
                  items={[
                    {
                      icon: <></>,
                    },
                    {
                      icon: (
                        <Box
                          className={'wrapIcon1Step-Card'}
                          sx={{
                            position: 'relative',
                            backgroundColor: '#fff',
                            '&::after': {
                              content: '"Freeship 15K"',
                              display: 'block',
                              position: ' absolute',
                              top: '-19px',
                              left: '50%',
                              transform: 'translateX(-49%)',
                              whiteSpace: 'nowrap',
                              fontSize: '13px',
                              fontWeight: '500',
                              color: 'rgb(112, 166, 255)',
                            },
                          }}
                        >
                          <CheckCircleIcon className={clsx(style.icon)} />
                        </Box>
                      ),
                    },
                    {
                      // title: '299K',
                      icon: (
                        <Box
                          className={'wrapIcon2Step-Card'}
                          sx={{
                            position: 'relative',
                            backgroundColor: '#fff',
                            '&::after': {
                              content: '"Freeship 30K"',
                              display: 'block',
                              position: 'absolute',
                              top: '-19px',
                              right: 0,
                              whiteSpace: 'nowrap',
                              fontSize: '13px',
                              fontWeight: 500,
                              color: ' rgb(112, 166, 255)',
                            },
                          }}
                        >
                          <CheckCircleIcon className={clsx(style.icon)} />
                        </Box>
                      ),
                    },
                  ]}
                >
                  <Typography>Quang Hai 2002</Typography>
                </Steps>
                {/* label */}
                <Typography className={clsx(style.label0)}>Mua</Typography>
                <Typography className={clsx(style.label2)}>149K</Typography>
                <Typography className={clsx(style.label3)}>299K</Typography>
              </Box>

              {/* các hành động khi chọn => tất cả sản phẩm */}
              <Box
                className={clsx(style.wrapActionCard)}
                sx={{
                  '&::before': {
                    backgroundColor: (theme) => theme?.palette?.background?.default,
                  },
                  '&::after': {
                    backgroundColor: (theme) => theme?.palette?.background?.default,
                  },
                }}
              >
                <Box className={clsx(style.wrapChecked)}>
                  <Checkbox className={clsx(style.checked)} checked={checkAll} onChange={handleCheckAll}>
                    Tất cả ({listCardTest?.length} sản phẩm)
                  </Checkbox>
                </Box>

                <Typography className={clsx(style.unitPrice)} color={(theme) => theme?.palette?.text?.primary4}>
                  Đơn giá
                </Typography>

                <Typography className={clsx(style.quantity)} color={(theme) => theme?.palette?.text?.primary4}>
                  Số lượng
                </Typography>

                <Typography className={clsx(style.intoMoney)} color={(theme) => theme?.palette?.text?.primary4}>
                  Thành tiền
                </Typography>

                <Tooltip title="Xóa mục đã chọn" placement="bottom" mouseEnterDelay={0}>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      cursor: 'pointer',
                    }}
                  >
                    <img src={removeIcon} alt="remove icon" className={clsx(style.removeIcon)} />
                  </Box>
                </Tooltip>
              </Box>

              {/* danh sách các sản phẩm trong giỏ hàng */}
              <Box className={clsx(style.wrapContentListCard)}>
                {listCardTest?.map((phone) => {
                  return (
                    <OneCard
                      key={phone?.id}
                      detailsPhone={phone}
                      sumPriceCard={sumPriceCard}
                      setSumPriceCard={setSumPriceCard}
                      checkAll={checkAll}
                      setCheckAll={setCheckAll}
                      setListId={setListId}
                      listID={listID}
                      listChecked={listChecked}
                      setListChecked={setListChecked}
                      listCardTest={listCardTest}
                      listCheckedBox={listCheckedBox}
                      setListCheckedBox={setListCheckedBox}
                      listSumPriceCheckAll={listSumPriceCheckAll}
                      setListSumPriceCheckAll={setListSumPriceCheckAll}
                    />
                  );
                })}
              </Box>
            </Grid>
          </Grid>

          {/* wrap details price phone*/}
          <Grid container lg={3.2} rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 2, lg: 2 }}>
            <Box>
              {/* address địa chỉ => giao hàng */}
              <Grid lg={12}>
                <Box className={clsx(style.wrapAddressCard)}>
                  <Box className={clsx(style.col1)}>
                    <Typography
                      className={clsx(style.text, style.text1)}
                      color={(theme) => theme?.palette?.text?.primary6}
                    >
                      Giao tới
                    </Typography>
                    <Typography className={clsx(style.text, style.text2)}>Thay đổi</Typography>
                  </Box>
                  <Box className={clsx(style.col2)}>
                    <Typography
                      className={clsx(style.text, style.text1)}
                      color={(theme) => theme?.palette?.text?.primary4}
                    >
                      quang hai
                    </Typography>
                    <i className={clsx(style.i)}></i>
                    <Typography
                      className={clsx(style.text, style.text2)}
                      color={(theme) => theme?.palette?.text?.primary4}
                    >
                      0968107500
                    </Typography>
                  </Box>
                  <Box className={clsx(style.col3)}>
                    <Typography
                      className={clsx(style.text, style.text2)}
                      color={(theme) => theme?.palette?.text?.primary6}
                    >
                      <span className={clsx(style.text1)}>Nhà</span> số nhà 5, ngõ 122 Phố Đông Thiên, Phường Vĩnh Hưng,
                      Quận Hoàng Mai, Hà Nội
                    </Typography>
                  </Box>
                </Box>
              </Grid>

              {/* sum price => tổng giá trị đơn hàng */}
              <Grid lg={12}>
                <Box className={clsx(style.wrapSumPriceCard)}>
                  <Box className={clsx(style.header)}>
                    <Typography className={clsx(style.text)} color={(theme) => theme?.palette?.text?.primary6}>
                      Tạm tính
                    </Typography>
                    <Box className={clsx(style.price)}>
                      <Typography className={clsx(style.label)} color={(theme) => theme?.palette?.text?.primary4}>
                        {total.toLocaleString('vi-VN')}
                      </Typography>
                      <Typography className={clsx(style.vnd)} color={(theme) => theme?.palette?.text?.primary4}>
                        đ
                      </Typography>
                    </Box>
                  </Box>
                  <Divider
                    sx={{
                      borderColor: (theme) => theme?.palette?.text?.primary6,
                    }}
                  />
                  <Box className={clsx(style.content)}>
                    <Typography className={clsx(style.text)} color={(theme) => theme?.palette?.text?.primary6}>
                      Tổng tiền
                    </Typography>
                    <Box className={clsx(style.wrapFooter)}>
                      <Box className={clsx(style.col1)}>
                        <Typography className={clsx(style.text1)}> {total.toLocaleString('vi-VN')}</Typography>
                        <Typography className={clsx(style.text2)}>đ</Typography>
                      </Box>
                      <Typography className={clsx(style.vat)} color={(theme) => theme?.palette?.text?.primary6}>
                        (Đã bao gồm VAT nếu có)
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Grid>

              {/* btn buy card => nút mua sản phẩm*/}
              <Grid lg={12}>
                <Button className={clsx(style.btnBuyPhone)} variant="contained" color="secondary">
                  Mua hàng
                </Button>
              </Grid>
            </Box>
          </Grid>

          {/* footer */}
          <Grid lg={12}>
            <Footer />
          </Grid>
        </Grid>
      </Box>

      {/* back to top */}
      <FloatButton.BackTop duration={450} visibilityHeight={60} className={clsx(style.backTop)} />
    </Box>
  );
}

export default memo(CardPhone);
