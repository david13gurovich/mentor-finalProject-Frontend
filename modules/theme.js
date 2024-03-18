import { createTheme } from '@mui/material/styles';
import { blue, grey } from '@mui/material/colors';

const rawTheme = createTheme({
palette: {
primary: {
light: '#E3F2FD',
main: '#2196F3',
dark: '#1976D2',
},
secondary: {
light: '#E1F5FE',
main: '#03A9F4',
dark: '#0288D1',
},
warning: {
main: '#FFC071',
dark: '#FFB25E',
},
error: {
light: '#FFEBEE',
main: '#F44336',
dark: '#D32F2F',
},
success: {
light: '#E8F5E9',
main: '#4CAF50',
dark: '#388E3C',
},
},
typography: {
fontFamily: "'Work Sans', sans-serif",
fontSize: 14,
fontWeightLight: 300, // Work Sans
fontWeightRegular: 400, // Work Sans
fontWeightMedium: 700, // Roboto Condensed
},
});

const fontHeader = {
color: rawTheme.palette.text.primary,
fontWeight: rawTheme.typography.fontWeightMedium,
fontFamily: "'Roboto Condensed', sans-serif",
textTransform: 'uppercase',
};

const theme = {
...rawTheme,
palette: {
...rawTheme.palette,
background: {
...rawTheme.palette.background,
default: rawTheme.palette.common.white,
placeholder: grey[200],
},
},
typography: {
...rawTheme.typography,
fontHeader,
h1: {
...rawTheme.typography.h1,
...fontHeader,
letterSpacing: 0,
fontSize: 60,
},
h2: {
...rawTheme.typography.h2,
...fontHeader,
fontSize: 48,
},
h3: {
...rawTheme.typography.h3,
...fontHeader,
fontSize: 42,
},
h4: {
...rawTheme.typography.h4,
...fontHeader,
fontSize: 36,
},
h5: {
...rawTheme.typography.h5,
fontSize: 20,
fontWeight: rawTheme.typography.fontWeightLight,
},
h6: {
...rawTheme.typography.h6,
...fontHeader,
fontSize: 18,
},
subtitle1: {
...rawTheme.typography.subtitle1,
fontSize: 18,
},
body1: {
...rawTheme.typography.body2,
fontWeight: rawTheme.typography.fontWeightRegular,
fontSize: 16,
},
body2: {
...rawTheme.typography.body1,
fontSize: 14,
},
},
};

export default theme;