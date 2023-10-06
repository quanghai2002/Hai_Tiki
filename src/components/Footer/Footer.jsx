/* eslint-disable react-refresh/only-export-components */
import PropTypes from 'prop-types';
import style from './Footer.module.scss';
import clsx from 'clsx';
import { memo } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2

import verify1 from '~/assets/images/bo-cong-thuong-2.png';
import verify2 from '~/assets/images/bo-cong-thuong.svg';
import qrDownload from '~/assets/images/qrDownload.png';
import downloadStore from '~/assets/images/downloadStore.png';
import downloadCHplay from '~/assets/images/downloadChPlay.png';
import {
  ATM,
  International,
  JCB,
  MoMo,
  PayTiki,
  PayVisa,
  ZaloPay,
  ViettelPay,
  VNP,
  PayDown,
  Installment,
  TikiNow,
  FaceBook,
  YouTube,
  Zalo,
} from '~/assets/iconSVG.jsx';

// PropTypes
Footer.propTypes = {};

function Footer(props) {
  return (
    <Box
      className={clsx(style.wrapFooter)}
      sx={{
        backgroundColor: (theme) => theme?.palette?.background?.header,
      }}
    >
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3, lg: 2 }}>
        <Grid lg={2.4}>
          <Box className={clsx(style.footer)}>
            <Typography className={clsx(style.textHeader)}>Hỗ trợ khách hàng</Typography>
            <Typography className={clsx(style.text)}>
              Hotline:
              <a className={clsx(style.link)} href="tel:0968107500">
                0968.107.500
              </a>
            </Typography>
            <Typography className={clsx(style.text)}>Các câu hỏi thường gặp</Typography>
            <Typography className={clsx(style.text)}>Gửi yêu cầu hỗ trợ</Typography>
            <Typography className={clsx(style.text)}>Phương thức vận chuyển</Typography>
            <Typography className={clsx(style.text)}>Chính sách đổi trả</Typography>
            <Typography className={clsx(style.text)}>Hướng dẫn trả góp</Typography>
            <Typography className={clsx(style.text)}>Chính sách hàng nhập khẩu</Typography>
            <Typography className={clsx(style.text)} noWrap>
              Hỗ trợ:
              <a className={clsx(style.link)} href="mailto:nguyenquanghai2002.tn@gmail.com">
                nguyenquanghai2002.tn@gmail.com
              </a>
            </Typography>
          </Box>
        </Grid>
        <Grid lg={2.4}>
          <Box className={clsx(style.footer)}>
            <Typography className={clsx(style.textHeader)}>Về Hải Tiki</Typography>
            <Typography className={clsx(style.text)}>Giới thiệu Hải Tiki</Typography>
            <Typography className={clsx(style.text)}>Hải Tiki Blog</Typography>
            <Typography className={clsx(style.text)}>Tuyển dụng</Typography>
            <Typography className={clsx(style.text)}>Chính sách bảo mật thanh toán</Typography>
            <Typography className={clsx(style.text)}>Điều khoản sử dụng</Typography>
            <Typography className={clsx(style.text)}>Giới thiệu Hải Tiki Xu</Typography>
            <Typography className={clsx(style.text)}>Gói hội viên VIP</Typography>
            <Typography className={clsx(style.text)}>Bán hàng doanh nghiệp</Typography>
            <Typography className={clsx(style.text)}>Điều kiện vận chuyển</Typography>
          </Box>
        </Grid>
        <Grid lg={2.4}>
          <Box className={clsx(style.footer)}>
            <Typography className={clsx(style.textHeader)}>Hợp tác và liên kết</Typography>
            <Typography className={clsx(style.text)}>Quy chế hoạt động Sàn GDTMĐT</Typography>
            <Typography className={clsx(style.text)}>Bán hàng cùng Hải Tiki</Typography>
            <Typography
              className={clsx(style.textHeader)}
              sx={{
                marginTop: '24px',
              }}
            >
              Chứng nhận bởi
            </Typography>
            <Box className={clsx(style.verify)}>
              <img src={verify1} alt="verify" className={clsx(style.img)} />
              <img src={verify2} alt="verify" className={clsx(style.img)} />
            </Box>
          </Box>
        </Grid>
        <Grid lg={2.4}>
          <Box className={clsx(style.footer)}>
            <Typography className={clsx(style.textHeader)}>Phương thức thanh toán</Typography>
            <Box className={clsx(style.payMent)}>
              <PayTiki />
              <PayVisa />
              <International />
              <JCB />
              <ATM />
              <MoMo />
              <ZaloPay />
              <ViettelPay />
              <VNP />
              <PayDown />
              <Installment />
            </Box>
            <Typography
              className={clsx(style.textHeader)}
              sx={{
                margin: '24px 0 12px 0',
              }}
            >
              Dịch vụ giao hàng
            </Typography>

            <TikiNow />
          </Box>
        </Grid>
        <Grid lg={2.4}>
          <Box className={clsx(style.footer)}>
            <Typography className={clsx(style.textHeader)}>Kết nối với Quang Hải</Typography>
            <Box className={clsx(style.social)}>
              <a
                href="https://www.facebook.com/hai.nguyenquang.5477272/"
                target="_blank"
                rel="noreferrer"
                className={clsx(style.link)}
              >
                <FaceBook />
              </a>
              <a
                href="https://www.youtube.com/channel/UCDnfGvT9xON5D2VTpJ-Cevw"
                target="_blank"
                rel="noreferrer"
                className={clsx(style.link)}
              >
                <YouTube />
              </a>
              <a
                href="http://zaloapp.com/qr/p/1vwqhh1jmxjb3"
                target="_blank"
                rel="noreferrer"
                className={clsx(style.link)}
              >
                <Zalo />
              </a>
            </Box>
            <Typography
              className={clsx(style.textHeader)}
              sx={{
                margin: '24px 0 12px 0',
              }}
            >
              Tải ứng dụng trên điện thoại
            </Typography>
            <Box className={clsx(style.downLoad)}>
              <img src={qrDownload} alt="download" className={clsx(style.qrCode)} />
              <Box className={clsx(style.downloadStore)}>
                <img src={downloadStore} alt="download" className={clsx(style.img)} />
                <img src={downloadCHplay} alt="download" className={clsx(style.img)} />
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default memo(Footer);
