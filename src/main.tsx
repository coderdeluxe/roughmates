import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./router/routes.tsx";
import { Provider } from "react-redux";
import { store } from "./states/store.ts";
import { Toaster } from "./components/ui/toast/toaster.tsx";
import { ThemeProvider } from "./utils/theme-context.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Toaster />
    <Provider store={store}>
      <ThemeProvider>
        <RouterProvider router={router} />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);
