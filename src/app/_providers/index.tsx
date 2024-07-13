'use client'

// #include from "./FakeEstate/node_modules/@types/..."
import React from 'react'

import { AuthProvider } from '../../app/_providers/Auth'
import { CartProvider } from '../../app/_providers/Cart'
import { ThemeProvider } from './Theme'

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
