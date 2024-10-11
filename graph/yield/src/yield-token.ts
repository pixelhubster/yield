import {
  BurnYield as BurnYieldEvent,
  SharePurchased as SharePurchasedEvent,
  TransferBatch as TransferBatchEvent,
  TransferSingle as TransferSingleEvent,
  URI as URIEvent,
  YieldListed as YieldListedEvent,
  YieldMinted as YieldMintedEvent,
} from "../generated/YieldToken/YieldToken"
import {
  BurnYield,
  SharePurchased,
  TransferBatch,
  TransferSingle,
  URI,
  YieldListed,
  YieldMinted,
} from "../generated/schema"

export function handleBurnYield(event: BurnYieldEvent): void {
  let entity = new BurnYield(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )
  entity.owner = event.params.owner
  entity.yieldId = event.params.yieldId
  entity.amount = event.params.amount

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleSharePurchased(event: SharePurchasedEvent): void {
  let entity = new SharePurchased(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )
  entity.listId = event.params.listId
  entity.yieldId = event.params.yieldId
  entity.amount = event.params.amount

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleTransferBatch(event: TransferBatchEvent): void {
  let entity = new TransferBatch(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )
  entity.operator = event.params.operator
  entity.from = event.params.from
  entity.to = event.params.to
  entity.ids = event.params.ids
  entity.values = event.params.values

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleTransferSingle(event: TransferSingleEvent): void {
  let entity = new TransferSingle(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )
  entity.operator = event.params.operator
  entity.from = event.params.from
  entity.to = event.params.to
  entity.YieldToken_id = event.params.id
  entity.value = event.params.value

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleURI(event: URIEvent): void {
  let entity = new URI(event.transaction.hash.concatI32(event.logIndex.toI32()))
  entity.value = event.params.value
  entity.YieldToken_id = event.params.id

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleYieldListed(event: YieldListedEvent): void {
  let entity = new YieldListed(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )
  entity.listId = event.params.listId
  entity.yieldId = event.params.yieldId
  entity.amount = event.params.amount
  entity.pricePerShare = event.params.pricePerShare

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleYieldMinted(event: YieldMintedEvent): void {
  let entity = new YieldMinted(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )
  entity.owner = event.params.owner
  entity.yieldId = event.params.yieldId
  entity.landTokenId = event.params.landTokenId
  entity.yieldType = event.params.yieldType
  entity.amount = event.params.amount

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
