import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import DnsRoundedIcon from '@mui/icons-material/DnsRounded';
import PermMediaOutlinedIcon from '@mui/icons-material/PhotoSizeSelectActual';
import PublicIcon from '@mui/icons-material/Public';
import SettingsEthernetIcon from '@mui/icons-material/SettingsEthernet';
import SettingsInputComponentIcon from '@mui/icons-material/SettingsInputComponent';
import TimerIcon from '@mui/icons-material/Timer';
import SettingsIcon from '@mui/icons-material/Settings';
import PhonelinkSetupIcon from '@mui/icons-material/PhonelinkSetup';
import { useState } from 'react';
import PropTypes from 'prop-types';
const categories = [
  {
    id: 'Danh mục',
    children: [
      {
        id: 'Quản lý điện thoại',
        icon: <PeopleIcon />,
        // active: true,
      },
      { id: 'User', icon: <DnsRoundedIcon /> },
      // { id: 'Storage', icon: <PermMediaOutlinedIcon /> },
      // { id: 'Hosting', icon: <PublicIcon /> },
      // { id: 'Functions', icon: <SettingsEthernetIcon /> },
      // {
      //   id: 'Machine learning',
      //   icon: <SettingsInputComponentIcon />,
      // },
    ],
  },
  // {
  //   id: 'Quality',
  //   children: [
  //     { id: 'Analytics', icon: <SettingsIcon /> },
  //     { id: 'Performance', icon: <TimerIcon /> },
  //     { id: 'Test Lab', icon: <PhonelinkSetupIcon /> },
  //   ],
  // },
];

const item = {
  py: '2px',
  px: 3,
  color: 'rgba(255, 255, 255, 0.7)',
  '&:hover, &:focus': {
    bgcolor: 'rgba(255, 255, 255, 0.08)',
  },
};

const itemCategory = {
  boxShadow: '0 -1px 0 rgb(255,255,255,0.1) inset',
  py: 1.5,
  px: 3,
};

const lightColor = 'rgba(255, 255, 255, 0.7)';
NavigationAdmin.propTypes = {
  setSelectedindex: PropTypes.func,
  selectedindex: PropTypes.number,
};

function NavigationAdmin({ selectedindex, setSelectedindex, ...other }) {
  const handleListItemClick = (event, index) => {
    setSelectedindex(index);
  };
  return (
    <>
      <Drawer variant="permanent" {...other}>
        <List disablePadding>
          <ListItem sx={{ ...item, ...itemCategory, fontSize: 22, color: '#fff' }}>Trang Admin</ListItem>
          <ListItem sx={{ ...item, ...itemCategory }}>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText>Nhóm 1 PM25.10</ListItemText>
          </ListItem>

          {categories.map(({ id, children }) => (
            <Box key={id} sx={{ bgcolor: '#101F33' }}>
              <ListItem sx={{ py: 2, px: 3 }}>
                <ListItemText sx={{ color: '#fff' }}>{id}</ListItemText>
              </ListItem>
            </Box>
          ))}

          <ListItem disablePadding>
            <ListItemButton selected={selectedindex === 0} sx={item} onClick={(event) => handleListItemClick(event, 0)}>
              <ListItemIcon>
                <PhonelinkSetupIcon />
              </ListItemIcon>
              <ListItemText>Quản lý điện thoại</ListItemText>
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton selected={selectedindex === 1} sx={item} onClick={(event) => handleListItemClick(event, 1)}>
              <ListItemIcon>
                <PeopleIcon />
              </ListItemIcon>
              <ListItemText>User</ListItemText>
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
    </>
  );
}

export default NavigationAdmin;
