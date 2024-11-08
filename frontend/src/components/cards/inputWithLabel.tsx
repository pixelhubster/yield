"use client"
import React from 'react'

interface InputWithLabelProps {
   name: string,
   placeholder: string,
   onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
   value: string,
   fill?: any
}
const InputWithLabel: React.FC<InputWithLabelProps> = ({ name, placeholder, onChange, value, fill }) => {
   return (
      <>
         <label className="input input-bordered flex items-center gap-2 bg-white outline-none focus-within:outline-none my-2 disabled:bg-white focus-within:border-gray-300 border-gray-300 text-black/70 font-normal ">
            {name}
            { fill ? (
               <input type="text" name={value} className="grow placeholder:text-[13px] font-normal active:bg-white autofill:bg-white" placeholder={placeholder} value={fill} disabled={fill ? true: false}/>
            ): (
               <input type="text" name={value} className="grow placeholder:text-[13px] font-normal active:bg-white autofill:bg-white" placeholder={placeholder} onChange={(e) => onChange(e)}/>
            )}
         </label>
      </>
   )
}

export default InputWithLabel