import { RouterProvider } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";

import router from "./routes";
import { theme } from "./theme";

import AlertsContainer from "./components/AlertsContainer";

export default function App() {
  return (
    <>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <AlertsContainer />
        <RouterProvider router={router} />
      </ThemeProvider>
    </>
  );
}
