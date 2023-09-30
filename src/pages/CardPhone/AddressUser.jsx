import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { memo } from 'react';
import clsx from 'clsx';
import style from './CardPhone.module.scss';

AddressUser.propTypes = {};

function AddressUser(props) {
  return (
    <Box>
      <Typography>Nhập địa chỉ giao hàng tại đây</Typography>
    </Box>
  );
}

export default memo(AddressUser);
