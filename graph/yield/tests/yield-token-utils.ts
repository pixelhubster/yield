import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import {
  BurnYield,
  SharePurchased,
  TransferBatch,
  TransferSingle,
  URI,
  YieldListed,
  YieldMinted
} from "../generated/YieldToken/YieldToken"

export function createBurnYieldEvent(
  owner: Address,
  yieldId: BigInt,
  amount: BigInt
): BurnYield {
  let burnYieldEvent = changetype<BurnYield>(newMockEvent())

  burnYieldEvent.parameters = new Array()

  burnYieldEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )
  burnYieldEvent.parameters.push(
    new ethereum.EventParam(
      "yieldId",
      ethereum.Value.fromUnsignedBigInt(yieldId)
    )
  )
  burnYieldEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )

  return burnYieldEvent
}

export function createSharePurchasedEvent(
  listId: BigInt,
  yieldId: BigInt,
  amount: BigInt
): SharePurchased {
  let sharePurchasedEvent = changetype<SharePurchased>(newMockEvent())

  sharePurchasedEvent.parameters = new Array()

  sharePurchasedEvent.parameters.push(
    new ethereum.EventParam("listId", ethereum.Value.fromUnsignedBigInt(listId))
  )
  sharePurchasedEvent.parameters.push(
    new ethereum.EventParam(
      "yieldId",
      ethereum.Value.fromUnsignedBigInt(yieldId)
    )
  )
  sharePurchasedEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )

  return sharePurchasedEvent
}

export function createTransferBatchEvent(
  operator: Address,
  from: Address,
  to: Address,
  ids: Array<BigInt>,
  values: Array<BigInt>
): TransferBatch {
  let transferBatchEvent = changetype<TransferBatch>(newMockEvent())

  transferBatchEvent.parameters = new Array()

  transferBatchEvent.parameters.push(
    new ethereum.EventParam("operator", ethereum.Value.fromAddress(operator))
  )
  transferBatchEvent.parameters.push(
    new ethereum.EventParam("from", ethereum.Value.fromAddress(from))
  )
  transferBatchEvent.parameters.push(
    new ethereum.EventParam("to", ethereum.Value.fromAddress(to))
  )
  transferBatchEvent.parameters.push(
    new ethereum.EventParam("ids", ethereum.Value.fromUnsignedBigIntArray(ids))
  )
  transferBatchEvent.parameters.push(
    new ethereum.EventParam(
      "values",
      ethereum.Value.fromUnsignedBigIntArray(values)
    )
  )

  return transferBatchEvent
}

export function createTransferSingleEvent(
  operator: Address,
  from: Address,
  to: Address,
  id: BigInt,
  value: BigInt
): TransferSingle {
  let transferSingleEvent = changetype<TransferSingle>(newMockEvent())

  transferSingleEvent.parameters = new Array()

  transferSingleEvent.parameters.push(
    new ethereum.EventParam("operator", ethereum.Value.fromAddress(operator))
  )
  transferSingleEvent.parameters.push(
    new ethereum.EventParam("from", ethereum.Value.fromAddress(from))
  )
  transferSingleEvent.parameters.push(
    new ethereum.EventParam("to", ethereum.Value.fromAddress(to))
  )
  transferSingleEvent.parameters.push(
    new ethereum.EventParam("id", ethereum.Value.fromUnsignedBigInt(id))
  )
  transferSingleEvent.parameters.push(
    new ethereum.EventParam("value", ethereum.Value.fromUnsignedBigInt(value))
  )

  return transferSingleEvent
}

export function createURIEvent(value: string, id: BigInt): URI {
  let uriEvent = changetype<URI>(newMockEvent())

  uriEvent.parameters = new Array()

  uriEvent.parameters.push(
    new ethereum.EventParam("value", ethereum.Value.fromString(value))
  )
  uriEvent.parameters.push(
    new ethereum.EventParam("id", ethereum.Value.fromUnsignedBigInt(id))
  )

  return uriEvent
}

export function createYieldListedEvent(
  listId: BigInt,
  yieldId: BigInt,
  amount: BigInt,
  pricePerShare: BigInt
): YieldListed {
  let yieldListedEvent = changetype<YieldListed>(newMockEvent())

  yieldListedEvent.parameters = new Array()

  yieldListedEvent.parameters.push(
    new ethereum.EventParam("listId", ethereum.Value.fromUnsignedBigInt(listId))
  )
  yieldListedEvent.parameters.push(
    new ethereum.EventParam(
      "yieldId",
      ethereum.Value.fromUnsignedBigInt(yieldId)
    )
  )
  yieldListedEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )
  yieldListedEvent.parameters.push(
    new ethereum.EventParam(
      "pricePerShare",
      ethereum.Value.fromUnsignedBigInt(pricePerShare)
    )
  )

  return yieldListedEvent
}

export function createYieldMintedEvent(
  owner: Address,
  yieldId: BigInt,
  landTokenId: BigInt,
  yieldType: string,
  amount: BigInt
): YieldMinted {
  let yieldMintedEvent = changetype<YieldMinted>(newMockEvent())

  yieldMintedEvent.parameters = new Array()

  yieldMintedEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )
  yieldMintedEvent.parameters.push(
    new ethereum.EventParam(
      "yieldId",
      ethereum.Value.fromUnsignedBigInt(yieldId)
    )
  )
  yieldMintedEvent.parameters.push(
    new ethereum.EventParam(
      "landTokenId",
      ethereum.Value.fromUnsignedBigInt(landTokenId)
    )
  )
  yieldMintedEvent.parameters.push(
    new ethereum.EventParam("yieldType", ethereum.Value.fromString(yieldType))
  )
  yieldMintedEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )

  return yieldMintedEvent
}
