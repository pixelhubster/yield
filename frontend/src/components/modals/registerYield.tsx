import React from 'react'
import InputWithLabel from '../cards/inputWithLabel'
import CustomButton from '../cards/button'

const RegisterYieldModal = () => {
   return (
      <>
         <label htmlFor="my_modal_7" className="btn bg-white text-black border-gray-100 hover:bg-gray-100">Register Yield</label>

         <input type="checkbox" id="my_modal_7" className="modal-toggle" />
         <div className="modal bg-white text-black" role="dialog">
            <div className="modal-box bg-white pt-2">
               <h3 className="text-lg font-bold text-center py-4">Register Yield</h3>
               <InputWithLabel name='Token Id' placeholder='Token Id' />
               <InputWithLabel name='Yield Type' placeholder='e.g crop, maize' />
               {/* <select className="select select-bordered w-full bg-white border-gray-200 focus-within:bg-white focus-within:border-gray-200 focus-within:outline-none max-w-xs">
                  <option disabled selected>Select season</option>
                  <option>Han Solo</option>
                  <option>Greedo</option>
               </select> */}
               <InputWithLabel name='Season' placeholder='months to harvest ' />
               <InputWithLabel name='Total Yield' placeholder='e.g amount of expected yield ' />
               <InputWithLabel name='Mint Amount' placeholder='e.g Total yield token minted' />
               {/* <button className='btn w-full bg-blue-900/90 border-0 hover:bg-blue-900'>Register</button> */}
               <CustomButton btn='Register'/>
               <p className="py-4 text-center text-[12px] text-gray-600">You will be prompted to pay for the transaction fee</p>
            </div>
            <label className="modal-backdrop" htmlFor="my_modal_7">Close</label>
         </div>
      </>
   )
}

export default RegisterYieldModal