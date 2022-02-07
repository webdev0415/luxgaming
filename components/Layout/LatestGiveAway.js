import React from "react";
import Image from "next/image";
import { getLatestGiveway } from "../../lib/hooks";

export const LatestGiveAway = () => {
  const {data} = getLatestGiveway();
  const giveaway = []
 

  data?.forEach(e => {
    if(e.iType === 111 && e.iInfo.length > 0){
      giveaway = JSON.parse(e.iInfo)
    }
  })
  const endDate = new Date(giveaway[0]?.finishDate)
  const date = endDate.toDateString();

  
  return (
    <div className="flex relative space-x-3 bg-forumNews text-white py-2">
      <div className="relative w-40 h-44">
        <Image src="/bod.png" layout="fill" />
      </div>
      <div className="flex flex-col space-y-2">
        <h3 className="text-xl font-bold">{giveaway[0]?.title}</h3>
        <p className="text-sm">{giveaway[0]?.description}</p>
        <p className="text-xs">Ends In: {date}</p>

        <div className="flex text-white text-xs font-light absolute bottom-3 right-2">
          <div className="bg-tournament-action-right h-6 w-[10.4rem] bg-no-repeat bg-cover text-center ">
            <button className="pt-[3px]">Join GiveAway</button>
          </div>
        </div>
      </div>
    </div>
  );
};
