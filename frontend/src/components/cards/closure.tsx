import React, { MouseEventHandler } from 'react'

const Closure = ({children, open, openFn}: {children: React.ReactNode, open: boolean, openFn: Function}) => {
   if (!open) return ""
   const handleopen = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => e.currentTarget === e.target && openFn(false)
  return (
    <div className='w-full h-full fixed flex justify-center bg-white backdrop-blur-[1px] z-[30] m-0' onClick={(e) => handleopen(e)}>{children}</div>
  )
}

export default Closure