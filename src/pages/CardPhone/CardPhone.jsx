import PropTypes from 'prop-types';
import style from './CardPhone.module.scss';
import clsx from 'clsx';
import { memo, lazy, useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Button from '@mui/material/Button';
import { Checkbox, Alert, Tooltip, Modal, Steps, FloatButton } from 'antd';
import Divider from '@mui/material/Divider';

import removeIcon from '~/assets/images/removeIcon.svg';
import { WaringIconDelteAll } from '~/assets/iconSVG.jsx';
const Header = lazy(() => import('~/components/Header'));
const Footer = lazy(() => import('~/components/Footer'));
const OneCard = lazy(() => import('./OneCard.jsx'));
const AddressUser = lazy(() => import('./AddressUser.jsx'));

// prop types
CardPhone.propTypes = {};

function CardPhone(props) {
  // list card test
  const [listCardTest, setListCardTest] = useState([
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
  ]);

  // ---- ----------ĐỊA CHỈ GIAO HÀNG KHI CẬP NHẬT -------------------
  const [addressUserShip, setAddressUserShip] = useState('');
  const isAddressUser = Boolean(addressUserShip);
  // console.log(isAddressUser);
  // console.log({ addressUserShip });
  // text list card => để render => giỏ các sản phẩm trong giỏ hàng
  // trạng thái của thanh tiến trình => process => khi chọn mua hàng
  const [valueProcessStep, setvalueProcessStep] = useState(0);
  // console.log({ valueProcessStep });

  // action checked => kiểm tra xem trạng thái của checkaAll tất cả sản phẩm
  const [checkAll, setCheckAll] = useState(false);
  const [listID, setListId] = useState([]);
  const [listChecked, setListChecked] = useState([]);

  // lấy 1 ID sản phẩm để xóa 1 sản phẩm nếu muốn
  const [oneIDProducts, setOneIDProducts] = useState([]);
  // console.log('oneIDProducts', oneIDProducts);

  // State khi nào hiển thi alert cảnh báo phải chọn sản phẩm trước khi xóa Tất cả
  const [isAlert, setAlert] = useState(false);
  useEffect(() => {
    const id = setTimeout(() => {
      setAlert(false);
    }, 6000);

    // clear up function
    () => {
      clearTimeout(id);
    };
  }, [isAlert]);

  // ------------------MODAL HIỆN THỊ XÓA 1 || NHIỀU SẢN PHẨM ---------------------
  // modal hiển thị xóa tất cả => để Xác nhận chắc chắn người dùng sẽ xóa hay không
  const [isModal, setIsModal] = useState(false);
  // click nút Hủy modal
  const handleCancelModal = () => {
    setIsModal(false);
  };

  // khi clik nút ----XÁC NHẬN ---- => đồng ý xóa nhiều SẢN PHẨM
  const handleClickOK = () => {
    // nếu list listID chưa có thì lấy danh sách id của từng sản phẩm => không phải checkAll
    const isCheckID = listID?.length === 0 ? oneIDProducts : listID;
    console.log('danh sách ID cần xóa', isCheckID);
  };

  /*--------------DELETE ALL SẢN PHẨM CARD -------------------------------    */
  //  click DETELE all sản phẩm
  const handleClickDeleteAll = () => {
    // nếu list listID chưa có thì lấy danh sách id của từng sản phẩm => không phải checkAll
    const isCheckID = listID?.length === 0 ? oneIDProducts : listID;

    // console.log('isCheckID', isCheckID);

    // nếu chưa chọn sản phẩm nào => hiển thị thông alert => để biết
    if (isCheckID?.length === 0) {
      setAlert(true);
    } else {
      setIsModal(true);
    }
  };

  const [listCheckedBox, setListCheckedBox] = useState([]);
  // console.log('listCheckedBox:', listCheckedBox);

  /* -------------------------------- TỔNG GIÁ TRỊ ĐƠN HÀNG------------------   */

  // TỔNG giá trị đơn hàng => khi click chọn tất cả
  const [listSumPriceCheckAll, setListSumPriceCheckAll] = useState([]);
  // console.log('listSumPriceCheckAll', listSumPriceCheckAll);

  // kiểm tra xem tổng giá trị đơn hàng để check xem có được freeship không
  const [sumPriceCard, setSumPriceCard] = useState([]);
  const [total, setTotal] = useState(0);

  /* ----------------CLICK CHECK ALL SẢN PHẨM-------------------  */
  // khi click vào nút check all sản phẩm
  const handleCheckAll = () => {
    setCheckAll((prev) => {
      return !prev;
    });
    setListCheckedBox([]);
  };

  /*  -------------CHECK ALL ---------------------------------- */
  // nếu như các nút check bên trong => bằng tổng số đơn hàng => setCheckAll => Bằng True
  useEffect(() => {
    if (listCardTest?.length === listCheckedBox?.length) {
      setCheckAll(true);
    } else {
      setCheckAll(false);
    }
  }, [listCheckedBox]);

  //
  useEffect(() => {
    // nếu là checkAll sẽ lấy danh sách , giá sản phẩm là =>  listSumPriceCheckAll
    if (checkAll) {
      // setSumPriceCard();
      // console.log('list A', listSumPriceCheckAll);

      const newTotal = listSumPriceCheckAll?.reduce((total, item) => {
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
    }
    // ngược lại => nếu checkAll bằng false => sẽ lấy danh sách giá sản phẩm khác sumPriceCard
    else {
      // console.log('List B', sumPriceCard);

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
    }
  }, [sumPriceCard, checkAll, listSumPriceCheckAll]);

  // -------------KHI CLICK BTN MUA HÀNG => DANH SÁCH CHI TIẾT ĐƠN HÀNG +Address giao hàng
  // danh sách chi tiết đơn hàng => các sản phẩm cộng giá...
  const [listProductCard, setListProductCard] = useState([]);

  //khi click vào nút mua hàng trong giỏ hàng
  const handleClickBtnBuyCard = () => {
    // kiểm tra để lấy mã giảm giá
    let freeShip = 0;
    if (valueProcessStep === 0) {
      freeShip = 0;
    } else if (valueProcessStep === 1) {
      freeShip = 15000;
    } else if (valueProcessStep === 2) {
      freeShip = 30000;
    }

    // danh sách đơn hàng sau khi UPDATE
    const orderList = {
      sumOrderList: total,
      listProductCard,
      addressUserShip,
      freeShip,
    };
    console.log('danh sách đơn hàng', orderList);
  };
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

              {/* các------------- ACTION----------- hành động khi chọn => tất cả sản phẩm */}
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

                {/* Alert bật hộp thoại khi chưa có sản phẩm nào mà click vào nút xóa tất cả */}
                {isAlert && (
                  <Alert
                    message="Vui lòng chọn sản phẩm để xóa"
                    type="error"
                    // showIcon
                    className={clsx(style.alertDeleteAll)}
                  />
                )}

                {/* button xóa */}
                <Tooltip title="Xóa mục đã chọn" placement="bottom" mouseEnterDelay={0}>
                  <Box
                    onClick={handleClickDeleteAll}
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

                {/* modal */}
                <Modal
                  centered
                  open={isModal}
                  onCancel={() => setIsModal(false)}
                  className={clsx(style.wrapModal1)}
                  okText="Xác nhận"
                  cancelText="Hủy"
                  icon={<WaringIconDelteAll />}
                  footer={null}
                  width={311}
                >
                  <Box className={clsx(style.header)}>
                    <WaringIconDelteAll className={clsx(style.icon)} />
                    <Box className={clsx(style.contentHeader)}>
                      <Typography className={clsx(style.text1)} color={(theme) => theme?.palette?.text?.primary4}>
                        Xoá sản phẩm
                      </Typography>
                      <Typography className={clsx(style.text2)} color={(theme) => theme?.palette?.text?.primary10}>
                        Bạn có muốn xóa sản phẩm đang chọn?
                      </Typography>
                    </Box>
                  </Box>
                  <Box className={clsx(style.actions)}>
                    <Button variant="outlined" className={clsx(style.btn, style.btnOK)} onClick={handleClickOK}>
                      Xác nhận
                    </Button>
                    <Button
                      variant="contained"
                      className={clsx(style.btn, style.btnCancel)}
                      onClick={handleCancelModal}
                    >
                      Huỷ
                    </Button>
                  </Box>
                </Modal>
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
                      setOneIDProducts={setOneIDProducts}
                      setListProductCard={setListProductCard}
                    />
                  );
                })}
              </Box>
            </Grid>
          </Grid>

          {/* wrap details price phone*/}
          <Grid container lg={3.2} rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 2, lg: 2 }}>
            <Box
              sx={{
                minWidth: '308px',
              }}
            >
              {/* address địa chỉ => giao hàng */}
              {/* nếu có địa chỉ rồi thì hiển thị > nếu không bắt chọn địa chỉ  */}
              <Grid lg={12}>
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
                        {total > 0 ? (
                          <>
                            <Typography className={clsx(style.text1)}> {total.toLocaleString('vi-VN')}</Typography>
                            <Typography className={clsx(style.text2)}>đ</Typography>
                          </>
                        ) : (
                          <Typography className={clsx(style.text3)}> Vui lòng chọn sản phẩm</Typography>
                        )}
                      </Box>
                      <Typography
                        className={clsx(style.vat)}
                        color={(theme) => theme?.palette?.text?.primary6}
                        textAlign="right"
                      >
                        (Đã bao gồm VAT nếu có)
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Grid>

              {/* btn buy card => nút mua sản phẩm*/}
              <Grid lg={12}>
                <Button
                  className={clsx(style.btnBuyPhone)}
                  variant="contained"
                  color="secondary"
                  disabled={total === 0 || isAddressUser === false ? true : false}
                  onClick={handleClickBtnBuyCard}
                >
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
