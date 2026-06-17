import { RouterProvider } from "react-router";
import router from "./router/router.jsx";
import AuthProvider from "./context/AuthContext/AuthProvider.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider } from "react-helmet-async";
import { ThemeModeScript } from "flowbite-react";

const queryClient = new QueryClient();

const App = () => {
  return (
    <HelmetProvider>
      <ThemeModeScript />
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
};

export default App;