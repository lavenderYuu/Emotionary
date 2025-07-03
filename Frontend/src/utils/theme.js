import { createTheme } from '@mui/material/styles';

export const lightTheme = createTheme({
    typography: {
        fontFamily: 'Outfit, sans-serif',
    },
    palette: {
        mode: 'light',
        secondary: {
            main: '#b8a7ff', // light purple for graphs
        },
        background: {
            default: '#ffffff',
            paper: '#ffffff',
        },
        divider: '#e2d2be', // borders
        text: {
            primary: '#3d3d3d',
        },
        action: {
            hover: '#f5eee4',
        },
    },
    components: {
        MuiCard: { // entry cards
            styleOverrides: {
                root: {
                    backgroundColor: '#fbf6ef',
                },
            },
        },
        MuiAppBar: { // horizonal navbar
            styleOverrides: {
                root: {
                    backgroundColor: '#fbf6ef',
                },
            },
        },
        MuiDrawer: { // vertical navbar drawer
            styleOverrides: {
                paper: {
                    backgroundColor: '#fbf6ef',
                },
            },
        },
        MuiPagination: { // pagination on Entries page
            styleOverrides: {
                root: {
                    backgroundColor: '#fbf6ef',
                },
            },
        },
        MuiDialog: { // dialogs
            styleOverrides: {
                paper: {
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
        MuiPagination: { // pagination on Entries page
            styleOverrides: {
                root: {
                    backgroundColor: '#1e1e1e',
                },
            },
        },
        MuiChip: { // tag labels
            styleOverrides: {
                label: {
                    color: 'black',
                },
            },
        },
    },
});
