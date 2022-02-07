import React from "react";

const ProfileTab = _ => {
    return (
        <div className="flex flex-row justify-between text-[9px] font-bold py-4 pt-[5rem] items-center text-white">
            <Nav>
                <NavItem href="" isActive={true}>OVERVIEW</NavItem>
                <NavItem href="">FRIENDS</NavItem>
                <NavItem href="">STATISTICS</NavItem>
                <NavItem href="" >PLAY HISTORY</NavItem>
                <NavItem href="">ACHIEVEMENTS</NavItem>
                <NavItem href="">STREAMS</NavItem>
            </Nav>
            <div className="flex flex-row space-x-2 text-white">
                <div className="py-[5px] px-[10px]  bg-glow hover:bg-radiant bg-no-repeat bg-cover">ADD FRIEND</div>
                <div className="py-[5px] px-[10px]  bg-glow hover:bg-radiant bg-no-repeat bg-cover">INVITE TO TEAM</div>
            </div>
        </div>
    )
}

const Nav = ({ children }) => {
    return (
        <nav>
            <ul className="flex space-x-2">
                {children}
            </ul>
        </nav>
    )
}

const NavItem = ({ href, isActive, children }) => {
    return (
        <li className={` px-1 border-b-2 hover:border-b-2 active:border-b-2 active:border-borderColor hover:border-borderColor hover:bg-radiant bg-no-repeat bg-cover pt-1 pb-1 ${isActive ? 'border-borderColor' : 'border-[transparent]'}`}>
            <a
                href={href}
            >
                {children}
            </a>
        </li>
    )
}

export default ProfileTab