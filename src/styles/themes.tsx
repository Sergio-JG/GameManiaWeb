import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#F0A500',
        },
        secondary: {
            main: '#E45826',
        },
    },
    components: {
        MuiTextField: {
            styleOverrides: {
                root: {



                },

            },
        },
    },
});

export default theme;
