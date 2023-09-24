import PropTypes from 'prop-types';
import style from '../PhoneDetails.module.scss';
import clsx from 'clsx';
import { memo, lazy } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';

// item test layout phone details
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

// propTypes
PhoneDescription.propTypes = {};

function PhoneDescription(props) {
  return (
    <Box>
      <Item>
        <Typography>Detalis phone details</Typography>
      </Item>
    </Box>
  );
}

export default memo(PhoneDescription);
