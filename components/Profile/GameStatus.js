import React from "react";

const GameStatus = _ => {
    return (
        <div className="rounded-lg bg-borderColor h-[147px]">
            <div className="shadow-inner h-[50px] align-middle bg-menuTopColor">
                <div className="px-8 h-full flex items-center">
                    <div>
                    </div>
                    <div className="font-bold text-white text-[12px] tracking-tight">
                        CounterStrike: Global Offensive
                    </div>
                    <div></div>
                </div>
            </div>
            <div className="px-8 flex flex-row justify-between items-center h-[97px]">
                <GameStatusInfo />
                <GameStatusInfo />
                <GameStatusInfo />
                <GameStatusInfo />
                <GameStatusInfo />
            </div>
        </div>
    )
}

const GameStatusInfo = _ => {
    return (
        <div>
            <div></div>
            <div>
                <div className="font-extrabold text-lg text-white">209</div>
                <div className="font-semibold text-xs">Tournaments</div>
            </div>
        </div>
    )
}

export default GameStatus