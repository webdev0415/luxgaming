import React from 'react'
import Image from 'next/image'

const RightPanel = () => {
    return (
       <div className="bg-gradient-to-r from-primary to-secondary sm:p-4  flex flex-col space-y-3 h-5/6 ">
            <ProfileSection/>
            <img src="/linebreaker.svg"/>
            <p className="text-sm text-right text-white">Featured Duels</p>
            <Duels/>
       </div>
    )
}

export default RightPanel

const ProfileSection = () => {
    return (
        <div className="flex flex-row space-x-3">
            <div className="relative h-32 w-32">
                <Image src="/profiletwo.svg" layout="fill"/>
            </div>
            <div className="flex flex-col space-y-3 text-white text-left justify-center">
                <h4 className="text-xs font-light">Player of the Month</h4>
                <h2 className="text-lg font-bold">ThisGuyRightHere</h2>
                <p className="text-xs font-light">#1 of August 2021</p>
            </div>
            
        </div>
    )
}

const Duels = () => {
    return (
        <div className="bg-lxGrey flex flex-col p-2 space-y-3 overflow-scroll scrollbar-hide">
            <DuelCard/>
            <DuelCard/>
            <DuelCard/>
            <DuelCard/>
            <DuelCard/>
            <DuelCard/>

        </div>
    )
}

const DuelCard = () => {
    return (
        <div className="bg-duel-card bg-no-repeat bg-cover w-full ">
            <div className="flex text-white text-center items-center w-full pb-[9px]">
                <div className="w-1/2 flex flex-col items-center ">
                   <Avatar src="/profilePic.svg" />
                   <p className="text-xs">Player One</p>
                </div>
                <h2>VS</h2>
                <div className="w-1/2 flex flex-col items-center">
                    <Avatar src="/profilePic.svg" />
                    <p className="text-xs">Player Two</p>
                </div>
            </div>

        </div>
    )
}

const Avatar = ({src}) => {
    return (
     <div className="bg-profile-blue-hexagon bg-cover w-14 h-16 bg-no-repeat flex items-center justify-center">
        <Image src={src}  objectFit="cover" width={32} height={40}/>
     </div>
    )
}
