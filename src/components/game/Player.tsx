'use client';
// /components/game/Player.tsx

import React, {useEffect, useState} from 'react';
import { cn } from '@/lib/utils';
import type { PlayerState } from './types';
import { Card } from './Card';
import { ChipStack } from './ChipStack';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import {DealerButton} from "@/components/game/DealerButton";
import {AnimatePresence, motion} from "framer-motion";

interface PlayerProps {
    player: PlayerState;
    isSelf: boolean;
}

export const Player: React.FC<PlayerProps> = ({ player, isSelf }) => {
    const isFolded = player.status === 'folded';
    const [progress, setProgress] = useState(100);

    useEffect(() => {
        // Only start the timer if it's this player's turn
        if (player.isTurn) {
            setProgress(100); // Reset the bar to full

            const timer = setInterval(() => {
                setProgress(prev => {
                    if (prev <= 0) {
                        clearInterval(timer);
                        // --- THIS IS WHERE THE LOGIC HAPPENS ---
                        // Call a function from the store like `store.timerExpired()`
                        return 0;
                    }
                    return prev - 5; // Decrease the progress
                });
            }, 500); // Update every half second

            // Cleanup function: stop the timer if the component unmounts or the turn changes
            return () => clearInterval(timer);
        }
    }, [player.isTurn]); // This effect re-runs whenever the 'isTurn' prop changes

    return (
        <div className={cn(
            'relative flex flex-col items-center gap-1 p-2 rounded-lg transition-all duration-300',
            isFolded && 'opacity-40',
            // If it's this player's turn, add the glow and ring effects
            player.isTurn && !isFolded && 'animate-pulse-glow rounded-xl'
        )}>

            {/* Player's Current Bet */}
            {/* --- THE CHANGE IS HERE: We add a motion.div wrapper with a layoutId --- */}
            <AnimatePresence>
                {player.currentBet > 0 && (
                    <motion.div
                        // The layoutId is unique to this player's bet stack
                        layoutId={`bet-stack-${player.id}`}
                        className="absolute -bottom-10"
                        exit={{ opacity: 0, scale: 0.5 }} // A simple exit animation for now
                    >
                        <ChipStack amount={player.currentBet} />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Player Info Box */}
            <div className={cn(
                "relative w-24 h-24 bg-black/30 border-2 border-slate-600 rounded-lg flex flex-col items-center justify-center gap-1 transition-all duration-300",
                player.isTurn && !isFolded && "border-blue-400" // Change border color
            )}>
                <Avatar>
                    <AvatarImage src={player.avatarUrl} alt={player.name} />
                    <AvatarFallback>{player.name.slice(0, 2)}</AvatarFallback>
                </Avatar>
                <span className="text-white font-bold text-sm truncate w-full text-center px-1">{player.name}</span>
                <span className="text-yellow-400 font-semibold text-xs">${player.stack.toLocaleString()}</span>
                {player.isTurn && !isFolded && (
                    <Progress value={progress} className="absolute bottom-0 w-full h-1.5" />
                )}
            </div>

            {/* Player Cards */}
            <div className="flex items-center justify-center -space-x-8">
                {/* --- THE FIX IS ON THE isFaceDown PROP ON THESE TWO CARDS --- */}
                <Card
                    cardId={player.cards[0]}
                    isFaceDown={!isSelf || isFolded} // Changed from && to ||
                />
                <Card
                    cardId={player.cards[1]}
                    isFaceDown={!isSelf || isFolded} // Changed from && to ||
                />
            </div>

            {/* Player's Current Bet */}
            {player.currentBet > 0 && (
                <div className="absolute -bottom-10">
                    <ChipStack amount={player.currentBet} />
                </div>
            )}

            {/* Dealer Button */}
            {player.isDealer && (
                <div className="absolute">
                    <DealerButton />
                </div>
            )}
        </div>
    );
};