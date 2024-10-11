import { http, createConfig } from 'wagmi'
import { base, baseSepolia, mainnet } from 'wagmi/chains'

export const config = createConfig({
  chains: [mainnet],
  transports: {
    [mainnet.id]: http(),
   //  [baseSepolia.id]: http(),
  },
})