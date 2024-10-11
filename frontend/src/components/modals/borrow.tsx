import React from 'react'
import InputWithLabel from '../cards/inputWithLabel'
import CustomButton from '../cards/button'

const BorrowModal = () => {
   return (
      <>
         <label htmlFor="my_modal_10" className="btn bg-[#150578]/90 hover:bg-[#150578] w-[95%] my-2 flex-1 shrink border-0 text-white">Borrow</label>

         <input type="checkbox" id="my_modal_10" className="modal-toggle" />
         <div className="modal bg-white text-black" role="dialog">
            <div className="modal-box bg-white pt-2">
               <h3 className="text-lg font-bold text-center py-4">Borrow USDC against Yield Token</h3>
               <InputWithLabel name='Id' placeholder='Token Id' />
               <InputWithLabel name='Token Supply' placeholder='Qty' />
               <InputWithLabel name='MLA' placeholder='Min Load Amount' />
               <InputWithLabel name='MLT' placeholder='Max Liquidation Threshold' />
               {/* <button className='btn w-full bg-blue-900/90 border-0 hover:bg-blue-900'>Borrow</button> */}
               <CustomButton btn='Borrow' />
               <p className="py-4 text-center text-[12px] text-gray-600">You will be prompted to pay for the transaction fee</p>
            </div>
            <label className="modal-backdrop" htmlFor="my_modal_10">Close</label>
         </div>
      </>
   )
}

export default BorrowModal