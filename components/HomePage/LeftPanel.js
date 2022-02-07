import React from "react";
import Image from "next/image";
import { TwitchEmbed } from "react-twitch-embed";

const LeftPanel = () => {
  return (
    <div
      className="flex flex-col bg-gradient-to-r from-secondary to-primary  text-white 
      w-full p-4 space-y-4 h-[90%]"
    >
      {/* Twitch */}
      <div>
        {/* <TwitchBox /> */}
        <div className="-mt-8 -ml-3">
          <ProfileImage />
        </div>
      </div>
      <div>
        <InfoWrapper title="Twitch Guy" />
      </div>
      <hr />

      {/* Upcoming events */}
      <div className="overflow-scroll scrollbar-hide">
        <h3 className="text-lg font-semibold">Upcoming Events</h3>
        <div className="flex flex-col space-y-3 ">
          <InfoWrapper title="Event 1" />
          <InfoWrapper title="Tournament" />
          <InfoWrapper title="Event 2" />
        </div>
      </div>
    </div>
  );
};

export default LeftPanel;

const TwitchBox = () => {
  return (
    <div className="">
      <TwitchEmbed
        channel="LuxuryGamingTv"
        id="LuxuryGamingTv"
        theme="dark"
        onVideoPause={() => console.log(":(")}
        withChat={false}
        width="100%"
        height="100%"
      />
    </div>
  );
};

const ProfileImage = () => {
  return (
    <div className="relative h-10 w-10 md:h-20 md:w-20 p-2">
      <Image src="/profilePic.svg" layout="fill" />
    </div>
  );
};

const InfoWrapper = ({ title, color }) => {
  return (
    <div className="flex bg-infoBox  rounded-br-xl border-[1px] border-borderColor text-white space-x-2">
      <div
        className={
          "flex flex-col flex-wrap space-y-2 text-center px-1 py-2  border-l-[10px] mr-2 border-" +
          color
        }
      >
        <h2 className="text-base font-semibold">{title}</h2>
        <p className="text-xs text-left font-light">
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
          nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
          sed diam voluptua.
        </p>
      </div>
    </div>
  );
};
