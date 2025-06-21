import type { Metadata } from 'next'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import theme from '../../theme'
import { TenantProvider } from './contexts/TenantContext'
import { AuthProvider } from './contexts/AuthContext'
import './globals.css'

export const metadata: Metadata = {
  title: 'The Red Potion - Customer',
  description: 'Food delivery app with liquid glass design',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="th" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
        <meta name="theme-color" content="#10b981" />
        <script 
          src="https://static.line-scdn.net/liff/edge/2/sdk.js"
          async
        ></script>
      </head>
      <body suppressHydrationWarning>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <TenantProvider>
            <AuthProvider>
              {children}
            </AuthProvider>
          </TenantProvider>
        </ThemeProvider>
      </body>
    </html>
  )
} 