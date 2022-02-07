import React from "react";

const PlayerTournaments = _ => {
    return (
        <div className="w-full px-4 py-5 text-white">
            <div className="flex items-center justify-between">
                <div className="font-extrabold text-xs mb-[2px] ">Tournaments</div>
                <TournamentTab />
            </div>

            <div className="space-y-2 pt-2">
                <Tournament />
                <Tournament />
                <Tournament />
                <Tournament />
                <Tournament />
            </div>
            <div></div>
        </div>
    )
}

const TournamentTab = _ => {
    return (
        <div className="text-[9px] font-bold">
            <Nav>
                <NavItem href="" isActive>ALL</NavItem>
                <NavItem href="">FINISHED</NavItem>
                <NavItem href="">UPCOMING</NavItem>
                <NavItem href="" >IN PROGRESS</NavItem>
            </Nav>
        </div>
    )
}

const Nav = ({ children }) => {
    return (
        <nav>
            <ul className="flex items-center space-x-2">
                {children}
            </ul>
        </nav>
    )
}

const NavItem = ({ href, isActive, children }) => {
    return (
        <li className={`px-1 border-b-2 hover:border-b-2 active:border-b-2 active:border-borderColor hover:border-borderColor hover:bg-radiant bg-no-repeat bg-cover  pt-1 pb-1 ${isActive ? 'border-borderColor' : 'border-[transparent]'}`}>
            <a
                href={href}
            >
                {children}
            </a>
        </li>
    )
}

const Tournament = _ => {
    return (
        <div className="flex justify-between items-center px-4 py-2 border-[1px] border-tableBorderColor rounded-md bg-[#101218] text-white">
            <div className="flex items-center space-x-[10px]">
                <div>
                    <img className="w-[41px] h-[41px] inline" src="/gameIcon.png" />
                </div>
                <div className="flex flex-col">
                    <div className="font-bold text-[11px]">Crazy Open in Mexico V2</div>
                    <div className="flex flex-row items-center space-x-1">
                        <div className="px-[4px] py-[1px] bg-gray-500 font-bold text-[6px] text-center rounded-full text-white"><p>FINISHED</p></div>
                        <div className="font-bold text-[10px] text-gray-500">22 MAY 2020</div>
                    </div>
                </div>
            </div>
            <div className="flex flex-row items-center space-x-8">
                <div className="space-x-4 flex items-center">
                <TournamentMeta title="FORMAT" subtitle={"20/20"}/>
                <TournamentMeta title="FEE" subtitle={"FREE"}/>
                <TournamentMeta title="PRIZE" subtitle={"$20"}/>
                </div>
                <div className="w-[1px] bg-tableBorderColor h-[38px]"></div>
                <TournamentStatus />
            </div>
        </div>
    )
}

const TournamentStatus = _ => {
    return (
        <div className="flex flex-row items-center space-x-2">
            <div className="font-semibold text-[11px] text-[#3acbdb]">23/23</div>
            <TournamentStatusButton />
        </div>

    )
}

const TournamentStatusButton = _ => {
    return (
        <div className="px-[10px] py-[2px] bg-gray-500 font-semibold text-[11px] rounded-[3px] text-white">CLOSED</div>
    )
}

const TournamentRank = _ => {
    return (
        <div>
            <img src="" />
            <div>WICKED</div>
        </div>
    )
}

const TournamentMeta = ({title, subtitle}) => {
    return (
        <div className="flex flex-col items-center">
            <div className="text-[9px] font-bold text-[#323d4d]">
                {title}
            </div>
            <div className="text-[10px] font-semibold">
                {subtitle}
            </div>
        </div>
    )
}

export default PlayerTournaments