"use client";

import { ReactNode, useState } from "react";
import { ThemeProvider, CssBaseline, Switch, FormControlLabel, Icon } from "@mui/material";
import { getTheme } from "@/theme/theme";
import Brightness4Icon from '@mui/icons-material/Brightness4';

type ThemeRegistryProps = {
  children: ReactNode;
};

export default function ThemeRegistry({ children }: ThemeRegistryProps) {
  const [mode, setMode] = useState<'light' | 'dark'>('light');

  const toggleTheme = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMode(event.target.checked ? 'dark' : 'light');
  };

  const theme = getTheme(mode);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '40px 16px',
        backgroundColor: theme.palette.background.default,
        transition: 'background-color 0.3s ease',
      }}>
        <FormControlLabel
          control={
            <Switch
              checked={mode === 'dark'}
              onChange={toggleTheme}
              color="primary"
              icon={<Brightness4Icon />}
              checkedIcon={<Brightness4Icon />}
            />
          }
          label=""
        />
        {children}
      </div>
    </ThemeProvider>
  );
}
