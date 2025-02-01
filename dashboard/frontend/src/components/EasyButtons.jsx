import React from 'react'

export const EasyButtons = ({text,onClick,styleClass}) => {
  return (
    <button className={styleClass} onClick={onClick}>
        {text}
    </button>
  )
}
