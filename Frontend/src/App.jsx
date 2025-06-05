import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import NavigationBar from "./components/navigation.jsx";
import Home from "./pages/Home"
import Landing from "./pages/Landing"

function App() {

  return (
    <BrowserRouter>
      <NavigationBar />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/dashboard" element={<Home />} />
        </Routes>
    </BrowserRouter>
  )
}

export default App
