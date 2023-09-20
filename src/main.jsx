import ReactDOM from 'react-dom/client';
import App from '~/App.jsx';
import CssBaseline from '@mui/material/CssBaseline';
import theme from '~/theme.js';
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles';
import GlobalStyle from '~/components/GlobalStyle';
import { BrowserRouter } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor } from '~/redux/store.js';
import { HomePageLazy } from '~/pages/HomePage';
import { Suspense } from 'react';

const clientIds = import.meta.env.VITE_CLIENT_ID_LOGIN_GOOGLE;
ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <CssVarsProvider theme={theme}>
    <GlobalStyle>
      <CssBaseline />
      <BrowserRouter>
        <GoogleOAuthProvider clientId={clientIds}>
          <Provider store={store}>
            <PersistGate persistor={persistor}>
              <Suspense fallback={<HomePageLazy />}>
                <App />
              </Suspense>
            </PersistGate>
          </Provider>
        </GoogleOAuthProvider>
      </BrowserRouter>
    </GlobalStyle>
  </CssVarsProvider>,
  // </React.StrictMode>,
);
