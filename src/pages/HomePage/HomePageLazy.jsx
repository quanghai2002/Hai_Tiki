import React from 'react';
import PropTypes from 'prop-types';
import style from './HomePage.module.scss';
import clsx from 'clsx';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import LinearProgress from '@mui/material/LinearProgress';

HomePageLazy.propTypes = {};

function HomePageLazy(props) {
  return (
    <Box>
      {/* thanh progress auto khi hiển trang đó đang được tải */}
      <LinearProgress />
      <Skeleton variant="text" sx={{ fontSize: '5rem' }} height={86} />

      <Box className={clsx(style.wrapContent)}>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 2, lg: 3 }}>
          <Grid xs={0} sm={4} md={4} lg={2.2}>
            <Skeleton variant="rounded" width={210} height={60} />
          </Grid>

          <Grid container xs={12} sm={4} md={8} lg={9.8}>
            <Grid xs={4} sm={4} md={6} lg={12}>
              <Skeleton variant="rounded" width={'100%'} height={100} />
            </Grid>
            <Grid xs={4} sm={4} md={6} lg={12}>
              <Skeleton variant="rounded" width={'100%'} height={100} />
            </Grid>

            <Grid container xs={6} sm={4} md={6} lg={12}>
              <Grid xs={6} sm={4} md={6} lg={2.4}>
                <Skeleton variant="rounded" width={'100%'} height={130} />
              </Grid>
              <Grid xs={6} sm={4} md={6} lg={2.4}>
                <Skeleton variant="rounded" width={'100%'} height={130} />
              </Grid>
              <Grid xs={6} sm={4} md={6} lg={2.4}>
                <Skeleton variant="rounded" width={'100%'} height={130} />
              </Grid>
              <Grid xs={6} sm={4} md={6} lg={2.4}>
                <Skeleton variant="rounded" width={'100%'} height={130} />
              </Grid>
              <Grid xs={6} sm={4} md={6} lg={2.4}>
                <Skeleton variant="rounded" width={'100%'} height={130} />
              </Grid>
              <Grid xs={6} sm={4} md={6} lg={2.4}>
                <Skeleton variant="rounded" width={'100%'} height={130} />
              </Grid>
              <Grid xs={6} sm={4} md={6} lg={2.4}>
                <Skeleton variant="rounded" width={'100%'} height={130} />
              </Grid>
              <Grid xs={6} sm={4} md={6} lg={2.4}>
                <Skeleton variant="rounded" width={'100%'} height={130} />
              </Grid>
              <Grid xs={6} sm={4} md={6} lg={2.4}>
                <Skeleton variant="rounded" width={'100%'} height={130} />
              </Grid>
              <Grid xs={6} sm={4} md={6} lg={2.4}>
                <Skeleton variant="rounded" width={'100%'} height={130} />
              </Grid>
            </Grid>
            <Grid xs={6} sm={4} md={6} lg={12}>
              <Skeleton variant="rounded" width={'100%'} height={100} />
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default HomePageLazy;
