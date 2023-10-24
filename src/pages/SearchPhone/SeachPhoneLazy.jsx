import React from 'react';
import PropTypes from 'prop-types';
import style from './SearchPhone.module.scss';
import { clsx } from 'clsx';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import { Skeleton } from 'antd';

import OnePhone from '~/components/OnePhone';
import { StayCurrentLandscapeTwoTone } from '@mui/icons-material';

// PropTypes
SeachPhoneLazy.propTypes = {};

function SeachPhoneLazy(props) {
  return (
    <Box className={clsx(style.wrapSearchLazy)}>
      <Skeleton.Input active={true} className={clsx(style.lazy1)} />

      <Box className={clsx(style.lazyContent)}>
        <Grid
          md={12}
          lg={12}
          container
          rowSpacing={1}
          columnSpacing={{ xs: 1, sm: 2, md: 2, lg: 1 }}
          sx={{
            marginTop: '8px',
          }}
        >
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]?.map((item, index) => {
            return (
              <Grid lg={2.4} md={3} key={item}>
                <Skeleton.Image active={true} className={clsx(style.lazy2)} />
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </Box>
  );
}

export default SeachPhoneLazy;
