import Box from '@mui/material/Box';
import ModeSelect from '~/components/ModeSelect';
import AppsIcon from '@mui/icons-material/Apps';
import { ReactComponent as TrelloIcon } from '~/assets/trello.svg';
import SvgIcon from '@mui/material/SvgIcon';
import Typography from '@mui/material/Typography';
import Workspace from './Menus/Workspace';
import Recently from './Menus/Recently';
import Template from './Menus/Template';
import Starred from './Menus/Starred';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Badge from '@mui/material/Badge';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import Tooltip from '@mui/material/Tooltip';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import Profile from './Menus/Profile';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import { useRef, useState } from 'react';
import PropTypes from 'prop-types';

AppBar.propTypes = {
  board: PropTypes.object,
};

function AppBar({ board }) {
  const [searchValue, setSearchValue] = useState('');
  const textFieldInput = useRef();

  return (
    <Box
      px={2}
      sx={{
        width: '100%',
        height: (theme) => theme.vars.trelloCustom.appBarHeight,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 2,
        overflowX: 'auto',
        bgcolor: (theme) => {
          return theme.palette.mode === 'dark' ? '#2c3e50' : '#34495e';
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
        <AppsIcon
          sx={{
            color: 'white',
          }}
        />

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 0.5,
          }}
        >
          <SvgIcon
            component={TrelloIcon}
            inheritViewBox
            fontSize="small"
            sx={{
              color: 'white',
            }}
          />
          <Typography
            variant="span"
            sx={{
              fontSize: '1.2rem',
              fontWeight: 'bold',
              color: 'white',
            }}
          >
            Trello
          </Typography>
        </Box>

        <Box
          sx={{
            display: { mobile: 'none', tablet: 'flex' },
          }}
        >
          <Workspace />
          <Recently />
          <Starred />
          <Template />
          <Button
            variant="outlined"
            sx={{
              width: '120px',
              color: 'white',
              border: 'none',
              '&:hover': {
                border: 'none',
              },
            }}
            startIcon={<LibraryAddIcon />}
          >
            Create
          </Button>
        </Box>
      </Box>

      {/* search  */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <TextField
          id="outlined-search"
          label="Search "
          type="text"
          size="small"
          value={searchValue}
          onChange={(e) => {
            setSearchValue(e.target.value);
          }}
          ref={textFieldInput}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon
                  sx={{
                    color: 'white',
                  }}
                />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="start">
                <CloseIcon
                  fontSize="small"
                  sx={{
                    color: { color: searchValue ? 'white' : 'transparent' },
                    cursor: 'pointer',
                  }}
                  onClick={(e) => {
                    setSearchValue('');
                    textFieldInput.current.focus();
                  }}
                />
              </InputAdornment>
            ),
          }}
          sx={{
            minWidth: 120,
            maxWidth: 170,
            '& label': {
              color: 'white',
            },
            '& input': {
              color: 'white',
            },
            '& label.Mui-focused ': {
              color: 'white',
            },
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: 'white',
              },
              '&:hover fieldset': {
                borderColor: 'white',
              },
              '&.Mui-focused fieldset': {
                borderColor: 'white',
              },
            },
          }}
        />
        <ModeSelect />

        <Tooltip title="Notification" arrow>
          <Badge
            color="warning"
            variant="dot"
            sx={{
              cursor: 'pointer',
              mr: '8px',
            }}
          >
            <NotificationsNoneIcon
              sx={{
                color: 'white',
              }}
            />
          </Badge>
        </Tooltip>

        <Tooltip title="help" arrow>
          <Badge
            color="secondary"
            sx={{
              cursor: 'pointer',
            }}
          >
            <HelpOutlineIcon
              sx={{
                color: 'white',
              }}
            />
          </Badge>
        </Tooltip>

        <Profile />
      </Box>
    </Box>
  );
}

export default AppBar;
