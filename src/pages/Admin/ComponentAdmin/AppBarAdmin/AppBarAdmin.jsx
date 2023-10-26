import { memo, useState } from 'react';
import PropTypes from 'prop-types';
import style from './AppBarAdmin.module.scss';
import clsx from 'clsx';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import logo from '~/assets/images/haiLoGoTiki6.png';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { IconHomePageAdmin, IconSanPhamadmin, IconGroupUserAdmin } from '~/assets/iconSVG';
import AddShoppingCartOutlinedIcon from '@mui/icons-material/AddShoppingCartOutlined';
import { Menu } from 'antd';
import BadgeMUI from '@mui/material/Badge';

// Proptypes
AppBarAdmin.propTypes = {};

function AppBarAdmin(props) {
  const naviagate = useNavigate();
  const location = useLocation();

  // ---MENU ITEM TÙY CHỌN SẢN PHẨM ---
  function getItem(label, key, icon, children, type) {
    return {
      key,
      icon,
      children,
      label,
      type,
    };
  }
  const items = [
    getItem(
      <BadgeMUI
        badgeContent={4}
        color="secondary"
        sx={{
          '& .MuiBadge-badge': {
            border: '1px solid #fff',
            right: '-5px',
          },
        }}
      >
        <Typography>Sản phẩm</Typography>
      </BadgeMUI>,
      'sanpham',
      <IconSanPhamadmin />,
      [
        getItem(
          '',
          'sp',
          null,
          [
            getItem(
              <BadgeMUI
                badgeContent={99}
                color="secondary"
                sx={{
                  '& .MuiBadge-badge': {
                    border: '1px solid #fff',
                    right: '-5px',
                  },
                }}
              >
                <Typography>Danh sách sản phẩm</Typography>
              </BadgeMUI>,
              '1',
            ),
            getItem('Tạo sản phẩm', '2'),
          ],
          'group',
        ),
      ],
    ),
  ];
  //  ----KHI CLICK THAY ĐỔI TÙY CHỌN SẢN PHẨM ---
  const handleClickSwithSanPham = (e) => {
    const keyActive = Number.parseInt(e?.key);

    if (keyActive === 1) {
      naviagate('/admin/getallproducts');
    } else {
      naviagate('/admin/addproducts');
    }
  };
  return (
    <Box className={clsx(style.wrapAppBarAdmin)}>
      <Box className={clsx(style.wrapLogo)}>
        <Link to="/">
          <img src={logo} alt="logo" className={clsx(style.imageLogo)} />
        </Link>
      </Box>
      <Box
        className={clsx(style.wrapContentAppbar)}
        // chỉ khi nào đang ở trang thêm || get all sản phẩm mới hiển thị
        sx={{
          '& .ant-menu-item-selected': {
            backgroundColor:
              location.pathname === '/admin/getallproducts' || location.pathname === '/admin/addproducts'
                ? '#1677ff'
                : 'transparent',
            color:
              location.pathname === '/admin/getallproducts' || location.pathname === '/admin/addproducts'
                ? '#fff'
                : '#ffffffa6',
          },

          '& .ant-menu-item-active': {
            color: '#fff',
          },

          '& .ant-menu-item:first-of-type': {
            backgroundColor: location.pathname === '/admin/getallproducts' ? '#1677ff' : 'transparent',
            color: location.pathname === '/admin/getallproducts' ? '#fff' : '#ffffffa6',
          },
          '& .ant-menu-item:last-of-type': {
            backgroundColor: location.pathname === '/admin/addproducts' ? '#1677ff' : 'transparent',
            color: location.pathname === '/admin/addproducts' ? '#fff' : '#ffffffa6',
          },
        }}
      >
        {/* Trang chủ */}
        <Link to="/admin/home" className={clsx(style.linkHomeAdmin)}>
          <Box
            className={clsx(style.homPageAdmin, {
              [style.active]: location?.pathname === '/admin/home',
            })}
          >
            <IconHomePageAdmin className={clsx(style.iconHomePage)} />
            <Typography className={clsx(style.textHomePage)}>Trang chủ</Typography>
          </Box>
        </Link>
        {/* Đơn hàng */}
        <Link to="/admin/order" className={clsx(style.linkOrder)}>
          <Box
            className={clsx(style.orderAdmin, {
              [style.active]: location?.pathname === '/admin/order',
            })}
          >
            <AddShoppingCartOutlinedIcon className={clsx(style.iconHomePage)} />
            <BadgeMUI
              badgeContent={999}
              color="secondary"
              sx={{
                '& .MuiBadge-badge': {
                  border: '1px solid #fff',
                  right: '-5px',
                },
              }}
            >
              <Typography className={clsx(style.textHomePage)}>Đơn hàng</Typography>
            </BadgeMUI>
          </Box>
        </Link>

        {/* Menu Item Tùy chọn SẢN PHẨM */}
        <Menu
          onClick={handleClickSwithSanPham}
          style={{
            width: 250,
          }}
          defaultSelectedKeys={
            location.pathname === '/admin/getallproducts'
              ? ['1']
              : location.pathname === '/admin/addproducts'
              ? ['2']
              : ['0']
          } // default sản phẩm được chọn trong list item => theo vị trí locaiton
          defaultOpenKeys={
            location.pathname === '/admin/getallproducts' || location.pathname === '/admin/addproducts'
              ? ['sanpham']
              : ['khong co']
          }
          mode="inline"
          items={items}
          theme="dark"
          className={clsx(style.wrapMenuItemSanPham)}
        />

        {/* QUẢN LÝ NGƯỜI DÙNG*/}
        <Link to="/admin/user" className={clsx(style.linkHomeAdmin)}>
          <Box
            className={clsx(style.homPageAdmin, {
              [style.active]: location?.pathname === '/admin/user',
            })}
          >
            {' '}
            {/* , style.active */}
            <IconGroupUserAdmin className={clsx(style.iconHomePage)} />
            <Typography className={clsx(style.textHomePage)}>Quản lý người dùng</Typography>
          </Box>
        </Link>
      </Box>
    </Box>
  );
}

export default memo(AppBarAdmin);
