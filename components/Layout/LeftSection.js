import React from 'react'
import { Nav } from './NavBar'

export const LeftSection = ({children, pageMarker}) => {
    return (
        <div className="flex flex-col space-y-5 items-center rounded-lg">
        <Nav/>
        <div className="hidden lg:inline-block">
            <img src={pageMarker} />
        </div>
        
        <Bottom>
        {children}
        </Bottom>
        </div>
    )
}


const Bottom = ({children}) => {
    return (
        <div className="w-full max-w-sm flex flex-col bg-gradient-to-l from-primary to-secondary p-4 space-y-2">
        {children}
       </div>
    )
}

const BottomBox = () => {
    return (
        <div className="w-full flex flex-col bg-forumBox h-24 border-l-[10px] border-forumBorderColor">
        </div>
    )
}
