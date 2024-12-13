'use client';

import { ThemeProvider as NextThemesProvider, ThemeProviderProps } from 'next-themes';
import { ReactNode, useEffect, useState } from 'react';

interface CustomThemeProviderProps extends Omit<ThemeProviderProps, 'children'> {
  children: ReactNode;
}

export function ThemeProvider({
  children,
  attribute = 'class',
  defaultTheme = 'dark', // Default to dark mode
  enableSystem = false, // Disable system preference
}: CustomThemeProviderProps) {
  const [mounted, setMounted] = useState(false);

  // Ensure the component is mounted before rendering children
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Prevent rendering until the correct theme is applied
    return <div className="invisible">{children}</div>;
  }

  return (
    <NextThemesProvider
      attribute={attribute}
      defaultTheme={defaultTheme}
      enableSystem={enableSystem}
    >
      {children}
    </NextThemesProvider>
  );
}
