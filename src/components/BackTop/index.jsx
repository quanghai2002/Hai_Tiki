import React from 'react';
import PropTypes from 'prop-types';
import { FloatButton } from 'antd';
import style from './BackTop.module.scss';
import clsx from 'clsx';

BackTop.propTypes = {};

function BackTop(props) {
  return <FloatButton.BackTop duration={450} visibilityHeight={60} className={clsx(style.backTop)} />;
}

export default BackTop;
