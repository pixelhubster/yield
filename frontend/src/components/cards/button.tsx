"use client"
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { useAccount } from 'wagmi'

const CustomButton = ({btn, handleClick}: {btn?: string, handleClick?: Function}) => {
   const [loading, setLoading] = useState(false)
   const accounts = useAccount()
   const click = async () => {
      if (accounts.isDisconnected) return toast.error("Wallet not connected")
      setLoading(true)
      if (handleClick) {
         const res = await handleClick()
         console.log(res)
         res.error && res.error.length > 0 && toast.error(res.error)
         res.sucess && toast.error(res.message)
      }
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