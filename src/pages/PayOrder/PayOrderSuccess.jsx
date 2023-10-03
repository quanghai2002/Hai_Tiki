import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Box, Typography } from '@mui/material';
import axiosClient from '~/apis/axiosClient';
import { useState } from 'react';

PayOrderSuccess.propTypes = {};

function PayOrderSuccess(props) {
  // console.log('window.location.pathname', window.location.href?.split('?')[1]);
  const [test, setTest] = useState(true);
  console.log(test);

  useEffect(() => {
    axiosClient
      .get(`/payment/vnpay_return?${window.location.href?.split('?')[1]}`)
      .then((response) => {
        console.log('kết quả giao dịch THANH TOÁN', response);
        if (response?.code === 97) {
          setTest(false);
        } else {
          setTest(true);
        }
      })
      .catch((err) => {
        // console.log('error', err);
        setTest(false);
      });
  });
  return (
    <Box>
      {test ? (
        <Typography variant="h3" color="green">
          Thanh Toán Thành Công
        </Typography>
      ) : (
        <Typography variant="h3" color="red">
          Thanh Toán Thất Bại
        </Typography>
      )}
    </Box>
  );
}

export default PayOrderSuccess;
