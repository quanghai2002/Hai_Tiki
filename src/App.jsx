import Button from '@mui/material/Button';
import { useState, lazy } from 'react';
import { styled } from '@mui/material/styles';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Typography from '@mui/material/Typography';
import { useColorScheme } from '@mui/material/styles';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import Tooltip from '@mui/material/Tooltip';
import { Route, Routes } from 'react-router-dom';
import { Suspense } from 'react';
import LinearProgress from '@mui/material/LinearProgress';

import { HomePageLazy } from '~/pages/HomePage';
const HomePage = lazy(() => import('~/pages/HomePage'));
const SearchPhone = lazy(() => import('~/pages/SearchPhone'));
const NotFound = lazy(() => import('~/pages/404NotFound'));
const Info = lazy(() => import('~/pages/Info'));

function App() {
  return (
    <Box
      sx={{
        backgroundColor: (theme) => {
          theme?.palette?.background?.default;
        },
        height: '100vh',
      }}
    >
      {/* react router DOM */}
      <Routes>
        <Route
          path="/"
          element={
            <Suspense fallback={<HomePageLazy />}>
              <HomePage />
            </Suspense>
          }
        ></Route>
        <Route
          path="/search"
          element={
            <Suspense fallback={<LinearProgress />}>
              <SearchPhone />
            </Suspense>
          }
        ></Route>
        <Route
          path="/info"
          element={
            <Suspense fallback={<LinearProgress />}>
              <Info />
            </Suspense>
          }
        ></Route>
        <Route
          path="*"
          element={
            <Suspense fallback={<LinearProgress />}>
              <NotFound />
            </Suspense>
          }
        ></Route>
      </Routes>
    </Box>
  );
}

export default App;
