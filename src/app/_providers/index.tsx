'use client'
// start_of_file: ./FakeEstate/src/app/_providers/index.tsx

// #include from "./FakeEstate/node_modules/@types/..."
import React from 'react'

// #include from "./FakeEstate/src/,.."
import { AuthProvider } from '../../app/_providers/Auth'
import { CartProvider } from '../../app/_providers/Cart'
import { ThemeProvider } from '../../app/_providers/Theme'

export const Providers: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <CartProvider>{children}</CartProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}

// end_of_file: ./FakeEstate/src/app/_providers/index.tsx