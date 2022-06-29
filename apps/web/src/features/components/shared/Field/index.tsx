import React from 'react'

type FieldProps = {
  id: string
  label: string
  children: React.ReactNode
  style?: React.CSSProperties
}

const Field: React.FC<FieldProps> = ({ id, label, children, style = {} }) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        rowGap: '0.25rem',
        ...style,
      }}
    >
      <label htmlFor={id}>{label}</label>
      {children}
    </div>
  )
}
export default Field
