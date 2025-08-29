import {AnimatePresence, motion} from "framer-motion";
import {ChipStack} from "@/components/game/ChipStack.tsx";
import {useTablePositions} from "@/hooks/useTablePositions.ts";

export const PlayerCurrentChips = ({player}) => {
    const {getBetPositionClasses,getStackPositionClasses} = useTablePositions();
    return (
        <>
            {/* Current Bet */}
            <AnimatePresence>
                {player.chips > 0 && (
                    <motion.div
                        layoutId={`bet-stack-${player.id}`}
                        className={getBetPositionClasses(player.seat)}
                        exit={{ opacity: 0, scale: 0.5 }}
                    >
                        <ChipStack amount={player.chips} />
                    </motion.div>
                )}
            </AnimatePresence>


            {/* Stack Amount */}
             <div className={`${getStackPositionClasses(player.seat)}`} >
                ${player.chips}
            </div>
        </>
    );
};