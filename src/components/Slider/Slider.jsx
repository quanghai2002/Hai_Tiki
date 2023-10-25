/* eslint-disable react-refresh/only-export-components */
import PropTypes from 'prop-types';
import style from './Slider.module.scss';
import clsx from 'clsx';
import { memo, useMemo } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import SliderSlick from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import imgSlider1 from '~/assets/images/slider1.png.webp';
import imgSlider2 from '~/assets/images/slider2.png.webp';
import imgSlider3 from '~/assets/images/slider3.png.webp';
import imgSlider4 from '~/assets/images/slider4.png.webp';
import imgSlider5 from '~/assets/images/slider5.png.webp';
import imgSlider6 from '~/assets/images/slider6.png.webp';
import bannserImage from '~/assets/images/banner.png.webp';
import { Link } from 'react-router-dom';

// PropTypes
Slider.propTypes = {};

function Slider(props) {
  // custom btn prev slider
  const CustomPrevArrow = (props) => {
    // eslint-disable-next-line react/prop-types
    const { className, onClick } = props;
    return (
      <Box className="custom-prev-arrow" onClick={onClick}>
        <ArrowBackIosNewIcon />
      </Box>
    );
  };

  // custom next slider
  const CustomNextArrow = (props) => {
    // eslint-disable-next-line react/prop-types
    const { className, onClick } = props;
    return (
      <Box className="custom-next-arrow" onClick={onClick}>
        <ArrowForwardIosIcon />
      </Box>
    );
  };

  // slider slick
  const settings = useMemo(() => {
    return {
      dots: true,
      infinite: true, // bao bọc tất cả nội dung Infinity
      speed: 300, // tốc độ animation
      slidesToShow: 1, // Có bao nhiêu slide hiển thị trong một khung
      slidesToScroll: 1, // Có bao nhiêu slide để cuộn cùng một lúc
      adaptiveHeight: true, // thích nghi với chiều cao
      autoplaySpeed: 3000, // số milliseconds để tự động chạy
      autoplay: true, // tự động chạy
      draggable: true, // cho phép kéo trên thanh màn hình
      nextArrow: <CustomNextArrow />,
      prevArrow: <CustomPrevArrow />,
    };
  }, []);

  // list image => render => slider
  const urlListImageSlider = useMemo(() => {
    return [
      {
        id: 1,
        url: imgSlider1,
      },
      {
        id: 2,
        url: imgSlider2,
      },
      {
        id: 3,
        url: imgSlider3,
      },
      {
        id: 4,
        url: imgSlider4,
      },
      {
        id: 5,
        url: imgSlider5,
      },
      {
        id: 6,
        url: imgSlider6,
      },
      {
        id: 7,
        url: imgSlider6,
      },
      {
        id: 8,
        url: imgSlider6,
      },
    ];
  }, []);

  // <img src={imgSlider1} alt="image slider" className={clsx(style.img)} />

  return (
    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 2, lg: 2 }}>
      {/* slider */}
      <Grid lg={8.9}>
        <Box
          className={clsx(style.wrapSlider)}
          sx={{
            '& .slick-prev': {
              '&::before': {
                // color: 'red',
              },
            },
          }}
        >
          <SliderSlick {...settings}>
            {/* map qua => render => ra các Image => để slider */}
            {urlListImageSlider.map((imageUrl) => {
              return (
                <Box key={imageUrl?.id} className={clsx(style.wrapIamge)}>
                  <Link to="/">
                    <img src={imageUrl?.url} alt="image slider" className={clsx(style.img)} />
                  </Link>
                </Box>
              );
            })}
          </SliderSlick>
        </Box>
      </Grid>

      {/* banner */}
      <Grid lg={3.1}>
        <Box className={clsx(style.wrapBanner)}>
          <Link to="/">
            <img src={bannserImage} alt="banner" className={clsx(style.bannerImage)} />
          </Link>
        </Box>
      </Grid>
    </Grid>
  );
}

export default memo(Slider);
