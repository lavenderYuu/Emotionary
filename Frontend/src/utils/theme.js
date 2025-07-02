import { createTheme } from '@mui/material/styles';

export const lightTheme = createTheme({
    typography: {
        fontFamily: 'Outfit, sans-serif',
    },
    palette: {
        mode: 'light',
        secondary: {
            main: '#b8a7ff',
        },
        background: {
            default: '#ffffff',
            paper: '#ffffff',
        },
        divider: '#e2d2be',
        text: {
            primary: '#3d3d3d',
        },
        action: {
            hover: '#f5eee4',
        },
    },
    components: {
        MuiCard: {
            styleOverrides: {
                root: {
                    backgroundColor: '#fbf6ef',
                },
            },
        },
        MuiAppBar: {
            styleOverrides: {
                root: {
                    backgroundColor: '#fbf6ef',
                },
            },
        },
        MuiDrawer: {
            styleOverrides: {
                paper: {
                    backgroundColor: '#fbf6ef',
                },
            },
        },
        MuiPagination: {
            styleOverrides: {
                root: {
                    backgroundColor: '#fbf6ef',
                },
            },
        },
    },
});

export const darkTheme = createTheme({
    typography: {
        fontFamily: 'Outfit, sans-serif',
    },
    palette: {
        mode: 'dark',
    },
    components: {
        MuiPagination: {
            styleOverrides: {
                root: {
                    backgroundColor: '#1e1e1e',
                },
            },
        },
    },
});
