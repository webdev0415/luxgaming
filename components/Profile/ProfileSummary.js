import React from "react";

const ProfileSummary = _ => {
    return (
        <div className="text-center text-white align-middle">
            <img className="w-[84px] h-[84px] max-w-none m-0 inline mb-4" src="/profile_.png" />
            <div>
                <div className="font-bold">WhizBish</div>
                <div className="flex flex-row items-center justify-center space-x-2">
                    <div className="font-thin text-xs">Rookie</div>
                    <div className="bg-tableBorderColor w-[200px] rounded-full">
                        <div className="w-10 h-1 bg-gradient-to-br from-red-500 to-purple-600 rounded-full"></div>
                    </div>
                    <div className="font-thin text-xs">Master</div>
                </div>
                <div className="text-profileXPColor text-[12px] font-medium">
                    You have
                    <span className="font-bold"> 78xp </span>
                    earn
                    <span className="font-bold"> 40xp </span>
                    more to level up!
                </div>
                <div>
                    <img src="" />
                    <div className="text-positiveColor font-light text-[12px] tracking-wider">29% Positive</div>
                </div>
            </div>
        </div>
    )
}

export default ProfileSummary