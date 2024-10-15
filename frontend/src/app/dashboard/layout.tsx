import React from "react"
import Navbar from "@/components/ui/Navbar"


const Layout = ({children}:{children:React.ReactNode}) => {
  return (
    <div className="bg-background">
        <Navbar/>
        {children}
    </div>
  )
}

export default Layout