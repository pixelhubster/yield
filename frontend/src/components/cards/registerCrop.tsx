"use client"
import React, { useState } from 'react'
import Closure from './closure'

const RegisterCrop = () => {
   const [open, setOpen] = useState<boolean>(false);
   return (
      <>
         {/* <button onClick={() => setOpen(!open)}>Register Crop</button>
         <Closure open={open} openFn={setOpen}>
            hi
         </Closure> */}

{/* <button className="btn" onClick={()=>document.getElementById('my_modal_2').showModal()}>open modal</button> */}
<dialog id="my_modal_2" className="modal" hidden>
  <div className="modal-box">
    <h3 className="font-bold text-lg">Hello!</h3>
    <p className="py-4">Press ESC key or click outside to close</p>
  </div>
  <form method="dialog" className="modal-backdrop">
    <button>close</button>
  </form>
</dialog>
      </>
   )
}

export default RegisterCrop