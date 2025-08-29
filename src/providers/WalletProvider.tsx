'use client';
import {type Config, cookieToInitialState, WagmiProvider} from "wagmi";
import {projectId, wagmiAdapter, wagmiConfig} from "@/lib/wagmi";
import type {ReactNode} from "react";

if(!projectId){
    throw new Error("VITE_PROJECT_ID is not defined. Please set it in your environment variables.");
}

export function WalletProvider({ children , cookies}: { children: ReactNode, cookies: string | null }) {
    const initialState = cookieToInitialState(wagmiAdapter.wagmiConfig as Config, cookies)
    return (
           <WagmiProvider  config={wagmiConfig as Config} initialState={initialState}>
               {children}
           </WagmiProvider>
    );
}
