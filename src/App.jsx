import Button from '@mui/material/Button';
import { useState, lazy } from 'react';
import { styled } from '@mui/material/styles';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Typography from '@mui/material/Typography';
import { useColorScheme } from '@mui/material/styles';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import Tooltip from '@mui/material/Tooltip';
import { Route, Routes } from 'react-router-dom';
import { Suspense } from 'react';
import LinearProgress from '@mui/material/LinearProgress';

import { HomePageLazy } from '~/pages/HomePage';
const HomePage = lazy(() => import('~/pages/HomePage'));
const SearchPhone = lazy(() => import('~/pages/SearchPhone'));
const NotFound = lazy(() => import('~/pages/404NotFound'));
const Info = lazy(() => import('~/pages/Info'));
const PhoneDetails = lazy(() => import('~/pages/PhoneDetails'));
const CardPhone = lazy(() => import('~/pages/CardPhone'));
const PayOrder = lazy(() => import('~/pages/PayOrder'));
const PayOrderReturnVNP = lazy(() => import('~/pages/PayOrder/PayOrderReturnVNP.jsx'));
const PayMentTienMat = lazy(() => import('~/pages/PayOrder/PayMentTienMat'));
const OrderHistory = lazy(() => import('~/pages/OrderHistory')); // quản lý đơn hàng

function App() {
  return (
    <Box
      sx={{
        backgroundColor: (theme) => {
          theme?.palette?.background?.default;
        },
      }}
    >
      {/* react router DOM */}
      <Routes>
        {/* home page */}
        <Route
          path="/"
          element={
            <Suspense fallback={<HomePageLazy />}>
              <HomePage />
            </Suspense>
          }
        ></Route>
        {/* page search */}
        <Route
          path="/search"
          element={
            <Suspense fallback={<LinearProgress />}>
              <SearchPhone />
            </Suspense>
          }
        ></Route>
        {/* page Info */}
        <Route
          path="/info"
          element={
            <Suspense fallback={<LinearProgress />}>
              <Info />
            </Suspense>
          }
        ></Route>
        {/* page Phone details */}
        <Route
          path="/phonedetails/:id"
          element={
            <Suspense fallback={<LinearProgress />}>
              <PhoneDetails />
            </Suspense>
          }
        ></Route>

        {/* card Phone => page giỏ hàng */}
        <Route
          path="/card"
          element={
            <Suspense fallback={<LinearProgress />}>
              <CardPhone />
            </Suspense>
          }
        ></Route>

        {/* pay ments=> page TRANG THANH TOÁN*/}
        <Route
          path="/payment"
          element={
            <Suspense fallback={<LinearProgress />}>
              <PayOrder />
            </Suspense>
          }
        ></Route>

        {/* KẾT QUẢ THANH TOÁN VNP => thành công hoặc thất bại */}
        <Route
          path="/payment/vnpay_return"
          element={
            <Suspense fallback={<LinearProgress />}>
              <PayOrderReturnVNP />
            </Suspense>
          }
        ></Route>

        {/* THANH TOÁN KHI NHẬN HÀNG */}
        <Route
          path="/payment/tienmat"
          element={
            <Suspense fallback={<LinearProgress />}>
              <PayMentTienMat />
            </Suspense>
          }
        ></Route>
        {/*QUẢN LÝ ĐƠN HÀNG*/}
        <Route
          path="/order/history"
          element={
            <Suspense fallback={<LinearProgress />}>
              <OrderHistory />
            </Suspense>
          }
        ></Route>
        {/* page not found */}
        <Route
          path="*"
          element={
            <Suspense fallback={<LinearProgress />}>
              <NotFound />
            </Suspense>
          }
        ></Route>
      </Routes>
    </Box>
  );
}

export default App;
