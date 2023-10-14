import React from 'react';
import PropTypes from 'prop-types';
import style from './PhoneDetailsLazy.module.scss';
import clsx from 'clsx';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Skeleton } from 'antd';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2

// PropTypes
PhoneDetailLazy.propTypes = {};

function PhoneDetailLazy(props) {
  return (
    <Box className={clsx(style.wrapPhoneDetailsLazy)}>
      {/* header lazy */}
      <Skeleton.Input active={true} size="large" className={clsx(style.headerLazy)} />
      {/* content lazy */}
      <Box className={clsx(style.content)}>
        <Grid container lg={12} rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 2, lg: 3 }}>
          <Grid lg={3.5}>
            {/* avartar slider */}
            <Skeleton.Image active={true} className={clsx(style.lazyImage)} />
          </Grid>
          <Grid lg={5}>
            <Box className={clsx(style.wrapContentDetalis)}>
              <Skeleton.Input active={true} size="large" className={clsx(style.content1)} />
              <Skeleton.Input active={true} size="large" className={clsx(style.content2)} />
              <Skeleton.Input active={true} size="large" className={clsx(style.content3)} />
              <Skeleton.Input active={true} size="large" className={clsx(style.content1)} />
              <Skeleton.Input active={true} size="large" className={clsx(style.content4)} />
              <Skeleton.Input active={true} size="large" className={clsx(style.content5)} />
            </Box>
          </Grid>
          <Grid lg={3.5}>
            <Box className={clsx(style.contentRight)}>
              <Skeleton.Input active={true} size="large" className={clsx(style.right1)} />
              <Skeleton.Input active={true} size="large" className={clsx(style.right2)} />
              <Skeleton.Input active={true} size="large" className={clsx(style.right3)} />
              <Skeleton.Input active={true} size="large" className={clsx(style.right4)} />
              <Skeleton.Input active={true} size="large" className={clsx(style.right5)} />
              <Skeleton.Input active={true} size="large" className={clsx(style.right5)} />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default PhoneDetailLazy;
