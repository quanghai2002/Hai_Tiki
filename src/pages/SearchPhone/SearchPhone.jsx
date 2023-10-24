import PropTypes from 'prop-types';
import style from './SearchPhone.module.scss';
import { clsx } from 'clsx';
import { memo, lazy, useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import ReactPaginate from 'react-paginate';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import BackTop from '~/components/BackTop';
import { useLocation } from 'react-router-dom';
import Header from '~/components/Header';
import Footer from '~/components/Footer';
import AppBar from '~/components/AppBar';
import Action from '~/components/Action';
import OnePhone from '~/components/OnePhone';
import searchNotFound from '~/assets/images/searchnotfound.png';
import SeachPhoneLazy from './SeachPhoneLazy.jsx';
import phoneApi from '~/apis/phoneApi.js';

// PropTypes
SearchPhone.propTypes = {};

// eslint-disable-next-line react-refresh/only-export-components
function SearchPhone(props) {
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [listPhoneSearch, setListPhoneSearch] = useState([]);
  const [page, setPage] = useState(1);
  const [focusPage, setForCusPage] = useState(0);

  // ---------------PHÂN TRANG -----------REACT PAGINATION-------
  const [pageCount, setPageCount] = useState(1);
  const handlePageClick = (event) => {
    // console.log('event', event.selected + 1);
    setPage(event.selected + 1);
  };

  // ---SAU KHI CÓ GIÁ TRỊ PARAM TÌM KIẾM  --- CALL API
  //  --- GET GIÁ TRỊ TÌM KIẾM --
  const getSearchParams = () => {
    const searchParams = new URLSearchParams(location.search);
    return searchParams.get('name');
  };
  const searchValue = getSearchParams();

  // ---SET LẠI PAGE === 1 Khi Thay đổi giá trị tìm kiếm THAY ĐỔI LẠI => TÌM KIẾM LẠI SẢN PHẨM --
  useEffect(() => {
    setPage(1);
  }, [searchValue]);

  // -- CALL API CÁC SẢN PHẨM TÌM KIẾM ---
  useEffect(() => {
    // -- NẾU CÓ GIÁ TRỊ TÌM KIẾM ---
    if (searchValue) {
      setLoading(true);
      const valueSearch = decodeURIComponent(searchValue);
      // --- DATA ĐỂ TÌM KIẾM SẢN PHẨM LÀ --
      const dataSearchPhone = {
        name: valueSearch,
        page: page,
      };

      // --CALL API LẤY THÔNG TIN SẢN PHẨM TÌM KIẾM --
      phoneApi
        .searchPhoneBuyName(dataSearchPhone)
        .then((response) => {
          setListPhoneSearch(response?.data?.data);
          setPageCount(response?.data?.totalPages);
          setForCusPage(Number.parseInt(response?.data?.currentPage) - 1);
          setLoading(false);
        })
        .catch((err) => {
          console.log('LỖI !, không thể get API tìm kết quả:', err);
          setLoading(false);
        });
    } else {
      console.log('Không tìm thấy giá trị tìm kiếm trong URL.');
    }
  }, [searchValue, page]);

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
            {/* KHI ĐANG TẢI THÔNG TIN SẢN PHẨM TÌM KIẾM THÌ HIỆN LAZY LOADING RA MÀN HÌNH */}
            {loading ? (
              <Grid md={12} lg={12} container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 2, lg: 1 }}>
                <SeachPhoneLazy />
              </Grid>
            ) : (
              // Nếu có thông tin sản phẩm tìm kiếm thì hiện thị ra thông tin sản phẩm
              <>
                {listPhoneSearch?.length > 0 ? (
                  <>
                    {/* MÀ NẾU SỐ LƯỢNG SẢN PHẨM TÌM THẤY > 0 => MỚI HIỆN THỊ RA DANH SÁCH  => NẾU KHÔNG HIện thị không tìm thấy sản phẩm*/}
                    {/* các actions => thể hiện độ tin cậy, uy tín khi mua hàng */}
                    <Grid
                      lg={12}
                      sx={{
                        marginTop: '5px',
                      }}
                    >
                      <Action />
                    </Grid>
                    {/* --SẼ HIỂN THỊ DANH SÁCH SẢN PHẨM RA ĐẤY NẾU TÌM THẤY CÁC SẢN PHẨM THỎA MÃN ĐIÊU KIỆN --- */}
                    {/* content nội dung các sản phẩm  điện thoại */}

                    <Box
                      sx={{
                        paddingLeft: '12px',
                        paddingRight: '4px',
                        marginTop: '6px',
                        width: '100%',
                      }}
                    >
                      <Grid md={12} lg={12} container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 2, lg: 1 }}>
                        {listPhoneSearch?.map((item) => {
                          return (
                            <Grid lg={2.4} md={3} key={item?._id}>
                              <OnePhone phoneDetails={item} />
                            </Grid>
                          );
                        })}
                      </Grid>
                    </Box>

                    {/* Phân trang React Paninaiton  -- PHÂN TRANG CŨNG CHỈ HIỆN THỊ KHI TÌM THẤY SẢN PHẨM MÀ THÔI BẠN NHÉ */}
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
                          forcePage={focusPage}
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
                  </>
                ) : (
                  // Nếu số lượng sản phẩm không tìm thấy => hiển thị không tìm thấy kết quả
                  <Grid md={12} lg={12} container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 2, lg: 1 }}>
                    <Box className={clsx(style.wrapSearchNotFound)}>
                      <img src={searchNotFound} alt="searchNotFound" className={clsx(style.imageNotFound)} />
                      <Typography className={clsx(style.text1)}>Không tìm thấy kết quả nào</Typography>
                      <Typography className={clsx(style.text2)} color={(theme) => theme?.palette?.text?.secondary}>
                        Hãy thử sử dụng các từ khóa chung chung hơn
                      </Typography>
                    </Box>
                  </Grid>
                )}
              </>
            )}

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
