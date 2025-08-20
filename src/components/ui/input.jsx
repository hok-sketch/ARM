import React from 'react'

export function Input(props) {
  return <input {...props} className={['h-11 px-4 border rounded-2xl outline-none focus:ring-2 focus:ring-slate-300', props.className].join(' ')} />
}