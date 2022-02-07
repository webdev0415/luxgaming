import React from "react";
import { Avatar } from "../Avatar";

export const CenterSection = () => {
  return (
    <div className="lg:col-span-2 bg-forumSection rounded-lg h-full text-white p-4 flex">
      <div className="w-1/3">
        <SideBar />
      </div>
      <PostsContainer />
    </div>
  );
};

const SideBar = () => {
  return (
    <div className="hidden lg:flex flex-col space-y-2">
      <SideBarItems title="General" />
      <SideBarItems title="General" />
      <SideBarItems title="General" />
      <SideBarItems title="General" />
      <SideBarItems title="General" />
    </div>
  );
};

const SideBarItems = ({ title }) => {
  return (
    <div
      className="border-forumSection bg-forumBox rounded-br-3xl border-[1px] h-28 w-32 flex items-center justify-center
        cursor-pointer shadow-forumBox"
    >
      {title}
    </div>
  );
};

const PostsContainer = () => {
  return (
    <div className="flex flex-col ">
      <TopSection />
      <div className="flex flex-col space-y-3 overflow-scroll scrollbar-hide">
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
      </div>
    </div>
  );
};

const Post = ({children}) => {
  return (
    <div className="bg-forumBox p-3 flex flex-col">
      <div className="flex space-x-4">
        <Avatar src="/profilePic.svg" />
        <div className="flex flex-col justify-center">
          <div className="font-bold text-sm">Player Name</div>
          <div className="text-[10px]">Player Name</div>
        </div>
      </div>

      <div className="p-2">
        {children}
      </div>
    </div>
  );
};

const TopSection = () => {
  return (
    <div className="flex max-w-sm lg:max-w-lg space-x-5 items-start w-full text-xs md:text-sm text-white font-semibold text-center">
      <TopSectionItems>
        <h3 className="">Post</h3>
      </TopSectionItems>
      <TopSectionItems>
        <div className="flex items-center w-full space-x-5">
          <img src="/dropdown.svg" className="h-3 w-3 ml-2" />
          <h3>New Posts</h3>
        </div>
      </TopSectionItems>
      <TopSectionItems>
        <div className="flex justify-end items-center px-4 pt-1">
          <img src="/search.svg" className="h-3 w-3" />
        </div>
      </TopSectionItems>
    </div>
  );
};

const TopSectionItems = ({ children }) => {
  return (
    <div className="bg-long-button w-40 h-10 bg-no-repeat bg-contain">
      {children}
    </div>
  );
};
