import React from 'react'

function Title({text1, text2}) {
  return (
    <div className=''>

        <p>
            {text1} <span> {text2} </span>
        </p>
        
    </div>
  )
}

export default Title