import React from 'react'
import { Nav } from '../Layout/NavBar'

export const LeftSection = () => {
    return (
        <div className="flex flex-col space-y-5 items-center">
        <Nav/>
        <div className="hidden lg:inline-block">
            <img src="/pagemarkers/forum.svg" />
        </div>
        <Bottom/>
        </div>
    )
}


const Bottom = () => {
    return (
        <div className="w-full max-w-sm flex flex-col bg-gradient-to-l from-primary to-secondary p-4 space-y-2">
        <BottomBox/>
        <BottomBox/>
       </div>
    )
}

const BottomBox = () => {
    return (
        <div className="w-full flex flex-col bg-forumBox h-24 border-l-[10px] border-forumBorderColor">
        </div>
    )
}
