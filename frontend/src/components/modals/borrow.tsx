"use client"
import React, { useEffect, useState } from 'react'
import InputWithLabel from '../cards/inputWithLabel'
import CustomButton from '../cards/button'
import { web3, yieldLendingContract, yieldTokenContract } from '@/backend/web3'
import { useAccount } from 'wagmi'
import { stringToBytes } from 'viem'
import Web3 from 'web3'
import { useSmartAccount } from '@particle-network/connectkit'

const BorrowModal = ({ id }: { id?: number }) => {
   const smartAccount = useSmartAccount()
   const [address, setAddress] = useState<string>()
   useEffect(() => {
      async function get() {
         const address = await smartAccount?.getAddress()
         setAddress(address)
      }
      get()
   })
   const [value, setValue] = useState({
      tokenId: 0,
      qty: 0,
      minLoanAmount: 0,
      maxLiquidation: 0,
   })
   const handleChange = (e: any) => {
      setValue((value: any) => ({ ...value, [e.target.name]: e.target.value }))
   }
   const handleClick = async () => {
      try {
         // await web3.eth.call({
         //    to: yieldLendingContract.options.address,
         //    data: yieldLendingContract.methods
         //       .borrow(value.tokenId, value.qty, stringToBytes(""), value.minLoanAmount, value.maxLiquidation)
         //       .encodeABI(),
         //    from: account.address,
         // })
        
         const approvalTxData = await yieldTokenContract.methods
            .setApprovalForAll(yieldLendingContract.options.address, true)
            .encodeABI()
         const approvalTx = {
            to: process.env.NEXT_PUBLIC_YIELDLENDING_CONTRACT,
            value: 0,
            data: approvalTxData
         }
         // console.log('Approval granted:', approval);
         const valuation = await yieldLendingContract.methods.getYieldValuationInUsdc(id).call({ from: address })
         console.log(valuation)
         const borrowTxData = await yieldLendingContract.methods.borrow(id, value.qty, stringToBytes(""), value.minLoanAmount, value.maxLiquidation).encodeABI();
         const borrowTX = {
            to: process.env.NEXT_PUBLIC_YIELDLENDING_CONTRACT,
            value: 0,
            data: borrowTxData
         }
         return { success: true, message: `Borrowed ${30} USDC with Yield Token ${value.tokenId}`, tx: [approvalTx, borrowTX], error: "Failed to Borrow USDC" }
      } catch (error) {
         console.log(error)
         return { error: "Failed to Borrow USDC", contractError: error }
      }
   }
   return (
      <>
         <label htmlFor="my_modal_10" className="btn bg-[#150578]/90 hover:bg-[#150578] w-[95%] my-1 border-0 text-white">Borrow</label>

         <input type="checkbox" id="my_modal_10" className="modal-toggle" />
         <div className="modal bg-white text-black" role="dialog">
            <div className="modal-box bg-white pt-2">
               <h3 className="text-lg font-bold text-center py-4">Borrow USDC against Yield Token</h3>
               <InputWithLabel value='tokenId' onChange={handleChange} name='Id' placeholder='Token Id' fill={id} />
               <InputWithLabel value='qty' onChange={handleChange} name='Token Supply' placeholder='Qty' />
               <InputWithLabel value='minLoanAmount' onChange={handleChange} name='MLA' placeholder='Min Loan Amount' />
               <InputWithLabel value='maxLiquidation' onChange={handleChange} name='MLT' placeholder='Max Liquidation Threshold' />
               {/* <button className='btn w-full bg-blue-900/90 border-0 hover:bg-blue-900'>Borrow</button> */}
               <CustomButton btn='Borrow' handleClick={handleClick} />
               <p className="py-4 text-center text-[12px] text-gray-600">You will be prompted to pay for the transaction fee</p>
            </div>
            <label className="modal-backdrop" htmlFor="my_modal_10">Close</label>
         </div>
      </>
   )
}

export default BorrowModal