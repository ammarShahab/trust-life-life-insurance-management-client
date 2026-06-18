import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Toaster } from "react-hot-toast";
import Swal from "sweetalert2";
import App from "./App.jsx";

// Initialize Sweet Alert
Swal.fire({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
    <Toaster position="top-left" />
  </StrictMode>
);
