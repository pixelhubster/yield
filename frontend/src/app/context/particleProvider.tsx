"use client"

import { ConnectKitProvider, createConfig } from '@particle-network/connectkit';
import { authWalletConnectors } from '@particle-network/connectkit/auth';
import { solana, baseSepolia } from '@particle-network/connectkit/chains'
import { evmWalletConnectors } from '@particle-network/connectkit/evm'
import { injected as solaInjected, solanaWalletConnectors } from '@particle-network/connectkit/solana'
import { wallet, EntryPosition } from '@particle-network/connectkit/wallet'
import { aa, AAWrapProvider, SmartAccount } from '@particle-network/connectkit/aa'
import React, { useEffect } from 'react';
// import { ParticleProvider } from '@particle-network/provider'
// import { ParticleNetwork } from '@particle-network/auth'
import { web3 } from '@/backend/web3';
import Web3 from 'web3';

const projectId = process.env.NEXT_PUBLIC_PROJECT_ID as string
const clientKey = process.env.NEXT_PUBLIC_CLIENT_KEY as string
const appId = process.env.NEXT_PUBLIC_APP_ID as string
const walletConnectProjectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID as string

if (!projectId || !clientKey || !appId) {
   throw new Error("Please configure the Particle project in .env first!");
}

const config = createConfig({
   projectId,
   clientKey,
   appId,
   appearance: {
      recommendedWallets: [
         { walletId: 'metamask', label: 'Recommended' },
         { walletId: 'coinbaseWallet', label: 'popular' }
      ],
      splitEmailAndPhone: false,
      collapseWalletList: false,
      hideContinueButton: false,
      language: 'en-US',
      mode: 'light',
      theme: {
         // '--pcm-accent-color': '',
      },
      logo: '',
      filterCountryCallingCode: (countries) => {
         return countries.filter((item) => item === 'US')
      }
   },
   walletConnectors: [
      evmWalletConnectors({
         metadata: { name: "Yield", icon: '', description: '', url: '' },
         walletConnectProjectId: ''
      }),
      authWalletConnectors({
         authTypes: ['email', 'google', 'apple', 'twitter', 'github'],
         fiatCoin: 'USD',
         promptSettingConfig: {
            promptMasterPasswordSettingWhenLogin: 1,
            promptPaymentPasswordSettingWhenSign: 1,
         }
      }),
      solanaWalletConnectors(),
   ],
   plugins: [
      wallet({
         entryPosition: EntryPosition.BR,
         visible: true,
         widgetIntegration: 'modal',
         customStyle: {}
      }),
      aa({
         name: "BICONOMY",
         version: '2.0.0'
      })
   ],
   chains: [baseSepolia, solana]
})

// const particle = new ParticleNetwork({
//    projectId,
//    clientKey,
//    appId,
//    chainName: baseSepolia.name,
//    chainId: baseSepolia.id,
//    wallet: { displayWalletEntry: true, uiMode: "dark"}
// })
const provider = new Web3.providers.HttpProvider(process.env.NEXT_PUBLIC_BASE_SEPOLIA_RPC_URL as string);
const smartAccount = new SmartAccount(web3.currentProvider, {
   projectId,
   clientKey,
   appId,
   aaOptions: {
      // biconomy: [{ chainId: baseSepolia.id, version: '2.0.0' }],
      accountContracts: {
         BICONOMY: [{
           version: '2.0.0',
           chainIds: [baseSepolia.id]
         }]
       },
      // paymasterApiKeys: [{
      //    chainId: baseSepolia.id,
      //    apiKey: ""
      // }]
   },
   // networkConfig: { dappAPIKey: "", chainId: baseSepolia.id }
})
smartAccount.setSmartAccountContract({
   name: "BICONOMY",
   version: '2.0.0'
})

export const ParticleConnectKit = ({ children }: React.PropsWithChildren) => {
   return <ConnectKitProvider config={config}>{children}</ConnectKitProvider>;
};
export { smartAccount }