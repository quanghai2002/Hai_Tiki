import PropTypes from 'prop-types';
import style from './SearchPhone.module.scss';
import { clsx } from 'clsx';
import { memo, lazy, useState } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import ReactPaginate from 'react-paginate';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import BackTop from '~/components/BackTop';
const Header = lazy(() => import('~/components/Header'));
const Footer = lazy(() => import('~/components/Footer'));
const AppBar = lazy(() => import('~/components/AppBar'));
const Action = lazy(() => import('~/components/Action'));
const CardPhone = lazy(() => import('~/components/CardPhone'));
const OnePhone = lazy(() => import('~/components/OnePhone'));

// PropTypes
SearchPhone.propTypes = {};

// eslint-disable-next-line react-refresh/only-export-components
function SearchPhone(props) {
  // ---------------PHÂN TRANG -----------REACT PAGINATION-------
  const [pageCount, setPageCount] = useState(10);
  const handlePageClick = (event) => {
    console.log('event', event.selected + 1);
  };

  return (
    <Box className={clsx(style.wrapSearchPhone)}>
      {/* Header */}
      <Header />

      {/* Contained Search Phone */}
      <Box className={clsx(style.wrapContainedSearchPhone)}>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 2, lg: 3 }}>
          {/* app bar */}
          <Grid xs={4} sm={4} md={3} lg={2.1}>
            <AppBar />
          </Grid>

          <Grid container rowSpacing={2} xs={4} sm={4} md={9} lg={9.9}>
            {/* các actions => thể hiện độ tin cậy, uy tín khi mua hàng */}
            <Grid lg={12}>
              <Action />
            </Grid>

            {/* content nội dung các sản phẩm  điện thoại */}
            <Grid md={12} lg={12} container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 2, lg: 1 }}>
              <Grid lg={2.4} md={3}>
                <OnePhone />
              </Grid>
              <Grid lg={2.4} md={3}>
                <OnePhone />
              </Grid>
              <Grid lg={2.4} md={3}>
                <OnePhone />
              </Grid>
              <Grid lg={2.4} md={3}>
                <OnePhone />
              </Grid>
              <Grid lg={2.4} md={3}>
                <OnePhone />
              </Grid>{' '}
              <Grid lg={2.4} md={3}>
                <OnePhone />
              </Grid>
              <Grid lg={2.4} md={3}>
                <OnePhone />
              </Grid>
              <Grid lg={2.4} md={3}>
                <OnePhone />
              </Grid>
              <Grid lg={2.4} md={3}>
                <OnePhone />
              </Grid>
              <Grid lg={2.4} md={3}>
                <OnePhone />
              </Grid>
            </Grid>

            {/* Phân trang React Paninaiton */}
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

      {/* Back to top */}
      <BackTop />
    </Box>
  );
}

export default memo(SearchPhone);
