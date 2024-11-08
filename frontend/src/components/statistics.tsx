"use client"
import React, { useEffect, useState } from 'react'
import Mincard from './cards/mincard'
import Summary from './cards/summary'
import BorrowModal from './modals/borrow'
import RepayModal from './modals/repay'
import { landContract, yieldLendingContract, yieldTokenContract } from '@/backend/web3'
import { useAccount } from 'wagmi'
import { useSmartAccount } from '@particle-network/connectkit'
import queryContract from '@/app/context/query'
import { gql } from 'graphql-request'

const Statistics = ({id}: {id?: number}) => {
   const smartAccount = useSmartAccount()
   const [address, setAddress] = useState<string>()
   const [data, setData] = useState<any>({})
   const query = gql` {
      yieldMinteds(where: {landTokenId: ${Number(id)}}) {
        id
        yieldId
        landTokenId
        yieldType
        owner
        transactionHash
        blockTimestamp
        amount
        blockNumber
      }
    }`
 
   useEffect(() => {
      async function get() {
         const account = await smartAccount?.getAccount()
         const address = await smartAccount?.getAddress()
         setAddress(address)
      }
      get()
   }, [smartAccount])
   useEffect(() => {
      async function getValuation() {
         try {
            let yieldId = 0;
            const res: any = await queryContract(query);
            if (res.success) {
               const index = res.data.yieldMinteds.length - 1;
               yieldId = res.data.yieldMinteds[index].yieldId
            }
            const totalSupply = await yieldTokenContract.methods.totalSupply(yieldId).call().then((res: any) => {
               setData((prev: any) => ({ ...prev, totalSupply: Number(res.toString())}))
               return res
            }) 
            const balance = await yieldTokenContract.methods.balanceOf(address, yieldId).call().then((res: any) => {
               setData((prev: any) => ({ ...prev, balance: Number(res.toString())}))
               return res

            });
            // console.log(`Token balance for ${address}:`, balance);
            const yieldData = await yieldTokenContract.methods.yieldData(yieldId).call({ from: address}).then((res: any) => {
               setData((prev: any) => ({ ...prev, totalYield: Number(res.totalYield.toString()), season: Number(res.season.toString())}))
               return res
            })
            const valuation = await yieldLendingContract.methods
               .getYieldValuationInUsdc(yieldId)
               .call({ from: address }).then((res: any)=> {
                  setData((prev: any) => ({ ...prev, evaluation: Number(res.toString()) }))
                  return res
               })
            // const geo = await landContract.methods
            //    .getLandGeo("720ee6ba01017d67d198d3f11517f5bc", 0)
            //    .send({ from: "0xf0830060f836B8d54bF02049E5905F619487989e" }).then((res: any)=> {
            //       setData((prev: any) => ({ ...prev, geo: res.toString() }))
            //       return res
            //    })
            //    console.log(geo)
               // Update state with the fetched valuation
            } catch (error) {
               console.error('Error fetching valuation:', error)
            }
         }
         
         if (address) {
            getValuation() // Trigger the async function
         }
      }, [address, id, query])
      console.log(data)
      
   return (
      <div className="w-full h-[18rem] mt-5 p-2 px-0 flex gap-3 overflow-auto custom-scroll">
         <Summary header="Total Supply" data={data.totalSupply || 0} className="bg-black shrink-0" />
         <Summary header="Evaluation (USDC)" data={data.evaluation || 0} className="bg-white text-black shrink-0" />
         <Summary header="Expected Total Yield" data={data.totalYield || 0} className="bg-white text-black shrink-0" />
         <div className="flex flex-col gap-2">
            <Summary header="Season" data={data.season || 0} className="bg-black text-white" />
            <Summary header="Balance" data={data.balance || 0} className="text-black" />
         </div>
         <div className="flex flex-col gap-2">
            <Summary header="LTV Ratio" data={60} unit='%' className="bg-black text-white" />
            <Summary header="Liquidation" data={75} unit='%' className="bg-white text-black" />
         </div>

         <div className={`w-full h-full flex rounded-xl border border-black bg-white shadow-md flex-col justify-center items-center relative overflow-hidden pt-5 min-w-[13rem]`}>
            {/* <div className="w-full h-full overflow-hidden flex">
               <Mincard />
               <Mincard />
            </div> */}
            <div className="w-full h-full overflow-hidden flex">
               <Mincard name='Pool' value='0'/>
               <Mincard name='Borrowed' value='0' />
            </div>
            <BorrowModal id={id}/>
            <RepayModal id={id} />
         </div>
      </div>
   )
}

export default Statistics