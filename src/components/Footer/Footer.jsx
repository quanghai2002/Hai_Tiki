/* eslint-disable react-refresh/only-export-components */
import React from 'react';
import PropTypes from 'prop-types';
import style from './Footer.module.scss';
import clsx from 'clsx';
import { memo } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
Footer.propTypes = {};

function Footer(props) {
  return (
    <Box>
      <Typography variant="h6">Đây là Footer</Typography>
    </Box>
  );
}

export default memo(Footer);
