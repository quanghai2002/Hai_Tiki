import style from './AppBarAdmin.module.scss';
import clsx from 'clsx';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import React from 'react';
import PropTypes from 'prop-types';
import { Skeleton } from 'antd';
import { IconHomePageAdmin } from '~/assets/iconSVG';
import CircularProgress from '@mui/material/CircularProgress';

import logo from '~/assets/images/haiLoGoTiki6.png';

// Proptypes
AppBarAdminLazy.propTypes = {};

function AppBarAdminLazy(props) {
  return (
    <Box className={clsx(style.wrapAppBarLazy)}>
      {/* Trang chủ */}

      <Box className={clsx(style.wrapLogo)}>
        <img src={logo} alt="logo" className={clsx(style.imageLogo)} />
      </Box>

      <Skeleton.Input active={true} className={clsx(style.lazyAppbar)} />
      <CircularProgress className={clsx(style.progressLoading)} />
    </Box>
  );
}

export default AppBarAdminLazy;
