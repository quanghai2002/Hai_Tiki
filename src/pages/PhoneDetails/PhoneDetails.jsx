import PropTypes from 'prop-types';
import style from './PhoneDetails.module.scss';
import clsx from 'clsx';
import { memo, lazy, useState, useEffect, Suspense } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import { FloatButton } from 'antd';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { useParams } from 'react-router-dom';

// const Header = lazy(() => import('~/components/Header'));
// const Footer = lazy(() => import('~/components/Footer'));
// const ReactSlickPhone = lazy(() => import('./ReactSlickPhone/ReactSlickPhone.jsx'));
// const PhoneDescription = lazy(() => import('./PhoneDescription/PhoneDescription.jsx'));
// const BuyPhone = lazy(() => import('./BuyPhone/BuyPhone.jsx'));
import Header from '~/components/Header';
import Footer from '~/components/Footer';
import ReactSlickPhone from './ReactSlickPhone/ReactSlickPhone';
import PhoneDescription from './PhoneDescription/PhoneDescription';
import BuyPhone from './BuyPhone/BuyPhone';
import phoneApi from '~/apis/phoneApi.js';
import PhoneDetailLazy from './PhoneDetailsLazy/PhoneDetailLazy';
// propTypes
PhoneDetails.propTypes = {};

function PhoneDetails(props) {
  // -- KHI ĐANG TẢI THÔNG TIN SẢN 1 SẢN PHẨM THÌ HIỆN LOADING LAZY---------
  const [loading, setLoading] = useState(true);
  // --------LẤY ID SẢN PHẨM TỪ BÊN KIA TRUYỀN SANG --------
  const paramIdPhone = useParams();
  // console.log('id sản phẩm là:', paramIdPhone?.id);

  // ------------LƯU THÔNG TIN 1 SẢN PHẨM ----------
  const [phoneDetails, setPhoneDetails] = useState({});

  // --CALL API LẤY SẢN PHẨM THEO ID SẢN PHẨM ------
  useEffect(() => {
    phoneApi
      .getPhoneBuyID(paramIdPhone?.id)
      .then((res) => {
        // console.log('thông tin 1 sản phẩm:', res);
        setPhoneDetails(res?.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [paramIdPhone?.id]);

  // console.log('thông tin 1 sản phẩm:', phoneDetails);
  return (
    <Box>
      {/* Khi mà đang tải thông tin 1 sản phẩm hiện lazy */}
      {loading ? (
        <PhoneDetailLazy />
      ) : (
        <>
          {/* Header */}
          <Header />
          {/* Content */}
          <Box className={clsx(style.wrapContent)}>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 2, lg: 3 }}>
              {/* phone details */}
              <Grid container lg={12} rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 2, lg: 3 }}>
                {/* React slick phone Details */}
                <Grid lg={3.5}>
                  <ReactSlickPhone phoneDetails={phoneDetails} />
                </Grid>

                {/* Phone Description */}
                <Grid lg={5}>
                  <PhoneDescription phoneDetails={phoneDetails} />
                </Grid>

                {/* Buy Phone */}
                <Grid lg={3.5}>
                  <BuyPhone phoneDetails={phoneDetails} />
                </Grid>
              </Grid>

              {/* footer */}
              <Grid lg={12}>
                <Footer />
              </Grid>
            </Grid>
          </Box>

          {/* button back top */}
          <FloatButton.BackTop duration={450} visibilityHeight={60} className={clsx(style.backTop)} />
        </>
      )}
    </Box>
  );
}

export default memo(PhoneDetails);
