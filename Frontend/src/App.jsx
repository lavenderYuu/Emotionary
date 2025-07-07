import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Landing from "./pages/Landing";
import NavigationBar from "./components/navigation";
import Insights from "./pages/Insights";
import Entries from "./pages/Entries";
import SearchResults from "./pages/SearchResults";
import { useDispatch, useSelector } from "react-redux";
import { fetchEntries } from "./features/entries/entriesSlice";
import { useEffect, useMemo } from "react";
import { setUserId } from "./features/users/usersSlice";
import { Navigate } from "react-router-dom";
import { lightTheme, darkTheme } from "./utils/theme";
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, useMediaQuery } from "@mui/material";
import { ShepherdTourContext, shepherdTourInstance } from "./utils/tour/ShepherdContext";
import 'shepherd.js/dist/css/shepherd.css';
import './utils/tour/shepherd.css';

function MainLayout() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  return (
    <>
      <ShepherdTourContext.Provider value={shepherdTourInstance}>
        <NavigationBar />
        <Routes>
          <Route path="/dashboard" element={<Home />} />
          <Route path="/insights" element={<Insights />} />
          <Route path="/entries" element={<Entries />} />
          <Route path="/search" element={<SearchResults />} />
        </Routes>
      </ShepherdTourContext.Provider>
    </>
  );
};

function App() {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.userId);
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const theme = useMemo(() => (prefersDarkMode ? darkTheme : lightTheme), [prefersDarkMode]);
  
  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    const storedUserName = localStorage.getItem("userName");
    if (storedUserId && storedUserName) {
      dispatch(setUserId({ userId: storedUserId, userName: storedUserName }));
    }
  }, [dispatch]);

  useEffect(() => {
    if (userId) {
      dispatch(fetchEntries());
    }
  }, [userId, dispatch]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/*" element={<MainLayout />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
