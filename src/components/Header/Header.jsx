/* eslint-disable react-refresh/only-export-components */
import { memo, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import style from './Header.module.scss';
import clsx from 'clsx';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Logo from '~/assets/images/haiLoGoTiki2.png';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Input } from 'antd';
import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import Badge from '@mui/material/Badge';
import { Dropdown } from 'antd';
import ListItemIcon from '@mui/material/ListItemIcon';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import { Drawer } from 'antd';
import CloseIcon from '@mui/icons-material/Close';
import FormatIndentIncreaseIcon from '@mui/icons-material/FormatIndentIncrease';

const { Search } = Input;
import HomeIcon from '~/assets/images/iconHome.png';
import HomeIconActive from '~/assets/images/iconHomeActive.png';
import IconAcount from '~/assets/images/iconAccount.png';
import DarkMode from '~/components/DarkMode';
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '~/redux/userSlice.js';
import removeToken from '~/utils/removeToken.js';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';
import { updatePhoneCart } from '~/redux/GioHang.js';

// Proptypes
Header.propTypes = {
  isHidenNotify: PropTypes.bool,
  setIsHidenNotify: PropTypes.func,
};

function Header({ isHidenNotify = true, setIsHidenNotify }) {
  // ---HIỂN THỊ DẤU 3 CHẤM ĐỂ CLICK KHI ĐANG Ở MÀN HÌNH ĐIỆN THOẠI DI ĐÔNG ---
  const [openMobile, setOpenMobile] = useState(false);
  const showDrawerMobile = () => {
    setOpenMobile(true);
  };
  const onCloseMobile = () => {
    setOpenMobile(false);
  };

  // ---NẾU ĐANG Ở TRANG TRỦ THÌ ACTIVE ICON TRANG CHỦ NÊN --
  const location = useLocation();

  // --LẤY THÔNG TIN SỐ LƯỢNG ĐƠN HÀNG TRONG GIỎ HÀNG CỦA USER ĐỂ HIỂN THỊ SỐ LƯỢNG SẢN PHẨM TRONG GIỎ HÀNG ---
  const listPhoneCart = useSelector((state) => state?.gioHang?.cartList);

  // ---KHI CLICK VÀO NÚT X TẮT NOTIFY THÔNG BÁO THÊM ĐƠN HÀNG THÀNH CÔNG ĐI --
  const handleClickCloseNotify = () => {
    setIsHidenNotify(true);
  };

  // ---KHI TẢI LẠI TRANG => SET LẠI ĐỂ TẮT NOTIFY ---
  useEffect(() => {
    if (setIsHidenNotify) {
      setIsHidenNotify(true);
    }
  }, []);

  const dispatch = useDispatch();
  // --- LẤY THÔNG TIN USER TRONG REDUX KHI ĐÃ ĐĂNG NHẬP =>
  // ----------NẾU CÓ THÔNG TIN USER TRONG REDUX LÀ ĐÃ ĐĂNG NHẬP VÀ NGƯỢC LẠI--------------
  const userLogin = useSelector((state) => state?.userAuth?.user);
  // console.log(userLogin);
  const isLogin = !!userLogin;
  const isAdmin = userLogin?.admin;
  // console.log('trạng thái đăng nhập:', isLogin);
  // console.log('bạn có phải ADMIN không ?', isAdmin);

  // --------------KHI CLICK LOGOUT- -- ĐĂNG XUẤT ---------
  const handleLogoutUser = () => {
    // Xóa Cookie trong trình duyệt
    removeToken('tokenID');
    removeToken('refreshToken');
    // Xóa thông tin User trong redux
    dispatch(logOut());

    // XÓA CÁc sản PHẨM TRONG GIỎ HÀNG ĐÃ LƯU CỦA USER
    dispatch(updatePhoneCart([]));
  };

  const navigate = useNavigate();
  // --- KHI CLICK VÀO NÚT TÌM KIẾM  || CLICK ENTER
  // khi click vào nút search
  const onSearch = (value) => {
    // --Gía trị cầm tìm kiếm
    const valueSearch = value.trim();
    if (valueSearch !== '') {
      // console.log('giá trị cần tìm kiếm là:', valueSearch);
      // sau đó chuyển giá tị sang pages search
      navigate(`/search?name=${encodeURIComponent(valueSearch)}`);
    }
  };

  // --CÁC HÀNH ĐỘNG CỦA USER KHI ĐÃ ĐĂNG NHẬP => CÓ THÊM VÀO TRANG CHỦ KHI ADMIN BẰNG TRUE ---
  //  các hành động lựa chọn khi đã đăng nhập => tùy chỉnh uer,đăng xuất...
  const items = useMemo(() => {
    // nếu là ADMIN SẼ CÓ THÊM PHẦN CHỌN VÀO TRANG CHỈNH SỬA SẢN PHẨM --
    if (isAdmin) {
      return [
        {
          key: '1',
          label: (
            <Box
              className={clsx(style.wrapMenuDropDownUser)}
              title="Thông tin tài khoản"
              sx={{
                '& .MuiListItemIcon-root': {
                  color: (theme) => theme?.palette?.text?.primary5,
                },
              }}
              onClick={() => {
                // console.log('thông tin tài khoản');
                navigate('/info');
              }}
            >
              <ListItemIcon className={clsx(style.icon)}>
                <Settings fontSize="small" />
              </ListItemIcon>
              <Typography
                className={clsx(style.text)}
                color={(theme) => {
                  return theme?.palette?.text?.primary4;
                }}
              >
                Thông tin tài khoản
              </Typography>
            </Box>
          ),
        },
        {
          key: '2',
          label: (
            <Box
              className={clsx(style.wrapMenuDropDownUser)}
              title="Đơn hàng của tôi"
              sx={{
                '& .MuiListItemIcon-root': {
                  color: (theme) => theme?.palette?.text?.primary5,
                },
              }}
              onClick={() => {
                // console.log('đơn hàng của tôi');
                navigate('/order/history');
              }}
            >
              <ListItemIcon className={clsx(style.icon)}>
                <AddShoppingCartIcon fontSize="small" />
              </ListItemIcon>
              <Typography
                className={clsx(style.text)}
                color={(theme) => {
                  return theme?.palette?.text?.primary4;
                }}
              >
                Đơn hàng của tôi
              </Typography>
            </Box>
          ),
        },
        {
          key: '3',
          label: (
            <Box
              className={clsx(style.wrapMenuDropDownUser)}
              title="Trang Admin"
              sx={{
                '& .MuiListItemIcon-root': {
                  color: (theme) => theme?.palette?.text?.primary5,
                },
              }}
              onClick={() => {
                navigate('/admin/home');
              }}
            >
              <ListItemIcon className={clsx(style.icon)}>
                <AdminPanelSettingsOutlinedIcon
                  sx={{
                    width: '2.2rem !important',
                    height: '2.2rem !important',
                  }}
                />
              </ListItemIcon>
              <Typography
                className={clsx(style.text)}
                color={(theme) => {
                  return theme?.palette?.text?.primary4;
                }}
              >
                Trang Admin
              </Typography>
            </Box>
          ),
        },
        {
          key: '4',
          label: (
            <Box
              className={clsx(style.wrapMenuDropDownUser)}
              title="Đăng xuất"
              sx={{
                '& .MuiListItemIcon-root': {
                  color: (theme) => theme?.palette?.text?.primary5,
                  '& .css-11tpveg-MuiListItemIcon-root': {
                    minWidth: '26px',
                  },
                },
              }}
              onClick={handleLogoutUser}
            >
              <ListItemIcon className={clsx(style.icon, style.iconLogout)}>
                <Logout fontSize="small" />
              </ListItemIcon>
              <Typography
                className={clsx(style.text)}
                color={(theme) => {
                  return theme?.palette?.text?.primary4;
                }}
              >
                Đăng xuất
              </Typography>
            </Box>
          ),
        },
      ];
    } else {
      return [
        {
          key: '1',
          label: (
            <Box
              className={clsx(style.wrapMenuDropDownUser)}
              title="Thông tin tài khoản"
              sx={{
                '& .MuiListItemIcon-root': {
                  color: (theme) => theme?.palette?.text?.primary5,
                },
              }}
              onClick={() => {
                // console.log('thông tin tài khoản');
                navigate('/info');
              }}
            >
              <ListItemIcon className={clsx(style.icon)}>
                <Settings fontSize="small" />
              </ListItemIcon>
              <Typography
                className={clsx(style.text)}
                color={(theme) => {
                  return theme?.palette?.text?.primary4;
                }}
              >
                Thông tin tài khoản
              </Typography>
            </Box>
          ),
        },
        {
          key: '2',
          label: (
            <Box
              className={clsx(style.wrapMenuDropDownUser)}
              title="Đơn hàng của tôi"
              sx={{
                '& .MuiListItemIcon-root': {
                  color: (theme) => theme?.palette?.text?.primary5,
                },
              }}
              onClick={() => {
                // console.log('đơn hàng của tôi');
                navigate('/order/history');
              }}
            >
              <ListItemIcon className={clsx(style.icon)}>
                <AddShoppingCartIcon fontSize="small" />
              </ListItemIcon>
              <Typography
                className={clsx(style.text)}
                color={(theme) => {
                  return theme?.palette?.text?.primary4;
                }}
              >
                Đơn hàng của tôi
              </Typography>
            </Box>
          ),
        },
        {
          key: '3',
          label: (
            <Box
              className={clsx(style.wrapMenuDropDownUser)}
              title="Đăng xuất"
              sx={{
                '& .MuiListItemIcon-root': {
                  color: (theme) => theme?.palette?.text?.primary5,
                  '& .css-11tpveg-MuiListItemIcon-root': {
                    minWidth: '26px',
                  },
                },
              }}
              onClick={handleLogoutUser}
            >
              <ListItemIcon className={clsx(style.icon, style.iconLogout)}>
                <Logout fontSize="small" />
              </ListItemIcon>
              <Typography
                className={clsx(style.text)}
                color={(theme) => {
                  return theme?.palette?.text?.primary4;
                }}
              >
                Đăng xuất
              </Typography>
            </Box>
          ),
        },
      ];
    }
  }, []);

  return (
    <Box className={clsx(style.wrapHeader)} backgroundColor={(theme) => theme?.palette?.background?.header}>
      <Box
        className={clsx(style.contentHeader)}
        sx={{
          height: (theme) => theme?.haitiki?.heightHeader,
        }}
      >
        {/* --HIỂN THỊ GẠCH 3 CHẤM KHI ĐANG Ở MÀN HÌNH ĐIỆN THOẠI --- */}
        <Box className={clsx(style.wrapMenuMobileHeader)} onClick={showDrawerMobile}>
          <FormatIndentIncreaseIcon className={clsx(style.menuIcon)} />
        </Box>

        {/* -----DRAWER KÉO THẢ TRÊN MOBILE --- */}
        <Drawer
          title={
            <Box className={clsx(style.logoMobile)}>
              <Link
                to="/"
                style={{
                  textDecoration: 'none',
                  WebkitTapHighlightColor: 'transparent',
                }}
              >
                <img
                  src={Logo}
                  alt="logo hải tiki"
                  className={clsx(style.logoImageMobile)}
                  style={{
                    width: '160px',
                  }}
                ></img>
              </Link>
            </Box>
          }
          placement="left"
          closable={false}
          onClose={onCloseMobile}
          open={openMobile}
          key="left"
          width={300}
          className={clsx(style.WrapDrawerMobile)}
        >
          {/* chế độ dark mode khi ở chế độ mobile */}
          <Box className={clsx(style.WrapDarkModeMobile)}>
            <DarkMode />
          </Box>

          {/* action => xem tài khoản => KHI Ở CHẾ ĐỘ TRÊN MÀN HÌNH ĐIỆN THOẠI --- */}
          {/* nếu đã đăng nhập thì hiển thị avartar và cho tùy chỉnh user  */}
          {/* nếu không chuyển đến trang đăng nhập  */}
          {isLogin ? (
            // đã đăng nhập => hover => có tùy chỉnh sửa thông tin user hoặc đăng xuất
            <Dropdown
              // danh sách trong dropdown hover
              menu={{
                items,
              }}
              placement="bottomLeft"
            >
              <Box
                className={clsx(style.action)}
                sx={{
                  '&:hover': {
                    cursor: 'pointer',
                    backgroundColor:
                      location?.pathname === '/info'
                        ? (theme) => {
                            return theme?.palette?.action?.hoverActive;
                          }
                        : (theme) => {
                            return theme?.palette?.action?.hover;
                          },
                  },
                  display: 'flex',
                  alignItems: 'center',
                  gap: '3px',
                }}
              >
                <Avatar
                  className={clsx(style.iconImage)}
                  srcSet={userLogin?.picture || userLogin?.img_url}
                  alt="avartar"
                />

                <Typography
                  className={clsx(style.text)}
                  variant="h5"
                  color={location?.pathname === '/info' ? 'primary' : (theme) => theme?.palette?.text?.primary4}
                  sx={{
                    fontWeight: location?.pathname === '/info' ? '600!important' : '400 !important',
                  }}
                >
                  Tài khoản
                </Typography>
              </Box>
            </Dropdown>
          ) : (
            //------------ CHƯA ĐĂNG NHẬP --Ở CHẾ ĐỘ MOBILE ----------------
            <Link
              to="/login"
              className={clsx(style.linkBackLoginMobile)}
              style={{
                textDecoration: 'none',
              }}
            >
              <Box
                sx={{
                  '&:hover': {
                    cursor: 'pointer',
                    backgroundColor:
                      location?.pathname === '/info'
                        ? (theme) => {
                            return theme?.palette?.action?.hoverActive;
                          }
                        : (theme) => {
                            return theme?.palette?.action?.hover;
                          },
                  },
                  display: 'flex',
                  alignItems: 'center',
                  gap: '3px',
                  paddingTop: '6px',
                }}
              >
                <Avatar
                  src={IconAcount}
                  alt="avartar"
                  sx={{
                    width: '30px',
                    height: '30px',
                  }}
                />

                <Typography
                  variant="h5"
                  color={location?.pathname === '/info' ? 'primary' : (theme) => theme?.palette?.text?.primary4}
                  sx={{
                    fontWeight: location?.pathname === '/info' ? '600!important' : '400 !important',
                  }}
                >
                  Tài khoản
                </Typography>
              </Box>
            </Link>
          )}
          {/* giỏ hàng => cart */}
          <Box
            className={clsx(style.action, style.cart)}
            sx={{
              '&:hover': {
                cursor: 'pointer',
                backgroundColor: (theme) => {
                  return theme?.palette?.action?.hoverActive;
                },
              },
            }}
          >
            <Link
              to="/card"
              style={{
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                marginTop: '23px',
              }}
            >
              <Badge
                badgeContent={listPhoneCart?.length}
                color="secondary"
                showZero
                sx={{
                  '& svg': {
                    width: '3rem',
                    height: '3rem',
                  },
                }}
              >
                <AddShoppingCartIcon color="primary" />
              </Badge>
              <Typography color={(theme) => theme?.palette?.text?.primary4} variant="h5" sx={{}}>
                Giỏ hàng
              </Typography>
            </Link>
          </Box>
        </Drawer>

        {/* ---------------------------------- */}
        {/* Logo web Hải Tiki */}
        <Box className={clsx(style.logo)}>
          <Link to="/" className={clsx(style.logoLink)}>
            <img src={Logo} alt="logo hải tiki" className={clsx(style.logoImage)}></img>
          </Link>
        </Box>

        {/* Content Phần Header */}
        <Box className={clsx(style.content)}>
          {/* --- TÌM KIẾM SẢN PHẨM -- */}
          {/* -- input Search -- */}
          <Box
            className={clsx(style.wrapInputSearch)}
            sx={{
              '& .ant-input-affix-wrapper,.css-dev-only-do-not-override-nnuwmp': {
                backgroundColor: (theme) => {
                  return theme?.palette?.background?.inputSearch;
                },
              },
            }}
          >
            <Search
              className={clsx(style.inputSearch)}
              placeholder="Bạn tìm gì hôm nay"
              allowClear
              enterButton="Tìm kiếm"
              addonBefore={<SearchIcon className={clsx(style.iconSearch)} />}
              onSearch={onSearch}
            />
          </Box>

          {/* các nút action */}
          <Box className={clsx(style.wrapActions)}>
            {/* action về trang chủ */}
            <Link to="/" className={clsx(style.link)}>
              <Box
                className={clsx(style.action, style.backHome)}
                sx={{
                  '&:hover': {
                    cursor: 'pointer',
                    backgroundColor:
                      location?.pathname === '/'
                        ? (theme) => {
                            return theme?.palette?.action?.hoverActive;
                          }
                        : (theme) => {
                            return theme?.palette?.action?.hover;
                          },
                  },
                }}
              >
                <img
                  className={clsx(style.iconImage)}
                  src={location?.pathname === '/' ? HomeIconActive : HomeIcon}
                  alt="home icon"
                />
                <Typography
                  className={clsx(style.text)}
                  variant="h6"
                  color={location?.pathname === '/' ? 'primary' : (theme) => theme?.palette?.text?.secondary}
                  sx={{
                    fontWeight: location?.pathname === '/' ? '600!important' : '400 !important',
                  }}
                >
                  Trang chủ
                </Typography>
              </Box>
            </Link>

            {/* action => xem tài khoản */}
            {/* nếu đã đăng nhập thì hiển thị avartar và cho tùy chỉnh user  */}
            {/* nếu không chuyển đến trang đăng nhập  */}
            {isLogin ? (
              // đã đăng nhập => hover => có tùy chỉnh sửa thông tin user hoặc đăng xuất
              <Dropdown
                // danh sách trong dropdown hover
                menu={{
                  items,
                }}
                // open
                // arrow
                // disabled
                // placement="bottom"
                // placement="topRight"
                placement="bottomRight"
                // placement="bottomLeft"
              >
                <Box
                  className={clsx(style.action)}
                  sx={{
                    '&:hover': {
                      cursor: 'pointer',
                      backgroundColor:
                        location?.pathname === '/info'
                          ? (theme) => {
                              return theme?.palette?.action?.hoverActive;
                            }
                          : (theme) => {
                              return theme?.palette?.action?.hover;
                            },
                    },
                  }}
                >
                  <Avatar
                    className={clsx(style.iconImage)}
                    srcSet={userLogin?.picture || userLogin?.img_url}
                    alt="avartar"
                  />

                  <Typography
                    className={clsx(style.text)}
                    variant="h6"
                    color={location?.pathname === '/info' ? 'primary' : (theme) => theme?.palette?.text?.secondary}
                    sx={{
                      fontWeight: location?.pathname === '/info' ? '600!important' : '400 !important',
                    }}
                  >
                    Tài khoản
                  </Typography>
                </Box>
              </Dropdown>
            ) : (
              //------------ CHƯA ĐĂNG NHẬP ----------------
              <Link to="/login" className={clsx(style.linkBackLogin)}>
                <Box
                  className={clsx(style.action)}
                  sx={{
                    '&:hover': {
                      cursor: 'pointer',
                      backgroundColor:
                        location?.pathname === '/info'
                          ? (theme) => {
                              return theme?.palette?.action?.hoverActive;
                            }
                          : (theme) => {
                              return theme?.palette?.action?.hover;
                            },
                    },
                  }}
                >
                  <Avatar className={clsx(style.iconImage)} src={IconAcount} alt="avartar" />

                  <Typography
                    className={clsx(style.text)}
                    variant="h6"
                    color={location?.pathname === '/info' ? 'primary' : (theme) => theme?.palette?.text?.secondary}
                    sx={{
                      fontWeight: location?.pathname === '/info' ? '600!important' : '400 !important',
                    }}
                  >
                    Tài khoản
                  </Typography>
                </Box>
              </Link>
            )}

            {/* chế độ dark mode */}
            <Box className={clsx(style.action)}>
              <DarkMode />
            </Box>

            {/* giỏ hàng => cart */}
            <Box
              className={clsx(style.action, style.cart)}
              sx={{
                '&:hover': {
                  cursor: 'pointer',
                  backgroundColor: (theme) => {
                    return theme?.palette?.action?.hoverActive;
                  },
                },
              }}
            >
              <Link to="/card" className={clsx(style.linktoCart)}>
                <Badge badgeContent={listPhoneCart?.length} color="secondary" showZero>
                  <AddShoppingCartIcon color="primary" />
                </Badge>
              </Link>

              {/* hộp thoại thông báo khi click thêm giỏ hàng thành công */}
              <Box
                className={clsx(style.wrapNotifyCart, {
                  [style.hiddenNotify]: isHidenNotify,
                })}
              >
                <Box className={clsx(style.notify_Header)}>
                  <CheckCircleRoundedIcon className={clsx(style.icon)} />
                  <Typography className={clsx(style.text)} color={(theme) => theme?.palette?.text?.primary4}>
                    Thêm vào giỏ hàng thành công!
                  </Typography>
                </Box>

                <Box className={clsx(style.wrapBtn)}>
                  <Link to="/card" className={clsx(style.linktoCart)}>
                    <Button className={clsx(style.buttonNotify)} variant="contained" color="secondary">
                      Xem giỏ hàng và thanh toán
                    </Button>
                  </Link>
                </Box>

                <CloseIcon
                  className={clsx(style.iconClose)}
                  sx={{
                    color: (theme) => theme?.palette?.text?.primary4,
                  }}
                  onClick={handleClickCloseNotify}
                />
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default memo(Header);
