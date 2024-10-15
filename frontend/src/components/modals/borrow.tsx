"use client";
import React, { useState } from "react";
// import InputWithLabel from '../cards/inputWithLabel'
// import CustomButton from '../cards/button'
// import { web3, yieldLendingContract, yieldTokenContract } from '@/backend/web3'
// import { useAccount } from 'wagmi'
// import { stringToBytes } from 'viem'
// import Web3 from 'web3'
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import InputWithLabel from "../cards/inputWithLabel";
import CustomButton from "../cards/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface BorrowModalProps {
  borrowModal: boolean;
  setBorrowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const BorrowModal: React.FC<BorrowModalProps> = ({
  borrowModal,
  setBorrowModal,
}) => {
  const [value, setValue] = useState<any>("");

  const handleChange = (e: any) => {
    setValue((value: any) => ({ ...value, [e.target.name]: e.target.value }));
  };
  return (
    <Dialog open={borrowModal} onOpenChange={(open) => setBorrowModal(open)}>
      <DialogContent className="bg-background">
        <DialogHeader>
          <DialogTitle>Add New University</DialogTitle>
        </DialogHeader>
        <InputWithLabel
          value="tokenId"
          onChange={handleChange}
          name="Id"
          placeholder="Token Id"
          //   fill={id}
        />
        <InputWithLabel
          value="qty"
          onChange={handleChange}
          name="Token Supply"
          placeholder="Qty"
        />
        <InputWithLabel
          value="minLoanAmount"
          onChange={handleChange}
          name="MLA"
          placeholder="Min Loan Amount"
        />
        <InputWithLabel
          value="maxLiquidation"
          onChange={handleChange}
          name="MLT"
          placeholder="Max Liquidation Threshold"
        />
        {/* <button className='btn w-full bg-blue-900/90 border-0 hover:bg-blue-900'>Borrow</button> */}
        <CustomButton btn="Borrow" />
        <p className="py-4 text-center text-[12px] text-gray-600">
          You will be prompted to pay for the transaction fee
        </p>
      </DialogContent>
    </Dialog>
  );
};

export default BorrowModal;
