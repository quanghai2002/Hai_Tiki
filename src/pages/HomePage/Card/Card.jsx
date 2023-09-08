import React, { useState } from 'react';
import PropTypes from 'prop-types';
import style from './Card.module.scss';
import clsx from 'clsx';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
Card.propTypes = {};

function CardItem(props) {
  const [value, setValue] = useState(4);

  // chuyển đỗi từ số sang string => có dấu ngăn cách
  const number = 16000000;
  const formattedNumber = number.toLocaleString('vi-VN');
  // console.log(formattedNumber);

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          sx={{
            width: '100%',
          }}
          component="img"
          height="227"
          image="https://salt.tikicdn.com/cache/280x280/ts/product/ab/60/db/281c3074dd8d6b13fe1b66d855c5f526.jpg.webp"
          alt="green iguana"
        />

        <CardContent
          sx={{
            mt: '-10px',
            padding: '13px',
          }}
        >
          <Typography
            variant="h6"
            color="text.secondary"
            sx={{
              fontSize: '1.4rem',
              textAlign: 'center',
              display: '-webkit-box',
              WebkitBoxOrient: 'vertical',
              WebkitLineClamp: 2,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
            // noWrap
          >
            Điện Thoại Nokia C30 (2GB/32GB) - Hàng Chính Hãng Điện Thoại Nokia C30 (2GB/32GB) - Hàng Chính Hãng Hàng
            Chính Hãng Điện Thoại Nokia C30 (2GB/32GB) - Hàng Chính Hãng
          </Typography>
          <Rating
            name="read-only"
            value={value}
            readOnly
            sx={{
              fontSize: '5.8rem',
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          />
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              mt: '6px',
            }}
          >
            <Typography
              variant="h4"
              color={(theme) => theme.palette.primary}
              sx={{
                position: 'relative',
                fontSize: '3rem',
                display: 'flex',
              }}
            >
              <span
                style={{
                  marginRight: '9px',
                }}
              >
                {formattedNumber}
              </span>
              <span
                style={{
                  textDecoration: 'underline',
                  position: 'absolute',
                  top: '50%',
                  transform: 'translateY(-79%)',
                  right: '-1%',
                  fontSize: '1.5rem',
                }}
              >
                đ
              </span>
            </Typography>

            <Typography variant="h4" color={(theme) => theme.palette.primary} className={clsx(style.percents)}>
              <span>-</span>
              <span>28</span>
              <span>%</span>
            </Typography>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default CardItem;
