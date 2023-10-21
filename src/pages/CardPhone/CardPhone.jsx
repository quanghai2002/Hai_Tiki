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
import { useDispatch, useSelector } from 'react-redux';
// const Header = lazy(() => import('~/components/Header'));
// const Footer = lazy(() => import('~/components/Footer'));
// const OneCard = lazy(() => import('./OneCard.jsx'));
// const AddressUser = lazy(() => import('./AddressUser.jsx'));
// const CardEmpty = lazy(() => import('./CardEmpty'));
import Header from '~/components/Header';
import Footer from '~/components/Footer';
import OneCard from './OneCard.jsx';
import AddressUser from './AddressUser.jsx';
import CardEmpty from './CardEmpty';
import { updatePhoneCart } from '~/redux/GioHang.js';
import { addOrderReview } from '~/redux/OrderPreview.js';
import { useNavigate } from 'react-router-dom';

// prop types
CardPhone.propTypes = {};

function CardPhone(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // ---LẤY DANH SÁCH SẢN PHẨM ĐÃ THÊM VÀO TRONG GIỎ HÀNG -----LẤY TỪ TRONG REDUX NHÉ --

  const listInfoPhoneCart = useSelector((state) => state?.gioHang?.cartList);

  // list cart test === DANH SÁCH SẢN PHẨM TRONG GIỎ HÀNG ----
  const [listCardTest, setListCardTest] = useState(
    listInfoPhoneCart?.map((item) => {
      return {
        id: item?._id,
        name: item?.name,
        url: item?.url,
        price: item?.price,
        quantity: item?.quantity,
        soluongmua: item?.soluongmua,
      };
    }),
  );

  // console.log({ listCardTest });

  // ---- ---------- ------   KIỂM TRA XEM ĐÃ CÓ ĐỊA CHỈ GIAO HÀNG HAY CHƯA --- -------------------
  const userLogin = useSelector((state) => state?.userAuth?.user);
  const [addressUserShip, setAddressUserShip] = useState(Boolean(userLogin?.address));
  const isAddressUser = addressUserShip;
  const [isModalOpen, setIsModalOpenAddress] = useState(false);

  // ------KHI CLICK VÀO THAY ĐỔI - CẬP NHẬT ĐỊA CHỈ GIAO HÀNG  ---
  const handleClickChangeAddress = () => {
    setAddressUserShip(false);
    // set isModal === true => để bật lên hộp thoại chỉnh sửa
    setIsModalOpenAddress(true);
  };
  // console.log(isAddressUser);
  // console.log({ addressUserShip });
  // text list card => để render => giỏ các sản phẩm trong giỏ hàng
  // trạng thái của thanh tiến trình => process => khi chọn mua hàng
  const [valueProcessStep, setvalueProcessStep] = useState(0);
  // console.log({ valueProcessStep });

  // action checked => kiểm tra xem trạng thái của checkaAll tất cả sản phẩm
  const [checkAll, setCheckAll] = useState(false);
  const [listID, setListId] = useState([]);
  // console.log('listID', listID);
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

  const [listCheckedBox, setListCheckedBox] = useState([]);
  // console.log('listCheckedBox:', listCheckedBox);

  /* -------------------------------- TỔNG GIÁ TRỊ ĐƠN HÀNG------------------   */

  // TỔNG giá trị đơn hàng => khi click chọn tất cả
  const [listSumPriceCheckAll, setListSumPriceCheckAll] = useState([]);
  // console.log('listSumPriceCheckAll', listSumPriceCheckAll);

  // kiểm tra xem tổng giá trị đơn hàng để check xem có được freeship không
  const [sumPriceCard, setSumPriceCard] = useState([]);
  // console.log('sumPriceCard', sumPriceCard);

  // TỔNG GIÁ TRỊ ĐƠN HÀNG
  const [total, setTotal] = useState(0);

  /* ----------------CLICK CHECK ALL SẢN PHẨM-------------------  */
  // khi click vào nút check all sản phẩm
  const handleCheckAll = () => {
    setCheckAll((prev) => {
      return !prev;
    });
    setListCheckedBox([]);
  };

  /*  -------------------CHECK ALL ---------------------------------- */
  // nếu như các nút check bên trong => bằng tổng số đơn hàng => setCheckAll => Bằng True
  useEffect(() => {
    if (listCardTest?.length === listCheckedBox?.length) {
      setCheckAll(true);
    } else {
      setCheckAll(false);
    }
  }, [listCardTest, listCheckedBox]);

  //
  useEffect(() => {
    // console.log('check All tất cả sản phẩm:', checkAll);
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

  // ---  CLIK NÚT MUA HÀNG ----
  // -------------KHI CLICK BTN MUA HÀNG => DANH SÁCH CHI TIẾT ĐƠN HÀNG +Address giao hàng
  // danh sách chi tiết đơn hàng => các sản phẩm cộng giá...
  const [listProductCard, setListProductCard] = useState([]);

  // ------------------MODAL HIỆN THỊ XÓA 1 || NHIỀU SẢN PHẨM ---------------------
  // modal hiển thị xóa tất cả => để Xác nhận chắc chắn người dùng sẽ xóa hay không
  const [isModal, setIsModal] = useState(false);
  // click nút Hủy modal
  const handleCancelModal = () => {
    setIsModal(false);
  };

  // khi clik nút ----XÁC NHẬN ---- => đồng ý xóa nhiều SẢN PHẨM
  // ---XÓA NHIỀU SẢN PHẨM TRONG 1 LẦN Ở ĐÂY NHÉ ----
  const handleClickOK = () => {
    // nếu list listID chưa có thì lấy danh sách id của từng sản phẩm => không phải checkAll
    const isCheckID = listID?.length === 0 ? oneIDProducts : listID;

    // console.log('id cần xóa là:', isCheckID);
    // console.log('danh sách sản phẩm cũ là:', listCardTest);

    // Khi click xóa nhiều sẽ loại bỏ đi các sản phẩm đang được chọn bạn nhé -
    // --LOẠI BỎ CÁC SẢN PHẨM DÃ CHỌN BẰNG CÁCH FILTER RA CÁC SẢN PHẨM KHÁC ID ĐÓ
    const newPhoneListCartDeleteAll = listCardTest?.filter((cart) => {
      return !isCheckID?.includes(cart?.id);
    });
    // cập nhật lại list sản phẩm
    setListCardTest(newPhoneListCartDeleteAll);

    // console.log('danh sách sản phẩm sau khi đã xóa là:', newPhoneListCartDeleteAll);
    // Danh sách sản phẩm chuẩn bị update lên redux là
    const newPhoneLisCarttUpdateRedux = newPhoneListCartDeleteAll?.map((item) => {
      return {
        _id: item?.id,
        name: item?.name,
        url: item?.url,
        price: item?.price,
        quantity: item?.quantity,
        soluongmua: item?.soluongmua,
      };
    });

    dispatch(updatePhoneCart(newPhoneLisCarttUpdateRedux));

    // console.log('danh sách ID cần xóa', isCheckID);
    // setSumPriceCard -- set bằng [] để xóa giá sản phẩm mặc định về không
    setSumPriceCard([]);

    // setListSumPriceCheckAll
    setListSumPriceCheckAll((prev) => {
      // console.log('giá trị cũ SumPriceCheckAll', prev);

      const newPriceCheckAll = prev?.filter((item) => {
        return !isCheckID?.includes(item?.id);
      });
      // console.log('giá trị MỚI SumPriceCheckAll', newPriceCheckAll);
      return newPriceCheckAll;
    });

    // setListCheckedBox
    setListCheckedBox((prev) => {
      // console.log('giá trị cũ checkBox là', prev);

      const newPriceCheckBox = prev?.filter((item) => {
        return !isCheckID?.includes(item);
      });

      // console.log('giá trị MỚI CheckBox là:', newPriceCheckBox);
      return newPriceCheckBox;
    });

    //-- Đóng modal xóa nhiều sản phẩm đi --
    setIsModal(false);

    // setOneIDProducts
    setOneIDProducts([]);
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
  // -------------------------KIỂM TRA XEM KHI NÀO GIỎ HÀNG BẰNG === 0 => HIỆN GIỎ HÀNG TRỐNG-------
  const lengthOrder = listCardTest?.length;

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

    // danh sách đơn hàng sau khi UPDATE---
    // --- Danh sách sản phẩm của đơn hàng ---

    //  id các sản phẩm mới nhât hiện tại;
    const idNewCartPhone = listCardTest?.map((item) => {
      return item?.id;
    });

    const orderList = {
      sumOrderList: total,
      listProductCard: listProductCard?.filter((cart) => {
        return idNewCartPhone?.includes(cart?.id);
      }),
      freeShip,
    };

    // ---DISPATCH LƯU THÔNG TIN TẠM THỜI => LÊN REDUX => TRÙNG VỚI FORMART CỦA 1 ĐƠN HÀNG NHÉ --
    dispatch(addOrderReview(orderList));

    //--- Chuyển đến trang thanh TOÁN ---
    navigate('/payment');
  };
  //  HIỂN THỊ JSX TẠI ĐÂY
  return lengthOrder === 0 ? (
    <CardEmpty />
  ) : (
    <Box>
      {/* đây là KHI GIỎ HÀNG CÓ ÍT NHẤT 1 TRỞ LÊN SẢN PHẨM */}
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
                      setListCardTest={setListCardTest}
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
              <Box className={clsx(style.wrapAddressBuyPhone)}>
                {/* ADDRESS USER => ĐỊA CHỈ GIAO HÀNG XEM ĐÃ CÓ HAY CHƯA BẠN NHÉ */}
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
                        <Typography className={clsx(style.text, style.text2)} onClick={handleClickChangeAddress}>
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
                    <AddressUser
                      isModal={isModalOpen}
                      setIsModalOpenAddress={setIsModalOpenAddress}
                      setAddressUserShip={setAddressUserShip}
                    />
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
