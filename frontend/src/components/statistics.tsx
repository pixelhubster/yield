import React from 'react'
import Mincard from './cards/mincard'
import Summary from './cards/summary'
import BorrowModal from './modals/borrow'
import RepayModal from './modals/repay'

const Statistics = () => {
  return (
   <div className="w-full h-[18rem] bg-yellow-200 mt-5 p-2 flex gap-3 overflow-auto">
   <Summary header="Total Supply" data="23200300" className="bg-black shrink-0" />
   <Summary header="Estimated Revenue" data="23200300" className="bg-white text-black shrink-0" />
   <Summary header="Total Crops" data="23200300" className="bg-white text-black shrink-0" />
   <div className="flex flex-col gap-2">
      <Summary header="Estd ROI" data="23200300" className="bg-white text-black" />
      <Summary header="Risk Level" data="moderate" className="bg-white text-black" />
   </div>
   <div className="flex flex-col gap-2">
      <Summary header="Max Loan Amount" data="23200300" className="bg-white text-black" />
      <Summary header="Loan Interest Rate" data="23200300" className="bg-white text-black" />
   </div>

   <div className={`w-full h-full flex rounded-xl border border-black bg-black shadow-md flex-col justify-center items-center relative overflow-hidden pt-5 min-w-[13rem]`}>
      <div className="w-full h-full overflow-hidden flex">
         <Mincard />
         <Mincard />
      </div>
      <div className="w-full h-full overflow-hidden flex">
         <Mincard />
         <Mincard />
      </div>
      {/* <button className="w-[96%] flex justify-center items-center shrink m-2 mx-5 bg-blue-600 p-4 rounded-xl shadow-xl">invest</button> */}
      <BorrowModal />
      <RepayModal />
   </div>
</div>
  )
}

export default Statistics