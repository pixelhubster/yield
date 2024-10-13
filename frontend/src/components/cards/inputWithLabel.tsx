"use client"
import React from 'react'

const InputWithLabel = ({ name, placeholder, onChange, value, fill}: { name: string, placeholder: string, onChange: Function, value: string, fill?: any}) => {
   // console.log(value)
   return (
      <>
         <label className="input input-bordered flex items-center gap-2 bg-white outline-none focus-within:outline-none my-2 disabled:bg-white focus-within:border-gray-300 border-gray-300 text-black/70 font-normal ">
            {name}
            <input type="text" name={value} className="grow placeholder:text-[13px] font-normal active:bg-white" placeholder={placeholder} value={fill} disabled={fill ? true: false} onChange={(e) => onChange(e)}/>
         </label>
      </>
   )
}

export default InputWithLabel