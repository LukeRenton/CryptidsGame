/*
ERRORMESSAGE.JS
Type: component
Description: Renders an error message needed for the login page
*/

import React from 'react'
import '../Styles/ErrorMessage.css'

//This component is used to display error messages.
export default function ErrorMessage( props ) {
  return (
    <div className='error-message-root'>
        {props.children}
    </div>
  )
}
