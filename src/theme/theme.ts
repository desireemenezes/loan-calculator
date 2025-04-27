// src/theme/theme.ts
import { createTheme } from "@mui/material/styles";

const defaultFont = '"Geist", "Roboto", "Helvetica", "Arial", sans-serif';

export const getTheme = (mode: "light" | "dark") =>
  createTheme({
    palette: {
      mode,
      ...(mode === "light"
        ? {
            primary: {
              main: "#1976d2",
            },
            background: {
              default: "#f5f5f5",
            },
            danger: {
              main: "#ba000d",
            },
          }
        : {
            primary: {
              main: "#90caf9",
            },
            background: {
              default: "#121212",
            },
            danger: {
              main: "#ba000d",
            },
          }),
    },
    typography: {
      fontFamily: defaultFont,
    },
  });
