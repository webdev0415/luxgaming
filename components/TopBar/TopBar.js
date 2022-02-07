import React from "react";
import Image from "next/image";

import TopBarProfileSection from "./TopBarProfileSection";

function TopBar({title}) {


  return (
    <div className="w-full bg-navbar sticky top-0 z-50">
      <NavCenter />
      <header className="grid grid-cols-4 text-white z-50 gap-x-10 h-12 xl:h-14 text-center w-full" >

      <SoundControl />

      <div className="flex items-center z-50 justify-center col-span-2">
      <h2 className="text-white text-2xl font-bold text-center">{title}</h2>
      </div>
      <TopBarProfileSection />
    </header>

    </div>
  
  );
}

export default TopBar;


const NavCenter = () => {
  return <div className="w-full flex items-center flex-col">
        <img src="/navbar/navbarlarge.svg" className="max-w-md w-full  lg:max-w-xl xl:max-w-3xl absolute top-0"/>
        <img src="/navbar/navbarsmall.svg" className="max-w-sm w-full  lg:max-w-md xl:max-w-lg absolute top-0"/>
  </div>;
};

const SoundControl = () => {
  return (
    <div className="relative h-5 w-5">
      <Image src="/soundcontrol.svg" layout="fill" />
    </div>
  );
};

