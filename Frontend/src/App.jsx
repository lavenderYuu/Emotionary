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

function MainLayout() {
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
    if (storedUserId) {
      dispatch(setUserId(storedUserId));
    }
  }, [dispatch]);

  useEffect(() => {
    if (userId) {
      dispatch(fetchEntries());
    }
  }, [userId, dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/*" element={<MainLayout />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
