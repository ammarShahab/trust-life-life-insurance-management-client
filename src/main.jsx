import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import { Toaster } from "react-hot-toast";
import router from "./router/router.jsx";
import AuthProvider from "./context/AuthContext/AuthProvider.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider } from "react-helmet-async";
import { ThemeModeScript } from "flowbite-react";
// import ThemeProvider from "./context/ThemeContext/ThemeProvider.jsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* <ThemeProvider> */}

    <HelmetProvider>
      <ThemeModeScript />
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <RouterProvider router={router}></RouterProvider>
          <Toaster position="top-left"></Toaster>
        </AuthProvider>
      </QueryClientProvider>
    </HelmetProvider>
    {/* </ThemeProvider> */}
  </StrictMode>
);
