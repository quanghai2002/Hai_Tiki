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
ReactSlickPhone.propTypes = {};

function ReactSlickPhone(props) {
  // list img
  const listImgaes = useMemo(() => {
    return [
      {
        id: 1,
        url: 'https://salt.tikicdn.com/cache/368x368/ts/product/b1/fd/00/37fe3895ebef076d2f62e59136c6699e.jpg.webp',
      },
      {
        id: 2,
        url: 'https://salt.tikicdn.com/cache/368x368/ts/product/70/01/5d/769de7c8b2037efa67ed7e9c4c225867.jpg.webp',
      },
      {
        id: 3,
        url: 'https://salt.tikicdn.com/cache/368x368/ts/product/61/ab/dd/cd833d959492fac1eaec7863d9ff81da.jpg.webp',
      },
      {
        id: 4,
        url: 'https://salt.tikicdn.com/cache/368x368/ts/product/ef/ce/43/a364936c725c483d9fe2c243dc249219.jpg.webp',
      },
      {
        id: 5,
        url: 'https://salt.tikicdn.com/cache/368x368/ts/product/fe/92/18/31935707424bad8cb26b9992919db8ec.jpg.webp',
      },
      {
        id: 6,
        url: 'https://salt.tikicdn.com/cache/368x368/ts/product/fe/92/18/31935707424bad8cb26b9992919db8ec.jpg.webp',
      },
    ];
  }, []);

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
