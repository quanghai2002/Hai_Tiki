import { memo, lazy } from 'react';
import PropTypes from 'prop-types';
import style from './OrderHistory.module.scss';
import clsx from 'clsx';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import { Link } from 'react-router-dom';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Avatar from '@mui/material/Avatar';
import PersonIcon from '@mui/icons-material/Person';
import { Tabs } from 'antd';
import BackTop from '~/components/BackTop';

import { IconHisToryOrder } from '~/assets/iconSVG.jsx';
const Header = lazy(() => import('~/components/Header'));
const Footer = lazy(() => import('~/components/Footer'));

// const AllOrder = lazy(() => import('./AllOrder'));
// const ChoXacNhan = lazy(() => import('./ChoXacNhan'));
// const DangVanChuyen = lazy(() => import('./DangVanChuyen'));
// const DaGiao = lazy(() => import('./DaGiao'));
// const DaHuy = lazy(() => import('./DaHuy'));
import AllOrder from './AllOrder';
import ChoXacNhan from './ChoXacNhan';
import DangVanChuyen from './DangVanChuyen';
import DaGiao from './DaGiao';
import DaHuy from './DaHuy';

//PropTypes
OrderHistory.propTypes = {};

function OrderHistory(props) {
  // -----------------CÁC TABS ĐỂ XEM THÔNG TIN ĐƠN HÀNG -----------
  const onChangeTabs = (key) => {
    // console.log(key);
  };
  const items = [
    {
      key: 1,
      label: 'Tất cả đơn',
      // disabled: true,
      children: <AllOrder />,
    },
    {
      key: 2,
      label: 'Chờ xác nhận',
      children: <ChoXacNhan />,
    },
    {
      key: 3,
      label: 'Đang vận chuyển',
      children: <DangVanChuyen />,
    },
    {
      key: 4,
      label: 'Đã giao',
      children: <DaGiao />,
    },
    {
      key: 5,
      label: 'Đã huỷ',
      children: <DaHuy />,
    },
  ];

  // ----RETURN JSX -----------
  return (
    <Box className={clsx(style.wrapOrderHistory)}>
      {/* Header Order History*/}
      <Header />

      {/* main order History */}
      <Box className={clsx(style.mainOrderHistory)}>
        <Box className={clsx(style.contentOrderHistory)}>
          {/* breadcrumb */}
          <Box className={clsx(style.breadcrumb)}>
            <Link to="/" className={clsx(style.linkBreadcrumb)}>
              <Typography
                className={clsx(style.text)}
                color={(theme) => theme?.palette?.text?.primary6}
                sx={{
                  '&:hover': {
                    textDecoration: 'underline',
                  },
                }}
              >
                Trang chủ
              </Typography>
            </Link>

            <ArrowForwardIosIcon
              className={clsx(style.icon)}
              sx={{
                color: (theme) => theme?.palette?.text?.primary6,
              }}
            />
            <Link to="/order/history" className={clsx(style.linkBreadcrumb)}>
              <Typography
                className={clsx(style.text)}
                color={(theme) => theme?.palette?.text?.primary4}
                sx={{
                  fontWeight: '500',
                }}
              >
                Quản lý đơn hàng
              </Typography>
            </Link>
          </Box>

          {/* content Order history */}
          <Box className={clsx(style.wrapContentOrderHistory)}>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, lg: 2 }}>
              {/* slider bar account */}
              <Grid lg={2.6}>
                <Box className={clsx(style.sideBar)}>
                  {/* box avartar */}
                  <Box className={clsx(style.headerAvartar)}>
                    <Avatar
                      srcSet="https://lh3.googleusercontent.com/a-/AAuE7mA3FHFGm1V5aBwIFMBH-7jfUw-1DAZRfGcKqZqlzA"
                      className={clsx(style.avatar)}
                    />
                    <Box className={clsx(style.infoUser)}>
                      <Typography className={clsx(style.text1)}>Tài khoản của</Typography>
                      <Typography className={clsx(style.text2)}>Nguyễn Quang Hải</Typography>
                    </Box>
                  </Box>

                  {/* Box select */}
                  <Box className={clsx(style.selectSideBar)}>
                    <Link className={clsx(style.link)} to="/info">
                      <Box className={clsx(style.liSidebar)}>
                        <PersonIcon className={clsx(style.icon)} />
                        <Typography className={clsx(style.text)} color={(theme) => theme?.palette?.text?.primary4}>
                          Thông tin tài khoản
                        </Typography>
                      </Box>
                    </Link>
                    <Link className={clsx(style.link)} to="/order/history">
                      <Box
                        className={clsx(style.liSidebar, style.active)}
                        sx={{
                          '& svg': {
                            width: '24px',
                            height: '24px',
                            color: 'rgb(155, 155, 155)',
                          },
                        }}
                      >
                        <IconHisToryOrder className={clsx(style.icon)} />
                        <Typography className={clsx(style.text)} color={(theme) => theme?.palette?.text?.primary4}>
                          Quản lý đơn hàng
                        </Typography>
                      </Box>
                    </Link>
                  </Box>
                </Box>
              </Grid>

              {/* container order history*/}
              <Grid lg={9.4}>
                <Box className={clsx(style.container)}>
                  {/* header */}
                  <Typography className={clsx(style.label)}>Đơn hàng của tôi</Typography>

                  {/* content TAB */}
                  <Box className={clsx(style.wrapTabs)}>
                    <Tabs
                      defaultActiveKey={1}
                      items={items}
                      onChange={onChangeTabs}
                      className={clsx(style.tabs)}
                      animated={{
                        inkBar: true,
                        tabPane: true,
                      }}
                    />
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Box>
      {/* Footer */}
      <Footer />

      {/* Back top */}
      <BackTop />
    </Box>
  );
}

export default memo(OrderHistory);
