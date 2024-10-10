import React from 'react'

const InputWithLabel = ({ name, placeholder}: { name: string, placeholder: string}) => {
   return (
      <>
         <label className="input input-bordered flex items-center gap-2 bg-white outline-none focus-within:outline-none my-2 focus-within:border-gray-300 border-gray-300 text-black/70">
            {name}
            <input type="text" className="grow placeholder:text-[14px]" placeholder={placeholder} />
         </label>
      </>
   )
}

export default InputWithLabel