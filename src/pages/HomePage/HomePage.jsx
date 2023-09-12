import React, { Suspense, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import style from './HomePage.module.scss';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Tooltip from '@mui/material/Tooltip';
import { Link, useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Unstable_Grid2';
import DarkMode from './DarkMode';
import Card from './Card';
import axiosClient from '~/apis/axiosClient.js';
import removeToken from '~/utils/removeToken.js';

import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
// action redux
import { logOut } from '~/redux/userSlice.js';
import ReactDOM from 'react-dom';
import ReactPaginate from 'react-paginate';
import LazyLoaderApp from '~/components/LazyLoaderApp';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';

HomePage.propTypes = {};

function HomePage(props) {
  const naviage = useNavigate();
  const dispatch = useDispatch();
  // get lấy thông tin use => trong redux => nếu có hiển thị đăng xuất.
  // không thì hiển thị bình thường
  const isUser = useSelector((state) => state.userAuth?.user?.data);
  const isAdmin = useSelector((state) => state.userAuth?.user?.data?.admin);

  const avartarUser = isUser?.img_url;
  const firstNameUser = isUser?.username.slice(0, 2);

  // data render phone
  const [phone, setPhone] = useState({});
  const [page, setPage] = useState(1);
  // console.log({ phone });

  // call API => get data
  useEffect(() => {
    // call api
    axiosClient
      .get(`/phone?page=${page}&size=12`)
      .then((response) => {
        // console.log(response);
        setPhone(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [page]);

  // react panination

  // khi click thay đổi => đổi page => call lại API => lấy đến page khác
  const handlePageClick = (event) => {
    const pageCurrent = event.selected + 1;
    setPage(pageCurrent);
  };

  // avartar dropdown
  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Box>
      <Box className={clsx(style.header)}>
        <AppBar position="static">
          <Toolbar
            variant="dense"
            className={clsx(style.navbar)}
            sx={{
              backgroundColor: (theme) => theme.palette.primary,
            }}
          >
            <DarkMode />

            <Tooltip className={clsx(style.tooltip)} title="Nhóm 1 PM25.10" arrow>
              <h1 className={clsx(style.navItem)}>Nhóm 1 PM25.10</h1>
            </Tooltip>

            <Box className={clsx(style.navItem, style.navAuth)}>
              <Tooltip className={clsx(style.tooltip)} title="Đăng Kí" arrow>
                <Link to="/register" className={clsx(style.linkAuth)}>
                  <h1 className={clsx(style.navItem)}>Đăng Kí</h1>
                </Link>
              </Tooltip>

              {/* <Tooltip className={clsx(style.tooltip)} title="Đăng Nhập" arrow>
                <Link className={clsx(style.linkAuth)} to="/login">
                  <h1
                    className={clsx(style.navItem)}
                    style={{
                      marginLeft: '30px',
                    }}
                  >
                    Đăng Nhập
                  </h1>
                </Link>
              </Tooltip> */}
            </Box>
            {Boolean(isUser) && (
              <>
                {/* hiển thị khung avartar khi đăng nhập */}
                <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                  <Tooltip title="Account settings" arrow>
                    <IconButton
                      onClick={handleClick}
                      size="small"
                      sx={{ ml: 2 }}
                      aria-controls={open ? 'account-menu' : undefined}
                      aria-haspopup="true"
                      aria-expanded={open ? 'true' : undefined}
                    >
                      <Avatar sx={{ width: 32, height: 32 }} src={avartarUser ? avartarUser : ''}>
                        {!avartarUser && firstNameUser}
                      </Avatar>
                    </IconButton>
                  </Tooltip>
                </Box>

                {/* menu drop dropdown */}

                <Menu
                  anchorEl={anchorEl}
                  id="account-menu"
                  open={open}
                  onClose={handleClose}
                  onClick={handleClose}
                  className={clsx(style.menuItemDropDown)}
                  PaperProps={{
                    elevation: 0,
                    sx: {
                      overflow: 'visible',
                      filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                      mt: 1.5,
                      '& .MuiAvatar-root': {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                      },
                      '&:before': {
                        content: '""',
                        display: 'block',
                        position: 'absolute',
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        bgcolor: 'background.paper',
                        transform: 'translateY(-50%) rotate(45deg)',
                        zIndex: 0,
                      },
                    },
                  }}
                  transformOrigin={{ horizontal: 'center', vertical: 'top' }}
                  anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}
                >
                  <MenuItem onClick={handleClose}>
                    <ListItemIcon>
                      <Logout
                        fontSize="large"
                        sx={{
                          fontSize: '2rem',
                        }}
                      />
                    </ListItemIcon>
                    <Typography
                      variant="h5"
                      onClick={() => {
                        console.log('đăng xuất');
                        dispatch(logOut());
                        // xóa token trong cookies đi
                        removeToken('refreshToken');
                        removeToken('tokenID');
                        naviage('/');
                      }}
                    >
                      Đăng xuất
                    </Typography>
                  </MenuItem>
                </Menu>

                {isAdmin && (
                  <Tooltip className={clsx(style.tooltip)} title="Trang quản trị" arrow>
                    <Link to="/admin" className={clsx(style.linkAdmin)}>
                      <Box>
                        <h1 className={clsx(style.navItem)}>Trang Quản Trị</h1>
                      </Box>
                    </Link>
                  </Tooltip>
                )}
              </>
            )}
          </Toolbar>
        </AppBar>

        {/* card item */}
        {/* eslint-disable-next-line no-extra-boolean-cast */}
        {Boolean(phone?.data) ? (
          <Box
            sx={{
              maxWidth: '1200px',
              margin: '31px auto',
            }}
            className={clsx(style.wrapCard)}
          >
            <Grid container spacing={{ xs: 2, md: 3, lg: 1 }}>
              {phone?.data.map((phoneItem) => {
                return (
                  <Grid key={phoneItem._id} xs={6} md={4} lg={2}>
                    <Card phoneItem={phoneItem} />
                  </Grid>
                );
              })}
            </Grid>
          </Box>
        ) : (
          <LazyLoaderApp />
        )}

        {/* react panination */}
        {/*  eslint-disable-next-line no-extra-boolean-cast */}
        {Boolean(phone?.data) ? (
          <Box className={clsx(style.wrapPagination)}>
            <ReactPaginate
              previousLabel={<ArrowBackIosIcon />} // nhãn cho nút trước
              nextLabel={<ArrowForwardIosIcon />} // nhãn cho nút sau
              onPageChange={handlePageClick}
              pageRangeDisplayed={1} // phạm vi các trang được hiển thị
              marginPagesDisplayed={1} // số trang hiển thị cho lề bên trái
              pageCount={phone?.totalPages} // tổng số trang
              pageClassName="page-item"
              pageLinkClassName="page-link"
              previousClassName="page-item"
              previousLinkClassName="page-link"
              nextClassName="page-item"
              nextLinkClassName="page-link"
              breakLabel="..." // nhãn cho dấu chấm lửng
              breakClassName="page-item"
              breakLinkClassName="page-link"
              containerClassName="pagination"
              activeClassName="active"
              renderOnZeroPageCount={null}
              className={clsx(style.pagination)}
            />
          </Box>
        ) : (
          <></>
        )}
      </Box>
    </Box>
  );
}

export default HomePage;
