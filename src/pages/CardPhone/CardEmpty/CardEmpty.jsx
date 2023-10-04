import { memo, lazy } from 'react';
import PropTypes from 'prop-types';
import style from './CardEmpty.module.scss';
import { clsx } from 'clsx';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { FloatButton } from 'antd';

const Header = lazy(() => import('~/components/Header'));
const Footer = lazy(() => import('~/components/Footer'));
import cardEmpty from '~/assets/images/cardEmpty.png';
import { Link } from 'react-router-dom';

// PropTypes
CardEmpty.propTypes = {};

function CardEmpty(props) {
  return (
    <Box className={clsx(style.wrapCardEmpty)}>
      {/* Header */}
      <Header />
      {/* Content Card EMPTY */}
      <Box className={clsx(style.cardContentEmpty)}>
        {/* Title */}
        <Typography className={clsx(style.title)}>Giỏ Hàng</Typography>
        {/* Nội dung */}
        <Box className={clsx(style.mainCardEmpty)}>
          <img src={cardEmpty} alt="card empty" className={clsx(style.imageCardEmpty)} />
          <Typography className={clsx(style.textEmpty)} color={(theme) => theme?.palette?.text?.primary4}>
            Không có sản phẩm nào trong giỏ hàng của bạn.
          </Typography>
          <Box className={clsx(style.wrapBtnEmpty)}>
            <Link to="/">
              <Button variant="contained" color="secondary" className={clsx(style.btn)}>
                Tiếp tục mua sắm
              </Button>
            </Link>
          </Box>
        </Box>
      </Box>
      {/* Footer */}
      <Footer />
      {/* back to top */}
      <FloatButton.BackTop duration={450} visibilityHeight={60} className={clsx(style.backTop)} />
    </Box>
  );
}

export default memo(CardEmpty);
