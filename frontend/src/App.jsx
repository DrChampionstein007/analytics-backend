import { Routes, Route } from "react-router-dom";

import DemoPage from "./pages/DemoPage";
import Dashboard from "./pages/Dashboard";
import Heatmap from "./pages/Heatmap";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<DemoPage />} />

        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/heatmap" element={<Heatmap />} />
      </Routes>
    </>
  );
}

export default App;