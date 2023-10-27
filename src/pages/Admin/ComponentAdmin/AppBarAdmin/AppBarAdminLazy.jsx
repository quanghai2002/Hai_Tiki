import style from './AppBarAdmin.module.scss';
import clsx from 'clsx';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import React from 'react';
import PropTypes from 'prop-types';
import { Skeleton } from 'antd';

// Proptypes
AppBarAdminLazy.propTypes = {};

function AppBarAdminLazy(props) {
  return (
    <Box className={clsx(style.wrapAppBarLazy)}>
      <Skeleton.Input active={true} className={clsx(style.lazyAppbar)} />
    </Box>
  );
}

export default AppBarAdminLazy;
