"use client"

import { ConnectKitProvider, createConfig} from '@particle-network/connectkit';
import { authWalletConnectors} from '@particle-network/connectkit/auth';
import { mainnet, solana, baseSepolia} from '@particle-network/connectkit/chains'
import { evmWalletConnectors } from '@particle-network/connectkit/evm'
import { injected as solaInjected, solanaWalletConnectors} from '@particle-network/connectkit/solana'
import { wallet, EntryPosition } from '@particle-network/connectkit/wallet'
import { aa} from '@particle-network/connectkit/aa'
import React from 'react';

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
         { walletId: 'metamask', label: 'Recommended'},
         { walletId: 'coinbaseWallet', label: 'popular'}
      ],
      splitEmailAndPhone: false,
      collapseWalletList: false,
      hideContinueButton: false,
      language: 'en-US',
      mode: 'auto',
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
         metadata: { name: "Yield", icon: '', description: '', url: ''},
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
   chains: [solana, baseSepolia]
})

export const ParticleConnectKit = ({ children}: React.PropsWithChildren) => {
   return <ConnectKitProvider config={config}>{children}</ConnectKitProvider>;
};