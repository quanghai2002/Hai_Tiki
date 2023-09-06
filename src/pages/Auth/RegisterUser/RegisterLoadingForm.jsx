import React from 'react';
import PropTypes from 'prop-types';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import style from './Form.module.scss';
import clsx from 'clsx';
import Box from '@mui/material/Box';

RegisterLoadingForm.propTypes = {};

function RegisterLoadingForm(props) {
  return (
    <Box
      sx={{
        position: 'fixed',
        left: '50%',
        transform: 'translate(-50%,-50%)',
        top: '50%',
      }}
    >
      <Stack spacing={1} className={clsx(style.formRegisterLoading)}>
        {/* For variant="text", adjust the height via font-size */}
        <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
        {/* For other variants, adjust the size with `width` and `height` */}

        <Skeleton variant="text" width={210} height={60} className={clsx(style.loadingText2)} />
        <Skeleton variant="text" width={210} height={60} className={clsx(style.loadingText3)} />
        <Skeleton variant="text" width={210} height={60} className={clsx(style.loadingText4)} />
        <Skeleton variant="text" width={210} height={60} className={clsx(style.loadingText5)} />
        <Skeleton variant="text" width={210} height={60} className={clsx(style.loadingText6)} />
        <Skeleton variant="text" width={210} height={60} className={clsx(style.loadingText7)} />
        <Skeleton variant="text" width={210} height={60} className={clsx(style.loadingText8)} />
        <Skeleton variant="text" width={210} height={60} className={clsx(style.loadingText9)} />
        <Skeleton variant="rounded" width={210} height={60} className={clsx(style.loadingText10)} />
        <Skeleton variant="rounded" width={210} height={60} className={clsx(style.loadingText11)} />
      </Stack>
    </Box>
  );
}

export default RegisterLoadingForm;
