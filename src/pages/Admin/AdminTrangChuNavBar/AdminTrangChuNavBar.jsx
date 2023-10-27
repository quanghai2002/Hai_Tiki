import { memo } from 'react';
import PropTypes from 'prop-types';
import style from './AdminTrangChuNavBar.module.scss';
import clsx from 'clsx';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2

import AppBarAdmin from '../ComponentAdmin/AppBarAdmin';
import BackTop from '~/components/BackTop';
import { Outlet } from 'react-router-dom';
import HeaderAdmin from '../ComponentAdmin/HeaderAdmin';

// Proptypes
AdminTrangChuNavBar.propTypes = {};

function AdminTrangChuNavBar(props) {
  return (
    <Box className={clsx(style.WrapAdminTrangChuNavBar)}>
      <Grid
        container
        rowSpacing={1}
        columnSpacing={{ lg: 0 }}
        sx={{
          width: '100%',
        }}
      >
        {/* APP BAR ADMIN*/}
        <Grid
          lg={2}
          sx={{
            width: 'unset !important',
            padding: '0 !important',
            minHeight: '100vh !important',
          }}
        >
          <AppBarAdmin />
        </Grid>

        {/* Content AdminTrangChu */}
        <Grid
          lg={10}
          sx={{
            flexGrow: '1 !important',
          }}
        >
          <Box className={clsx(style.wrapContentAdminTrangChuNavbar)}>
            {/* Phần header luôn được hiển thị ở đây */}
            <HeaderAdmin />

            {/* Hiển thị nội dung của các page qua Outlet tại đây */}
            <Outlet></Outlet>
            {/* BackTop */}
            <BackTop />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default memo(AdminTrangChuNavBar);
