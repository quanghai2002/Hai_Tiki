import { memo } from 'react';
import PropTypes from 'prop-types';
import style from './FooterPayOrder.module.scss';
import clsx from 'clsx';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';

// PropTypes
FooterPayOrder.propTypes = {};

function FooterPayOrder(props) {
  return (
    <Box
      className={clsx(style.wrapFooter)}
      sx={{
        backgroundColor: (theme) => theme?.palette?.background?.footerPayOrder,
      }}
    >
      <Box className={clsx(style.contentFooter)}>
        <Typography className={clsx(style.label1)} color={(theme) => theme?.palette?.text?.primary6}>
          Bằng việc tiến hành Đặt Mua, bạn đồng ý với các Điều kiện Giao dịch chung:
        </Typography>

        <Box className={clsx(style.terms)}>
          <Box className={clsx(style.li)}>
            <Link to="/" className={clsx(style.link)}>
              <Typography className={clsx(style.text)} color={(theme) => theme?.palette?.text?.primary4}>
                Quy chế hoạt động
              </Typography>
            </Link>
            <i className={clsx(style.i)}></i>
          </Box>
          <Box className={clsx(style.li)}>
            <Link to="/" className={clsx(style.link)}>
              <Typography className={clsx(style.text)} color={(theme) => theme?.palette?.text?.primary4}>
                Chính sách giải quyết khiếu nại
              </Typography>
            </Link>
            <i className={clsx(style.i)}></i>
          </Box>
          <Box className={clsx(style.li)}>
            <Link to="/" className={clsx(style.link)}>
              <Typography className={clsx(style.text)} color={(theme) => theme?.palette?.text?.primary4}>
                Chính sách bảo hành
              </Typography>
            </Link>
            <i className={clsx(style.i)}></i>
          </Box>
          <Box className={clsx(style.li)}>
            <Link to="/" className={clsx(style.link)}>
              <Typography className={clsx(style.text)} color={(theme) => theme?.palette?.text?.primary4}>
                Chính sách bảo mật thanh toán
              </Typography>
            </Link>
            <i className={clsx(style.i)}></i>
          </Box>
          <Box className={clsx(style.li)}>
            <Link to="/" className={clsx(style.link)}>
              <Typography className={clsx(style.text)} color={(theme) => theme?.palette?.text?.primary4}>
                Chính sách bảo mật thông tin cá nhân
              </Typography>
            </Link>
            <i className={clsx(style.i)}></i>
          </Box>
        </Box>

        <Typography className={clsx(style.copyright)} color={(theme) => theme?.palette?.text?.primary6}>
          © 2023 - Bản quyền NGUYỄN QUANG HẢI - 0968.107.500
        </Typography>
      </Box>
    </Box>
  );
}

export default memo(FooterPayOrder);
