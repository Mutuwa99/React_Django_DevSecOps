import "./App.css";
import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Welcome from "./pages/welcome";
import Dashboard from "./pages/dashboard";
import Alltick from "./pages/allticket"
import Inprogress from './pages/inprogress'
import View from './pages/view'
import Completed from "./pages/completed";

function App() {
  return (
    <div className="App">
      <Router>

        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/alltick" element={<Alltick />} />
          <Route path="/inprogress" element={<Inprogress />} />
          <Route path="/view" element={<View />} />
          <Route path="/completed" element={<Completed />} />
        </Routes>

      </Router>
    </div>
  );
}

export default App;
