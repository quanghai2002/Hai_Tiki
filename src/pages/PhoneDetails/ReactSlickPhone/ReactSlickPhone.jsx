import PropTypes from 'prop-types';
import style from '../PhoneDetails.module.scss';
import clsx from 'clsx';
import { memo, lazy } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useMemo } from 'react';

// propTypes
ReactSlickPhone.propTypes = {
  phoneDetails: PropTypes.object,
};

function ReactSlickPhone({ phoneDetails }) {
  // ---THÔNG TIN SẢN PHẨM ĐƯỢC TRUYỀN XUỐNG----

  // list img
  const listImgaes = phoneDetails?.image_urls?.map((item, index) => {
    return {
      id: index,
      url: item,
    };
  });
  // setting phone slick
  const settings = {
    customPaging: function (i) {
      return (
        <a className={clsx(style.listDotsImage)}>
          <img src={listImgaes[i]?.url} />
        </a>
      );
    },
    dots: true,
    dotsClass: 'slick-dots slick-thumb',
    infinite: true,
    speed: 400,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    adaptiveHeight: true,
    autoplay: true,
  };

  return (
    <Box className={clsx(style.wrapPhoneSlick)}>
      <Slider {...settings} className={clsx(style.slider)}>
        {listImgaes?.map((img) => {
          return (
            <div key={img?.id}>
              <img src={img?.url} className={clsx(style.img)} />
            </div>
          );
        })}
      </Slider>
    </Box>
  );
}

export default memo(ReactSlickPhone);
