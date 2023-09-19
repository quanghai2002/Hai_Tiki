// import PropTypes from 'prop-types';
// import { alpha } from '@mui/material/styles';
// import Box from '@mui/material/Box';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TablePagination from '@mui/material/TablePagination';
// import TableRow from '@mui/material/TableRow';
// import TableSortLabel from '@mui/material/TableSortLabel';
// import Toolbar from '@mui/material/Toolbar';
// import Typography from '@mui/material/Typography';
// import Paper from '@mui/material/Paper';
// import Checkbox from '@mui/material/Checkbox';
// import IconButton from '@mui/material/IconButton';
// import Tooltip from '@mui/material/Tooltip';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Switch from '@mui/material/Switch';
// import DeleteIcon from '@mui/icons-material/Delete';
// import FilterListIcon from '@mui/icons-material/FilterList';
// import { visuallyHidden } from '@mui/utils';
// import clsx from 'clsx';
// import style from './GetAllPhone.module.scss';
// import { forwardRef, useMemo, useState } from 'react';
// import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
// import BorderColorIcon from '@mui/icons-material/BorderColor';
// import { useDispatch, useSelector } from 'react-redux';
// import Button from '@mui/material/Button';
// import Dialog from '@mui/material/Dialog';
// import DialogActions from '@mui/material/DialogActions';
// import DialogContent from '@mui/material/DialogContent';
// import DialogContentText from '@mui/material/DialogContentText';
// import DialogTitle from '@mui/material/DialogTitle';
// import Slide from '@mui/material/Slide';
// import { deletePhone, getAllPhoneProductsNoPagination } from '~/redux/PhoneSlice.js';
// import { useNavigate } from 'react-router-dom';
// import { Alert, Space, Spin } from 'antd';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { Modal } from 'antd';
// import AddPhone from '~/pages/Admin/ContentAdmins/AddPhone';
// import phoneApi from '~/apis/phoneApi.js';

// // so sánh giảm dần
// function descendingComparator(a, b, orderBy) {
//   if (b[orderBy] < a[orderBy]) {
//     return -1;
//   }
//   if (b[orderBy] > a[orderBy]) {
//     return 1;
//   }
//   return 0;
// }

// function getComparator(order, orderBy) {
//   return order === 'desc'
//     ? (a, b) => descendingComparator(a, b, orderBy)
//     : (a, b) => -descendingComparator(a, b, orderBy);
// }

// function stableSort(array, comparator) {
//   const stabilizedThis = array && array.map((el, index) => [el, index]);
//   stabilizedThis?.sort((a, b) => {
//     const order = comparator(a[0], b[0]);
//     if (order !== 0) {
//       return order;
//     }
//     return a[1] - b[1];
//   });
//   return stabilizedThis?.map((el) => el[0]);
// }

// // header table => T header
// const headCells = [
//   {
//     id: 'name',
//     numeric: false,
//     disablePadding: true,
//     label: 'Tên sản phẩm',
//     width: 300,
//     align: 'right',
//     sticky: true,
//   },
//   {
//     id: 'price',
//     numeric: true,
//     disablePadding: false,
//     label: 'Giá sản phẩm',
//     width: 170,
//     align: 'right',
//   },
//   {
//     id: 'ram',
//     numeric: true,
//     disablePadding: false,
//     label: 'RAM',
//   },
//   {
//     id: 'ROM',
//     numeric: true,
//     disablePadding: false,
//     label: 'ROM',
//   },
//   {
//     id: 'kichthuocmanhinh',
//     numeric: true,
//     disablePadding: false,
//     label: 'Kích thước màn hình',
//   },
//   {
//     id: 'danhmuc',
//     numeric: true,
//     disablePadding: false,
//     label: 'Danh mục sản phẩm',
//   },
//   {
//     id: 'khuyemai',
//     numeric: true,
//     disablePadding: false,
//     label: 'Khuyễn Mãi',
//   },
//   {
//     id: 'description',
//     numeric: true,
//     disablePadding: false,
//     label: 'Mô tả sản phẩm ',
//   },
//   {
//     id: 'pin',
//     numeric: true,
//     disablePadding: false,
//     label: 'Dung lượng pin',
//   },
//   {
//     id: 'mausac',
//     numeric: true,
//     disablePadding: false,
//     label: 'Màu sắc', // bonho
//   },
//   {
//     id: 'bonho',
//     numeric: true,
//     disablePadding: false,
//     label: 'Bộ nhớ',
//   },
//   {
//     id: 'camera',
//     numeric: true,
//     disablePadding: false,
//     label: 'Camera', //
//   },
//   {
//     id: 'hedieuhanh',
//     numeric: true,
//     disablePadding: false,
//     label: 'Hệ điều hành',
//   },
//   {
//     id: 'coutPhone',
//     numeric: true,
//     disablePadding: false,
//     label: 'Số lượng sản phẩm', //
//   },
//   {
//     id: 'url',
//     numeric: true,
//     disablePadding: false,
//     label: 'URL sản phẩm', //
//   },
//   {
//     id: 'action',
//     numeric: true,
//     disablePadding: false,
//     stikyUpdate: true,
//     label: 'Update', //
//   },
// ];

// function EnhancedTableHead(props) {
//   const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
//   const createSortHandler = (property) => (event) => {
//     // console.log('click header');
//     onRequestSort(event, property);
//   };
//   const [loadingDelete, setLoadingDelete] = useState(false);

//   return (
//     <TableHead>
//       <TableRow>
//         <TableCell padding="checkbox">
//           <Checkbox
//             color="secondary"
//             indeterminate={numSelected > 0 && numSelected < rowCount}
//             checked={rowCount > 0 && numSelected === rowCount}
//             onChange={onSelectAllClick}
//             inputProps={{
//               'aria-label': 'select all desserts',
//             }}
//             sx={{
//               fontSize: '1.8rem',
//             }}
//           />
//         </TableCell>

//         {/* data map => render header */}
//         {headCells.map((headCell) => (
//           <TableCell
//             key={headCell.id}
//             // align={headCell.numeric ? 'right' : 'left'}
//             align={'center'}
//             padding={headCell.disablePadding ? 'none' : 'normal'}
//             sortDirection={orderBy === headCell.id ? order : false}
//             sx={{
//               minWidth: '220px',
//             }}
//             className={clsx({
//               [style.stickyHeader]: headCell?.sticky,
//               [style.stickyUpdate]: headCell?.stikyUpdate,
//             })}
//           >
//             <TableSortLabel
//               active={orderBy === headCell.id}
//               direction={orderBy === headCell.id ? order : 'asc'}
//               onClick={createSortHandler(headCell.id)}
//             >
//               {headCell.label}

//               {orderBy === headCell.id ? (
//                 <Box component="span" sx={visuallyHidden}>
//                   {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
//                 </Box>
//               ) : null}
//             </TableSortLabel>
//           </TableCell>
//         ))}
//       </TableRow>
//     </TableHead>
//   );
// }
// // Proptypes
// EnhancedTableHead.propTypes = {
//   numSelected: PropTypes.number.isRequired,
//   onRequestSort: PropTypes.func.isRequired,
//   onSelectAllClick: PropTypes.func.isRequired,
//   order: PropTypes.oneOf(['asc', 'desc']).isRequired,
//   orderBy: PropTypes.string.isRequired,
//   rowCount: PropTypes.number.isRequired,
// };

// // custom => transition => popup => isDelete
// const Transition = forwardRef(function Transition(props, ref) {
//   return <Slide direction="up" {...props} ref={ref} />;
// });
// // EnhancedTableToolbar
// function EnhancedTableToolbar(props) {
//   const [isDelete, setIsdelete] = useState(false);
//   const navigate = useNavigate();
//   // số lượng sản phẩm đọn chọn
//   const { numSelected, selected, setSelected } = props;

//   // xử lý handle popup => để xóa 1 hoặc nhiều => sản phẩm
//   const [open, setOpen] = useState(false);

//   // xử lý => mở popup
//   const handleClickOpen = () => {
//     setOpen(true);
//   };
//   // xử lý => để đóng pupup
//   const handleClose = () => {
//     setOpen(false);
//   };

//   // handleDeleteAllPhone => hiện popup thôi => chắc chắn muốn xóa => thì mới cho xóa
//   const handleDeleteAllPhone = () => {
//     // set true => hiện popup
//     setOpen(true);
//   };

//   const dispatch = useDispatch();

//   // DELETE PHONE => khi ấn nút đồng ý xóa => thì mới xóa
//   const agreeDelete = async () => {
//     console.log('danh sách id sản phẩm cần xóa', selected);
//     setIsdelete(true);
//     // requet delete  => server => cập nhật lại redux => để render lại danh sách
//     const params = {
//       idsListDelete: selected,
//     };
//     // console.log(params);
//     try {
//       // const countDeletephone = await phoneApi.deletePhones(params);
//       // console.log({ countDeletephone });
//       await dispatch(deletePhone(params));
//       await dispatch(getAllPhoneProductsNoPagination());

//       setIsdelete(false);
//       toast.success('Xóa thành công', {
//         position: 'top-right',
//         autoClose: 3000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         progress: undefined,
//         theme: 'light',
//       });
//       // Sau khi xóa thành công, tải lại trang
//       // window.location.reload();
//       // chuyển đến trang xem các sản phẩm

//       setTimeout(() => {
//         navigate('/homepage');
//       }, 3000);

//       setOpen(false);
//     } catch (error) {
//       console.log(error);
//       setOpen(false);
//       setIsdelete(false);
//       toast.success('Xóa thất bại', {
//         position: 'top-right',
//         autoClose: 3000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         progress: undefined,
//         theme: 'light',
//       });
//     }
//   };

//   return (
//     <Toolbar
//       sx={{
//         pl: { sm: 2 },
//         pr: { xs: 1, sm: 1 },
//         ...(numSelected > 0 && {
//           bgcolor: (theme) => alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
//         }),
//       }}
//     >
//       {numSelected > 0 ? (
//         <Typography
//           sx={{ flex: '1 1 100%', display: 'flex', alignItems: 'center' }}
//           color="inherit"
//           variant="h6"
//           component="div"
//         >
//           <Typography
//             variant="h6"
//             sx={{
//               fontSize: '1.6rem',
//               marginRight: '3px',
//               color: '#e74c3c',
//             }}
//           >
//             {numSelected}{' '}
//           </Typography>
//           <Typography
//             variant="h6"
//             sx={{
//               fontSize: '1.6rem',
//             }}
//           >
//             {' '}
//             Sản phẩm được chọn{' '}
//           </Typography>
//         </Typography>
//       ) : (
//         <Typography
//           sx={{
//             flex: '1 1 100%',
//             fontSize: '1.6rem',
//             userSelect: 'none',
//             color: '#7f8c8d',
//             display: 'flex',
//             alignItems: 'center',
//           }}
//           variant="h6"
//           id="tableTitle"
//           component="div"
//         >
//           <KeyboardDoubleArrowDownIcon />{' '}
//           <Typography
//             variant="h6"
//             sx={{
//               fontSize: '1.6rem',
//             }}
//           >
//             Click chọn sản phẩm
//           </Typography>
//         </Typography>
//       )}

//       {/*  show action delete */}
//       {numSelected > 0 ? (
//         <>
//           {/* icon xóa và tooltip */}
//           <Tooltip title="Delete" arrow>
//             <IconButton
//               sx={{
//                 '&:hover .MuiSvgIcon-fontSizeMedium': {
//                   color: '#eb4d4b',
//                 },
//               }}
//               onClick={handleDeleteAllPhone}
//             >
//               <DeleteIcon
//                 sx={{
//                   width: '2.6rem',
//                   height: '2.6rem',
//                 }}
//               />
//             </IconButton>
//           </Tooltip>

//           {/* popup => hiện lên xem có xóa sản phẩm không */}

//           {/* hộp thoại hiện lên đê chắc chắn muốn xóa sản phẩm không */}

//           <Dialog
//             open={open}
//             onClose={handleClose}
//             aria-labelledby="alert-dialog-title"
//             aria-describedby="alert-dialog-slide-description"
//             keepMounted
//             TransitionComponent={Transition}
//             // fullScreen
//           >
//             {/* title => popup */}
//             {/* nếu đang call API => để xóa hiện lên loading */}
//             {isDelete ? (
//               <Spin size="large">
//                 <DialogTitle id="alert-dialog-title" className={clsx(style.popupTitle)}>
//                   Bạn chắc chắc muốn xóa{' '}
//                   <Typography className={clsx(style.popupTitleCountDelete)}>{numSelected}</Typography> sản phẩm không ?
//                 </DialogTitle>

//                 {/* content => popup */}
//                 {/* <DialogContent>
//               <DialogContentText id="alert-dialog-description">
//                 Let Google help apps determine location. This means sending anonymous location data to Google, even when
//                 no apps are running.
//               </DialogContentText>
//             </DialogContent> */}

//                 {/* action => popup */}
//                 <DialogActions disableSpacing className={clsx(style.wrapActionPopupDelete)}>
//                   <Button
//                     className={clsx(style.iconActionDelete, style.btnAgree)}
//                     onClick={agreeDelete}
//                     variant="contained"
//                     color="success"
//                   >
//                     Đồng ý
//                   </Button>
//                   <Button
//                     className={clsx(style.iconActionDelete, style.btnCancel)}
//                     autoFocus
//                     variant="contained"
//                     color="error"
//                   >
//                     Hủy
//                   </Button>
//                 </DialogActions>
//               </Spin>
//             ) : (
//               <>
//                 <DialogTitle id="alert-dialog-title" className={clsx(style.popupTitle)}>
//                   Bạn chắc chắc muốn xóa{' '}
//                   <Typography className={clsx(style.popupTitleCountDelete)}>{numSelected}</Typography> sản phẩm không ?
//                 </DialogTitle>

//                 {/* content => popup */}
//                 {/* <DialogContent>
//               <DialogContentText id="alert-dialog-description">
//                 Let Google help apps determine location. This means sending anonymous location data to Google, even when
//                 no apps are running.
//               </DialogContentText>
//             </DialogContent> */}

//                 {/* action => popup */}
//                 <DialogActions disableSpacing className={clsx(style.wrapActionPopupDelete)}>
//                   <Button
//                     className={clsx(style.iconActionDelete, style.btnAgree)}
//                     onClick={agreeDelete}
//                     variant="contained"
//                     color="success"
//                   >
//                     Đồng ý
//                   </Button>
//                   <Button
//                     className={clsx(style.iconActionDelete, style.btnCancel)}
//                     onClick={handleClose}
//                     autoFocus
//                     variant="contained"
//                     color="error"
//                   >
//                     Hủy
//                   </Button>
//                 </DialogActions>
//               </>
//             )}
//           </Dialog>
//         </>
//       ) : (
//         <Tooltip title="Filter list" arrow>
//           <IconButton>
//             <FilterListIcon />
//           </IconButton>
//         </Tooltip>
//       )}
//     </Toolbar>
//   );
// }

// EnhancedTableToolbar.propTypes = {
//   numSelected: PropTypes.number.isRequired,
//   selected: PropTypes.array,
//   setSelected: PropTypes.func,
// };

// export default function EnhancedTable() {
//   const [order, setOrder] = useState('asc'); // sắp xếp tăng dần
//   const [orderBy, setOrderBy] = useState('calories');
//   const [selected, setSelected] = useState([]);
//   const [page, setPage] = useState(0);
//   const [dense, setDense] = useState(false);
//   // số lượng sản phẩm trên 1 trang
//   const [rowsPerPage, setRowsPerPage] = useState(5);
//   const [phoneBuyId, setPhoneBuyId] = useState({});
//   const [loading, setLoading] = useState(false);
//   const [idUpdate, setIdUpdate] = useState('');

//   // id 1 hoặc nhiều id sản phẩm được chọn => dùng để delete
//   // console.log({ selected });
//   // data render
//   // lấy các sản phẩm đã lưu trong redux =>
//   const rows = useSelector((state) => state.phone?.phone?.data);
//   // console.log({ rows });

//   const handleRequestSort = (event, property) => {
//     // console.log({ property });
//     const isAsc = orderBy === property && order === 'asc';
//     setOrder(isAsc ? 'desc' : 'asc');
//     setOrderBy(property);
//   };

//   const handleSelectAllClick = (event) => {
//     if (event.target.checked) {
//       const newSelected = rows.map((n) => {
//         return n._id;
//       });
//       // console.log({ newSelected });
//       // console.log(newSelected); // danh sách sản phẩm được click all
//       setSelected(newSelected);
//       return;
//     }
//     setSelected([]);
//   };

//   const handleClick = (event, _id) => {
//     // console.log({ selected });
//     const selectedIndex = selected.indexOf(_id);
//     let newSelected = [];

//     // id 1 sản phẩm khi click => lấy được 1 id sản phẩm khi click
//     // console.log({ _id });

//     // console.log('click sản phẩm');

//     if (selectedIndex === -1) {
//       newSelected = newSelected.concat(selected, _id);
//     } else if (selectedIndex === 0) {
//       newSelected = newSelected.concat(selected.slice(1));
//     } else if (selectedIndex === selected.length - 1) {
//       newSelected = newSelected.concat(selected.slice(0, -1));
//     } else if (selectedIndex > 0) {
//       newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
//     }

//     setSelected(newSelected);
//   };

//   // khi click thay đổi page hiện tại
//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   const isSelected = (_id) => selected.indexOf(_id) !== -1;

//   // Avoid a layout jump when reaching the last page with empty rows.
//   const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

//   // data render ra màn hình phone
//   const visibleRows = useMemo(
//     () =>
//       stableSort(rows && rows, getComparator(order, orderBy)).slice(
//         page * rowsPerPage,
//         page * rowsPerPage + rowsPerPage,
//       ),
//     [order, orderBy, page, rowsPerPage],
//   );

//   //  hiện modal => khi click update
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   // const showModal = () => {
//   //   setIsModalOpen(true);
//   // };
//   const handleOk = () => {
//     setIsModalOpen(false);
//   };
//   const dispatch = useDispatch();
//   // khi click ra bên ngoài hoặc nut X modal
//   const navigate = useNavigate();
//   const handleCancel = () => {
//     setIsModalOpen(false);
//     // mỗi khi click đóng modal => uplate lại danh sách sản phẩm
//     dispatch(getAllPhoneProductsNoPagination());
//     setPhoneBuyId({});
//     window.location.reload();
//   };

//   // handleClickUpdate= =chỉnh sửa điện thoại => hiện lên popup để chỉnh sửa => get lấy sản phẩm theo id đó => để chuẩn bị update
//   const handleClickUpdate = async (id) => {
//     // console.log('click update id :', id);
//     // khi click vào nút update => set loading => true để hiện quay => sau khi thành công hoặc thất bại => set false
//     setLoading(true);

//     try {
//       const dataphoneBuyId = await phoneApi.getPhoneBuyID(id);
//       // console.log({ dataphoneBuyId });
//       setPhoneBuyId(dataphoneBuyId?.data);
//       setIdUpdate(id);
//       // sau khi lấy được data => mới hiện popup để => hiển thị thông tin update => thì dataPhoneBuyId => sẽ đc đồng bộ
//       // khi có data rồi => mới hiện popup => đảm bảo khi hiện popup => luôn có dữ liệu => phone truyền vào
//       setLoading(false);
//       setIsModalOpen(true);
//     } catch (error) {
//       console.log({ error });
//       setLoading(false);
//       setIsModalOpen(false);
//     }
//   };

//   // console.log({ phoneBuyId });
//   return (
//     <Box className={clsx(style.wrapGetAllPhone)}>
//       {/* khi click update => đang call API => hiện thị Spin antd */}
//       {/* modal => khi click => update => phone */}
//       {loading ? (
//         <Spin>
//           <Box sx={{ width: '100%' }} className={clsx(style.wrapTable)}>
//             <Paper sx={{ width: '100%', mb: 2, overflow: 'hidden' }}>
//               {/* EnhancedTableToolbar */}
//               {/* {console.log(selected.length)} */}
//               <EnhancedTableToolbar numSelected={selected.length} selected={selected} setSelected={setSelected} />

//               {/* table container */}
//               <TableContainer>
//                 <Table
//                   sx={{ minWidth: 750 }}
//                   stickyHeader
//                   aria-label="sticky table"
//                   aria-labelledby="tableTitle"
//                   size={dense ? 'small' : 'medium'}
//                 >
//                   <EnhancedTableHead
//                     numSelected={selected.length}
//                     order={order}
//                     orderBy={orderBy}
//                     onSelectAllClick={handleSelectAllClick}
//                     onRequestSort={handleRequestSort}
//                     rowCount={rows && rows.length}
//                   />

//                   {/*  body table */}
//                   <TableBody>
//                     {visibleRows.map((row, index) => {
//                       const isItemSelected = isSelected(row._id);
//                       const labelId = `enhanced-table-checkbox-${index}`;

//                       return (
//                         <TableRow
//                           hover
//                           onClick={(event) => handleClick(event, row._id)}
//                           role="checkbox"
//                           aria-checked={isItemSelected}
//                           tabIndex={-1}
//                           key={row._id}
//                           selected={isItemSelected}
//                           sx={{ cursor: 'pointer', textAlign: 'center' }}
//                           className={clsx(style.wrapPhoneList)}
//                         >
//                           <TableCell padding="checkbox">
//                             <Checkbox
//                               color="primary"
//                               checked={isItemSelected}
//                               inputProps={{
//                                 'aria-labelledby': labelId,
//                               }}
//                             />
//                           </TableCell>

//                           <TableCell
//                             component="th"
//                             id={labelId}
//                             scope="row"
//                             padding="none"
//                             sx={{
//                               position: 'sticky',
//                               left: '42px',
//                               zIndex: 1,
//                               backgroundColor: '#ece8e5',
//                             }}
//                           >
//                             {row.name}
//                           </TableCell>
//                           <TableCell align="right">{row.price}</TableCell>
//                           <TableCell align="right">{row.RAM}</TableCell>
//                           <TableCell align="right">{row.ROM}</TableCell>
//                           <TableCell align="right">{row.kich_thuoc_man_hinh}</TableCell>
//                           <TableCell align="right">{row?.category?.name}</TableCell>
//                           <TableCell align="right">{row.promotion}</TableCell>
//                           <TableCell align="right">{row.description}</TableCell>
//                           <TableCell align="right">{row.dung_luong_pin}</TableCell>
//                           <TableCell align="right">{row.mau_sac}</TableCell>
//                           <TableCell align="right">{row.bo_nho}</TableCell>
//                           <TableCell align="right">{row.camera}</TableCell>
//                           <TableCell align="right">{row.he_dieu_hanh}</TableCell>
//                           <TableCell align="right">{row.stock_quantity}</TableCell>
//                           <TableCell align="right">{row.image_urls[0]}</TableCell>
//                           {/* action update phone */}
//                           <TableCell align="right" className={clsx(style.actionUpdate)}>
//                             <Box className={clsx(style.wrapIconUpdate)}>
//                               {
//                                 <BorderColorIcon
//                                   onClick={() => {
//                                     handleClickUpdate(row._id);
//                                   }}
//                                 />
//                               }
//                             </Box>
//                           </TableCell>
//                         </TableRow>
//                       );
//                     })}
//                     {emptyRows > 0 && (
//                       <TableRow
//                         style={{
//                           height: (dense ? 33 : 53) * emptyRows,
//                         }}
//                       >
//                         <TableCell colSpan={6} />
//                       </TableRow>
//                     )}
//                   </TableBody>
//                 </Table>
//               </TableContainer>

//               {/* panination */}
//               <TablePagination
//                 // rowsPerPageOptions={[5, 10, 25]}
//                 rowsPerPageOptions={[10]}
//                 component="div"
//                 count={rows.length} // tổng số trang
//                 rowsPerPage={rowsPerPage} // số sản phẩm trên mỗi 1 trang
//                 page={page}
//                 onPageChange={handleChangePage} // kích hoạt khi trang được thay đổi
//                 onRowsPerPageChange={handleChangeRowsPerPage} // gọi lại khi số lượng trang b
//               />
//             </Paper>
//             {/* <FormControlLabel control={<Switch checked={dense} onChange={handleChangeDense} />} label="Dense padding" /> */}
//             <ToastContainer className={style.toastMessage} />
//           </Box>
//         </Spin>
//       ) : (
//         <Box sx={{ width: '100%' }} className={clsx(style.wrapTable)}>
//           <Paper sx={{ width: '100%', mb: 2, overflow: 'hidden' }}>
//             {/* EnhancedTableToolbar */}
//             {/* {console.log(selected.length)} */}
//             <EnhancedTableToolbar numSelected={selected.length} selected={selected} setSelected={setSelected} />

//             {/* table container */}
//             <TableContainer>
//               <Table
//                 sx={{ minWidth: 750 }}
//                 stickyHeader
//                 aria-label="sticky table"
//                 aria-labelledby="tableTitle"
//                 size={dense ? 'small' : 'medium'}
//               >
//                 <EnhancedTableHead
//                   numSelected={selected.length}
//                   order={order}
//                   orderBy={orderBy}
//                   onSelectAllClick={handleSelectAllClick}
//                   onRequestSort={handleRequestSort}
//                   rowCount={rows && rows.length}
//                 />

//                 {/*  body table */}
//                 <TableBody>
//                   {visibleRows.map((row, index) => {
//                     const isItemSelected = isSelected(row._id);
//                     const labelId = `enhanced-table-checkbox-${index}`;

//                     return (
//                       <TableRow
//                         hover
//                         onClick={(event) => handleClick(event, row._id)}
//                         role="checkbox"
//                         aria-checked={isItemSelected}
//                         tabIndex={-1}
//                         key={row._id}
//                         selected={isItemSelected}
//                         sx={{ cursor: 'pointer', textAlign: 'center' }}
//                         className={clsx(style.wrapPhoneList)}
//                       >
//                         <TableCell padding="checkbox">
//                           <Checkbox
//                             color="primary"
//                             checked={isItemSelected}
//                             inputProps={{
//                               'aria-labelledby': labelId,
//                             }}
//                           />
//                         </TableCell>

//                         <TableCell
//                           component="th"
//                           id={labelId}
//                           scope="row"
//                           padding="none"
//                           sx={{
//                             position: 'sticky',
//                             left: '42px',
//                             zIndex: 1,
//                             backgroundColor: '#ece8e5',
//                           }}
//                         >
//                           {row.name}
//                         </TableCell>
//                         <TableCell align="right">{row.price}</TableCell>
//                         <TableCell align="right">{row.RAM}</TableCell>
//                         <TableCell align="right">{row.ROM}</TableCell>
//                         <TableCell align="right">{row.kich_thuoc_man_hinh}</TableCell>
//                         <TableCell align="right">{row?.category?.name}</TableCell>
//                         <TableCell align="right">{row.promotion}</TableCell>
//                         <TableCell align="right">{row.description}</TableCell>
//                         <TableCell align="right">{row.dung_luong_pin}</TableCell>
//                         <TableCell align="right">{row.mau_sac}</TableCell>
//                         <TableCell align="right">{row.bo_nho}</TableCell>
//                         <TableCell align="right">{row.camera}</TableCell>
//                         <TableCell align="right">{row.he_dieu_hanh}</TableCell>
//                         <TableCell align="right">{row.stock_quantity}</TableCell>
//                         <TableCell align="right">{row.image_urls[0]}</TableCell>
//                         {/* action update phone */}
//                         <TableCell align="right" className={clsx(style.actionUpdate)}>
//                           <Box className={clsx(style.wrapIconUpdate)}>
//                             {
//                               <BorderColorIcon
//                                 onClick={() => {
//                                   handleClickUpdate(row._id);
//                                 }}
//                               />
//                             }
//                           </Box>
//                         </TableCell>
//                       </TableRow>
//                     );
//                   })}
//                   {emptyRows > 0 && (
//                     <TableRow
//                       style={{
//                         height: (dense ? 33 : 53) * emptyRows,
//                       }}
//                     >
//                       <TableCell colSpan={6} />
//                     </TableRow>
//                   )}
//                 </TableBody>
//               </Table>
//             </TableContainer>

//             {/* panination */}
//             <TablePagination
//               // rowsPerPageOptions={[5, 10, 25]}
//               rowsPerPageOptions={[10]}
//               component="div"
//               count={rows.length} // tổng số trang
//               rowsPerPage={rowsPerPage} // số sản phẩm trên mỗi 1 trang
//               page={page}
//               onPageChange={handleChangePage} // kích hoạt khi trang được thay đổi
//               onRowsPerPageChange={handleChangeRowsPerPage} // gọi lại khi số lượng trang b
//             />
//           </Paper>
//           {/* <FormControlLabel control={<Switch checked={dense} onChange={handleChangeDense} />} label="Dense padding" /> */}
//           <ToastContainer className={style.toastMessage} />
//         </Box>
//       )}

//       {/* sau khi đã update mới hiện thị mmodal => set open  ở phía trên */}
//       <Modal
//         title="Cập nhật sản phẩm"
//         centered // tập căn giữa modal => theo height
//         footer={null} // ẩn action => foooter
//         open={isModalOpen}
//         onOk={handleOk}
//         onCancel={handleCancel}
//         width={800}
//         className={clsx(style.wrapModal)}
//       >
//         <AddPhone
//           className={clsx(style.modalUpdate)}
//           phoneBuyId={phoneBuyId}
//           isModalOpen={isModalOpen}
//           idUpdate={idUpdate}
//         />
//       </Modal>
//     </Box>
//   );
// }
