import PropTypes from 'prop-types';
import style from './AppBar.module.scss';
import { clsx } from 'clsx';
import { memo } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';

import appBarIconPhone from '~/assets/images/appBarPhone.png.webp';
import appBarIconAo from '~/assets/images/appBarAo.png.webp';
import appBarIconGau from '~/assets/images/appBarGau.png.webp';
import appBarIconLaptop from '~/assets/images/appBarLapTop.png.webp';
import { Link } from 'react-router-dom';

// Proptypes
AppBar.propTypes = {};

function AppBar(props) {
  return (
    <Box className={clsx(style.wrapAppBar)}>
      <Box className={clsx(style.appBar)}>
        <Typography variant="h6" className={clsx(style.text)} color={(theme) => theme?.palette?.text?.primary4}>
          Danh mục
        </Typography>

        <MenuList className={clsx(style.wrapListItem)}>
          <Link
            to="/"
            style={{
              textDecoration: 'none',
            }}
          >
            <MenuItem className={clsx(style.item)}>
              <ListItemIcon className={clsx(style.icon)}>
                <img src={appBarIconPhone} className={clsx(style.iconImage)} alt="app bar phone" />
              </ListItemIcon>
              <Typography color={(theme) => theme?.palette?.text?.primary4} className={clsx(style.text)} noWrap>
                Điện thoại di động
              </Typography>
            </MenuItem>
          </Link>
          <MenuItem className={clsx(style.item)}>
            <ListItemIcon className={clsx(style.icon)}>
              <img src={appBarIconGau} className={clsx(style.iconImage)} alt="app bar phone" />
            </ListItemIcon>
            <Typography color={(theme) => theme?.palette?.text?.primary4} className={clsx(style.text)} noWrap>
              Đồ chơi -Mẹ và bé
            </Typography>
          </MenuItem>
          <MenuItem className={clsx(style.item)}>
            <ListItemIcon className={clsx(style.icon)}>
              <img src={appBarIconAo} className={clsx(style.iconImage)} alt="app bar phone" />
            </ListItemIcon>
            <Typography color={(theme) => theme?.palette?.text?.primary4} className={clsx(style.text)} noWrap>
              Thời trang nam
            </Typography>
          </MenuItem>
          <MenuItem className={clsx(style.item)}>
            <ListItemIcon className={clsx(style.icon)}>
              <img src={appBarIconLaptop} className={clsx(style.iconImage)} alt="app bar phone" />
            </ListItemIcon>
            <Typography color={(theme) => theme?.palette?.text?.primary4} className={clsx(style.text)} noWrap>
              Laptop -Máy vi tính
            </Typography>
          </MenuItem>
          <MenuItem className={clsx(style.item)}>
            <ListItemIcon className={clsx(style.icon)}>
              <img src={appBarIconAo} className={clsx(style.iconImage)} alt="app bar phone" />
            </ListItemIcon>
            <Typography color={(theme) => theme?.palette?.text?.primary4} className={clsx(style.text)} noWrap>
              Thời trang nam
            </Typography>
          </MenuItem>
          <MenuItem className={clsx(style.item)}>
            <ListItemIcon className={clsx(style.icon)}>
              <img src={appBarIconLaptop} className={clsx(style.iconImage)} alt="app bar phone" />
            </ListItemIcon>
            <Typography color={(theme) => theme?.palette?.text?.primary4} className={clsx(style.text)} noWrap>
              Laptop -Máy vi tính
            </Typography>
          </MenuItem>
          <MenuItem className={clsx(style.item)}>
            <ListItemIcon className={clsx(style.icon)}>
              <img src={appBarIconAo} className={clsx(style.iconImage)} alt="app bar phone" />
            </ListItemIcon>
            <Typography color={(theme) => theme?.palette?.text?.primary4} className={clsx(style.text)} noWrap>
              Thời trang nam
            </Typography>
          </MenuItem>
          <MenuItem className={clsx(style.item)}>
            <ListItemIcon className={clsx(style.icon)}>
              <img src={appBarIconLaptop} className={clsx(style.iconImage)} alt="app bar phone" />
            </ListItemIcon>
            <Typography color={(theme) => theme?.palette?.text?.primary4} className={clsx(style.text)} noWrap>
              Laptop -Máy vi tính
            </Typography>
          </MenuItem>
          <MenuItem className={clsx(style.item)}>
            <ListItemIcon className={clsx(style.icon)}>
              <img src={appBarIconAo} className={clsx(style.iconImage)} alt="app bar phone" />
            </ListItemIcon>
            <Typography color={(theme) => theme?.palette?.text?.primary4} className={clsx(style.text)} noWrap>
              Thời trang nam
            </Typography>
          </MenuItem>
          <MenuItem className={clsx(style.item)}>
            <ListItemIcon className={clsx(style.icon)}>
              <img src={appBarIconLaptop} className={clsx(style.iconImage)} alt="app bar phone" />
            </ListItemIcon>
            <Typography color={(theme) => theme?.palette?.text?.primary4} className={clsx(style.text)} noWrap>
              Laptop -Máy vi tính
            </Typography>
          </MenuItem>
          <MenuItem className={clsx(style.item)}>
            <ListItemIcon className={clsx(style.icon)}>
              <img src={appBarIconAo} className={clsx(style.iconImage)} alt="app bar phone" />
            </ListItemIcon>
            <Typography color={(theme) => theme?.palette?.text?.primary4} className={clsx(style.text)} noWrap>
              Thời trang nam
            </Typography>
          </MenuItem>
          <MenuItem className={clsx(style.item)}>
            <ListItemIcon className={clsx(style.icon)}>
              <img src={appBarIconLaptop} className={clsx(style.iconImage)} alt="app bar phone" />
            </ListItemIcon>
            <Typography color={(theme) => theme?.palette?.text?.primary4} className={clsx(style.text)} noWrap>
              Laptop -Máy vi tính
            </Typography>
          </MenuItem>
          <MenuItem className={clsx(style.item)}>
            <ListItemIcon className={clsx(style.icon)}>
              <img src={appBarIconAo} className={clsx(style.iconImage)} alt="app bar phone" />
            </ListItemIcon>
            <Typography color={(theme) => theme?.palette?.text?.primary4} className={clsx(style.text)} noWrap>
              Thời trang nam
            </Typography>
          </MenuItem>
          <MenuItem className={clsx(style.item)}>
            <ListItemIcon className={clsx(style.icon)}>
              <img src={appBarIconLaptop} className={clsx(style.iconImage)} alt="app bar phone" />
            </ListItemIcon>
            <Typography color={(theme) => theme?.palette?.text?.primary4} className={clsx(style.text)} noWrap>
              Laptop -Máy vi tính
            </Typography>
          </MenuItem>
          <MenuItem className={clsx(style.item)}>
            <ListItemIcon className={clsx(style.icon)}>
              <img src={appBarIconAo} className={clsx(style.iconImage)} alt="app bar phone" />
            </ListItemIcon>
            <Typography color={(theme) => theme?.palette?.text?.primary4} className={clsx(style.text)} noWrap>
              Thời trang nam
            </Typography>
          </MenuItem>
          <MenuItem className={clsx(style.item)}>
            <ListItemIcon className={clsx(style.icon)}>
              <img src={appBarIconLaptop} className={clsx(style.iconImage)} alt="app bar phone" />
            </ListItemIcon>
            <Typography color={(theme) => theme?.palette?.text?.primary4} className={clsx(style.text)} noWrap>
              Laptop -Máy vi tính
            </Typography>
          </MenuItem>
          <MenuItem className={clsx(style.item)}>
            <ListItemIcon className={clsx(style.icon)}>
              <img src={appBarIconAo} className={clsx(style.iconImage)} alt="app bar phone" />
            </ListItemIcon>
            <Typography color={(theme) => theme?.palette?.text?.primary4} className={clsx(style.text)} noWrap>
              Thời trang nam
            </Typography>
          </MenuItem>
          <MenuItem className={clsx(style.item)}>
            <ListItemIcon className={clsx(style.icon)}>
              <img src={appBarIconLaptop} className={clsx(style.iconImage)} alt="app bar phone" />
            </ListItemIcon>
            <Typography color={(theme) => theme?.palette?.text?.primary4} className={clsx(style.text)} noWrap>
              Laptop -Máy vi tính
            </Typography>
          </MenuItem>
          <MenuItem className={clsx(style.item)}>
            <ListItemIcon className={clsx(style.icon)}>
              <img src={appBarIconAo} className={clsx(style.iconImage)} alt="app bar phone" />
            </ListItemIcon>
            <Typography color={(theme) => theme?.palette?.text?.primary4} className={clsx(style.text)} noWrap>
              Thời trang nam
            </Typography>
          </MenuItem>
          <MenuItem className={clsx(style.item)}>
            <ListItemIcon className={clsx(style.icon)}>
              <img src={appBarIconLaptop} className={clsx(style.iconImage)} alt="app bar phone" />
            </ListItemIcon>
            <Typography color={(theme) => theme?.palette?.text?.primary4} className={clsx(style.text)} noWrap>
              Laptop -Máy vi tính
            </Typography>
          </MenuItem>
          <MenuItem className={clsx(style.item)}>
            <ListItemIcon className={clsx(style.icon)}>
              <img src={appBarIconAo} className={clsx(style.iconImage)} alt="app bar phone" />
            </ListItemIcon>
            <Typography color={(theme) => theme?.palette?.text?.primary4} className={clsx(style.text)} noWrap>
              Thời trang nam
            </Typography>
          </MenuItem>
          <MenuItem className={clsx(style.item)}>
            <ListItemIcon className={clsx(style.icon)}>
              <img src={appBarIconLaptop} className={clsx(style.iconImage)} alt="app bar phone" />
            </ListItemIcon>
            <Typography color={(theme) => theme?.palette?.text?.primary4} className={clsx(style.text)} noWrap>
              Laptop -Máy vi tính
            </Typography>
          </MenuItem>
        </MenuList>
      </Box>
    </Box>
  );
}

export default memo(AppBar);
