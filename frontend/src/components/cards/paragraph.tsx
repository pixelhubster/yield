import React from 'react'

const Paragraph = ({name, value}: {name: string, value: string}) => {
   return (
      <p className='w-full flex flex-row justify-between bg-red-00 p-1.5  px-0 text-[12px] border-b-2 border-gray-500'>
         <i className="not-italic font-normal">{name}</i>
         <i className='font-[550] not-italic'>{value}</i>
      </p>
   )
}

export default Paragraph