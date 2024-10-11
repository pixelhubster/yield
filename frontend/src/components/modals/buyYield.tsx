import React from 'react'
import InputWithLabel from '../cards/inputWithLabel'
import CustomButton from '../cards/button'

const BuyYieldModal = () => {
   return (
      <>
         <label htmlFor="my_modal_9" className="btn bg-white text-black border-gray-100 hover:bg-gray-100">Purchase</label>

         <input type="checkbox" id="my_modal_9" className="modal-toggle" />
         <div className="modal bg-white text-black" role="dialog">
            <div className="modal-box bg-white pt-2">
               <h3 className="text-lg font-bold text-center py-4">Purchase Yield Token</h3>

               <div className="carousel w-full">

                  <div id="slide1" className="carousel-item relative w-full">
                     <div className='card w-full h-[12rem] bg-[#150578] flex justify-center items-center text-white text-4xl font-semibold'>
                        <p>25 eth</p>
                        <p className='text-sm text-gray-300'>$2.3 per share</p>
                     </div>
                     <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                        <a href="#slide3" className="btn bg-white/30 border-0 backdrop btn-circle">❮</a>
                        <a href="#slide2" className="btn btn-circle bg-white/30 border-0 backdrop">❯</a>
                     </div>
                  </div>
                  <div id="slide2" className="carousel-item relative w-full">
                     <div className='card w-full h-[12rem] bg-[#150578] flex justify-center items-center text-white text-4xl font-semibold'>
                        <p>005 eth</p>
                        <p className='text-sm text-gray-300'>$2.3 per share</p>
                     </div>
                     <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                        <a href="#slide1" className="btn bg-white/30 border-0 backdrop btn-circle">❮</a>
                        <a href="#slide3" className="btn btn-circle bg-white/30 border-0 backdrop">❯</a>
                     </div>
                  </div>
                  <div id="slide3" className="carousel-item relative w-full">
                     <div className='card w-full h-[12rem] bg-[#150578] flex justify-center items-center text-white text-4xl font-semibold'>
                        <p>90 eth</p>
                        <p className='text-sm text-gray-300'>$2.3 per share</p>
                     </div>
                     <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                        <a href="#slide2" className="btn bg-white/30 border-0 backdrop btn-circle">❮</a>
                        <a href="#slide1" className="btn btn-circle bg-white/30 border-0 backdrop">❯</a>
                     </div>
                  </div>
               </div>
               <InputWithLabel name='Id' placeholder='Token Id' />
               <InputWithLabel name='Qty' placeholder='Token Quantity' />
               <InputWithLabel name='Pay $' placeholder='' />
               {/* <button className='btn w-full bg-blue-900/90 border-0 hover:bg-blue-900'>Buy</button> */}
               <CustomButton btn='Buy' />
               <p className="py-4 text-center text-[12px] text-gray-600">You will be prompted to pay for the transaction fee</p>
            </div>
            <label className="modal-backdrop" htmlFor="my_modal_9">Close</label>
         </div>
      </>
   )
}

export default BuyYieldModal