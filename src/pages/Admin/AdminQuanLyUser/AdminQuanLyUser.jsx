import { memo } from 'react';
import PropTypes from 'prop-types';
import style from './AdminQuanLyUser.module.scss';
import clsx from 'clsx';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

// PropTypes
AdminQuanLyUser.propTypes = {};

function AdminQuanLyUser(props) {
  return (
    <Box>
      <h1>ĐÂY LÀ QUẢN LÝ USER NGƯỜI DÙNG</h1>
    </Box>
  );
}

export default memo(AdminQuanLyUser);
