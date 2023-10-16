import PropTypes from 'prop-types';
import style from './CardPhone.module.scss';
import clsx from 'clsx';
import { memo, useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardActionArea from '@mui/material/CardActionArea';
import { Rate } from 'antd';
import ReactPaginate from 'react-paginate';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import LinearProgress from '@mui/material/LinearProgress';

import authentic_brand from '~/assets/images/iconChinhHang.png';
import phoneApi from '~/apis/phoneApi.js';
import { useNavigate } from 'react-router-dom';
import CardPhoneLazy from './CardPhoneLazy/CardPhoneLazy';

// PropTypes
CardPhone.propTypes = {};

function CardPhone(props) {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  // -------------XỬ LÝ LỰA CHỌN ĐỂ SẮP XẾP SẢN PHẨM THEO GIÁ --------------
  const [numberSort, setNumberSort] = useState(0);

  // --PHẦN TRĂM TIẾN TRÌNH THANH TRẠNG THÁI -----
  const [progress, setProgress] = useState(0);

  // ---------------PHÂN TRANG -----------REACT PAGINATION-------
  // tổng số trang
  const [pageCount, setPageCount] = useState(1);
  // trang hiện tại được chọn
  const [pageCurrent, setPageCurrent] = useState(1);
  // khi onchange trong Pagination
  const handlePageClick = (event) => {
    // KHI click thay đổi page => set lại thanh trạng thái === 0
    setLoading(true);
    setProgress(0);
    setPageCurrent(event.selected + 1);
  };
  // ------------LẤY DANH SÁCH SẢN PHẨM TỪ API------------
  // ---------KHÔNG CẦN ĐĂNG NHẬP CŨNG XEM ĐƯỢC -----------
  const [listPhone, setListPhone] = useState([]);

  useEffect(() => {
    //----------- NẾU === 0 đang là chọn Phổ Biến thì gọi api giá đảo lộn luôn --------------
    if (numberSort === 0) {
      phoneApi
        .getPhonePagination(pageCurrent)
        .then((response) => {
          // console.log({ respose });
          setListPhone(response?.data);
          setPageCount(response?.totalPages);
          setLoading(false);

          // Thành Công || Thất bại => setprogress === 100
          setProgress(100);
        })
        .catch((err) => {
          console.log({ err });
          setProgress(100);
          setLoading(false);
        });
    }
    // NẾU ===1 THÌ LÀ SẮP XẾP THEO GIÁ TỪ THẤP ĐẾN CAO
    else if (numberSort === 1) {
      phoneApi
        .getPhonePriceASC(pageCurrent)
        .then((response) => {
          setListPhone(response?.data);
          setProgress(100);
          setPageCount(response?.pages);
          setLoading(false);
        })
        .catch((err) => {
          console.log({ err });
          setProgress(100);
          setLoading(false);
        });
    }
    // NẾU === 2 => THÌ GIÁ SẮP XẾP TỪ CAO XUỐNG THẤP
    else if (numberSort === 2) {
      phoneApi
        .getPhonePriceDES(pageCurrent)
        .then((response) => {
          setListPhone(response?.data);
          setProgress(100);
          setPageCount(response?.pages);
          setLoading(false);
        })
        .catch((err) => {
          console.log({ err });
          setProgress(100);
          setLoading(false);
        });
    }
  }, [pageCurrent, numberSort]);
  // console.log({ listPhone });

  // -----TRẠNG THÁI THANH PROGRESS-------- Tăng dấn sau 10ms
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        const diff = Math.random() * 10;
        return Math.min(oldProgress + diff, 100);
      });
    }, 10);

    return () => {
      clearInterval(timer);
    };
  }, [pageCurrent, numberSort]);

  // -----------KHI CLICK ẤN VÀO THEO GIÁ SẢM PHẨM PHỔ BIẾN------
  const handleSortPhoBien = () => {
    // console.log('sắp xếp sản phẩm theo Phổ Biến');
    setNumberSort(0);
    setProgress(0);
    setPageCurrent(1);
    setLoading(true);
  };

  // -----------KHI CLICK ẤN VÀO THEO GIÁ SẢM PHẨM TỪ THẤP ĐẾN CAO-------
  const handleSortTangDan = () => {
    // console.log('sắp xếp sản phẩm theo giá từ THẤP ĐẾN CAO');
    setNumberSort(1);
    setProgress(0);
    setPageCurrent(1);
    setLoading(true);
  };

  // -----------KHI CLICK ẤN VÀO THEO GIÁ SẢM PHẨM TỪ CAO XUỐNG THẤP-------
  const handleSortGiamDan = () => {
    // console.log('sắp xếp sản phẩm theo giá từ CAO ĐẾN THẤP');
    setNumberSort(2);
    setProgress(0);
    setPageCurrent(1);
    setLoading(true);
  };

  // --------------KHI CLICK VÀO SẢN PHẨM ĐỂ XEM CHI TIẾT THÔNG TIN SẢN PHẨM Đó
  // Lấy id từng sản phẩm và truyền sang phone details với link động
  const handleClickPhone = (idPhone) => {
    // console.log('id sản phẩm', idPhone);
    navigate(`/phonedetails/${idPhone}`);
  };

  // value rating
  const [valueRating, setValueRating] = useState(3);

  return (
    <Box className={clsx(style.wrapCard)}>
      {/* THANH TRẠNG THÁI PROGRESS */}
      <LinearProgress
        variant="determinate"
        value={progress}
        className={clsx(style.progress, {
          [style.hidden]: progress === 0 || progress === 100,
        })}
      />
      {/* action sort phone --- TÙY CHỌN SẮP XẾP SẢN PHẨM ĐIỆN THOẠI THEO GIÁ---- */}
      <Box
        className={clsx(style.wrapActionPhone)}
        sx={{
          marginBottom: '4px',
        }}
      >
        <Box className={clsx(style.action)} onClick={handleSortPhoBien}>
          <Typography
            className={clsx(style.text, {
              [style.active]: numberSort === 0,
            })}
            sx={{
              color: (theme) => theme?.palette?.text?.primary4,
            }}
          >
            Phổ biến
          </Typography>
        </Box>
        <Box className={clsx(style.action)} onClick={handleSortTangDan}>
          <Typography
            className={clsx(style.text, {
              [style.active]: numberSort === 1,
            })}
            sx={{
              color: (theme) => theme?.palette?.text?.primary4,
            }}
          >
            Giá thấp đến cao
          </Typography>
        </Box>
        <Box className={clsx(style.action)} onClick={handleSortGiamDan}>
          <Typography
            className={clsx(style.text, {
              [style.active]: numberSort === 2,
            })}
            sx={{
              color: (theme) => theme?.palette?.text?.primary4,
            }}
          >
            Giá cao đến thấp
          </Typography>
        </Box>
      </Box>

      {/* DANH SÁCH SẢN PHẨM ĐIỆN THOẠI */}
      {/*----------- NẾU ĐANG LẤY THÔNG TIN ĐIỆN THOAI API => HIỆN LAZY CARD RA -------------*/}
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 2, lg: 1 }}>
        {loading ? (
          <CardPhoneLazy />
        ) : (
          listPhone?.map((phone) => {
            return (
              <Grid lg={2.4} key={phone?._id}>
                <Box
                  className={clsx(style.cardPhone)}
                  onClick={() => {
                    handleClickPhone(phone?._id);
                  }}
                >
                  {/* card Phone */}
                  <Card sx={{ maxWidth: 345 }} className={clsx(style.wrapCard)}>
                    <CardActionArea>
                      {/* card image */}
                      <CardMedia
                        component="img"
                        height="200"
                        image={phone?.image_urls[0]}
                        alt="anh dien thoai"
                        className={clsx(style.cardImage)}
                      />
                      {/* card content */}
                      <CardContent className={clsx(style.wrapCardContents)}>
                        <Box className={clsx(style.info)}>
                          {/* chính hãng */}
                          <img src={authentic_brand} alt="authentic_brand" className={clsx(style.authentic_brand)} />
                          {/* name phone */}
                          <Typography
                            className={clsx(style.namePhone)}
                            color={(theme) => theme?.palette?.text?.primary4}
                          >
                            {phone?.name}
                          </Typography>
                          {/* rating */}
                          <Rate disabled defaultValue={valueRating} className={clsx(style.ratingPhone)} />
                        </Box>
                        {/* price */}
                        <Box className={clsx(style.wrapPrice)}>
                          <Box className={clsx(style.price)}>
                            <Typography className={clsx(style.number)} noWrap>
                              {phone?.price?.toLocaleString('vi-VN')}
                            </Typography>
                            <Typography className={clsx(style.vnd)}>₫</Typography>
                          </Box>

                          <Typography
                            className={clsx(style.promotion)}
                            color={(theme) => theme?.palette?.text?.primary4}
                          >
                            -{phone?.promotion}
                          </Typography>
                        </Box>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Box>
              </Grid>
            );
          })
        )}
      </Grid>

      {/* PAGINATION - PHÂN TRANG */}
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
          forcePage={pageCurrent - 1}
        />
      </Box>
    </Box>
  );
}

export default memo(CardPhone);
