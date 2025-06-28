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
import { Link, useNavigate } from "react-router-dom";
import { clearUserId } from "../features/users/usersSlice";
import { useDispatch } from "react-redux";

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

const DrawerMenu = styled(NavMenu)({
  flexDirection: "column",
  alignItems: "flex-start",
  gap: "20px",
  padding: "20px",
});

const NavItem = styled("a")({
  cursor: "pointer",
  fontSize: "18px",
  fontWeight: "500",
  color: "#333",
  fontFamily: "Outfit, sans-serif",
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
  const [searchQuery, setSearchQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:3000/users/logout", {
        method: "POST"
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      dispatch(clearUserId());
      navigate("/", { state: { fromLogout: true } })
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  const handleSearchKeyDown = (event) => {
    if (event.key === "Enter" && searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
    }
  };

  const navLinks = [
    { label: "Home", path: "/dashboard" },
    { label: "Insights", path: "/insights" },
    { label: "Entries", path: "/entries" },
  ]

  const drawer = (
    <Box sx={{ width: 250 }} role="presentation" onClick={handleDrawerToggle}>
       <DrawerMenu>
        {navLinks.map(({ label, path }) => (
          <NavItem
            key={label}
            as={Link}
            to={path}
          >
            {label}
          </NavItem>
        ))}
          <NavItem
            onClick={handleLogout}
            key="logout"
            as={Link}
            to={"/"}
          >
            Logout
          </NavItem>
      </DrawerMenu>
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
              {/* Desktop */}
              {!isMobile && (
                <NavMenu className="nav_menu">
                  {navLinks.map(({ label, path }) => (
                    <NavItem
                      key={label}
                      as={Link}
                      to={path}
                    >
                      {label}
                    </NavItem>
                  ))}
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
                  value={searchQuery}
                  onChange={event => setSearchQuery(event.target.value)}
                  onKeyDown={handleSearchKeyDown}
                />
              </Search>
              {/* Mobile */}
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
                <NavItem
                  onClick={handleLogout}
                  key="logout"
                  as={Link}
                  to={"/"}
                >
                  Logout
                </NavItem>
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