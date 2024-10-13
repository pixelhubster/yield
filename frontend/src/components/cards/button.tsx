"use client"
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { useAccount } from 'wagmi'

const CustomButton = ({btn, handleClick, className, disabled}: {btn?: string, handleClick?: Function, className?: string, disabled?: boolean}) => {
   const [loading, setLoading] = useState(false)
   const accounts = useAccount()
   const click = async () => {
      if (accounts.isDisconnected) return toast.error("Wallet not connected")
      setLoading(true)
      if (handleClick) {
         const res = await handleClick()
         res.error && res.error.length > 0 && toast.error(res.error)
         res.success && toast.success(res.message)
      }
      setLoading(false)
   }
   return (
      <button className={`btn w-full bg-blue-900/90 border-0 hover:bg-blue-900 mt-4 text-white disabled:bg-blue-900/80 disabled:text-white ${className}`} onClick={click} disabled={disabled || loading}>

         {loading ? 
          <span className="loading loading-dots loading-md"></span> :
          btn || "Submit"
         }
      </button>
   )
}

export default CustomButton