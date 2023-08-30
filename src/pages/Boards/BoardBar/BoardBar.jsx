import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import DashboardIcon from '@mui/icons-material/Dashboard';
import VpnLockIcon from '@mui/icons-material/VpnLock';
import AddToDriveIcon from '@mui/icons-material/AddToDrive';
import BoltIcon from '@mui/icons-material/Bolt';
import FilterListIcon from '@mui/icons-material/FilterList';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import Tooltip from '@mui/material/Tooltip';
import Button from '@mui/material/Button';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { capitalizeFirstLetter } from '~/utils/formatters.js';

BoardBar.propTypes = {
  board: PropTypes.object,
};

function BoardBar({ board }) {
  return (
    <Box
      px={2}
      sx={{
        width: '100%',
        height: (theme) => theme.trelloCustom.boardHeight,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 2,
        overflowX: 'auto',
        bgcolor: (theme) => {
          return theme.palette.mode === 'dark' ? '#34495e' : '#1976d2';
        },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 2,
        }}
      >
        <Chip
          icon={<DashboardIcon />}
          label={board?.title}
          onClick={() => {}}
          sx={{
            color: 'white',
            backgroundColor: 'transparent',
            border: 'none',
            paddingX: '5px',
            borderRadius: '4px',
            '& .MuiSvgIcon-root': {
              color: 'white',
            },
            '&:hover': {
              bgcolor: 'primary.50',
            },
          }}
        />
        <Chip
          icon={<VpnLockIcon color="white" />}
          label={capitalizeFirstLetter(board?.type)}
          onClick={() => {}}
          sx={{
            color: 'white',
            backgroundColor: 'transparent',
            border: 'none',
            paddingX: '5px',
            borderRadius: '4px',

            '&:hover': {
              bgcolor: 'primary.50',
            },
          }}
        />

        <Chip
          icon={<AddToDriveIcon color="white" />}
          label="Add to Google Driver"
          onClick={() => {}}
          sx={{
            color: 'white',
            backgroundColor: 'transparent',
            border: 'none',
            paddingX: '5px',
            borderRadius: '4px',

            '&:hover': {
              bgcolor: 'primary.50',
            },
          }}
        />

        <Chip
          icon={<BoltIcon />}
          label="Automation"
          onClick={() => {}}
          sx={{
            color: 'white',
            backgroundColor: 'transparent',
            border: 'none',
            paddingX: '5px',
            borderRadius: '4px',

            '&:hover': {
              bgcolor: 'primary.50',
            },
          }}
        />

        <Chip
          icon={<FilterListIcon />}
          label="Filters"
          onClick={() => {}}
          sx={{
            color: 'white',
            backgroundColor: 'transparent',
            border: 'none',
            paddingX: '5px',
            borderRadius: '4px',
            '& .MuiSvgIcon-root': {
              color: 'white',
            },
            '&:hover': {
              bgcolor: 'primary.50',
            },
          }}
        />
      </Box>

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 2,
        }}
      >
        <Button
          variant="outlined"
          sx={{
            width: '120px',
            color: 'white',
            borderColor: 'white',
            '&:hover': {
              borderColor: 'white',
            },
          }}
          startIcon={<PersonAddIcon />}
        >
          Invite
        </Button>
        <AvatarGroup
          max={4}
          sx={{
            gap: '10px',
            '& .MuiAvatar-root': {
              width: 34,
              height: 34,
              border: 'none',
              color: 'white',
              cursor: 'pointer',
              '&:fist-of-type': {
                bgcolor: '#a4b0be',
              },
            },
          }}
        >
          <Tooltip title="hai" arrow>
            <Avatar alt="Remy Sharp" src="https://vapa.vn/wp-content/uploads/2022/12/anh-3d-thien-nhien.jpeg" />
          </Tooltip>
          <Tooltip title="hai" arrow>
            <Avatar
              alt="Remy Sharp"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXntDCn2t2rXkBT9CbbYkXRWk3Ar9aLaLalvkeDUQP&s"
            />
          </Tooltip>
          <Tooltip title="hai" arrow>
            <Avatar
              alt="Remy Sharp"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRH41U22Co_ceTgB9AeN-3Iew-6FZtGFVsANwXXWUvAq-_6T8pjrJM6bn9Uw0CxEX947Ow&usqp=CAU"
            />
          </Tooltip>
          <Avatar
            alt="Travis Howard"
            src="https://kenh14cdn.com/thumb_w/660/2020/7/17/brvn-15950048783381206275371.jpg"
          />
          <Avatar
            alt="Agnes Walker"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXntDCn2t2rXkBT9CbbYkXRWk3Ar9aLaLalvkeDUQP&s"
          />
          <Avatar
            alt="Trevor Henderson"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRH41U22Co_ceTgB9AeN-3Iew-6FZtGFVsANwXXWUvAq-_6T8pjrJM6bn9Uw0CxEX947Ow&usqp=CAU"
          />
          <Avatar
            alt="Trevor Henderson"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRH41U22Co_ceTgB9AeN-3Iew-6FZtGFVsANwXXWUvAq-_6T8pjrJM6bn9Uw0CxEX947Ow&usqp=CAU"
          />
          <Avatar
            alt="Trevor Henderson"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRH41U22Co_ceTgB9AeN-3Iew-6FZtGFVsANwXXWUvAq-_6T8pjrJM6bn9Uw0CxEX947Ow&usqp=CAU"
          />
        </AvatarGroup>
      </Box>
    </Box>
  );
}

export default BoardBar;
