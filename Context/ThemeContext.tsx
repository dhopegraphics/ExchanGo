import React, { createContext, useContext, ReactNode } from "react";
import { useColorScheme } from "react-native";

const ThemeContext = createContext("light");

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const theme = useColorScheme() ?? "light";

  return (
    <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
