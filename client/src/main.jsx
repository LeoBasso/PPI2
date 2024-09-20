import { createRoot } from "react-dom/client";
import "normalize.css";
import "./index.css";
import App from "./App";
import queryClient from "./services/queryClient";
import { QueryClientProvider } from "react-query";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <QueryClientProvider client={queryClient}>
    <App tab="home" />s
  </QueryClientProvider>
);
