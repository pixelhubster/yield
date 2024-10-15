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

interface RegisterYieldProps {
  regYield: boolean;
  setRegYield: React.Dispatch<React.SetStateAction<boolean>>;
}

const RegisterYieldModal: React.FC<RegisterYieldProps> = ({
  regYield,
  setRegYield,
}) => {
  const [value, setValue] = useState<any>("");

  const handleChange = (e: any) => {
    setValue((value: any) => ({ ...value, [e.target.name]: e.target.value }));
  };
  return (
    <Dialog open={regYield} onOpenChange={(open) => setRegYield(open)}>
      <DialogContent className="bg-background">
        <>
          <DialogHeader>Register Yield</DialogHeader>

          {/* <input type="checkbox" id="my_modal_7" className="modal-toggle" /> */}
          <div className="modal-bo  ">
            <InputWithLabel
              value="tokenId"
              name="Token Id"
              placeholder="Token Id"
              onChange={handleChange}
            />
            <InputWithLabel
              value="yieldType"
              name="Yield Type"
              placeholder="e.g crop, maize"
              onChange={handleChange}
            />
            <InputWithLabel
              value="season"
              name="Season"
              placeholder="months to harvest "
              onChange={handleChange}
            />
            <InputWithLabel
              value="totalYield"
              name="Total Yield"
              placeholder="e.g amount of expected yield "
              onChange={handleChange}
            />
            <InputWithLabel
              value="amount"
              name="Mint Amount"
              placeholder="e.g Total yield token minted"
              onChange={handleChange}
            />
            {/* <button className='btn w-full bg-blue-900/90 border-0 hover:bg-blue-900'>Register</button> */}
            <CustomButton btn="Register" />
            <p className="py-4 text-center text-[12px] text-gray-600">
              You will be prompted to pay for the transaction fee
            </p>
          </div>
          <label className="modal-backdrop" htmlFor="my_modal_7">
            Close
          </label>
        </>
      </DialogContent>
    </Dialog>
  );
};

export default RegisterYieldModal;
