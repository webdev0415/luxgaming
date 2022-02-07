import { useRouter } from "next/dist/client/router";
import Image from "next/image";
import { useSession } from "next-auth/client";

export const Nav = () => {
  const [session] = useSession();
  const role = session && session.roles;
  const isAdmin = role === "91";
  
    return (
      <nav className="w-full max-w-sm ">
        <ul className="flex space-x-1">
          <NavItem src="/navIcons/home.svg" link={isAdmin ? "/admin" : "/"}  />
          <NavItem src="/navIcons/tournament.svg" link={isAdmin ? "/admin" : "/tournaments"} />
          <NavItem src="/navIcons/leaderboard.svg" link={isAdmin ? "/admin/leaderboard" : "/leaderboard"}  />
          <NavItem src="/navIcons/bar.svg" link="/forum" />
          <NavItem src="/navIcons/diamond.svg" link={isAdmin ? "/admin/shop" : "/shop"} />
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
        className="h-36 w-36 cursor-pointer bg-box-button first:bg-box-slanted-left hover:first:bg-box-slanted-left-hover
          hover:last:bg-box-slanted-right-hover last:bg-box-slanted-right hover:bg-box-button-hover pt-2 md:pt-[2px] bg-contain  bg-no-repeat flex  justify-center"
        onClick={navigateTo}
      >
        <div className="relative h-6 w-6 ">
          <Image src={src} layout="fill" />
        </div>
      </li>
    );
  };