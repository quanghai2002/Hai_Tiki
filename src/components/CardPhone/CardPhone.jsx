import PropTypes from 'prop-types';
import style from './CardPhone.module.scss';
import clsx from 'clsx';
import { memo, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardActionArea from '@mui/material/CardActionArea';
import { Rate } from 'antd';

import authentic_brand from '~/assets/images/iconChinhHang.png';

// PropTypes
CardPhone.propTypes = {};

function CardPhone(props) {
  // value rating
  const [valueRating, setValueRating] = useState(3);

  // price => convert => string
  const number = 99999999999999;
  const formattedNumber = number.toLocaleString('vi-VN');

  return (
    <Box className={clsx(style.wrapCard)}>
      {/* action sort phone */}
      <Box
        className={clsx(style.wrapActionPhone)}
        sx={{
          marginBottom: '4px',
        }}
      >
        <Box className={clsx(style.action)}>
          <Typography
            className={clsx(style.text, style.active)}
            sx={{
              color: (theme) => theme?.palette?.text?.primary4,
            }}
          >
            Phổ biến
          </Typography>
        </Box>
        <Box className={clsx(style.action)}>
          <Typography
            className={clsx(style.text)}
            sx={{
              color: (theme) => theme?.palette?.text?.primary4,
            }}
          >
            Giá thấp đến cao
          </Typography>
        </Box>
        <Box className={clsx(style.action)}>
          <Typography
            className={clsx(style.text)}
            sx={{
              color: (theme) => theme?.palette?.text?.primary4,
            }}
          >
            Giá cao đến thấp
          </Typography>
        </Box>
      </Box>

      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 2, lg: 1 }}>
        {/* list phone */}
        <Grid lg={2.4}>
          <Box className={clsx(style.cardPhone)}>
            {/* card Phone */}
            <Card sx={{ maxWidth: 345 }} className={clsx(style.wrapCard)}>
              <CardActionArea>
                {/* card image */}
                <CardMedia
                  component="img"
                  height="200"
                  image="https://salt.tikicdn.com/cache/280x280/ts/product/b1/fd/00/37fe3895ebef076d2f62e59136c6699e.jpg.webp"
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
                      Điện thoại Samsung Galaxy A14 LTE 4GB/128GB - Hàng Chính Hãng - Đã kích hoạt bảo hành Đã kích hoạt
                      bảo hành
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
                      -100%
                    </Typography>
                  </Box>
                </CardContent>
              </CardActionArea>
            </Card>
          </Box>
        </Grid>
        <Grid lg={2.4}>
          <Box className={clsx(style.cardPhone)}>
            {/* card Phone */}
            <Card sx={{ maxWidth: 345 }} className={clsx(style.wrapCard)}>
              <CardActionArea>
                {/* card image */}
                <CardMedia
                  component="img"
                  height="200"
                  image="https://salt.tikicdn.com/cache/280x280/ts/product/0c/dd/e7/e6431984901119a1f8166cc4e579da93.png.webp"
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
                      Apple iPhone 14 Pro Max
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
                      -100%
                    </Typography>
                  </Box>
                </CardContent>
              </CardActionArea>
            </Card>
          </Box>
        </Grid>
        <Grid lg={2.4}>
          <Box className={clsx(style.cardPhone)}>
            {/* card Phone */}
            <Card sx={{ maxWidth: 345 }} className={clsx(style.wrapCard)}>
              <CardActionArea>
                {/* card image */}
                <CardMedia
                  component="img"
                  height="200"
                  image="https://salt.tikicdn.com/cache/280x280/ts/product/92/28/df/d2a1aa9bdc7fc4cd02d517a8dd058f83.jpg.webp"
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
                      Điện Thoại Nokia C30 (2GB/32GB) - Hàng Chính Hãng
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
                      -100%
                    </Typography>
                  </Box>
                </CardContent>
              </CardActionArea>
            </Card>
          </Box>
        </Grid>
        <Grid lg={2.4}>
          <Box className={clsx(style.cardPhone)}>
            {/* card Phone */}
            <Card sx={{ maxWidth: 345 }} className={clsx(style.wrapCard)}>
              <CardActionArea>
                {/* card image */}
                <CardMedia
                  component="img"
                  height="200"
                  image="https://salt.tikicdn.com/cache/280x280/ts/product/b1/fd/00/37fe3895ebef076d2f62e59136c6699e.jpg.webp"
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
                      Điện thoại Samsung Galaxy A14 LTE 4GB/128GB - Hàng Chính Hãng - Đã kích hoạt bảo hành Đã kích hoạt
                      bảo hành
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
                      -100%
                    </Typography>
                  </Box>
                </CardContent>
              </CardActionArea>
            </Card>
          </Box>
        </Grid>
        <Grid lg={2.4}>
          <Box className={clsx(style.cardPhone)}>
            {/* card Phone */}
            <Card sx={{ maxWidth: 345 }} className={clsx(style.wrapCard)}>
              <CardActionArea>
                {/* card image */}
                <CardMedia
                  component="img"
                  height="200"
                  image="https://salt.tikicdn.com/cache/280x280/ts/product/b1/fd/00/37fe3895ebef076d2f62e59136c6699e.jpg.webp"
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
                      Điện thoại Samsung Galaxy A14 LTE 4GB/128GB - Hàng Chính Hãng - Đã kích hoạt bảo hành Đã kích hoạt
                      bảo hành
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
                      -100%
                    </Typography>
                  </Box>
                </CardContent>
              </CardActionArea>
            </Card>
          </Box>
        </Grid>
        <Grid lg={2.4}>
          <Box className={clsx(style.cardPhone)}>
            {/* card Phone */}
            <Card sx={{ maxWidth: 345 }} className={clsx(style.wrapCard)}>
              <CardActionArea>
                {/* card image */}
                <CardMedia
                  component="img"
                  height="200"
                  image="https://salt.tikicdn.com/cache/280x280/ts/product/b1/fd/00/37fe3895ebef076d2f62e59136c6699e.jpg.webp"
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
                      Điện thoại Samsung Galaxy A14 LTE 4GB/128GB - Hàng Chính Hãng - Đã kích hoạt bảo hành Đã kích hoạt
                      bảo hành
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
                      -100%
                    </Typography>
                  </Box>
                </CardContent>
              </CardActionArea>
            </Card>
          </Box>
        </Grid>
        <Grid lg={2.4}>
          <Box className={clsx(style.cardPhone)}>
            {/* card Phone */}
            <Card sx={{ maxWidth: 345 }} className={clsx(style.wrapCard)}>
              <CardActionArea>
                {/* card image */}
                <CardMedia
                  component="img"
                  height="200"
                  image="https://salt.tikicdn.com/cache/280x280/ts/product/b1/fd/00/37fe3895ebef076d2f62e59136c6699e.jpg.webp"
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
                      Điện thoại Samsung Galaxy A14 LTE 4GB/128GB - Hàng Chính Hãng - Đã kích hoạt bảo hành Đã kích hoạt
                      bảo hành
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
                      -100%
                    </Typography>
                  </Box>
                </CardContent>
              </CardActionArea>
            </Card>
          </Box>
        </Grid>
        <Grid lg={2.4}>
          <Box className={clsx(style.cardPhone)}>
            {/* card Phone */}
            <Card sx={{ maxWidth: 345 }} className={clsx(style.wrapCard)}>
              <CardActionArea>
                {/* card image */}
                <CardMedia
                  component="img"
                  height="200"
                  image="https://salt.tikicdn.com/cache/280x280/ts/product/b1/fd/00/37fe3895ebef076d2f62e59136c6699e.jpg.webp"
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
                      Điện thoại Samsung Galaxy A14 LTE 4GB/128GB - Hàng Chính Hãng - Đã kích hoạt bảo hành Đã kích hoạt
                      bảo hành
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
                      -100%
                    </Typography>
                  </Box>
                </CardContent>
              </CardActionArea>
            </Card>
          </Box>
        </Grid>
        <Grid lg={2.4}>
          <Box className={clsx(style.cardPhone)}>
            {/* card Phone */}
            <Card sx={{ maxWidth: 345 }} className={clsx(style.wrapCard)}>
              <CardActionArea>
                {/* card image */}
                <CardMedia
                  component="img"
                  height="200"
                  image="https://salt.tikicdn.com/cache/280x280/ts/product/b1/fd/00/37fe3895ebef076d2f62e59136c6699e.jpg.webp"
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
                      Điện thoại Samsung Galaxy A14 LTE 4GB/128GB - Hàng Chính Hãng - Đã kích hoạt bảo hành Đã kích hoạt
                      bảo hành
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
                      -100%
                    </Typography>
                  </Box>
                </CardContent>
              </CardActionArea>
            </Card>
          </Box>
        </Grid>
        <Grid lg={2.4}>
          <Box className={clsx(style.cardPhone)}>
            {/* card Phone */}
            <Card sx={{ maxWidth: 345 }} className={clsx(style.wrapCard)}>
              <CardActionArea>
                {/* card image */}
                <CardMedia
                  component="img"
                  height="200"
                  image="https://salt.tikicdn.com/cache/280x280/ts/product/b1/fd/00/37fe3895ebef076d2f62e59136c6699e.jpg.webp"
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
                      Điện thoại Samsung Galaxy A14 LTE 4GB/128GB - Hàng Chính Hãng - Đã kích hoạt bảo hành Đã kích hoạt
                      bảo hành
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
                      -100%
                    </Typography>
                  </Box>
                </CardContent>
              </CardActionArea>
            </Card>
          </Box>
        </Grid>
        <Grid lg={2.4}>
          <Box className={clsx(style.cardPhone)}>
            {/* card Phone */}
            <Card sx={{ maxWidth: 345 }} className={clsx(style.wrapCard)}>
              <CardActionArea>
                {/* card image */}
                <CardMedia
                  component="img"
                  height="200"
                  image="https://salt.tikicdn.com/cache/280x280/ts/product/b1/fd/00/37fe3895ebef076d2f62e59136c6699e.jpg.webp"
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
                      Điện thoại Samsung Galaxy A14 LTE 4GB/128GB - Hàng Chính Hãng - Đã kích hoạt bảo hành Đã kích hoạt
                      bảo hành
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
                      -100%
                    </Typography>
                  </Box>
                </CardContent>
              </CardActionArea>
            </Card>
          </Box>
        </Grid>
        <Grid lg={2.4}>
          <Box className={clsx(style.cardPhone)}>
            {/* card Phone */}
            <Card sx={{ maxWidth: 345 }} className={clsx(style.wrapCard)}>
              <CardActionArea>
                {/* card image */}
                <CardMedia
                  component="img"
                  height="200"
                  image="https://salt.tikicdn.com/cache/280x280/ts/product/b1/fd/00/37fe3895ebef076d2f62e59136c6699e.jpg.webp"
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
                      Điện thoại Samsung Galaxy A14 LTE 4GB/128GB - Hàng Chính Hãng - Đã kích hoạt bảo hành Đã kích hoạt
                      bảo hành
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
                      -100%
                    </Typography>
                  </Box>
                </CardContent>
              </CardActionArea>
            </Card>
          </Box>
        </Grid>
        <Grid lg={2.4}>
          <Box className={clsx(style.cardPhone)}>
            {/* card Phone */}
            <Card sx={{ maxWidth: 345 }} className={clsx(style.wrapCard)}>
              <CardActionArea>
                {/* card image */}
                <CardMedia
                  component="img"
                  height="200"
                  image="https://salt.tikicdn.com/cache/280x280/ts/product/b1/fd/00/37fe3895ebef076d2f62e59136c6699e.jpg.webp"
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
                      Điện thoại Samsung Galaxy A14 LTE 4GB/128GB - Hàng Chính Hãng - Đã kích hoạt bảo hành Đã kích hoạt
                      bảo hành
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
                      -100%
                    </Typography>
                  </Box>
                </CardContent>
              </CardActionArea>
            </Card>
          </Box>
        </Grid>
        <Grid lg={2.4}>
          <Box className={clsx(style.cardPhone)}>
            {/* card Phone */}
            <Card sx={{ maxWidth: 345 }} className={clsx(style.wrapCard)}>
              <CardActionArea>
                {/* card image */}
                <CardMedia
                  component="img"
                  height="200"
                  image="https://salt.tikicdn.com/cache/280x280/ts/product/b1/fd/00/37fe3895ebef076d2f62e59136c6699e.jpg.webp"
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
                      Điện thoại Samsung Galaxy A14 LTE 4GB/128GB - Hàng Chính Hãng - Đã kích hoạt bảo hành Đã kích hoạt
                      bảo hành
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
                      -100%
                    </Typography>
                  </Box>
                </CardContent>
              </CardActionArea>
            </Card>
          </Box>
        </Grid>
        <Grid lg={2.4}>
          <Box className={clsx(style.cardPhone)}>
            {/* card Phone */}
            <Card sx={{ maxWidth: 345 }} className={clsx(style.wrapCard)}>
              <CardActionArea>
                {/* card image */}
                <CardMedia
                  component="img"
                  height="200"
                  image="https://salt.tikicdn.com/cache/280x280/ts/product/b1/fd/00/37fe3895ebef076d2f62e59136c6699e.jpg.webp"
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
                      Điện thoại Samsung Galaxy A14 LTE 4GB/128GB - Hàng Chính Hãng - Đã kích hoạt bảo hành Đã kích hoạt
                      bảo hành
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
                      -100%
                    </Typography>
                  </Box>
                </CardContent>
              </CardActionArea>
            </Card>
          </Box>
        </Grid>
        <Grid lg={2.4}>
          <Box className={clsx(style.cardPhone)}>
            {/* card Phone */}
            <Card sx={{ maxWidth: 345 }} className={clsx(style.wrapCard)}>
              <CardActionArea>
                {/* card image */}
                <CardMedia
                  component="img"
                  height="200"
                  image="https://salt.tikicdn.com/cache/280x280/ts/product/b1/fd/00/37fe3895ebef076d2f62e59136c6699e.jpg.webp"
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
                      Điện thoại Samsung Galaxy A14 LTE 4GB/128GB - Hàng Chính Hãng - Đã kích hoạt bảo hành Đã kích hoạt
                      bảo hành
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
                      -100%
                    </Typography>
                  </Box>
                </CardContent>
              </CardActionArea>
            </Card>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default memo(CardPhone);
