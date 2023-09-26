import PropTypes from 'prop-types';
import style from './PhoneDetails.module.scss';
import clsx from 'clsx';
import { memo, lazy } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import { FloatButton } from 'antd';
const Header = lazy(() => import('~/components/Header'));
const Footer = lazy(() => import('~/components/Footer'));

import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';

const ReactSlickPhone = lazy(() => import('./ReactSlickPhone/ReactSlickPhone.jsx'));
const PhoneDescription = lazy(() => import('./PhoneDescription/PhoneDescription.jsx'));
const BuyPhone = lazy(() => import('./BuyPhone/BuyPhone.jsx'));
// propTypes
PhoneDetails.propTypes = {};

function PhoneDetails(props) {
  return (
    <Box>
      {/* header and navigation */}
      <Header />

      {/* content */}
      <Box className={clsx(style.wrapContent)}>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 2, lg: 3 }}>
          {/* phone details */}
          <Grid container lg={12} rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 2, lg: 3 }}>
            {/* React slick phone Details */}
            <Grid lg={3.5}>
              <ReactSlickPhone />
            </Grid>

            {/* Phone Description */}
            <Grid lg={5}>
              <PhoneDescription />
            </Grid>

            {/* Buy Phone */}
            <Grid lg={3.5}>
              <BuyPhone />
            </Grid>
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

export default memo(PhoneDetails);
