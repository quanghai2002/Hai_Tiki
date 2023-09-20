import PropTypes from 'prop-types';
import { memo } from 'react';
import style from './Info.module.scss';
import clsx from 'clsx';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

Info.propTypes = {};

function Info(props) {
  return (
    <Box>
      <Typography variant="h5"> Đây là trang thông tin tài khoản</Typography>
    </Box>
  );
}

export default memo(Info);
