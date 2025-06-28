import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Landing from "./pages/Landing";
import NavigationBar from "./components/navigation";
import Insights from "./pages/Insights";
import Entries from "./pages/Entries";
import { useDispatch, useSelector } from "react-redux";
import { fetchEntries } from "./features/entries/entriesSlice";
import { useEffect } from "react";
import { setUserId } from "./features/users/usersSlice";
import { Navigate } from "react-router-dom";
import theme from "./utils/theme";
import { ThemeProvider } from '@mui/material/styles';

function MainLayout() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  return (
    <>
      <NavigationBar />
      <Routes>
        <Route path="/dashboard" element={<Home />} />
        <Route path="/insights" element={<Insights />} />
        <Route path="/entries" element={<Entries />} />
      </Routes>
    </>
  );
}

function App() {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.userId);

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
