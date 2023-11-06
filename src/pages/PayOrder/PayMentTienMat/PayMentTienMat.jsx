import { memo, lazy, useState, useEffect } from 'react';
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
import TienMatLazy from './TienMatlazy';
import phoneApi from '~/apis/phoneApi.js';
// PropTypes
PayMentTienMat.propTypes = {};

function PayMentTienMat(props) {
  const [loading, setLoading] = useState(true);
  const [listPhoneCurrent, setListPhoneCurrent] = useState([]);

  // ------Khi CLIK VÀO NÚT BTN VỀ TRANG CHỦ ------------------
  const naviagate = useNavigate();
  const handleBackHomePage = () => {
    naviagate('/');
  };

  // --------LẤY DỮ LIỆU ĐƠN HÀNG VỪA ĐẶT TRONG REDUX ---- ĐÃ LƯU KHI THÊM ĐƠN HÀNG MỚI THÀNH CÔNG-----
  const infoOrderTienMat = useSelector((state) => state?.orderPayTienMat);

  // -------KHI CLICK VÀO NÚT XEM ĐƠN HÀNG -----
  const handleHistoryOrder = () => {
    // console.log('xem đơn hàng');
    naviagate('/order/history');
  };

  //  --- LẤY THÔNG TIN SẢN PHẨM ĐANG MUA HIỆN TẠI ĐỂ CẬP NHẬT GIẢM SỐ LƯỢNG --
  useEffect(() => {
    // --- DANH SÁCH SẢN PHẨM ĐÃ THANH TOÁN THÀNH CÔNG ---
    const listPhonePayCompleted = infoOrderTienMat?.products2;
    // console.log('danh sách sản phẩm thanh toán thành công:', listPhonePayCompleted);
    // danh sách số lượng sản phẩm mua của 1 sản đó để trừ đi là

    const sumquantity = listPhonePayCompleted?.map((item) => {
      return item?.sumQuantity;
    });
    // console.log('số lượng sản phẩm cần mua của các sản phẩm là:', sumquantity);

    // DANH SÁCH ID SẢN PHẨM THANH TOÁN THÀNH CÔNG
    const listIdCompleted = listPhonePayCompleted?.map((item) => {
      return item?.id;
    });

    // console.log('danh sách id sản phẩm thanh toán thành công:', listIdCompleted);
    //  --- Xem thông tin SỐ LƯỢNG SẢN PHẨM ĐÓ TRÊN SERVER LÀ BAO NHIÊU --
    phoneApi
      .getManyPhoneBuyID(listIdCompleted)
      .then((response) => {
        // console.log('thông tin sản phẩm trên server là:', response?.data);
        // console.log(
        //   'số lượng sản phẩm hiện tại trên server là:',
        //   response?.data.map((item) => {
        //     return item?.stock_quantity;
        //   }),
        // );

        //  --- LẶP QUA CÁC SẢN PHẨM ĐỂ TÍNH TOÁN LẠI SỐ LƯỢNG SẢN PHẨM MỚI NHẤT --
        let listSoluongUpdate = [];

        for (let index in response.data) {
          // index là index => key của array sản phẩm trên server
          // console.log('phone', response?.data[index]);

          //  -- nếu như số lượng sản phẩm trong kho lớn > số lượng sản phẩm mua thì trừ bớt đi
          if (response?.data[index]?.stock_quantity >= sumquantity[index]) {
            // console.log('đủ điều kiện để trừ');
            const newStockquantity = response?.data[index]?.stock_quantity - sumquantity[index];

            const dataUpdate = {
              _id: response?.data[index]?._id,
              stock_quantity: newStockquantity,
            };

            // console.log('số lượng sản phẩm hiện tại là:', dataUpdate);
            listSoluongUpdate.push(dataUpdate);
          } else {
            // nếu không đủ điều kiên để trừ thì set số lượng sản phẩm === 0
            const dataUpdate = {
              _id: response?.data[index]?._id,
              stock_quantity: 0,
            };
            // console.log('số lượng sản phẩm hiện tại là:', dataUpdate);
            listSoluongUpdate.push(dataUpdate);
          }
        }

        //  --- SAU vòng lặp for => sẽ được danh sách số lượng sản phẩm mơi nhất
        // console.log('số lượng sản phẩm mới nhất là:', listSoluongUpdate);

        //  -- SAU ĐÓ CẬP NHẬT LẠI SỐ LƯỢNG SẢN PHẨM MỚI NHẤT TRÊN SERVER --
        phoneApi
          .updataManyPhoneSoLuong(listSoluongUpdate)
          .then((res) => {
            // console.log('cập nhật số lượng sản phẩm thành công:', res);
            setLoading(false);
          })
          .catch((err) => {
            console.log('cập nhật số lượng sản phẩm thất bại:', err);
            setLoading(false);
          });
      })
      .catch((err) => {
        console.log('không lấy được thông tin sản phẩm trên server:', err);
      });
  }, []);

  // render JSX
  return (
    // ---- KHI đang tải để xóa đi số lượng sản phẩm đã mua của 1 sản phẩm  => Loading ...
    <Box className={clsx(style.wrapPaySuccess)}>
      {/* header */}
      <HeaderPayOrder />
      {/* content */}
      {loading ? (
        <TienMatLazy />
      ) : (
        <Box className={clsx(style.wrapContent)}>
          <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, lg: 3 }}>
            <Grid xs={12} sm={12} md={12} lg={8}>
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

                    <Box
                      className={clsx(style.summary)}
                      sx={{
                        ' @media (max-width: 600px)': {
                          paddingTop: '63px !important',
                        },
                      }}
                    >
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
            <Grid xs={12} sm={12} md={12} lg={4}>
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
      )}

      {/* Footer */}
      <FooterPayOrder />
    </Box>
  );
}

export default memo(PayMentTienMat);
