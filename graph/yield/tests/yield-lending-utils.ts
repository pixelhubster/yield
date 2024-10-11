import { newMockEvent } from "matchstick-as"
import { ethereum, BigInt, Address } from "@graphprotocol/graph-ts"
import {
  LoanLiquidated,
  LoanRepayed,
  YieldLoaned
} from "../generated/YieldLending/YieldLending"

export function createLoanLiquidatedEvent(
  yieldId: BigInt,
  borrower: Address
): LoanLiquidated {
  let loanLiquidatedEvent = changetype<LoanLiquidated>(newMockEvent())

  loanLiquidatedEvent.parameters = new Array()

  loanLiquidatedEvent.parameters.push(
    new ethereum.EventParam(
      "yieldId",
      ethereum.Value.fromUnsignedBigInt(yieldId)
    )
  )
  loanLiquidatedEvent.parameters.push(
    new ethereum.EventParam("borrower", ethereum.Value.fromAddress(borrower))
  )

  return loanLiquidatedEvent
}

export function createLoanRepayedEvent(
  yieldId: BigInt,
  borrower: Address,
  yieldAmount: BigInt
): LoanRepayed {
  let loanRepayedEvent = changetype<LoanRepayed>(newMockEvent())

  loanRepayedEvent.parameters = new Array()

  loanRepayedEvent.parameters.push(
    new ethereum.EventParam(
      "yieldId",
      ethereum.Value.fromUnsignedBigInt(yieldId)
    )
  )
  loanRepayedEvent.parameters.push(
    new ethereum.EventParam("borrower", ethereum.Value.fromAddress(borrower))
  )
  loanRepayedEvent.parameters.push(
    new ethereum.EventParam(
      "yieldAmount",
      ethereum.Value.fromUnsignedBigInt(yieldAmount)
    )
  )

  return loanRepayedEvent
}

export function createYieldLoanedEvent(
  yieldId: BigInt,
  borrower: Address,
  yieldAmount: BigInt,
  loanAmount: BigInt,
  liquidationThreshold: BigInt
): YieldLoaned {
  let yieldLoanedEvent = changetype<YieldLoaned>(newMockEvent())

  yieldLoanedEvent.parameters = new Array()

  yieldLoanedEvent.parameters.push(
    new ethereum.EventParam(
      "yieldId",
      ethereum.Value.fromUnsignedBigInt(yieldId)
    )
  )
  yieldLoanedEvent.parameters.push(
    new ethereum.EventParam("borrower", ethereum.Value.fromAddress(borrower))
  )
  yieldLoanedEvent.parameters.push(
    new ethereum.EventParam(
      "yieldAmount",
      ethereum.Value.fromUnsignedBigInt(yieldAmount)
    )
  )
  yieldLoanedEvent.parameters.push(
    new ethereum.EventParam(
      "loanAmount",
      ethereum.Value.fromUnsignedBigInt(loanAmount)
    )
  )
  yieldLoanedEvent.parameters.push(
    new ethereum.EventParam(
      "liquidationThreshold",
      ethereum.Value.fromUnsignedBigInt(liquidationThreshold)
    )
  )

  return yieldLoanedEvent
}
