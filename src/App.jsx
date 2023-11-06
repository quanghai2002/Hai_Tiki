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
const RegisterForm = lazy(() => import('~/pages/Auth/RegisterUser'));
const LogInForm = lazy(() => import('~/pages/Auth/LoginUser'));
const LoginPhoneNumber = lazy(() => import('~/pages/Auth/LoginPhoneNumber'));

// CÁC PAGE CỦA ADMIN
const AdminTrangChuNavBar = lazy(() => import('~/pages/Admin/AdminTrangChuNavBar')); // đây là nơi có bav bar để hiện thi nd các page khác tại đây nhé
const AdminHomePage = lazy(() => import('~/pages/Admin/AdminHomePage'));
const AdminDonHang = lazy(() => import('~/pages/Admin/AdminDonHang'));
const AdminQuanLyUser = lazy(() => import('~/pages/Admin/AdminQuanLyUser'));
const GetAllSanPham = lazy(() => import('~/pages/Admin/AdminSanPham/GetAllSanPham'));
const AddSanPham = lazy(() => import('~/pages/Admin/AdminSanPham/AddSanPham'));

function App() {
  return (
    <Box
      sx={{
        backgroundColor: (theme) => {
          theme?.palette?.background?.default;
        },
        '@media (min-width: 601px) and (max-width: 900px)': {
          overflow: 'hidden',
        },
        '@media (max-width: 600px)': {
          overflow: 'hidden',
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
            <Suspense fallback={<HomePageLazy />}>
              <SearchPhone />
            </Suspense>
          }
        ></Route>
        {/* page Info */}
        <Route
          path="/info"
          element={
            <Suspense fallback={<HomePageLazy />}>
              <Info />
            </Suspense>
          }
        ></Route>
        {/* page Phone details */}
        <Route
          path="/phonedetails/:id"
          element={
            <Suspense fallback={<HomePageLazy />}>
              <PhoneDetails />
            </Suspense>
          }
        ></Route>

        {/* card Phone => page giỏ hàng */}
        <Route
          path="/card"
          element={
            <Suspense fallback={<HomePageLazy />}>
              <CardPhone />
            </Suspense>
          }
        ></Route>

        {/* pay ments=> page TRANG THANH TOÁN*/}
        <Route
          path="/payment"
          element={
            <Suspense fallback={<HomePageLazy />}>
              <PayOrder />
            </Suspense>
          }
        ></Route>

        {/* KẾT QUẢ THANH TOÁN VNP => thành công hoặc thất bại */}
        <Route
          path="/payment/vnpay_return"
          element={
            <Suspense fallback={<HomePageLazy />}>
              <PayOrderReturnVNP />
            </Suspense>
          }
        ></Route>

        {/* THANH TOÁN KHI NHẬN HÀNG */}
        <Route
          path="/payment/tienmat"
          element={
            <Suspense fallback={<HomePageLazy />}>
              <PayMentTienMat />
            </Suspense>
          }
        ></Route>
        {/*QUẢN LÝ ĐƠN HÀNG*/}
        <Route
          path="/order/history"
          element={
            <Suspense fallback={<HomePageLazy />}>
              <OrderHistory />
            </Suspense>
          }
        ></Route>
        {/*REGISTER Đăng kí tài khoản*/}
        <Route
          path="/register"
          element={
            <Suspense fallback={<HomePageLazy />}>
              <RegisterForm />
            </Suspense>
          }
        ></Route>
        {/*LOGIN Đăng Nhập*/}
        <Route
          path="/login"
          element={
            <Suspense fallback={<HomePageLazy />}>
              <LogInForm />
            </Suspense>
          }
        ></Route>
        {/*ĐĂNG NHẬP SỐ ĐIỆN THOẠI*/}
        <Route
          path="/loginphonenumber"
          element={
            <Suspense fallback={<HomePageLazy />}>
              <LoginPhoneNumber />
            </Suspense>
          }
        ></Route>
        {/*Page ADMIN NAVBAR +> các PAGE TIẾP THEO KẾ THỪA TỪ ĐÂY*/}
        <Route
          path="/admin"
          element={
            <Suspense fallback={<HomePageLazy />}>
              <AdminTrangChuNavBar />
            </Suspense>
          }
        >
          {/* đây là TRANG CHỦ admin */}
          <Route
            path="home"
            element={
              <Suspense fallback={<HomePageLazy />}>
                <AdminHomePage />
              </Suspense>
            }
          />
          {/* đây là trang chủ QUẢN LÝ ĐƠN HÀNG ADMIN */}
          <Route
            path="order"
            element={
              <Suspense fallback={<HomePageLazy />}>
                <AdminDonHang />
              </Suspense>
            }
          />
          {/* đây là trang chủ QUẢN LÝ USER ADMIN */}
          <Route
            path="user"
            element={
              <Suspense fallback={<HomePageLazy />}>
                <AdminQuanLyUser />
              </Suspense>
            }
          />
          {/* đây là trang LẤY TẤT CẢ CÁC SẢN PHẨM*/}
          <Route
            path="getallproducts"
            element={
              <Suspense fallback={<HomePageLazy />}>
                <GetAllSanPham />
              </Suspense>
            }
          ></Route>

          {/* đây là trang THÊM SẢN PHẨM*/}
          <Route
            path="addproducts"
            element={
              <Suspense fallback={<HomePageLazy />}>
                <AddSanPham />
              </Suspense>
            }
          />
        </Route>
        {/* page not found */}
        <Route
          path="*"
          element={
            <Suspense fallback={<HomePageLazy />}>
              <NotFound />
            </Suspense>
          }
        ></Route>
      </Routes>
    </Box>
  );
}

export default App;
