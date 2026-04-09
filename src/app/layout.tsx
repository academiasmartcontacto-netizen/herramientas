import './globals.css'
import type { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: 'Tabla de Precios para Talleres Autorizados',
  description: 'Tabla de precios Categoría A 2014-2021',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className="bg-gray-500 min-h-screen">
        {children}
      </body>
    </html>
  )
}
