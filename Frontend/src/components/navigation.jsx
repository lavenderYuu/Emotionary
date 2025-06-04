import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import logo from "../assets/emotionary.svg";
import SearchIcon from "@mui/icons-material/Search";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import { useMediaQuery, useTheme } from '@mui/material'
//https://mui.com/material-ui/react-app-bar/#app-bar-with-responsive-menu
const NavMenu = styled("ul")({
  display: "flex",
  listStyle: "none",
  alignItems: "center",
  gap: "50px",
  fontSize: "18px",
  fontWeight: "500",
  color: "#333",
  padding: 0,
  margin: 0,
});

const NavItem = styled("li")({
  cursor: "pointer",
  fontFamily: "Roboto",
  "&:hover": {
    color: "#1976d2",
  },
});



const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  "&:hover": {
    backgroundColor: "#FFFFFF",
    boxShadow: "0 0 0 2px rgba(246, 230, 208, 0.74)",
    borderRadius: "20px",
  },
  marginLeft: 0,
  marginRight: "10%",
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "black",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "black",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

const NavigationBar = () => {

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ bgcolor: "#fbf6ef", borderRadius: 15 }}>
        <Toolbar>
          <img
            src={logo}
            alt="emotionary logo"
            height="50"
            style={{
              marginLeft: "5px",
              marginRight: "5%",
            }}
          ></img>
          <Box
            sx={{ display: { xs: "none", md: "block", marginRight: "auto" } }}
          >
            <NavMenu className="nav_menu">
              <NavItem>Home</NavItem>
              <NavItem>Insights</NavItem>
              <NavItem>Entries</NavItem>
            </NavMenu>
          </Box>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
            />
          </Search>
          <Button color="inherit" sx={{ color: "black" }}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavigationBar;