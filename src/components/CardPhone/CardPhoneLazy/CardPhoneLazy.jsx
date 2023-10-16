import React from 'react';
import PropTypes from 'prop-types';
import style from './CardPhoneLazy.module.scss';
import clsx from 'clsx';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import { Skeleton } from 'antd';

// propTypes
CardPhoneLazy.propTypes = {};

function CardPhoneLazy(props) {
  //-------------SỐ LƯỢNG PHẨN TỬ ĐỂ RENDER RA LAZY--------
  const arrayLazy = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
  return (
    <>
      {arrayLazy.map((item, index) => {
        return (
          <Grid lg={2.4} key={index}>
            <Skeleton.Image active={true} className={clsx(style.phoneLazy)} />
          </Grid>
        );
      })}
    </>
  );
}

export default CardPhoneLazy;
