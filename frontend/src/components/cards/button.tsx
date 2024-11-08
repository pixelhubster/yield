"use client"
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { AAWrapProvider, SendTransactionMode, SendTransactionParams, SmartAccount } from '@particle-network/connectkit/aa'
import { useAccount, useSmartAccount } from '@particle-network/connectkit'
import Web3, { Address, type EIP1193Provider } from 'web3'
import { parseEther } from 'viem'
import { landContract } from '@/backend/web3'
// import { smartAccount } from '@/app/context/particleProvider'

const CustomButton = ({ btn, handleClick, className, disabled, tx }: { btn?: string, handleClick?: Function, className?: string, disabled?: boolean, tx?: any }) => {
   const [loading, setLoading] = useState(false)
   const [error, setError] = useState({
      open: false,
      error: false,
      message: ''
   })
   const accounts = useAccount()
   const router = useRouter()
   const smartAccount = useSmartAccount()
   // console.log(smartAccount)

   // const wrapProvider = new AAWrapProvider(smartAccount as SmartAccount, SendTransactionMode.Gasless)
   // const web3 = smartAccount ? new Web3(wrapProvider ? wrapProvider : "" as any) : null;
   // console.log(web3)

   // const tx: SendTransactionParams = {
   //    to: "0xf0830060f836B8d54bF02049E5905F619487989e" as `0x${string}`,
   //    value: parseEther("0.00001").toString(),
   //    data: "0x",
   //  };

   //  web3?.eth.sendTransaction(tx).then((res) => console.log(res)).catch((error) => console.error(error))
   useEffect(() => {
      async function fetch() {
         const account = await smartAccount?.getAccount()
         const address = await smartAccount?.getAddress()
      }
      fetch()
   }, [smartAccount])
   const executeTxNative = async (tx: any) => {
      try {
         // Fetch feequotes and use verifyingPaymasterGasless for a gasless transaction
         const feeQuotesResult = await smartAccount?.getFeeQuotes(tx);
         console.log(feeQuotesResult)
         const { userOp, userOpHash } =
            feeQuotesResult?.verifyingPaymasterGasless || {};

         if (userOp && userOpHash) {
            const txHash =
               (await smartAccount?.sendUserOperation({
                  userOp,
                  userOpHash,
               })) || null;

            setError({
               open: true,
               error: false,
               message: txHash as string
               })
            console.log("Transaction sent:", txHash);
            return { ok: true, hash: txHash }
         } else {
            console.error("User operation is undefined");
            return { ok: false, error: "User Operation is undefined" }
         }
      } catch (error) {
         console.error("Failed to send transaction:", error);
         setError({
            open: true,
            error: true,
            message: (error as any).message
         })
         return { ok: false, error: "Failed to send transaction", message: error }
      }
   };
   const click = async () => {
      if (accounts.isDisconnected) return toast.error("Wallet not connected");
      setLoading(true)
      if (handleClick) {
         try {
            const draft = await handleClick()
            const res = await executeTxNative(draft.tx)
            !res.ok && console.error(res.error, (res as any).message.message)
            res.ok ? toast.success(draft.message) : (res.error && res.error.length > 0) && toast.error(draft.error)
         } catch (error) {
            console.error(error)
         }
      }
      setLoading(false)
   }
   return (
      <>
         <button className={`btn w-full bg-blue-900/90 border-0 hover:bg-blue-900 mt-4 text-white disabled:bg-blue-900/80 disabled:text-white ${className}`} onClick={click} disabled={disabled || loading}>

            {loading ?
               <span className="loading loading-dots loading-md"></span> :
               btn || "Submit"
            }
         </button>
         {error.open && <p className={`text-[12px] space-1 text-center w-full max-h-[5rem] overflow-hidden ${error.error ? 'text-red-300' : 'text-green-400'}`}>{error.message}</p>}
      </>
   )
}

export default CustomButton