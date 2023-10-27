import React from 'react';
import PropTypes from 'prop-types';
import style from './AdminHomePage.module.scss';
import clsx from 'clsx';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Skeleton } from 'antd';
// Proptypes
AdminHomePageLazy.propTypes = {};

function AdminHomePageLazy(props) {
  return (
    <Box className={clsx(style.wrapHomePageAdminLazy)}>
      <Skeleton.Input active={true} className={clsx(style.adminLazy1)} />
      <Box className={clsx(style.wrapAdminLazy2)}>
        <Skeleton.Input active={true} className={clsx(style.adminLazy2)} />
        <Skeleton.Input active={true} className={clsx(style.adminLazy2)} />
      </Box>
      <Skeleton.Input active={true} className={clsx(style.adminLazy3)} />
      <Skeleton.Input active={true} className={clsx(style.adminLazy4)} />
    </Box>
  );
}

export default AdminHomePageLazy;
