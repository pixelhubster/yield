"use client"
import React, { useState } from 'react'
import { IoMdClose } from 'react-icons/io'
import TextInput from './textInput'
import { landContract } from '@/backend/web3'
import { useAccount } from 'wagmi'
import toast from 'react-hot-toast'

const RegisterContainer = ({ polygon }: { polygon: any }) => {
   const account = useAccount()
   const [value, setValue] = useState({
      ownershipType: "private"
   })
   const handleChange = (e: any) => {
      setValue((value: any) => ({ ...value, [e.target.name]: e.target.value }))
   }
   const handleRegister = async () => {
      if (account.status === "disconnected") toast.error("Wallet not connected")
      try {
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
         if (res.ok) {
            const tokenId = await landContract.methods.register(data.cid, String(data.polygon), String(data.center[0]), String(data.center[1]), String(data.polygonId)).send({ from: account.address })
            console.log(tokenId)
         }
         toast.success("Registered Land Succesfully!")
      } catch (error) {
         console.log(error)
         toast.error("Failed to register land - try again")
      }
   }
   return (
      <div className='card w-[30rem] rounded-md h-[80%] relative bg-blue-300 overflow-hidden shadow'>
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