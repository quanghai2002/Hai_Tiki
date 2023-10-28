import React from 'react';
import PropTypes from 'prop-types';
import style from './AdminDonHang.module.scss';
import clsx from 'clsx';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Skeleton } from 'antd';
// PropTypes
AdminDonHangLazy.propTypes = {};

function AdminDonHangLazy(props) {
  return (
    <Box className={clsx(style.wrapAdminDonHangLazy)}>
      <Skeleton.Input active={true} />
      <Skeleton.Input active={true} className={clsx(style.donhangLazy1)} />
      <Skeleton.Input active={true} className={clsx(style.donhangLazy2)} />
      <Skeleton.Input active={true} className={clsx(style.donhangLazy3)} />
      <Skeleton.Input active={true} className={clsx(style.donhangLazy4)} />
    </Box>
  );
}

export default AdminDonHangLazy;
