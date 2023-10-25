import { memo } from 'react';
import PropTypes from 'prop-types';
import style from './AdminDonHang.module.scss';
import clsx from 'clsx';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

// PropTypes
AdminDonHang.propTypes = {};

function AdminDonHang(props) {
  return (
    <Box>
      <h1>ĐÂY LÀ QUẢN LÝ DANH SÁCH ĐƠN HÀNG</h1>
    </Box>
  );
}

export default memo(AdminDonHang);
