import React from 'react'
import '../Styles/ErrorMessage.css'

export default function ErrorMessage( props ) {
  return (
    <div className='error-message-root'>
        {props.children}
    </div>
  )
}
