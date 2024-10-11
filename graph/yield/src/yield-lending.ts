import {
  LoanLiquidated as LoanLiquidatedEvent,
  LoanRepayed as LoanRepayedEvent,
  YieldLoaned as YieldLoanedEvent,
} from "../generated/YieldLending/YieldLending"
import { LoanLiquidated, LoanRepayed, YieldLoaned } from "../generated/schema"

export function handleLoanLiquidated(event: LoanLiquidatedEvent): void {
  let entity = new LoanLiquidated(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )
  entity.yieldId = event.params.yieldId
  entity.borrower = event.params.borrower

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleLoanRepayed(event: LoanRepayedEvent): void {
  let entity = new LoanRepayed(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )
  entity.yieldId = event.params.yieldId
  entity.borrower = event.params.borrower
  entity.yieldAmount = event.params.yieldAmount

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleYieldLoaned(event: YieldLoanedEvent): void {
  let entity = new YieldLoaned(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )
  entity.yieldId = event.params.yieldId
  entity.borrower = event.params.borrower
  entity.yieldAmount = event.params.yieldAmount
  entity.loanAmount = event.params.loanAmount
  entity.liquidationThreshold = event.params.liquidationThreshold

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
