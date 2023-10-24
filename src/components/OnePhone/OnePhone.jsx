import PropTypes from 'prop-types';
import clsx from 'clsx';
import style from './OnePhone.module.scss';
import Box from '@mui/material/Box';
import { memo, useState } from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardActionArea from '@mui/material/CardActionArea';
import { Rate } from 'antd';

import authentic_brand from '~/assets/images/iconChinhHang.png';
import { useNavigate } from 'react-router-dom';

// PropTypes
OnePhone.propTypes = {
  phoneDetails: PropTypes.object,
};

function OnePhone({ phoneDetails }) {
  const navigate = useNavigate();
  // ---KHI CLICK VÀO SẢN PHẨM ---
  const hanldeClickGetPhone = (id) => {
    // --CHUYỂN SANG TRANG XEM CHI TIẾT SẢN PHẨM VÀ TRUYỀN ID QUA
    navigate(`/phonedetails/${id}`);
  };

  // value rating
  const [valueRating, setValueRating] = useState(5);

  // price => convert => string
  const number = phoneDetails?.price;
  const formattedNumber = number.toLocaleString('vi-VN');
  return (
    <Box
      className={clsx(style.wrapOnePhone)}
      onClick={() => {
        hanldeClickGetPhone(phoneDetails?._id);
      }}
    >
      {/* card Phone */}
      <Card sx={{ maxWidth: 345 }} className={clsx(style.wrapCard)}>
        <CardActionArea>
          {/* card image */}
          <CardMedia
            component="img"
            height="200"
            image={phoneDetails?.image_urls[0]}
            alt="anh dien thoai"
            className={clsx(style.cardImage)}
          />
          {/* card content */}
          <CardContent className={clsx(style.wrapCardContents)}>
            <Box className={clsx(style.info)}>
              {/* chính hãng */}
              <img src={authentic_brand} alt="authentic_brand" className={clsx(style.authentic_brand)} />
              {/* name phone */}
              <Typography className={clsx(style.namePhone)} color={(theme) => theme?.palette?.text?.primary4}>
                {phoneDetails?.name}
              </Typography>
              {/* rating */}
              <Rate disabled defaultValue={valueRating} className={clsx(style.ratingPhone)} />
            </Box>
            {/* price */}
            <Box className={clsx(style.wrapPrice)}>
              <Box className={clsx(style.price)}>
                <Typography className={clsx(style.number)} noWrap>
                  {formattedNumber}
                </Typography>
                <Typography className={clsx(style.vnd)}>₫</Typography>
              </Box>

              <Typography className={clsx(style.promotion)} color={(theme) => theme?.palette?.text?.primary4}>
                -{phoneDetails?.promotion}
              </Typography>
            </Box>
          </CardContent>
        </CardActionArea>
      </Card>
    </Box>
  );
}

export default memo(OnePhone);
