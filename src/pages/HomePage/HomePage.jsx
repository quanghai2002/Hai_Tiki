import React from 'react';
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
import { Link } from 'react-router-dom';
import Grid from '@mui/material/Unstable_Grid2';

import DarkMode from './DarkMode';
import Card from './Card';

import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

HomePage.propTypes = {};

function HomePage(props) {
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

              <Tooltip className={clsx(style.tooltip)} title="Đăng Nhập" arrow>
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
              </Tooltip>
            </Box>

            <Tooltip className={clsx(style.tooltip)} title="Đăng xuất" arrow>
              <Box>
                <h1 className={clsx(style.navItem)}>Đăng Xuất</h1>
              </Box>
            </Tooltip>

            <Tooltip className={clsx(style.tooltip)} title="Trang quản trị" arrow>
              <Box>
                <h1 className={clsx(style.navItem)}>Trang Quản Trị</h1>
              </Box>
            </Tooltip>
          </Toolbar>
        </AppBar>

        {/* card item */}
        <Box
          sx={{
            maxWidth: '1200px',
            margin: '31px auto',
          }}
          className={clsx(style.wrapCard)}
        >
          <Grid container spacing={{ xs: 2, md: 3, lg: 1 }}>
            <Grid xs={6} md={4} lg={2}>
              <Card />
            </Grid>
            <Grid xs={6} md={4} lg={2}>
              <Card />
            </Grid>
            <Grid xs={6} md={4} lg={2}>
              <Card />
            </Grid>
            <Grid xs={6} md={4} lg={2}>
              <Card />
            </Grid>
            <Grid xs={6} md={4} lg={2}>
              <Card />
            </Grid>
            <Grid xs={6} md={4} lg={2}>
              <Card />
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}

export default HomePage;
