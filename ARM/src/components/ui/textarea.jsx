import React from 'react'

export function Textarea(props) {
  return <textarea {...props} className={['p-4 border rounded-2xl outline-none focus:ring-2 focus:ring-slate-300', props.className].join(' ')} />
}