"use client"
import React, { useState } from 'react'
import { IoMdClose } from 'react-icons/io'
import TextInput from './textInput'

const RegisterContainer = ({ polygon }: { polygon: any }) => {
   const [value, setValue] = useState({
      ownershipType: "private"
   })
   console.log(value)
   const handleChange = (e: any) => {
      // const key = label.replaceAll(" ", "");
      setValue((value: any) => ({ ...value, [e.target.name]: e.target.value }))
   }
   const handleRegister = async () => {
      const res = await fetch("/api/register", {
         method: "POST",
         headers: {
            "Content-Type": "application/json"
         },
         body: JSON.stringify({
            ...value,
            coordinates: polygon
         })
      })
      const data = await res.json()
      // console.log(data)
   }
   return (
      <div className='w-[30rem] rounded-md h-full bg-gray-800 relative overflow-hidden shadow'>
         <div className='w-full bg-green-00 flex justify-between items-center p-5 border-b-2 border-gray-400'>
            <div>
               <p className='text-sm'>new</p>
               <p className='text-md'>Land Registration</p>
            </div>
            <IoMdClose fontSize={25} className='text-black' />
         </div>
         <div className='w-full bg-yellow-00 mt-4 px-5'>
            <div className='my-2'>
               <TextInput label='land Name' placeholder="e.g Cherry's Farm" setValue={setValue} />
               <TextInput label='land Deed Number' placeholder='e.g A299393' setValue={setValue} />
               <TextInput label='owner Name' placeholder='e.g Noble Nyuiela' setValue={setValue} />
               <label className="form-control w-full max-w-xs">
                  <div className="label">
                     <span className="label-text">Onwership Type</span>
                  </div>
                  <select className="select select-bordered" value={value.ownershipType} name="ownershipType" onChange={handleChange}>
                     <option disabled value="">Ownership Type</option>
                     <option value="private">Privately Owned</option>
                     <option value="leased">Leased</option>
                     <option value="shared">Shared</option>
                  </select>
               </label>
            </div>
            <p><span className="font-semibold text-sm">Polygon:</span>
               <pre className='text-[12px]'>
                  {JSON.stringify(polygon[0], 0, 2)}
               </pre>
            </p>
         </div>


         <div className='absolute bottom-0 bg-green-00 p-3 w-full h-[4rem] flex gap-2 justify-end'>
            <button className='btn bg-red-600 p-2 px-8 rounded-md shadow text-white opacity-75'>Reset</button>
            <button className='btn bg-blue-600 p-2 px-8 rounded-md shadow text-white' onClick={handleRegister}>Register</button>
            {/* <button className="btn">
      <span className="loading loading-spinner"></span>
      loading
      </button> */}
         </div>
      </div>
   )
}

export default RegisterContainer