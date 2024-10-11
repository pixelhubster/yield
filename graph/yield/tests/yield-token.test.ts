import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { Address, BigInt } from "@graphprotocol/graph-ts"
import { BurnYield } from "../generated/schema"
import { BurnYield as BurnYieldEvent } from "../generated/YieldToken/YieldToken"
import { handleBurnYield } from "../src/yield-token"
import { createBurnYieldEvent } from "./yield-token-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let owner = Address.fromString("0x0000000000000000000000000000000000000001")
    let yieldId = BigInt.fromI32(234)
    let amount = BigInt.fromI32(234)
    let newBurnYieldEvent = createBurnYieldEvent(owner, yieldId, amount)
    handleBurnYield(newBurnYieldEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("BurnYield created and stored", () => {
    assert.entityCount("BurnYield", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "BurnYield",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "owner",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "BurnYield",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "yieldId",
      "234"
    )
    assert.fieldEquals(
      "BurnYield",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "amount",
      "234"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
