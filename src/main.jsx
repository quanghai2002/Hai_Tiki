import ReactDOM from 'react-dom/client';
import App from '~/App.jsx';
import CssBaseline from '@mui/material/CssBaseline';
import theme from '~/theme.js';
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles';
import GlobalStyle from '~/components/GlobalStyle';
import { BrowserRouter } from 'react-router-dom';
import LazyLoaderApp from '~/components/LazyLoaderApp';
import { Suspense } from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';

const clientIds = import.meta.env.VITE_CLIENT_ID_LOGIN_GOOGLE;
ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <CssVarsProvider theme={theme}>
    <GlobalStyle>
      <CssBaseline />
      <BrowserRouter>
        <Suspense fallback={<LazyLoaderApp />}>
          <GoogleOAuthProvider clientId={clientIds}>
            <App />
          </GoogleOAuthProvider>
        </Suspense>
      </BrowserRouter>
    </GlobalStyle>
  </CssVarsProvider>,
  // </React.StrictMode>,
);
