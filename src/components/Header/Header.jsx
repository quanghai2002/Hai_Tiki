/* eslint-disable react-refresh/only-export-components */
import { memo, useMemo } from 'react';
import PropTypes from 'prop-types';
import style from './Header.module.scss';
import clsx from 'clsx';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Logo from '~/assets/images/haiLoGoTiki2.png';
import { Link, useNavigate } from 'react-router-dom';
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
import { Mentions } from 'antd';

const { Search } = Input;
import HomeIcon from '~/assets/images/iconHome.png';
import HomeIconActive from '~/assets/images/iconHomeActive.png';
import IconAcount from '~/assets/images/iconAccount.png';
import DarkMode from '~/components/DarkMode';
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '~/redux/userSlice.js';
import removeToken from '~/utils/removeToken';
import getrefreshToken from '~/utils/getRefreshToken';
import getTokenCookie from '~/utils/getTokenCookie';

Header.propTypes = {};

function Header(props) {
  const dispatch = useDispatch();
  // --- LẤY THÔNG TIN USER TRONG REDUX KHI ĐÃ ĐĂNG NHẬP =>
  // ----------NẾU CÓ THÔNG TIN USER TRONG REDUX LÀ ĐÃ ĐĂNG NHẬP VÀ NGƯỢC LẠI--------------
  const userLogin = useSelector((state) => state?.userAuth?.user);
  console.log(userLogin);
  const isLogin = !!userLogin;
  console.log({ isLogin });

  // --------------KHI CLICK LOGOUT ---------
  const handleLogoutUser = () => {
    // Xóa thông tin User trong redux
    dispatch(logOut());

    // Xóa Cookie
    const isAccessToken = getTokenCookie();
    if (isAccessToken) {
      removeToken('tokenID');
    }
    //
    const isRefreshToken = getrefreshToken();
    if (isRefreshToken) {
      removeToken('refreshToken');
    }
  };

  const navigate = useNavigate();
  // khi click vào nút search
  const onSearch = (value) => console.log(value);

  //  các hành động lựa chọn khi đã đăng nhập => tùy chỉnh uer,đăng xuất...

  const items = useMemo(() => {
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
              console.log('thông tin tài khoản');
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
              console.log('đơn hàng của tôi');
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
              },
            }}
            onClick={handleLogoutUser}
          >
            <ListItemIcon className={clsx(style.icon)}>
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
  }, []);

  return (
    <Box className={clsx(style.wrapHeader)} backgroundColor={(theme) => theme?.palette?.background?.header}>
      <Box
        className={clsx(style.contentHeader)}
        sx={{
          height: (theme) => theme?.haitiki?.heightHeader,
        }}
      >
        {/* Logo web Hải Tiki */}
        <Box className={clsx(style.logo)}>
          <Link to="/" className={clsx(style.logoLink)}>
            <img src={Logo} alt="logo hải tiki" className={clsx(style.logoImage)}></img>
          </Link>
        </Box>

        {/* Content Phần Header */}
        <Box className={clsx(style.content)}>
          {/* input Search */}
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
                    backgroundColor: (theme) => {
                      return theme?.palette?.action?.hoverActive;
                    },
                  },
                }}
              >
                <img className={clsx(style.iconImage)} src={true ? HomeIconActive : HomeIcon} alt="home icon" />
                <Typography
                  className={clsx(style.text)}
                  variant="h6"
                  color="primary"
                  sx={{
                    fontWeight: '600 !important',
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
                      backgroundColor: (theme) => {
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
                    color={(theme) => theme?.palette?.text?.secondary}
                  >
                    Tài khoản
                  </Typography>
                </Box>
              </Dropdown>
            ) : (
              // chưa đăng nhập
              <Box
                className={clsx(style.action)}
                sx={{
                  '&:hover': {
                    cursor: 'pointer',
                    backgroundColor: (theme) => {
                      return theme?.palette?.action?.hover;
                    },
                  },
                }}
              >
                <Avatar className={clsx(style.iconImage)} src={IconAcount} alt="avartar" />

                <Link to="/login" className={clsx(style.linkBackLogin)}>
                  <Typography
                    className={clsx(style.text)}
                    variant="h6"
                    color={(theme) => theme?.palette?.text?.secondary}
                  >
                    Tài khoản
                  </Typography>
                </Link>
              </Box>
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
              <Badge badgeContent={0} color="secondary" showZero>
                <AddShoppingCartIcon color="primary" />
              </Badge>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default memo(Header);
