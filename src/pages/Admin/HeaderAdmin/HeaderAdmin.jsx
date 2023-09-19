// // import * as React from 'react';
// import PropTypes from 'prop-types';
// import AppBar from '@mui/material/AppBar';
// import Avatar from '@mui/material/Avatar';
// import Button from '@mui/material/Button';
// import Grid from '@mui/material/Grid';
// import HelpIcon from '@mui/icons-material/Help';
// import IconButton from '@mui/material/IconButton';
// import Link from '@mui/material/Link';
// import MenuIcon from '@mui/icons-material/Menu';
// import NotificationsIcon from '@mui/icons-material/Notifications';
// import Tab from '@mui/material/Tab';
// import Tabs from '@mui/material/Tabs';
// import Toolbar from '@mui/material/Toolbar';
// import Tooltip from '@mui/material/Tooltip';
// import Typography from '@mui/material/Typography';
// import style from './HeaderAdmin.module.scss';
// import clsx from 'clsx';
// import Menu from '@mui/material/Menu';
// import MenuItem from '@mui/material/MenuItem';
// import ListItemIcon from '@mui/material/ListItemIcon';
// import Divider from '@mui/material/Divider';
// import PersonAdd from '@mui/icons-material/PersonAdd';
// import Settings from '@mui/icons-material/Settings';
// import Logout from '@mui/icons-material/Logout';
// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { logOut } from '~/redux/userSlice.js';
// import removeToken from '~/utils/removeToken.js';

// const lightColor = 'rgba(255, 255, 255, 0.7)';

// HeaderAdmin.propTypes = {
//   valueTab: PropTypes.number,
//   setValueTab: PropTypes.func,
//   onDrawerToggle: PropTypes.func,
// };

// function HeaderAdmin({ onDrawerToggle, valueTab, setValueTab }) {
//   // menu drop down
//   const [anchorEl, setAnchorEl] = useState(null);
//   const open = Boolean(anchorEl);
//   const handleClick = (event) => {
//     setAnchorEl(event.currentTarget);
//   };
//   const handleClose = () => {
//     setAnchorEl(null);
//   };

//   // handle logout
//   const naviagate = useNavigate();
//   const dispatch = useDispatch();
//   const handleLogout = () => {
//     console.log('đăng xuất');
//     dispatch(logOut());
//     // xóa cookie đi khi ấn vào đăng xuất
//     removeToken('tokenID');
//     removeToken('refreshToken');

//     // chuyển và trang đầu (/)
//     naviagate('/');
//   };

//   // set value để khi oncChange => tab
//   const handleChange = (event, newValue) => {
//     setValueTab(newValue);
//   };

//   // thông tin user
//   const user = useSelector((state) => state?.userAuth?.user?.data);
//   console.log({ user });
//   return (
//     <>
//       <AppBar component="div" color="secondary" position="static" elevation={0} sx={{ zIndex: 0 }}>
//         <Toolbar>
//           <Grid container alignItems="center" spacing={1}>
//             <Grid item xs>
//               <Typography color="inherit" variant="h5" component="h1" textAlign="center">
//                 Quản lý sản phẩm
//               </Typography>
//             </Grid>

//             <Grid item>
//               <Tooltip title="Account settings" arrow>
//                 <IconButton
//                   onClick={handleClick}
//                   size="small"
//                   color="inherit"
//                   sx={{ ml: 2 }}
//                   aria-controls={open ? 'account-menu' : undefined}
//                   aria-haspopup="true"
//                   aria-expanded={open ? 'true' : undefined}
//                 >
//                   <Avatar
//                     src={user?.img_url || user?.picture}
//                     ant="anh dai dien"
//                     sx={{ width: 32, height: 32 }}
//                   ></Avatar>
//                 </IconButton>
//               </Tooltip>

//               {/* menu */}
//               <Menu
//                 anchorEl={anchorEl}
//                 id="account-menu"
//                 open={open}
//                 onClose={handleClose}
//                 onClick={handleClose}
//                 PaperProps={{
//                   elevation: 0,
//                   sx: {
//                     overflow: 'visible',
//                     filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
//                     mt: 1.5,
//                     '& .MuiAvatar-root': {
//                       width: 32,
//                       height: 32,
//                       ml: -0.5,
//                       mr: 1,
//                     },
//                     '&:before': {
//                       content: '""',
//                       display: 'block',
//                       position: 'absolute',
//                       top: 0,
//                       right: 14,
//                       width: 10,
//                       height: 10,
//                       bgcolor: 'background.paper',
//                       transform: 'translateY(-50%) rotate(45deg)',
//                       zIndex: 0,
//                     },
//                   },
//                 }}
//                 transformOrigin={{ horizontal: 'right', vertical: 'top' }}
//                 anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
//               >
//                 <MenuItem onClick={handleLogout}>
//                   <ListItemIcon>
//                     <Logout fontSize="large" />
//                   </ListItemIcon>
//                   <Typography variant="h6">Logout</Typography>
//                 </MenuItem>
//               </Menu>
//             </Grid>
//           </Grid>
//         </Toolbar>
//       </AppBar>

//       <AppBar
//         component="div"
//         position="static"
//         // color={(theme) => theme.palette.secondary.light}
//         elevation={0}
//         sx={{ zIndex: 0 }}
//       >
//         <Tabs
//           value={valueTab}
//           textColor="inherit"
//           onChange={handleChange}
//           scrollButtons="auto"
//           variant="scrollable"
//           className={clsx(style.wrapTabs)}
//         >
//           <Tab className={clsx(style.actionPhone)} label="Danh sách sản phẩm" />
//           <Tab className={clsx(style.actionPhone)} label="Thêm sản phẩm" />
//           {/* <Tab className={clsx(style.actionPhone)} label="Sửa sản phẩm" />
//           <Tab className={clsx(style.actionPhone)} label="Xóa sản phẩm" /> */}
//         </Tabs>
//       </AppBar>
//     </>
//   );
// }

// export default HeaderAdmin;
