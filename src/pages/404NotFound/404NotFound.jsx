/* eslint-disable react-refresh/only-export-components */
import PropTypes from 'prop-types';
import style from './NotFound.module.scss';
import { clsx } from 'clsx';
import { memo } from 'react';
import { Result } from 'antd';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';

NotFound.propTypes = {};

function NotFound(props) {
  return (
    <Result
      className={clsx(style.wrapNotFound)}
      status="404"
      title="404"
      subTitle="Trang này không tồn tại !"
      extra={
        <Link to="/">
          <Button variant="contained">
            <Typography variant="h5">Về Trang Chủ</Typography>
          </Button>
        </Link>
      }
    />
  );
}

export default memo(NotFound);
