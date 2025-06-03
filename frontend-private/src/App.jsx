import './App.css'
import Sidebar from './layout/Sidebar'
import Home from "./pages/Home"
import Materials from './pages/Materials';
import { BrowserRouter as Router, Routes, Route } from "react-router";

function App() {

  return (
      <Router>
        <div className="app-layout">
        <Sidebar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/materials" element={<Materials />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
