import ReactDOM from 'react-dom/client';
import App from '~/App.jsx';
import CssBaseline from '@mui/material/CssBaseline';
import theme from '~/theme.js';
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles';
import GlobalStyle from '~/components/GlobalStyle';

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <CssVarsProvider theme={theme}>
    <GlobalStyle>
      <CssBaseline />
      <App />
    </GlobalStyle>
  </CssVarsProvider>,
  // </React.StrictMode>,
);
