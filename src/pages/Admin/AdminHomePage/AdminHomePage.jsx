import { memo } from 'react';
import PropTypes from 'prop-types';
import style from './AdminHomePage.module.scss';
import clsx from 'clsx';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

// PropTypes
AdminHomePage.propTypes = {};

function AdminHomePage(props) {
  return (
    <Box>
      <h1>TRANG CHỦ ADMIN</h1>
    </Box>
  );
}

export default memo(AdminHomePage);
