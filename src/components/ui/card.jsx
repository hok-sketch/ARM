import React from 'react'

export function Card({ className = '', children }) {
  return <div className={`rounded-2xl border bg-white shadow-sm ${className}`}>{children}</div>
}
export function CardContent({ className = '', children }) {
  return <div className={`p-6 ${className}`}>{children}</div>
}
