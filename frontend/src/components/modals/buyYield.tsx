"use client"
import React, { useState } from 'react'
// import InputWithLabel from '../cards/inputWithLabel'
// import CustomButton from '../cards/button'
// import { web3, yieldLendingContract, yieldTokenContract } from '@/backend/web3'
// import { useAccount } from 'wagmi'
// import { stringToBytes } from 'viem'
// import Web3 from 'web3'
import { Input } from '../ui/input'
import {Label} from "../ui/label"
import { Button } from '../ui/button'
import {
   Dialog,
   DialogContent,
   DialogHeader,
   DialogTitle,
 } from "@/components/ui/dialog";

const BuyYieldModal = ({ id }: { id?: number }) => {
   const [formData,setFormData] = useState<any>({})
   return (

      <form  className="space-y-4 max-w-md mx-auto">
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          name="name"
          required
          value={formData.name || ""}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          required
          value={formData.email || ""}
         //  onChange={handleInputChange}
        />
      </div>
      <Button
        type="submit"
      //   disabled={isLoading}
        className="w-full text-text"
       
      >
        Add Lecturer
      </Button>
    </form>
   )
}

export default BuyYieldModal