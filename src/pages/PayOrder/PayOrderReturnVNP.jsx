import { useEffect, memo, useState, lazy } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import axiosClient from '~/apis/axiosClient';
import { useLocation } from 'react-router-dom';

const PayMentVNPSuccess = lazy(() => import('./PayMentVNPSuccess'));
const PayMentError = lazy(() => import('./PayMentError'));

PayOrderReturnVNP.propTypes = {};

function PayOrderReturnVNP(props) {
  // -----------------------------KIỂM TRA XEM ĐƠN HÀNG CÓ THANH TOÁN VNP THÀNH CÔNG HAY KHÔNG -------------------------------
  const [isSuccess, setIsSuccess] = useState('');
  // console.log(isSuccess);

  useEffect(() => {
    axiosClient
      .get(`/payment/vnpay_return?${window?.location?.href?.split('?')[1]}`)
      .then((response) => {
        console.log('kết quả giao dịch THANH TOÁN', response?.code);
        if (response?.code === '00') {
          setIsSuccess(true);
        } else {
          setIsSuccess(false);
        }
      })
      .catch((err) => {
        // console.log('error', err);
        setIsSuccess(false);
      });
  }, [isSuccess]);
  return isSuccess === '' ? <></> : <Box>{isSuccess === true ? <PayMentVNPSuccess /> : <PayMentError />}</Box>;
}

export default memo(PayOrderReturnVNP);
