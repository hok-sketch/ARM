import React from 'react'

export function Card({ className='', children }) {
  return <div className={['border bg-white shadow-sm', 'p-0', 'rounded-2xl', className].join(' ')}>{children}</div>
}
export function CardHeader({ children }) {
  return <div className="p-5 border-b border-slate-100">{children}</div>
}
export function CardTitle({ className='', children }) {
  return <h3 className={['font-semibold', className].join(' ')}>{children}</h3>
}
export function CardContent({ className='', children }) {
  return <div className={['p-5', className].join(' ')}>{children}</div>
}