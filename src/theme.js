import { cyan, deepOrange, orange, red, teal } from '@mui/material/colors';
import { experimental_extendTheme as extendTheme } from '@mui/material/styles';

import Inter from '~/assets/fonts/UcC73FwrK3iLTeHuS_fvQtMwCp50KnMa1ZL7.woff2';
import Inter2 from '~/assets/fonts/UcC73FwrK3iLTeHuS_fvQtMwCp50KnMa2pL7SUc.woff2';
import Inter3 from '~/assets/fonts/UcC73FwrK3iLTeHuS_fvQtMwCp50KnMa25L7SUc.woff2';


// Create a theme instance.
const theme = extendTheme({
  // custom height header...
  haitiki: {
    heightHeader: '70px'
  },
  // ---------------------------------------chế độ SÁNG => TỐI --------------------------
  colorSchemes: {
    // light mode => chế độ SÁNG
    light: {
      palette: {
        primary: {
          main: 'rgb(10, 104, 255)',
          light: 'rgb(11, 116, 229)'
        },
        secondary: {
          main: 'rgb(255, 66, 78)',
        },
        // màu chữ  => text trong chế độ => SÁNG
        text: {
          primary: 'rgb(39, 39, 42)',
          secondary: 'rgb(128, 128, 137)',
          primary2: 'rgb(36, 36, 36)',
          primary3: 'rgb(56, 56, 61)',
          primary4: 'rgb(39, 39, 42)', // màu chữ cho drop down thanh header 
          primary5: 'rgb(0 0 0 / 54%)' // màu chữ các icon trong drop down thanh header 

        },

        // background trang web => chế độ sáng
        background: {
          default: '#f5f5fa',
          header: '#fff'
        },

        // color các hành động như hover,active ... => chế độ SÁNG
        action: {
          // active: '#ccc',
          // focus: '#ccc'
          // disabled: '#ccc'
          hoverActive: 'rgba(0, 96, 255, 0.12)',
          hover: 'rgba(39, 39, 42, 0.12)'

        }
      },
      // spacing: (factor) => `${0.25 * factor}rem`,
    },

    // dark mode => chế độ TỐI
    dark: {
      palette: {
        primary: {
          main: 'rgb(38, 166, 154)',
        },
        secondary: {
          main: 'rgb(244, 81, 30)'
        },
        text: {
          primary: 'rgb(255, 255, 255)',
          secondary: 'rgb(255, 255, 255)',
          primary2: 'rgb(255, 255, 255)',
          primary3: 'rgb(255, 255, 255);',
          primary4: 'rgb(38, 166, 154)',// màu chữ cho drop down thanh header => user
          primary5: 'rgb(38, 166, 154)' // màu chữ các icon trong dropdown thanh header 
        },
        // background trang web => chế độ Tối
        background: {
          default: '#000',
          header: '#2e2727',
          inputSearch: '#ccc'
        },
        // color các hành động như hover,active ... => chế độ SÁNG
        action: {
          // active: '#ccc',
          // focus: '#ccc'
          // disabled: '#ccc'
          hoverActive: '#fff',
          hover: '#6b5e5e'

        }
      },
    },

  },
  // -------------------------------------------> thay đổi fontFamily --> --------------------------------------------
  // overwrite fontfamily  => thay đổi font family mặc định

  typography: {
    fontFamily: [
      'Inter, Helvetica',
      'Inter2, Arial',
      'Inter3, sans-serif',
    ].join(','),
    fontSize: 20
  },

  // -----------------------------------------------
  // ...other properties
  components: {
    // overwrite css baseline
    MuiCssBaseline: {
      styleOverrides: `
        @font-face {
          font-family: 'Inter';
          font-style: normal;
          font-display: swap;
          font-weight: 400;
          src: local('Raleway'), local('Raleway-Regular'), url(${Inter}) format('woff2');
          unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
        },
         @font-face {
          font-family: 'Inter2';
          font-style: normal;
          font-display: swap;
          font-weight: 400;
          src: local('Raleway'), local('Raleway-Regular'), url(${Inter2}) format('woff2');
          unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
        },
        @font-face {
          font-family: 'Inter3';
          font-style: normal;
          font-display: swap;
          // font-weight: 400;
          src: local('Raleway'), local('Raleway-Regular'), url(${Inter3}) format('woff2');
          unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
        }
      `,
    },
    // Name of the component

    MuiButton: {
      styleOverrides: {
        // Name of the slot
        root: {
          // Some CSS
          textTransform: 'capitalize'
        },
      },
    },

  },

  MuiTypography: {
    styleOverrides: {
      // Name of the slot
      root: {
        '& .MuiTypography-body1': {
          fontSize: '0.875rem'
        }
      }
    },
  },


  // MuiInputLabel: {
  //   styleOverrides: {
  //     // Name of the slot
  //     root: ({ theme }) => {
  //       return {
  //         // color: theme.palette.primary.main,
  //         fontSize: '0.875rem'
  //       };
  //     }
  //   },
  // },


  // MuiOutlinedInput: {
  //   styleOverrides: {
  //     // Name of the slot
  //     root: ({ theme }) => {
  //       return {
  //         // color: theme.palette.primary.main,
  //         fontSize: '0.875rem',
  //         // '.MuiOutlinedInput-notchedOutline': {
  //         //   borderColor: theme.palette.primary.light
  //         // },
  //         // '&:hover': {
  //         //   '.MuiOutlinedInput-notchedOutline': {
  //         //     borderColor: theme.palette.primary.main
  //         //   },
  //         // },
  //         '& fieldset': {
  //           borderWidth: '0.5px !important'
  //         },
  //         '&:hover fieldset': {
  //           borderWidth: '1px !important'
  //         }
  //       };
  //     }
  //   },
  // },

});

export default theme;