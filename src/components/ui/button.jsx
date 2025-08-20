import React from 'react'

export default function Button({ children, className = '', ...rest }) {
  return (
    <button
      className={`inline-flex items-center justify-center rounded-md px-4 py-2 border bg-black text-white hover:opacity-90 transition ${className}`}
      {...rest}
    >
      {children}
    </button>
  )
}
