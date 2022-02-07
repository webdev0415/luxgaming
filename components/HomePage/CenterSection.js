import React from "react";
import Image from "next/image";
import { useRouter } from "next/dist/client/router";

const CenterSection = () => {
  return (
    <main className="relative col-span-2 flex flex-col md:px-6 items-center space-y-4 ">
      <Nav />
      <MapMarkers />
    </main>
  );
};

export default CenterSection;

const Nav = () => {
  return (
    <nav className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-xl">
      <ul className="flex space-x-3">
        <NavItem src="/navIcons/home.svg" link="/" />
        <NavItem src="/navIcons/tournament.svg" link="/tournaments" />
        <NavItem src="/navIcons/leaderboard.svg" link="/" />
        <NavItem src="/navIcons/bar.svg" link="/forum" />
        <NavItem src="/navIcons/diamond.svg" link="/shop" />
        <NavItem src="/navIcons/faq.svg" link="/faq" />
      </ul>
    </nav>
  );
};

const NavItem = ({ src, link }) => {
  const router = useRouter();
  const navigateTo = () => {
    router.push(link);
  };
  return (
    <li
      className="md:h-32 w-32 cursor-pointer bg-box-button first:bg-box-slanted-left hover:first:bg-box-slanted-left-hover
        hover:last:bg-box-slanted-right-hover last:bg-box-slanted-right hover:bg-box-button-hover  
        bg-contain  bg-no-repeat flex py-1 justify-center"
      onClick={navigateTo}
    >
      <div className="relative h-6 w-8 md:h-10 md:w-12">
        <Image src={src} layout="fill" />
      </div>
    </li>
  );
};



const MapMarkers = () => {
  return (
    <div className="hidden lg:flex flex-col w-full space-y-3">
      <div className="flex justify-between w-full">
        <Marker src="/mapMarkers/barmarker.svg" link="/" />
        <Marker src="/mapMarkers/diamondmarker.svg" link="/" />
      </div>
      <div className="flex items-center justify-center">
        <Marker src="/mapMarkers/leaderboardmarker.svg" link="/" />
      </div>
      <div className="flex items-center justify-end">
      <Marker src="/mapMarkers/tournamentmarker.svg" link="/" />
      </div>
    </div>
  );
};

const Marker = ({link, src}) => {
  const router = useRouter();
  const goTo = () => {
    router.push(link);
  }

  return (
    <div className="relative h-40 w-40 hover:scale-125 transform 
    transition duration-75 ease-out" onClick={() => goTo}>
      <Image src={src} layout="fill" />
    </div>
  );
};
