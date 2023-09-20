/* eslint-disable react-refresh/only-export-components */
import PropTypes from 'prop-types';
import style from './Slider.module.scss';
import clsx from 'clsx';
import { memo } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';

Slider.propTypes = {};

function Slider(props) {
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));
  return (
    <Box>
      <Item>Đây là slider</Item>
    </Box>
  );
}

export default memo(Slider);
