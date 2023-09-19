// import React, { useState } from 'react';
// import PropTypes from 'prop-types';
// import Typography from '@mui/material/Typography';
// import style from './Admin.module.scss';
// import clsx from 'clsx';
// import useMediaQuery from '@mui/material/useMediaQuery';
// import CssBaseline from '@mui/material/CssBaseline';
// import Box from '@mui/material/Box';
// import Link from '@mui/material/Link';
// import { createTheme, ThemeProvider } from '@mui/material/styles';

// import NavigationAdmin from './NavigationAdmin';
// import HeaderAdmin from './HeaderAdmin';
// import { AddPhone, DeletePhone, GetAllPhone, UpdatePhone } from './ContentAdmins';
// import { useDispatch } from 'react-redux';
// // action Thunk API
// import { getAllPhoneProductsNoPagination } from '~/redux/PhoneSlice.js';

// Admin.propTypes = {};

// let theme = createTheme({
//   palette: {
//     primary: {
//       light: '#63ccff',
//       main: '#009be5',
//       dark: '#006db3',
//     },
//   },
//   typography: {
//     h5: {
//       fontWeight: 500,
//       fontSize: 26,
//       letterSpacing: 0.5,
//     },
//   },
//   shape: {
//     borderRadius: 8,
//   },
//   components: {
//     MuiTab: {
//       defaultProps: {
//         disableRipple: true,
//       },
//     },
//   },
//   mixins: {
//     toolbar: {
//       minHeight: 48,
//     },
//   },
// });

// theme = {
//   ...theme,
//   components: {
//     MuiDrawer: {
//       styleOverrides: {
//         paper: {
//           backgroundColor: '#081627',
//         },
//       },
//     },
//     MuiButton: {
//       styleOverrides: {
//         root: {
//           textTransform: 'none',
//         },
//         contained: {
//           boxShadow: 'none',
//           '&:active': {
//             boxShadow: 'none',
//           },
//         },
//       },
//     },
//     MuiTabs: {
//       styleOverrides: {
//         root: {
//           marginLeft: theme.spacing(1),
//         },
//         indicator: {
//           height: 3,
//           borderTopLeftRadius: 3,
//           borderTopRightRadius: 3,
//           backgroundColor: theme.palette.common.white,
//         },
//       },
//     },
//     MuiTab: {
//       styleOverrides: {
//         root: {
//           textTransform: 'none',
//           margin: '0 16px',
//           minWidth: 0,
//           padding: 0,
//           [theme.breakpoints.up('md')]: {
//             padding: 0,
//             minWidth: 0,
//           },
//         },
//       },
//     },
//     MuiIconButton: {
//       styleOverrides: {
//         root: {
//           padding: theme.spacing(1),
//         },
//       },
//     },
//     MuiTooltip: {
//       styleOverrides: {
//         tooltip: {
//           borderRadius: 4,
//         },
//       },
//     },
//     MuiDivider: {
//       styleOverrides: {
//         root: {
//           backgroundColor: 'rgb(255,255,255,0.15)',
//         },
//       },
//     },
//     MuiListItemButton: {
//       styleOverrides: {
//         root: {
//           '&.Mui-selected': {
//             color: '#4fc3f7',
//           },
//         },
//       },
//     },
//     MuiListItemText: {
//       styleOverrides: {
//         primary: {
//           fontSize: 14,
//           fontWeight: theme.typography.fontWeightMedium,
//         },
//       },
//     },
//     MuiListItemIcon: {
//       styleOverrides: {
//         root: {
//           color: 'inherit',
//           minWidth: 'auto',
//           marginRight: theme.spacing(2),
//           '& svg': {
//             fontSize: 20,
//           },
//         },
//       },
//     },
//     MuiAvatar: {
//       styleOverrides: {
//         root: {
//           width: 32,
//           height: 32,
//         },
//       },
//     },
//   },
// };

// function Admin(props) {
//   const [mobileOpen, setMobileOpen] = React.useState(false);
//   const isSmUp = useMediaQuery(theme.breakpoints.up('sm'));

//   const handleDrawerToggle = () => {
//     setMobileOpen(!mobileOpen);
//   };

//   const drawerWidth = 256;
//   // active navigation
//   const [selectedindex, setSelectedIndex] = useState(0);

//   // set value để khi oncChange => tab => trong headerAdmin
//   const [valueTab, setValueTab] = useState(0);
//   // console.log({ valueTab });

//   // khi vào trang admin => get luôn tất cả các sản phẩm => lưu vào redux

//   const dispatch = useDispatch();

//   dispatch(getAllPhoneProductsNoPagination());

//   return (
//     <ThemeProvider theme={theme}>
//       <Box sx={{ display: 'flex', minHeight: '100vh' }}>
//         <CssBaseline />

//         <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}>
//           {/* navigation */}
//           <NavigationAdmin
//             PaperProps={{ style: { width: drawerWidth } }}
//             sx={{ display: { sm: 'block', xs: 'none' } }}
//             selectedindex={selectedindex}
//             setSelectedindex={setSelectedIndex}
//           />
//         </Box>

//         {/* nếu là chọn danh mục sản phẩm thì hiển thị danh mục sản phẩm => user hiển thị user */}
//         {selectedindex === 0 ? (
//           <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
//             <HeaderAdmin onDrawerToggle={handleDrawerToggle} valueTab={valueTab} setValueTab={setValueTab} />

//             {/* nội dung trang phụ thuộc vào tab chọn => valueTab , CRUD phone */}
//             <Box component="main" sx={{ flex: 1, py: 6, px: 4, bgcolor: '#eaeff1' }}>
//               {valueTab === 0 ? (
//                 <GetAllPhone />
//               ) : valueTab === 1 ? (
//                 <AddPhone />
//               ) : valueTab === 2 ? (
//                 <UpdatePhone />
//               ) : valueTab === 3 ? (
//                 // <DeletePhone />
//                 <></>
//               ) : (
//                 <></>
//               )}
//             </Box>
//           </Box>
//         ) : selectedindex === 1 ? (
//           <Box
//             sx={{
//               width: '100%',
//               height: '100vh',
//               display: 'flex',
//               alignItems: 'center',
//               justifyContent: 'center',
//             }}
//           >
//             <Typography variant="h3" textAlign="center">
//               Chức năng đang phát triển ...
//             </Typography>
//           </Box>
//         ) : (
//           <Typography variant="h3">Trong chế độ còn lại</Typography>
//         )}
//       </Box>
//     </ThemeProvider>
//   );
// }

// export default Admin;
