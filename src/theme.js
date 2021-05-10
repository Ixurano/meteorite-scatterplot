import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  typography: {
    fontFamily: [
      'roboto'
    ],
  },
  palette: {
    primary: {
      main: '#1976d2',
      contrastText: '#fff',
    },
  },
});

export default theme;
