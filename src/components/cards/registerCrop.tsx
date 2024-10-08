"use client"
import React, { useState } from 'react'
import Closure from './closure'

const RegisterCrop = () => {
   const [open, setOpen] = useState<boolean>(false);
   return (
      <>
      <button onClick={() => setOpen(!open)}>Register Crop</button>
         <Closure open={open} openFn={setOpen}>
            hi
         </Closure>
      </>
   )
}

export default RegisterCrop