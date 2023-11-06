import React from 'react';
import PropTypes from 'prop-types';
import style from './PayMentTienMat.style.module.scss';
import clsx from 'clsx';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import { Skeleton } from 'antd';

TienMatLazy.propTypes = {};

function TienMatLazy(props) {
  return (
    <Box className={clsx(style.wrapTienMatlazy)}>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, lg: 3 }}>
        <Grid xs={12} sm={12} md={12} lg={8}>
          <Skeleton.Input active={true} className={clsx(style.lazy1)} />
          <Skeleton.Input active={true} className={clsx(style.lazy2)} />
          <Skeleton.Input active={true} className={clsx(style.lazy2)} />
        </Grid>
        <Grid xs={12} sm={12} md={12} lg={4}>
          <Skeleton.Input active={true} className={clsx(style.lazy3)} />
        </Grid>
      </Grid>
    </Box>
  );
}

export default TienMatLazy;
