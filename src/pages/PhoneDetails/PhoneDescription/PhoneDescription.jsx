import PropTypes from 'prop-types';
import style from '../PhoneDetails.module.scss';
import clsx from 'clsx';
import { memo, lazy, useState } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { Rate } from 'antd';
import iconCheck from '~/assets/images/iconCheck.png';
import Divider from '@mui/material/Divider';

import chinhhang from '~/assets/images/iconChinhHang.png';
// propTypes
PhoneDescription.propTypes = {};

function PhoneDescription(props) {
  // value rating
  const [valueRating, setValueRating] = useState(3);

  // price => convert => string
  const number = 19999999;
  const formattedNumber = number.toLocaleString('vi-VN');

  return (
    <Box className={clsx(style.container)}>
      <Box className={style.wrapPhoneDescription}>
        {/* info phone */}
        <Box className={clsx(style.wrapInfo)}>
          {/* header */}
          <Box className={clsx(style.header)}>
            <img src={chinhhang} className={clsx(style.icon)} />
            <Box className={clsx(style.wrapText)}>
              <Typography className={clsx(style.text)} color={(theme) => theme?.palette?.text?.primary4}>
                Thương hiệu:
              </Typography>
              <Typography className={clsx(style.text, style.text2)} color="rgb(10, 104, 255)">
                Xiaomi
              </Typography>
            </Box>
          </Box>

          {/* name phone details */}
          <Typography className={clsx(style.namePhone)} color={(theme) => theme?.palette?.text?.primary4}>
            Điện thoại Xiaomi Redmi 9A (2GB/32GB) - Hàng chính hãng
          </Typography>
          {/* rating */}
          <Box className={clsx(style.wrapRating)}>
            <Typography className={clsx(style.text)} color={(theme) => theme?.palette?.text?.primary4}>
              Đánh giá:
            </Typography>
            <Rate disabled defaultValue={valueRating} className={clsx(style.ratingPhone)} />
          </Box>
          {/* price */}
          <Box className={clsx(style.wrapPrice)}>
            <Box className={clsx(style.price)}>
              <Typography className={clsx(style.number)} color={(theme) => theme?.palette?.text?.primary4}>
                {formattedNumber}
              </Typography>
              <Typography className={clsx(style.vnd)} color={(theme) => theme?.palette?.text?.primary4}>
                ₫
              </Typography>
            </Box>

            <Typography className={clsx(style.promotion)} color={(theme) => theme?.palette?.text?.primary4}>
              -{'90'}%
            </Typography>
          </Box>
        </Box>

        {/* option phone */}
        <Box className={clsx(style.wrapOption)}>
          {/* text color */}
          <Typography className={clsx(style.text)} color={(theme) => theme?.palette?.text?.primary4}>
            Màu
          </Typography>
          {/* content */}
          <Box className={clsx(style.wrapContentOption)}>
            <Box className={clsx(style.content)}>
              <img
                className={clsx(style.img)}
                src="https://salt.tikicdn.com/cache/368x368/ts/product/b1/fd/00/37fe3895ebef076d2f62e59136c6699e.jpg.webp"
              />
              <Typography className={clsx(style.text)} color={(theme) => theme?.palette?.text?.primary4}>
                Xanh lá
              </Typography>
              <img src={iconCheck} alt="icon check" className={clsx(style.iconCheck)} />
            </Box>
          </Box>
        </Box>
      </Box>

      {/* details phone */}
      <Box className={clsx(style.wrapDetailsPhone)}>
        <Typography className={clsx(style.header)} color={(theme) => theme?.palette?.text?.primary4}>
          Thông tin chi tiết
        </Typography>
        {/* ---- */}
        <Box className={clsx(style.content)}>
          <Typography className={clsx(style.text)} color={(theme) => theme?.palette?.text?.primary6}>
            Dung lượng pin
          </Typography>
          <Typography className={clsx(style.text, style.text2)} color={(theme) => theme?.palette?.text?.primary4}>
            5000 mAh
          </Typography>
        </Box>
        <Divider />
        {/* ---- */}
        <Box className={clsx(style.content)}>
          <Typography className={clsx(style.text)} color={(theme) => theme?.palette?.text?.primary6}>
            Thương hiệu
          </Typography>
          <Typography className={clsx(style.text, style.text2)} color={(theme) => theme?.palette?.text?.primary4}>
            Xiaomi
          </Typography>
        </Box>
        <Divider />
        {/* ---- */}
        <Box className={clsx(style.content)}>
          <Typography className={clsx(style.text)} color={(theme) => theme?.palette?.text?.primary6}>
            Camera
          </Typography>
          <Typography className={clsx(style.text, style.text2)} color={(theme) => theme?.palette?.text?.primary4}>
            13 MP
          </Typography>
        </Box>
        <Divider />
        {/* ---- */}
        <Box className={clsx(style.content)}>
          <Typography className={clsx(style.text)} color={(theme) => theme?.palette?.text?.primary6}>
            Bộ nhớ khả dụng
          </Typography>
          <Typography className={clsx(style.text, style.text2)} color={(theme) => theme?.palette?.text?.primary4}>
            22 GB
          </Typography>
        </Box>
        <Divider />
        {/* ---- */}
        <Box className={clsx(style.content)}>
          <Typography className={clsx(style.text)} color={(theme) => theme?.palette?.text?.primary6}>
            Kích thước màn hình
          </Typography>
          <Typography className={clsx(style.text, style.text2)} color={(theme) => theme?.palette?.text?.primary4}>
            6.53 inch
          </Typography>
        </Box>
        <Divider />
        {/* ---- */}
        <Box className={clsx(style.content)}>
          <Typography className={clsx(style.text)} color={(theme) => theme?.palette?.text?.primary6}>
            Tốc độ CPU
          </Typography>
          <Typography className={clsx(style.text, style.text2)} color={(theme) => theme?.palette?.text?.primary4}>
            8 nhân 2.0 GHz
          </Typography>
        </Box>
        <Divider />
        {/* ---- */}
        <Box className={clsx(style.content)}>
          <Typography className={clsx(style.text)} color={(theme) => theme?.palette?.text?.primary6}>
            RAM
          </Typography>
          <Typography className={clsx(style.text, style.text2)} color={(theme) => theme?.palette?.text?.primary4}>
            2 GB
          </Typography>
        </Box>
        <Divider />
        {/* ---- */}
        <Box className={clsx(style.content)}>
          <Typography className={clsx(style.text)} color={(theme) => theme?.palette?.text?.primary6}>
            ROM
          </Typography>
          <Typography className={clsx(style.text, style.text2)} color={(theme) => theme?.palette?.text?.primary4}>
            32 GB
          </Typography>
        </Box>
        <Divider />
        {/* ---- */}
        <Box className={clsx(style.content)}>
          <Typography className={clsx(style.text)} color={(theme) => theme?.palette?.text?.primary6}>
            Hệ điều hành
          </Typography>
          <Typography className={clsx(style.text, style.text2)} color={(theme) => theme?.palette?.text?.primary4}>
            Androi
          </Typography>
        </Box>
      </Box>
      {/* details phone 2, mô tả sản phẩm */}
      <Box className={clsx(style.wrapDetailsPhone)}>
        <Typography className={clsx(style.header)} color={(theme) => theme?.palette?.text?.primary4}>
          Mô tả sản phẩm
        </Typography>
        {/* ---- */}
        <Box className={clsx(style.content)}>
          <Typography className={clsx(style.text)} color={(theme) => theme?.palette?.text?.primary6}>
            đây là điện thoại a13
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default memo(PhoneDescription);
