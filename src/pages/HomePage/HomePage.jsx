/* eslint-disable react-refresh/only-export-components */
import PropTypes from 'prop-types';
import style from './HomePage.module.scss';
import clsx from 'clsx';
import { memo, lazy, useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import { FloatButton } from 'antd';

const Header = lazy(() => import('~/components/Header'));
const Slider = lazy(() => import('~/components/Slider'));
const Footer = lazy(() => import('~/components/Footer'));
const AppBar = lazy(() => import('~/components/AppBar'));
const Action = lazy(() => import('~/components/Action'));
const CardPhone = lazy(() => import('~/components/CardPhone'));

// propTypes
HomePage.propTypes = {};

// HomePage
function HomePage(props) {
  // return jsx => giao diện
  return (
    <Box>
      {/* header and navigation */}
      <Header />

      {/* content */}
      <Box
        className={clsx(style.wrapContent)}
        sx={{
          paddingTop: '102px',

          '@media (max-width: 600px)': {
            paddingTop: '80px',
          },
        }}
      >
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 2, lg: 3 }}>
          {/* app bar */}
          <Grid sm={0} md={0} lg={2.1}>
            <AppBar />
          </Grid>

          <Grid container rowSpacing={2} xs={12} sm={12} md={12} lg={9.9}>
            {/*slider show and banner  */}
            <Grid md={12} lg={12}>
              <Slider />
            </Grid>

            {/* các actions => thể hiện độ tin cậy, uy tín khi mua hàng */}
            <Grid
              md={12}
              lg={12}
              sx={{
                // ---TABLET ---
                '@media (min-width: 601px) and (max-width: 900px)': {
                  width: '100%',
                },
              }}
            >
              <Action />
            </Grid>

            {/* content nội dung điện thoại */}
            <Grid xs={12} sm={12} md={12} lg={12}>
              <CardPhone />
            </Grid>

            {/* footer */}
            <Grid xs={12} sm={12} md={12} lg={12}>
              <Footer />
            </Grid>
          </Grid>
        </Grid>
      </Box>

      {/* back to top */}
      <FloatButton.BackTop duration={450} visibilityHeight={60} className={clsx(style.backTop)} />
    </Box>
  );
}

export default memo(HomePage);
