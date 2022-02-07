import React from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/client";

export const Header = () => {
  const [session, loading] = useSession();

  return (
    <header className="sticky  top-0 z-50 p-4 grid grid-cols-3 shadow-md md:px-10 w-full bg-navbar">
      <div className="text-white text-xl font-mono">Lux Gaming</div>

        {!loading && session ? (
          <>
            <div className="flex space-x-3 items-center justify-center flex-1">
              <NavLink link="/admin/" title="Overview" />
              <NavLink link="/admin/giveaways" title="GiveAways" />
              <NavLink link="/leaderboard" title="Leaderboard" />
              <NavLink link="/admin/shop" title="Shop" />
              <NavLink link="/admin/settings" title="Settings" />
            </div>
            <div className="col-end-7">
            <div onClick={signOut}>
              <a className="text-white text-sm font-medium cursor-pointer">
                Logout
              </a>
            </div>

            </div>
            
          </>
        ) : (
          <div className="col-end-7">
              <Link href="/admin/login">
            <a className="text-white text-sm font-medium cursor-pointer">
              Login
            </a>
          </Link>
          </div>
        
        )}
    </header>
  );
};

const NavLink = ({ title, isActive, link }) => {
  return (
    <Link href={link} className="cursor-pointer">
      <span
        className={` text-white text-sm font-medium cursor-pointer border-b-2 hover:border-b-2 active:border-b-2 active:border-borderColor 
        hover:border-borderColor bg-no-repeat bg-cover 
        ${isActive ? "border-borderColor" : "border-[transparent]"}`}
      >
        {title}
      </span>
    </Link>
  );
};
