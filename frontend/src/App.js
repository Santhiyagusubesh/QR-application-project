import { useState } from "react";
import BusinessForm from "./components/BusinessForm";

function App() {

  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={darkMode ? "bg-dark text-light min-vh-100" : "bg-light min-vh-100"}>

      <div className="container py-5">

        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 className={darkMode ? "text-info fw-bold" : "text-primary fw-bold"}>
            Business Card QR Generator
          </h1>

          <button
            className={darkMode ? "btn btn-outline-light" : "btn btn-outline-dark"}
            onClick={() => setDarkMode(!darkMode)}
          >
            {darkMode ? "☀ Light Mode" : "🌙 Dark Mode"}
          </button>
        </div>

        <BusinessForm darkMode={darkMode} />

      </div>

    </div>
  );
}

export default App;

