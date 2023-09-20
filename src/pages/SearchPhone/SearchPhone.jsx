/* eslint-disable react-refresh/only-export-components */
import PropTypes from 'prop-types';
import style from './SearchPhone.module.scss';
import { clsx } from 'clsx';
import { memo } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

SearchPhone.propTypes = {};

function SearchPhone(props) {
  return (
    <Box>
      <Typography variant="h5">Đây là trang tìm kiếm sản phẩm</Typography>
    </Box>
  );
}

export default memo(SearchPhone);
