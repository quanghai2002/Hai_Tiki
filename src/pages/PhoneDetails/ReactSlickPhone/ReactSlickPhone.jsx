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

// item test layout phone details
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

// propTypes
ReactSlickPhone.propTypes = {};

function ReactSlickPhone(props) {
  // setting phone slick
  const settings = {
    customPaging: function (i) {
      return (
        <a>
          <img
            src={'https://salt.tikicdn.com/cache/100x100/ts/product/f3/76/3b/646f9aec3ca3d7398133ae0851a98a83.jpg.webp'}
          />
        </a>
      );
    },
    dots: true,
    dotsClass: 'slick-dots slick-thumb',
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <Box className={clsx(style.wrapPhoneSlick)}>
      <Item>
        <Typography>React slick phone details</Typography>
        <Slider {...settings}>
          <div>
            <img
              src={
                'https://salt.tikicdn.com/cache/368x368/ts/product/b1/fd/00/37fe3895ebef076d2f62e59136c6699e.jpg.webp'
              }
            />
          </div>
          <div>
            <img
              src={
                'https://salt.tikicdn.com/cache/100x100/ts/product/f3/76/3b/646f9aec3ca3d7398133ae0851a98a83.jpg.webp'
              }
            />
          </div>
          <div>
            <img
              src={
                'https://salt.tikicdn.com/cache/100x100/ts/product/70/01/5d/769de7c8b2037efa67ed7e9c4c225867.jpg.webp'
              }
            />
          </div>
          <div>
            <img
              src={
                'https://salt.tikicdn.com/cache/100x100/ts/product/ef/ce/43/a364936c725c483d9fe2c243dc249219.jpg.webp'
              }
            />
          </div>
        </Slider>
      </Item>
    </Box>
  );
}

export default memo(ReactSlickPhone);
