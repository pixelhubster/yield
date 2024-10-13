"use client"
import React, { useState } from 'react'
import InputWithLabel from '../cards/inputWithLabel'
import CustomButton from '../cards/button'
import { usdcContract, yieldLendingContract } from '@/backend/web3'
import { useAccount } from 'wagmi'

const RepayModal = ({id}: {id?: number}) => {
   const account = useAccount()
   const [value, setValue] = useState({
      tokenId: 0,
      qty: 0,
      amount: 0,
   })
   const handleChange = (e: any) => {
      setValue((value: any) => ({ ...value, [e.target.name]: e.target.value }))
   }
   const handleClick = async () => {
      try {
         const usdcRes = await usdcContract.methods.approve(process.env.NEXT_PUBLIC_YIELDLENDING_CONTRACT, 1).send({ from: account.address });
         //  web3.utils.toWei('10', 'mwei'))
            console.log(usdcRes)
         const res = await yieldLendingContract.methods.repay(id).send({ from: account.address});
         console.log(res)
         return { success: true, message: "Loan Repaid Successfully"}
      } catch (error) {
         console.log(error)
         return { error: "Failed to repay Loan - try again", contractError: error}
      }
   }
   return (
      <>
         <label htmlFor="my_modal_11" className="btn bg-[#150578]/90 hover:bg-[#150578] w-[95%] my-2 flex-1 shrink border-0 text-white">Repay</label>
         <input type="checkbox" id="my_modal_11" className="modal-toggle" />
         <div className="modal bg-white text-black" role="dialog">
            <div className="modal-box bg-white pt-2">
               <h3 className="text-lg font-bold text-center py-4">Repay Loan</h3>
               <InputWithLabel value='tokenId' onChange={handleChange} name='Id' placeholder='Token Id' fill={id}/>
               <InputWithLabel value='qty' onChange={handleChange} name='Token Supplied' placeholder='Qty' />
               <InputWithLabel value='amount' onChange={handleChange} name='Amount To Pay' placeholder='Amount to pay' />
               {/* <button className='btn w-full bg-blue-900/90 border-0 hover:bg-blue-900'>Repay</button> */}
               <CustomButton btn='Repay' handleClick={handleClick}/>
               <p className="py-4 text-center text-[12px] text-gray-600">You will be prompted to pay for the transaction fee</p>
            </div>
            <label className="modal-backdrop" htmlFor="my_modal_11">Close</label>
         </div>
      </>
   )
}

export default RepayModal