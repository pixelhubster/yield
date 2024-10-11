"use client"
import React, { useState } from 'react'

const CustomButton = ({btn, handleClick}: {btn?: string, handleClick?: Function}) => {
   const [loading, setLoading] = useState(false)
   const click = async () => {
      setLoading(true)
      if (handleClick) await handleClick()
      setLoading(false)
   }
   return (
      <button className='btn w-full bg-blue-900/90 border-0 hover:bg-blue-900 mt-4 text-white disabled:bg-blue-900/80 disabled:text-white' onClick={click} disabled={loading}>

         {loading ? 
          <span className="loading loading-dots loading-md"></span> :
          btn || "Submit"
         }
      </button>
   )
}

export default CustomButton