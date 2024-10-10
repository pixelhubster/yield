import React from 'react'
import InputWithLabel from '../cards/inputWithLabel'

const ListYield = () => {
   return (
      <>
         <label htmlFor="my_modal_8" className="btn bg-white text-black border-gray-100 hover:bg-gray-100">List</label>

         <input type="checkbox" id="my_modal_8" className="modal-toggle" />
         <div className="modal bg-white text-black" role="dialog">
            <div className="modal-box bg-white pt-2">
               <h3 className="text-lg font-bold text-center py-4">List Yield Token</h3>
               <InputWithLabel name='Id' placeholder='Token Id' />
               <InputWithLabel name='Qty' placeholder='Token Quantity' />
               <InputWithLabel name='$' placeholder='Price per share' />
               <button className='btn w-full bg-blue-900/90 border-0 hover:bg-blue-900'>Complete</button>
               <p className="py-4 text-center text-[12px] text-gray-600">You will be prompted to pay for the transaction fee</p>
            </div>
            <label className="modal-backdrop" htmlFor="my_modal_8">Close</label>
         </div>
      </>
   )
}

export default ListYield