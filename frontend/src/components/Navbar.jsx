import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav
      style={{
        padding: "15px",
        borderBottom: "1px solid #444",
        display: "flex",
        gap: "20px",
      }}
    >
      <Link to="/">Demo Page</Link>

      <Link to="/dashboard">Dashboard</Link>

      <Link to="/heatmap">Heatmap</Link>
    </nav>
  );
}

export default Navbar;