import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { BigInt, Address } from "@graphprotocol/graph-ts"
import { LoanLiquidated } from "../generated/schema"
import { LoanLiquidated as LoanLiquidatedEvent } from "../generated/YieldLending/YieldLending"
import { handleLoanLiquidated } from "../src/yield-lending"
import { createLoanLiquidatedEvent } from "./yield-lending-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let yieldId = BigInt.fromI32(234)
    let borrower = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let newLoanLiquidatedEvent = createLoanLiquidatedEvent(yieldId, borrower)
    handleLoanLiquidated(newLoanLiquidatedEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("LoanLiquidated created and stored", () => {
    assert.entityCount("LoanLiquidated", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "LoanLiquidated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "yieldId",
      "234"
    )
    assert.fieldEquals(
      "LoanLiquidated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "borrower",
      "0x0000000000000000000000000000000000000001"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
