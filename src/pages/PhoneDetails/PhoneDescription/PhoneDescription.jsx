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
PhoneDescription.propTypes = {
  phoneDetails: PropTypes.object,
};

function PhoneDescription({ phoneDetails }) {
  // console.log('thông tin sản phẩm:', phoneDetails);
  // value rating
  const [valueRating, setValueRating] = useState(5);

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
                {phoneDetails?.brand?.name}
              </Typography>
            </Box>
          </Box>

          {/* name phone details */}
          <Typography className={clsx(style.namePhone)} color={(theme) => theme?.palette?.text?.primary4}>
            {phoneDetails?.name}
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
                {phoneDetails?.price?.toLocaleString('vi-VN')}
              </Typography>
              <Typography className={clsx(style.vnd)} color={(theme) => theme?.palette?.text?.primary4}>
                ₫
              </Typography>
            </Box>

            <Typography className={clsx(style.promotion)} color={(theme) => theme?.palette?.text?.primary4}>
              -{phoneDetails?.promotion}
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
              <img className={clsx(style.img)} src={phoneDetails?.image_urls[0]} />
              <Typography className={clsx(style.text)} color={(theme) => theme?.palette?.text?.primary4}>
                {phoneDetails?.mau_sac}
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
            {phoneDetails?.dung_luong_pin}
          </Typography>
        </Box>
        <Divider />
        {/* ---- */}
        <Box className={clsx(style.content)}>
          <Typography className={clsx(style.text)} color={(theme) => theme?.palette?.text?.primary6}>
            Thương hiệu
          </Typography>
          <Typography className={clsx(style.text, style.text2)} color={(theme) => theme?.palette?.text?.primary4}>
            {phoneDetails?.brand?.name}
          </Typography>
        </Box>
        <Divider />
        {/* ---- */}
        <Box className={clsx(style.content)}>
          <Typography className={clsx(style.text)} color={(theme) => theme?.palette?.text?.primary6}>
            Camera
          </Typography>
          <Typography className={clsx(style.text, style.text2)} color={(theme) => theme?.palette?.text?.primary4}>
            {phoneDetails?.camera}
          </Typography>
        </Box>
        <Divider />
        {/* ---- */}
        <Box className={clsx(style.content)}>
          <Typography className={clsx(style.text)} color={(theme) => theme?.palette?.text?.primary6}>
            Bộ nhớ khả dụng
          </Typography>
          <Typography className={clsx(style.text, style.text2)} color={(theme) => theme?.palette?.text?.primary4}>
            {phoneDetails?.bo_nho}
          </Typography>
        </Box>
        <Divider />
        {/* ---- */}
        <Box className={clsx(style.content)}>
          <Typography className={clsx(style.text)} color={(theme) => theme?.palette?.text?.primary6}>
            Kích thước màn hình
          </Typography>
          <Typography className={clsx(style.text, style.text2)} color={(theme) => theme?.palette?.text?.primary4}>
            {phoneDetails?.kich_thuoc_man_hinh} inch
          </Typography>
        </Box>
        <Divider />
        {/* ---- */}
        <Box className={clsx(style.content)}>
          <Typography className={clsx(style.text)} color={(theme) => theme?.palette?.text?.primary6}>
            Tốc độ CPU
          </Typography>
          <Typography className={clsx(style.text, style.text2)} color={(theme) => theme?.palette?.text?.primary4}>
            {phoneDetails?.CPU}
          </Typography>
        </Box>
        <Divider />
        {/* ---- */}
        <Box className={clsx(style.content)}>
          <Typography className={clsx(style.text)} color={(theme) => theme?.palette?.text?.primary6}>
            RAM
          </Typography>
          <Typography className={clsx(style.text, style.text2)} color={(theme) => theme?.palette?.text?.primary4}>
            {phoneDetails?.RAM}
          </Typography>
        </Box>
        <Divider />
        {/* ---- */}
        <Box className={clsx(style.content)}>
          <Typography className={clsx(style.text)} color={(theme) => theme?.palette?.text?.primary6}>
            ROM
          </Typography>
          <Typography className={clsx(style.text, style.text2)} color={(theme) => theme?.palette?.text?.primary4}>
            {phoneDetails?.ROM}
          </Typography>
        </Box>
        <Divider />
        {/* ---- */}
        <Box className={clsx(style.content)}>
          <Typography className={clsx(style.text)} color={(theme) => theme?.palette?.text?.primary6}>
            Hệ điều hành
          </Typography>
          <Typography className={clsx(style.text, style.text2)} color={(theme) => theme?.palette?.text?.primary4}>
            {phoneDetails?.he_dieu_hanh}
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
            {phoneDetails?.description}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default memo(PhoneDescription);
