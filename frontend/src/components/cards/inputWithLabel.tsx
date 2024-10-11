"use client"
import React from 'react'

const InputWithLabel = ({ name, placeholder, onChange, value}: { name: string, placeholder: string, onChange: Function, value: string}) => {
   // console.log(value)
   return (
      <>
         <label className="input input-bordered flex items-center gap-2 bg-white outline-none focus-within:outline-none my-2 focus-within:border-gray-300 border-gray-300 text-black/70 font-normal ">
            {name}
            <input type="text" name={value} className="grow placeholder:text-[13px] font-normal" placeholder={placeholder} onChange={(e) => onChange(e)}/>
         </label>
      </>
   )
}

export default InputWithLabel