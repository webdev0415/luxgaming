import React from "react";
import Link from "next/link"

const Tournament = ({ trn }) => {
    return (
        <Link href={`/admin/tournament/${trn.id}`} as={`/admin/tournament/${trn.id}`}>
            <div className="bg-tournament-bg bg-no-repeat bg-cover text-white h-[119px] w-[196px] text-[10px]">
                <div className="text-center font-semibold text-[13px] pt-1">{trn.title}</div>
                <div className="flex flex-col px-5 py-4 space-y-1">
                    <div>
                        <div className="flex space-x-[3px]">
                            <div>Date </div>
                            <div>{trn.date}</div>
                        </div>
                    </div>
                    <div>{trn.type}</div>
                    <div className="flex space-x-2">
                        <img src="/active-players.png" />
                        <div>{trn.participants}</div>
                    </div>
                    <div className="flex space-x-[3px] text-[13px] font-bold">
                        <div>start: </div>
                        <div>{trn.description}</div>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default Tournament