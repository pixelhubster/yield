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

interface ListYieldProps {
  listYield: boolean;
  setListYield: React.Dispatch<React.SetStateAction<boolean>>;
}

const ListYieldModal: React.FC<ListYieldProps> = ({
  listYield,
  setListYield,
}) => {
  const [value, setValue] = useState<any>("");

  const handleChange = (e: any) => {
    setValue((value: any) => ({ ...value, [e.target.name]: e.target.value }));
  };
  return (
    <Dialog open={listYield} onOpenChange={(open) => setListYield(open)}>
      <DialogContent>
        <DialogHeader></DialogHeader>

        <div className="modal-bo  pt-2">
          <h3 className="text-lg font-bold text-center py-4">
            List Yield Token
          </h3>
          <InputWithLabel
            value="tokenId"
            name="Id"
            placeholder="Token Id"
            onChange={handleChange}
          />
          <InputWithLabel
            value="qty"
            name="Qty"
            placeholder="Token Quantity"
            onChange={handleChange}
          />
          <InputWithLabel
            value="pricePerShare"
            name="$"
            placeholder="Price per share"
            onChange={handleChange}
          />
          {/* <button className='btn w-full bg-blue-900/90 border-0 hover:bg-blue-900'>Complete</button> */}
          <CustomButton btn="Complete" />
          <p className="py-4 text-center text-[12px] text-gray-600">
            You will be prompted to pay for the transaction fee
          </p>
        </div>
      </DialogContent>
      {/* <label className="modal-backdrop" htmlFor="my_modal_8">Close</label> */}
    </Dialog>
  );
};

export default ListYieldModal;
