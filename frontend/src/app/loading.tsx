import React from 'react'

const loading = () => {
   return (
      <div className='w-full h-screen bg-[#F7F7FF] flex items-center justify-center'>
         {/* <div className='skeleton h-32 w-32 bg-blue-900/90 flex justify-center items-center font-semibold text-white'>
         Yield
      </div> */}
         <div className="flex w-52 flex-col gap-4">
            <div className="flex items-center gap-4">
               <div className="skeleton h-16 w-16 shrink-0 rounded-full"></div>
               <div className="flex flex-col gap-4">
                  <div className="skeleton h-4 w-20"></div>
                  <div className="skeleton h-4 w-28"></div>
               </div>
            </div>
            <div className="skeleton h-32 w-full"></div>
         </div>
      </div>
   )
}

export default loading