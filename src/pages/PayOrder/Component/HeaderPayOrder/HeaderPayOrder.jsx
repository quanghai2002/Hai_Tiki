import PropTypes from 'prop-types';
import style from './HeaderPayOrder.module.scss';
import clsx from 'clsx';
import { memo } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ImageLogo from '~/assets/images/haiLoGoTiki2.png';
import { Link } from 'react-router-dom';
import PhoneInTalkIcon from '@mui/icons-material/PhoneInTalk';

import DarkMode from '~/components/DarkMode';

// PropTypes
HeaderPayOrder.propTypes = {};

function HeaderPayOrder(props) {
  return (
    <Box
      className={clsx(style.header)}
      sx={{
        backgroundColor: (theme) => theme?.palette?.background?.header,
      }}
    >
      <Box className={clsx(style.contentHeader)}>
        <Box className={clsx(style.wrapLogo)}>
          <Link to="/" className={clsx(style.linkLogo)}>
            <img src={ImageLogo} alt="anh logo" className={clsx(style.img)} />
          </Link>

          <Box className={clsx(style.divider)}></Box>
          <Typography className={clsx(style.title)}>Thanh toán</Typography>
        </Box>

        <Box className={clsx(style.hotline)}>
          <DarkMode />
          <Box className={clsx(style.divider)}></Box>
          <a href="tel:0968107500">
            <Box className={clsx(style.contentHotline)}>
              <Box
                className={clsx(style.wrapIconPhone)}
                sx={{
                  backgroundColor: (theme) => theme?.palette?.text?.primary11,
                }}
              >
                <PhoneInTalkIcon className={clsx(style.iconPhone)} />
              </Box>
              <Box className={clsx(style.text)}>
                <Typography className={clsx(style.number)} color={(theme) => theme?.palette?.text?.primary7}>
                  0968.107.500
                </Typography>

                <Typography className={clsx(style.textTime)} color={(theme) => theme?.palette?.text?.primary6}>
                  8h - 21h, cả T7 & CN
                </Typography>
              </Box>
            </Box>
          </a>
        </Box>
      </Box>
    </Box>
  );
}

export default memo(HeaderPayOrder);
