"use client"
import '@rainbow-me/rainbowkit/styles.css';
import { getDefaultConfig, RainbowKitProvider} from "@rainbow-me/rainbowkit";
import {WagmiProvider } from "wagmi";
import { baseSepolia } from "wagmi/chains"
import {QueryClientProvider, QueryClient} from "@tanstack/react-query"

const config = getDefaultConfig({
   appName: "drugLedger",
   projectId: process.env.NEXT_PUBLIC_APP_ID as string,
   chains: [baseSepolia],
   ssr: true
})

const queryClient = new QueryClient();
const RainbowKitSetup = ({children}: {children: React.ReactNode}) => {
   return (
      <WagmiProvider config={config}>
         <QueryClientProvider client={queryClient}>
            <RainbowKitProvider>
               {children}
            </RainbowKitProvider>
         </QueryClientProvider>
      </WagmiProvider>
   )
}
export default RainbowKitSetup;