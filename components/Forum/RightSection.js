import React from "react";
import { ArrowRightIcon } from "@heroicons/react/outline";

export const RightSection = () => {
  return (
    <div className="bg-forumSection p-4 rounded-lg h-full flex flex-col space-y-4 w-full max-w-xl">
      <h2 className="text-white text-sm py-1 mb-3">Official Information</h2>

      <TopContainer />
      <h2 className="text-white text-sm py-1 mb-3">Hot topics</h2>
      <BottomContainer />
    </div>
  );
};

const TopContainer = () => {
  return (
    <div className="bg-forumNews px-2 py-5 flex flex-col space-y-3">
      <p className="flex space-x-2 items-center">
        <ArrowRightIcon className="text-white h-3 w-3" />
        <span className="text-white text-xs">Important News</span>
      </p>
      <p className="flex space-x-2 items-center">
        <ArrowRightIcon className="text-white h-3 w-3" />
        <span className="text-white text-xs">More Important News</span>
      </p>
      <p className="flex space-x-2 items-center">
        <ArrowRightIcon className="text-white h-3 w-3" />
        <span className="text-white text-xs">Even More Important News</span>
      </p>
    </div>
  );
};

const BottomContainer = () => {
  return (
    <div className="bg-forumNews rounded-br-2xl p-4 [h-90%] flex flex-col space-y-3 text-white text-xs font-light">
      <p>#Hashtag 1</p>
      <p>#Hashtag 2</p>
      <p>#Hashtag 3</p>
    </div>
  );
};
