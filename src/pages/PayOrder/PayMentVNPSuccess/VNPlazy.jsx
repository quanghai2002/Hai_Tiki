import React from 'react';
import PropTypes from 'prop-types';
import style from './PayMentVNPSuccess.style.module.scss';
import clsx from 'clsx';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import { Skeleton } from 'antd';

VNPlazy.propTypes = {};

function VNPlazy(props) {
  return (
    <Box className={clsx(style.wrapVNPlazy)}>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, lg: 3 }}>
        <Grid lg={8}>
          <Skeleton.Input active={true} className={clsx(style.lazy1)} />
          <Skeleton.Input active={true} className={clsx(style.lazy2)} />
          <Skeleton.Input active={true} className={clsx(style.lazy2)} />
        </Grid>
        <Grid lg={4}>
          <Skeleton.Input active={true} className={clsx(style.lazy3)} />
        </Grid>
      </Grid>
    </Box>
  );
}

export default VNPlazy;
