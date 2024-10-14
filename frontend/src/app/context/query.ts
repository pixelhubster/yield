import { gql, request } from 'graphql-request'
import { normalize } from 'path'
import { config } from './ensConfig'
import { getEnsName} from "@wagmi/core"
import { Address } from 'viem'

export default async function queryContract(query: any) {
   const url = process.env.NEXT_PUBLIC_GRAPH_URL as string
   try {
      const res = await request(url, query)
      return { success: true, data: res}
   } catch (error) {
      console.log(error)
      return { error: "Failed to fetch data from contract"}
   }

}

const isAllValuesFilled = (obj: Object) => {
   return Object.values(obj).every(
     (value) => value !== '' && value !== null && value !== undefined
   );
 };

 function shortenAddress(address: string, startLength = 6, endLength = 4) {
   if (!address || address.length < startLength + endLength) return address;
   return (
     address.slice(0, startLength) + '...' + address.slice(-endLength)
   );
 }

 async function getName(value: Address) {
   const res = await getEnsName(config, {
      // name: normalize(value),
      address: value,
   
   });
   console.log(res)
   return res
 }
 
 export {isAllValuesFilled, shortenAddress, getName}


//  {
//    yieldMinteds {
//      amount
//      blockNumber
//      blockTimestamp
//      id
//      landTokenId
//      owner
//      transactionHash
//      yieldId
//      yieldType
//    }
//    yieldLoaneds {
//      blockNumber
//      blockTimestamp
//      borrower
//      id
//      liquidationThreshold
//      loanAmount
//      transactionHash
//      yieldAmount
//      yieldId
//    }
//    yieldListeds {
//      yieldId
//      transactionHash
//      pricePerShare
//      listId
//      id
//      blockTimestamp
//      blockNumber
//      amount
//    }
//    updateSuccessfulls {
//      blockNumber
//      blockTimestamp
//      date
//      hash
//      id
//      transactionHash
//    }
//    sharePurchaseds {
//      amount
//      blockNumber
//      blockTimestamp
//      id
//      listId
//      transactionHash
//      yieldId
//    }
//    loanRepayeds {
//      blockNumber
//      blockTimestamp
//      borrower
//      id
//      transactionHash
//      yieldAmount
//      yieldId
//    }
//    loanLiquidateds {
//      blockNumber
//      blockTimestamp
//      borrower
//      id
//      transactionHash
//      yieldId
//    }
//    landDailyReports {
//      blockNumber
//      blockTimestamp
//      date
//      id
//      requestId
//      transactionHash
//    }
//    burnYields {
//      amount
//      blockNumber
//      blockTimestamp
//      id
//      transactionHash
//      owner
//      yieldId
//    }
//  }