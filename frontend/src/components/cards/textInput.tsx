'use client'
import React, { ChangeEventHandler } from 'react'

const TextInput = ({ label, tr, br, bl, placeholder, setValue}: {label: string, tr?: string, br?: string, bl?: string, placeholder?: string, setValue: Function}) => {

   const handleChange = (e: any ) => {
      const key = label.replaceAll(" ", "");
      setValue((value: any) => ({...value, [key]: e.target.value}))
   }
  return (
   <label className="form-control w-full max-w-xs">
   <div className="label">
     <span className="label-text">{label}</span>
     <span className="label-text-alt">{tr}</span>
   </div>
   <input type="text" placeholder={placeholder} className="input input-bordered w-full max-w-xs placeholder:text-[12px] text-sm" onChange={handleChange}/>
   <div className="label">
     <span className="label-text-alt">{bl}</span>
     <span className="label-text-alt">{br}</span>
   </div>
 </label>
  )
}

export default TextInput