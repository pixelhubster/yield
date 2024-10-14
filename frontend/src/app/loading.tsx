import React from 'react'
import svg from '../../public/land.svg'
const loading = () => {
   return (
      <div className='w-full h-screen bg-[#F7F7FF] flex items-center justify-center'>
         {/* <div className='skeleton h-32 w-32 bg-blue-900/90 flex justify-center items-center font-semibold text-white'>
         Yield
      </div> */}
         <progress className="progress w-56 text-[#171717]">
         </progress>
      </div>
   )
}

export default loading