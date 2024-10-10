import React from 'react'
import InputWithLabel from '../cards/inputWithLabel'

const LiquidateModal = () => {
   return (
      <>
         <label htmlFor="my_modal_12" className="bg-transparent border-0 text-black hover:bg-transparent shadow-0 ">Liquidate</label>

         <input type="checkbox" id="my_modal_12" className="modal-toggle" />
         <div className="modal bg-white text-black" role="dialog">
            <div className="modal-box bg-white pt-2">
               <h3 className="text-lg font-bold text-center py-4">Liquidate Loan</h3>
               <InputWithLabel name='Id' placeholder='Token Id' />
               <InputWithLabel name="Borrower" placeholder='0x...00' />
               <button className='btn w-full bg-blue-900/90 border-0 hover:bg-blue-900'>Liquidate</button>
               <p className="py-4 text-center text-[12px] text-gray-600">You will be prompted to pay for the transaction fee</p>
            </div>
            <label className="modal-backdrop" htmlFor="my_modal_12">Close</label>
         </div>
      </>
   )
}

export default LiquidateModal