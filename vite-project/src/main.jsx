import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import TanstackQueryDemo from "./TanstackQueryDemo.jsx";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import CustomHookUsage from "./CustomHookUsage.jsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <QueryClientProvider client={queryClient}>
    <App />
    {/* <TanstackQueryDemo /> */}
    {/* <CustomHookUsage /> */}
  </QueryClientProvider>
  // </StrictMode>,
);
