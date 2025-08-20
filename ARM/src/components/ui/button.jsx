import React from 'react'

export function Button({ asChild, variant='default', size='md', className='', ...props }) {
  const base = 'inline-flex items-center justify-center font-medium transition-colors disabled:opacity-50 disabled:pointer-events-none shadow-sm'
  const variants = {
    default: 'bg-slate-900 text-white hover:bg-slate-800',
    outline: 'border border-slate-300 hover:bg-slate-50',
  }
  const sizes = { sm:'h-8 px-3 rounded-xl text-sm', md:'h-10 px-4 rounded-xl', lg:'h-11 px-5 rounded-2xl text-base' }
  const Comp = asChild ? 'a' : 'button'
  return <Comp className={[base, variants[variant]||variants.default, sizes[size]||sizes.md, className].join(' ')} {...props} />
}