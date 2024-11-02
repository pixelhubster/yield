"use client"
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { useAccount } from 'wagmi'
import { AAWrapProvider, SendTransactionMode, SmartAccount } from '@particle-network/connectkit/aa'
import { useSmartAccount } from '@particle-network/connectkit'
import Web3, { type EIP1193Provider } from 'web3'
import { parseEther } from 'viem'
import {  web3 } from '@/backend/web3'

const CustomButton = ({ btn, handleClick, className, disabled }: { btn?: string, handleClick?: Function, className?: string, disabled?: boolean }) => {
   const [loading, setLoading] = useState(false)
   const accounts = useAccount()
   const router = useRouter()
   const smartAccount = useSmartAccount()
   console.log(smartAccount)
   const customProvider = smartAccount ? new Web3(new AAWrapProvider(smartAccount, SendTransactionMode.Gasless) as any) : null;
   console.log(customProvider)
   
   const executeTxNative = async () => {
      try {
         const tx = {
            to: "0xf0830060f836B8d54bF02049E5905F619487989e",
            value: parseEther("0.0001").toString(),
            data: "0x",
         };
         
         // Fetch feequotes and use verifyingPaymasterGasless for a gasless transaction
         const feeQuotesResult = await smartAccount?.getFeeQuotes(tx);
         // const feeQuotesResult2 = await newSmartAccount?.getFeeQuotes(tx);
         // console.log(newSmartAccount?.getAddress,newSmartAccount?.getAccount)
         // console.log(feeQuotesResult2)
         const { userOp, userOpHash } =
            feeQuotesResult?.verifyingPaymasterGasless || {};

         if (userOp && userOpHash) {
            const txHash =
               (await smartAccount?.sendUserOperation({
                  userOp,
                  userOpHash,
               })) || null;

            console.log("Transaction sent:", txHash);
         } else {
            console.error("User operation is undefined");
         }
      } catch (error) {
         console.error("Failed to send transaction:", error);
      } finally {
      }
   };
   executeTxNative()
   const click = async () => {
      if (accounts.isDisconnected) return toast.error("Wallet not connected")
      setLoading(true)
      if (handleClick) {
         const res = await handleClick()
         res.error && res.error.length > 0 && toast.error(res.error)
         res.success && toast.success(res.message)
      }
      setLoading(false)
      router.refresh()
   }
   return (
      <>
         <button className={`btn w-full bg-blue-900/90 border-0 hover:bg-blue-900 mt-4 text-white disabled:bg-blue-900/80 disabled:text-white ${className}`} onClick={click} disabled={disabled || loading}>

            {loading ?
               <span className="loading loading-dots loading-md"></span> :
               btn || "Submit"
            }
         </button>
         {/* <ul className="timeline">
            <li>
               <div className="timeline-middle">
                  <svg
                     xmlns="http://www.w3.org/2000/svg"
                     viewBox="0 0 20 20"
                     fill="currentColor"
                     className="text-primary h-5 w-5">
                     <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                        clipRule="evenodd" />
                  </svg>
               </div>
               <hr className="bg-primary" />
            </li>
            <li>
               <hr className="bg-primary" />
               <div className="timeline-middle">
                  <svg
                     xmlns="http://www.w3.org/2000/svg"
                     viewBox="0 0 20 20"
                     fill="currentColor"
                     className="text-primary h-5 w-5">
                     <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                        clipRule="evenodd" />
                  </svg>
               </div>
               <div className="timeline-end text-[12px]">iMac</div>
               <hr className="bg-primary" />
            </li>
            <li>
               <hr className="bg-primary" />
               <div className="timeline-middle">
                  <svg
                     xmlns="http://www.w3.org/2000/svg"
                     viewBox="0 0 20 20"
                     fill="currentColor"
                     className="text-primary h-5 w-5">
                     <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                        clipRule="evenodd" />
                  </svg>
               </div>
               <hr />
            </li>
            <li>
               <hr />
               <div className="timeline-middle">
                  <svg
                     xmlns="http://www.w3.org/2000/svg"
                     viewBox="0 0 20 20"
                     fill="currentColor"
                     className="h-5 w-5">
                     <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                        clipRule="evenodd" />
                  </svg>
               </div>
               <div className="timeline-end text-[12px]">iPhone</div>
               <hr />
            </li>
            <li>
               <hr />
               <div className="timeline-middle">
                  <svg
                     xmlns="http://www.w3.org/2000/svg"
                     viewBox="0 0 20 20"
                     fill="currentColor"
                     className="h-5 w-5">
                     <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                        clipRule="evenodd" />
                  </svg>
               </div>
            </li>
         </ul> */}
      </>
   )
}

export default CustomButton