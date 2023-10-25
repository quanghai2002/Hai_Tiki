import { memo, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import style from './HeaderAdmin.module.scss';
import clsx from 'clsx';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Marquee from 'react-fast-marquee';
import { Alert, Dropdown } from 'antd';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import HomeIcon from '~/assets/images/iconHome.png';
import HomeIconActive from '~/assets/images/iconHomeActive.png';
import Avatar from '@mui/material/Avatar';
import removeToken from '~/utils/removeToken.js';
import { logOut } from '~/redux/userSlice.js';
import { useDispatch, useSelector } from 'react-redux';
import { updatePhoneCart } from '~/redux/GioHang.js';
import ListItemIcon from '@mui/material/ListItemIcon';
import Settings from '@mui/icons-material/Settings';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';
import Logout from '@mui/icons-material/Logout';
import WavingHandOutlinedIcon from '@mui/icons-material/WavingHandOutlined';
import VolunteerActivismOutlinedIcon from '@mui/icons-material/VolunteerActivismOutlined';

// Proptypes
HeaderAdmin.propTypes = {};

function HeaderAdmin(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //   --- LẤY THÔNG TIN USER ĐỂ HIỂN THỊ XIN CHÀO ---
  const userLogin = useSelector((state) => state?.userAuth?.user);

  // CÁC LOẠI MÀU ĐỂ HIỆN THỊ NHẤP NHÁY CHỮ
  const [color1, setColor1] = useState('#000');
  const [color2, setColor2] = useState('#0a68ff');

  const listColor1 = [
    'ff0000',
    '#000',
    '#0a68ff',
    '6ff02e',
    '#e91e63',
    '#9c27b0',
    '#3f51b5',
    '#00bcd4',
    '#009688',
    '#ff9800',
    '#01579b',
    '#673ab7',
  ];

  const listColor2 = [
    '#000',
    '#a60b68',
    '#01579b',
    '#0a68ff',
    '6ff02e',
    'ff0000',
    '#ee82ee',
    '#e91e63',
    '#673ab7',
    '#00bcd4',
    '#009688',
    '#3f51b5',
  ];

  // ----SET LẠI CÁC MÀU ĐỂ NHÁY CHỮ ---
  useEffect(() => {
    const id = setInterval(() => {
      const number = Math.floor(Math.random() * listColor1?.length);
      setColor1(listColor1[number]);
    }, 4000);

    // clear up function
    return () => {
      return clearInterval(id);
    };
  }, []);

  // ----SET LẠI CÁC MÀU ĐỂ NHÁY CHỮ ---
  useEffect(() => {
    const id = setInterval(() => {
      const number = Math.floor(Math.random() * listColor2?.length);
      setColor2(listColor2[number]);
    }, 5000);

    // clear up function
    return () => {
      return clearInterval(id);
    };
  }, []);

  // --------------KHI CLICK LOGOUT- -- ĐĂNG XUẤT ---------
  const handleLogoutUser = () => {
    // Xóa Cookie trong trình duyệt
    removeToken('tokenID');
    removeToken('refreshToken');
    // Xóa thông tin User trong redux
    dispatch(logOut());

    // XÓA CÁc sản PHẨM TRONG GIỎ HÀNG ĐÃ LƯU CỦA USER
    dispatch(updatePhoneCart([]));
    // chuyển về trang home page
    navigate('/');
  };

  //  các hành động lựa chọn khi BẠN ĐÃ LÀ ADMIN => tùy chỉnh uer,đăng xuất...
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
              display: 'flex',
              alignItems: 'center',

              '& .css-11tpveg-MuiListItemIcon-root': {
                minWidth: '26px',
                '& svg': {
                  width: '1.9rem',
                  height: '1.9rem',
                },
              },
            }}
            onClick={() => {
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
              display: 'flex',
              alignItems: 'center',

              '& .css-11tpveg-MuiListItemIcon-root': {
                minWidth: '26px',
                '& svg': {
                  width: '1.9rem',
                  height: '1.9rem',
                },
              },
            }}
            onClick={() => {
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
              display: 'flex',
              alignItems: 'center',

              '& .css-11tpveg-MuiListItemIcon-root': {
                minWidth: '26px',
                position: 'relative !important',
                left: '1px !important',
                '& svg': {
                  width: '1.9rem',
                  height: '1.9rem',
                },
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

  // --- return JSX
  return (
    <Box className={clsx(style.wrapHeaderAdmin)}>
      {/* Hiển thị đoạn chư chạy => thông tin admin */}
      <Box className={clsx(style.sliderTextHeaderAdmin)}>
        <Marquee gradient gradientWidth={100} className={style.wrapMarquee}>
          <Box className={clsx(style.wrapTextHeaderAdmin)}>
            <WavingHandOutlinedIcon
              className={clsx(style.iconHeaderAdmin)}
              sx={{
                color: color2,
              }}
            />
            <Typography className={clsx(style.textMarquee)} color={color1}>
              Xin chào mừng Admin
            </Typography>
            <Typography className={clsx(style.text2Marquee)} color={color2}>
              {userLogin?.username}.
            </Typography>
            <Typography className={clsx(style.textMarquee)} color={color1}>
              Chào mừng bạn đến với website
            </Typography>
            <Typography className={clsx(style.text2Marquee)} color={color2}>
              HAI TIKI !
            </Typography>
          </Box>
        </Marquee>
      </Box>

      {/* các action => về trang chủ xem thông tin tài khoản */}
      <Box className={clsx(style.wrapActionAdmin)}>
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
        {/* đã vào được admin thì auto đã đăng nhập và là tài khaorn ADMIN nhé */}
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
            <Avatar className={clsx(style.iconImage)} srcSet={userLogin?.picture || userLogin?.img_url} alt="avartar" />

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
      </Box>
    </Box>
  );
}

export default memo(HeaderAdmin);
