import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Landing from "./pages/Landing";
import NavigationBar from "./components/navigation";
import Insights from "./pages/Insights";
import { useDispatch } from "react-redux";
import { fetchEntries } from "./features/entries/entriesSlice";
import { useEffect } from "react";

function MainLayout() {
  return (
    <>
      <NavigationBar />
      <Routes>
        <Route path="/dashboard" element={<Home />} />
        <Route path="/insights" element={<Insights />} />
      </Routes>
    </>
  );
}

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchEntries());
  }, [dispatch])

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
