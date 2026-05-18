import { Routes, Route, Link } from "react-router-dom";
import Home from "./home";
import About from "./about";

function App() {
  return (
    <>
      <nav
        style={{
          backgroundColor: "black",
          padding: "15px",
          display: "flex",
          gap: "20px",
        }}
      >
        <Link
          to="/"
          style={{ color: "white", textDecoration: "none" }}
        >
          Home
        </Link>

        <Link
          to="/about"
          style={{ color: "white", textDecoration: "none" }}
        >
          About
        </Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>

      <footer
        style={{
          backgroundColor: "black",
          color: "white",
          textAlign: "center",
          padding: "10px",
          position: "fixed",
          bottom: "0",
          width: "100%",
        }}
      >
        Lingraju K H, ISE, BIET, DVG.
      </footer>
    </>
  );
}

export default App;