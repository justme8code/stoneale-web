'use client';
import {type Config, cookieToInitialState, WagmiProvider} from "wagmi";

import {createAppKit} from "@reown/appkit";
import {projectId, wagmiAdapter, wagmiConfig} from "@/lib/wagmi";
import {arbitrum, mainnet} from "@reown/appkit/networks";
import type {ReactNode} from "react";

if(!projectId){
    throw new Error("NEXT_PUBLIC_PROJECT_ID is not defined. Please set it in your environment variables.");
}
const modal = createAppKit({
    adapters: [wagmiAdapter],
    projectId,
    networks: [mainnet,arbitrum],
    defaultNetwork: mainnet,
    features:{
        analytics:true,
        email:true,
        socials:['google', 'x', 'github', 'discord', 'farcaster', 'facebook'],
        emailShowWallets:true,
    },
    themeMode: 'light'
})
export function WalletProvider({ children , cookies}: { children: ReactNode, cookies: string | null }) {
    const initialState = cookieToInitialState(wagmiAdapter.wagmiConfig as Config, cookies)
    return (
           <WagmiProvider  config={wagmiConfig as Config} initialState={initialState}>
               {children}
           </WagmiProvider>
    );
}
