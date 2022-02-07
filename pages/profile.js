import React from 'react'
import { useUser } from '../lib/hooks'
import { 
    NavProfile, ProfileSummary, 
    ProfileTab, GameStatus, 
    PlayerData, AdvancedStats,
    PlayerTournaments
 } from '../components/Profile'
 import { useSession } from 'next-auth/client'

const auth_profile = _ => {
    const { user } = useUser()
    const [session] = useSession()
    
    return (
        <div className="bg-[#080a0e] cursor-pointer">
        <div className="mx-4 bg-[#0a0e13] cursor-pointer">
            <NavProfile />
            <ProfileSummary />
            <ProfileTab />
            <GameStatus />
            <PlayerData>
                <AdvancedStats />
                <PlayerTournaments />
            </PlayerData>
        </div>
        </div>
    )
}

export default auth_profile