import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import logo from "../images/emotionary.svg";
import SearchIcon from "@mui/icons-material/Search";
import { styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import { useMediaQuery, useTheme } from "@mui/material";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { Link } from "react-router-dom";

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

const NavItem = styled("a")({
  cursor: "pointer",
  color: "#333",
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
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box sx={{ width: 250 }} role="presentation" onClick={handleDrawerToggle}>
      <List>
        {["Home", "Insights", "Entries","Log out"].map((text) => (
          <ListItem button key={text}>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <Box
        sx={{
          flexGrow: 1,
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: (theme) => theme.zIndex.drawer,
        }}
      >
        <AppBar sx={{ bgcolor: "#fbf6ef" }}>
          <Toolbar sx={{ justifyContent: "space-between" }}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <img
                src={logo}
                alt="emotionary logo"
                height="50"
                style={{ marginRight: "40px" }}
              />
              {!isMobile && (
                <NavMenu className="nav_menu">
                  <NavItem
                    as={Link}
                    to="/dashboard"
                    style={{ fontFamily: "Outfit, sans-serif" }}
                  >
                    Home
                  </NavItem>
                  <NavItem
                    as={Link}
                    to="/insights"
                    style={{
                      fontFamily: "Outfit, sans-serif",
                    }}
                  >
                    Insights
                  </NavItem>
                  <NavItem
                    as={Link}
                    to="/entries"
                    style={{
                      fontFamily: "Outfit, sans-serif",
                    }}
                  >
                    Entries
                  </NavItem>
                </NavMenu>
              )}
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: "20px" }}>
              <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search…"
                  inputProps={{ "aria-label": "search" }}
                />
              </Search>

              {isMobile ? (
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  edge="end"
                  onClick={handleDrawerToggle}
                  sx={{ color: "black" }}
                >
                  <MenuIcon />
                </IconButton>
              ) : (
                <IconButton
                  sx={{
                    color: "black",
                    fontSize: "18px",
                    fontFamily: "Outfit, sans-serif",
                  }}
                >
                  Logout
                </IconButton>
              )}
            </Box>
          </Toolbar>
        </AppBar>
        <Drawer
          anchor="right"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          sx={{
            "& .MuiDrawer-paper": {
              bgcolor: "#fbf6ef",
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          pt: 8,
          px: 2,
        }}
      ></Box>
    </>
  );
};

export default NavigationBar;