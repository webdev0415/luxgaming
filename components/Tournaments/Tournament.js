import React from "react";
import Link from "next/link"
import { TournamentAlgorithmType } from "../../types";

const Tournament = ({ trn }) => {
    return (
        <Link href={`/tournament/${trn.id}`} as={`/tournament/${trn.id}`}>
            <div className="bg-tournament-bg bg-no-repeat bg-cover text-white h-[119px] w-[196px] text-[10px] cursor-pointer">
                <div className="text-center font-semibold text-[13px] pt-1">{trn.title}</div>
                <div className="flex flex-col px-5 py-4 space-y-1">
                    <div>
                        <div className="flex space-x-[3px]">
                            <div>Type: </div>
                            {TournamentAlgorithmType.map(algorithm => {
                                if (algorithm.i === trn.idAlgorithmType) {
                                    return <div className="text-white font-semibold">{algorithm.v}</div>
                                }
                            }
                            )}
                        </div>
                    </div>
                    <div>{trn.type}</div>
                    <div className="flex space-x-2">
                        <img src="/active-players.png" />
                        <div>{trn.cost}</div>
                    </div>
                    <div className="flex space-x-[3px] text-xs font-light">
                        <div>Desc: </div>
                        <div>{trn.description}</div>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default Tournament