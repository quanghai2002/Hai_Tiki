import { memo } from 'react';
import PropTypes from 'prop-types';
import style from './LazyOrder.module.scss';
import clsx from 'clsx';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Skeleton } from 'antd';

// PropTypes
LazyOrder.propTypes = {};

function LazyOrder() {
  // ---HIỂN THỊ LAZY THEO ĐÚNG SỐ LƯỢNG SẢN PHẨM CHUẨN BỊ RENDER RA --
  return (
    <Box className={clsx(style.wrapLazyOrder)}>
      <Box>
        <Skeleton.Input active={true} className={clsx(style.lazy1)} />
        <Box className={clsx(style.wrapLazy2)}>
          <Skeleton.Image active={true} className={clsx(style.wrapLazy21)} />
          <Skeleton.Input active={true} className={clsx(style.wrapLazy22)} />
        </Box>
        <Skeleton.Input active={true} className={clsx(style.lazy3)} />
      </Box>
      <Box>
        <Skeleton.Input active={true} className={clsx(style.lazy1)} />
        <Box className={clsx(style.wrapLazy2)}>
          <Skeleton.Image active={true} className={clsx(style.wrapLazy21)} />
          <Skeleton.Input active={true} className={clsx(style.wrapLazy22)} />
        </Box>
        <Skeleton.Input active={true} className={clsx(style.lazy3)} />
      </Box>
    </Box>
  );
}

export default memo(LazyOrder);
