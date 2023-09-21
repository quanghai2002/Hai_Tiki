/* eslint-disable react-refresh/only-export-components */
import PropTypes from 'prop-types';
import style from './HomePage.module.scss';
import clsx from 'clsx';
import { memo, lazy } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { Typography } from '@mui/material';

const Header = lazy(() => import('~/components/Header'));
const Slider = lazy(() => import('~/components/Slider'));
const Footer = lazy(() => import('~/components/Footer'));
const AppBar = lazy(() => import('~/components/AppBar'));

// propTypes
HomePage.propTypes = {};

// HomePage
function HomePage(props) {
  // Item để tạm => render xem xác định bố cục
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

  // return jsx => giao diện
  return (
    <Box>
      {/* header and navigation */}
      <Header />

      {/* content */}
      <Box className={clsx(style.wrapContent)}>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 2, lg: 3 }}>
          {/* app bar */}
          <Grid xs={4} sm={4} md={3} lg={2.1}>
            <AppBar />
          </Grid>

          <Grid container xs={4} sm={4} md={9} lg={9.9}>
            {/*slider  */}
            <Grid lg={12}>
              <Slider />
            </Grid>

            {/* các actions */}
            <Grid lg={12}>
              <Item
                sx={{
                  marginTop: '10px',
                }}
              >
                Đây là các actions
              </Item>
            </Grid>

            {/* content nội dung điện thoại */}
            <Grid container lg={12} rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 2, lg: 2 }}>
              <Grid lg={2.4}>
                <Item>điện thoại 1</Item>
              </Grid>
              <Grid lg={2.4}>
                <Item>điện thoại 2</Item>
              </Grid>
              <Grid lg={2.4}>
                <Item>điện thoại 3</Item>
              </Grid>
              <Grid lg={2.4}>
                <Item>điện thoại 4</Item>
              </Grid>
              <Grid lg={2.4}>
                <Item>điện thoại 5</Item>
              </Grid>
              <Grid lg={2.4}>
                <Item>điện thoại 6</Item>
              </Grid>
              <Grid lg={2.4}>
                <Item>điện thoại 7</Item>
              </Grid>
              <Grid lg={2.4}>
                <Item>điện thoại 8</Item>
              </Grid>
              <Grid lg={2.4}>
                <Item>điện thoại 9</Item>
              </Grid>
              <Grid lg={2.4}>
                <Item>điện thoại 10</Item>
              </Grid>
              <Grid lg={2.4}>
                <Item>điện thoại 11</Item>
              </Grid>
            </Grid>

            {/* footer */}
            <Grid lg={12}>
              <Item
                sx={{
                  marginTop: '10px',
                }}
              >
                <Footer />
              </Item>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default memo(HomePage);
