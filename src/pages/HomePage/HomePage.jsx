/* eslint-disable react-refresh/only-export-components */
import PropTypes from 'prop-types';
import style from './HomePage.module.scss';
import clsx from 'clsx';
import { memo, lazy, useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import { FloatButton } from 'antd';
import ReactPaginate from 'react-paginate';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const Header = lazy(() => import('~/components/Header'));
const Slider = lazy(() => import('~/components/Slider'));
const Footer = lazy(() => import('~/components/Footer'));
const AppBar = lazy(() => import('~/components/AppBar'));
const Action = lazy(() => import('~/components/Action'));
const CardPhone = lazy(() => import('~/components/CardPhone'));

// propTypes
HomePage.propTypes = {};

// HomePage
function HomePage(props) {
  // ---------------PHÂN TRANG -----------REACT PAGINATION-------
  const [pageCount, setPageCount] = useState(10);
  const handlePageClick = (event) => {
    console.log('event', event.selected + 1);
  };

  // return jsx => giao diện
  return (
    <Box>
      {/* header and navigation */}
      <Header />

      {/* content */}
      <Box
        className={clsx(style.wrapContent)}
        sx={{
          paddingTop: '102px',
        }}
      >
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 2, lg: 3 }}>
          {/* app bar */}
          <Grid xs={4} sm={4} md={3} lg={2.1}>
            <AppBar />
          </Grid>

          <Grid container rowSpacing={2} xs={4} sm={4} md={9} lg={9.9}>
            {/*slider show and banner  */}
            <Grid lg={12}>
              <Slider />
            </Grid>

            {/* các actions => thể hiện độ tin cậy, uy tín khi mua hàng */}
            <Grid lg={12}>
              <Action />
            </Grid>

            {/* content nội dung điện thoại */}
            <Grid lg={12}>
              <CardPhone />
            </Grid>

            {/* PAGINATION => Phân trang */}
            <Grid lg={12}>
              <Box
                className={clsx(style.wrapPagination)}
                sx={{
                  '& .page-link': {
                    color: (theme) => theme?.palette?.text?.primary4,
                  },
                }}
              >
                <ReactPaginate
                  nextLabel={<ArrowForwardIosIcon className={clsx(style.icon)} />}
                  onPageChange={handlePageClick}
                  pageRangeDisplayed={3}
                  marginPagesDisplayed={1}
                  pageCount={pageCount}
                  previousLabel={<ArrowBackIosIcon className={clsx(style.icon)} />}
                  pageClassName="page-item"
                  pageLinkClassName="page-link"
                  previousClassName="page-item1"
                  previousLinkClassName="page-link"
                  nextClassName="page-item2"
                  nextLinkClassName="page-link"
                  breakLabel="..."
                  breakClassName="page-item"
                  breakLinkClassName="page-link"
                  containerClassName="pagination"
                  activeClassName="active"
                  renderOnZeroPageCount={null}
                />
              </Box>
            </Grid>
            {/* footer */}
            <Grid lg={12}>
              <Footer />
            </Grid>
          </Grid>
        </Grid>
      </Box>

      {/* back to top */}
      <FloatButton.BackTop duration={450} visibilityHeight={60} className={clsx(style.backTop)} />
    </Box>
  );
}

export default memo(HomePage);
