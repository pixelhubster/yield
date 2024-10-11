"use client"
import React, { useState } from 'react'
import { IoMdClose } from 'react-icons/io'
import TextInput from './textInput'
import { landContract } from '@/backend/web3'
import { useAccount } from 'wagmi'
import toast from 'react-hot-toast'
import CustomButton from './button'

const RegisterContainer = ({ polygon, setOpen }: { polygon: any, setOpen: Function }) => {
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
      <div className='w-full rounded-md h-full absolute overflow-hidden shadow z-[30rem] text-black flex flex-col flex-shrink'>
         <div className='w-full bg-green-00 flex justify-between items-center p-5 pt-4  border-b-[1px] border-gray-200'>
            <div>
               <p className='text-md text-center'>Land Registration</p>
            </div>
            <IoMdClose fontSize={25} className='text-black cursor-pointer hover:bg-gray-50' onClick={() => setOpen(false)} />
         </div>
         <div className='w-full h-full flex flex-col bg-yellow-00 p-5  px-6 overflow-auto custom-scroll'>
            <TextInput label='land Name' placeholder="e.g Cherry's Farm" setValue={setValue} />
            <TextInput label='land Deed Number' placeholder='e.g A299393' setValue={setValue} />
            <TextInput label='owner Name' placeholder='e.g Noble Nyuiela' setValue={setValue} />
            <label className="form-control w-full">
               <div className="label">
                  <span className="label-text">Onwership Type</span>
               </div>
               <select className="select select-bordered bg-white text-black focus-within:border-blue-300 focus-within:outline-none h-[2.7rem]" value={value.ownershipType} name="ownershipType" onChange={handleChange}>
                  <option disabled value="">Ownership Type</option>
                  <option value="private">Privately Owned</option>
                  <option value="leased">Leased</option>
                  <option value="shared">Shared</option>
               </select>
            </label>
            <CustomButton btn='Register' handleClick={handleRegister}/>
         </div>


      </div>
   )
}

export default RegisterContainer