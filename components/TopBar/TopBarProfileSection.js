import React, { useRef } from "react";
import { Fragment, useState } from "react";

import { useSession, signOut } from "next-auth/client";
import { useRouter } from "next/dist/client/router";
import { Menu, Transition } from "@headlessui/react";
import Image from "next/image";

import LogInModal from "../LogInModal";
import SignUpModal from "../SignUpModal";

import styles from "./TopBarProfileSection.module.css";


function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function TopBarProfileSection() {
  const [open, setOpen] = useState(false);
  const [openSignUp, setOpenSignupModal] = useState(false);
  const cancelButtonRef = useRef(null);
  const signUpCancelButtonRef = useRef(null);

  const router = useRouter();
  const [session] = useSession();

  const openModal = () => {
    setOpen(!open);
  };

  const openSignUpModal = () => {
    setOpenSignupModal(!openSignUp);
  };

  return (
    <Menu as="div" className={styles.menu}>
      <div>
        <Menu.Button className="w-full">
          {!session ? <NotLoggedIn/> : <Profile />}
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className={styles.menuItems}>
          <div className="py-1">
            {session && (
              <>
            <Menu.Item>
              {({ active }) => (
                <a
                  className={classNames(
                    active ? "bg-secondary text-gray-300" : "text-gray-200",
                    "block px-4 py-2 text-sm"
                  )}
                  onClick={(_) => profile(router)}
                >
                  Profile
                </a>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <a
                  href="#"
                  className={classNames(
                    active ? "bg-secondary text-gray-300" : "text-gray-200",
                    "block px-4 py-2 text-sm"
                  )}
                >
                  Support
                </a>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <a
                  href="#"
                  className={classNames(
                    active ? "bg-secondary text-gray-300" : "text-gray-200",
                    "block px-4 py-2 text-sm"
                  )}
                  onClick={() => signOut()}
                >
                  Log out
                </a>
              )}
            </Menu.Item>
            </>
            )}
            {!session && (
              <>
               <Menu.Item>
              {({ active }) => (
                <a
                  href="#"
                  className={classNames(
                    active ? "bg-secondary text-gray-300" : "text-gray-200",
                    "block px-4 py-2 text-sm"
                  )}
                  onClick={() => openModal()}
                >
                  Login
                </a>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <a
                  href="#"
                  className={classNames(
                    active ? "bg-secondary text-gray-300" : "text-gray-200",
                    "block px-4 py-2 text-sm"
                  )}
                  onClick={() => openSignUpModal()}
                >
                  Signup
                </a>
              )}
            </Menu.Item>
              </>
            )}
           
          </div>
        </Menu.Items>
      </Transition>
      <LogInModal
        openModal={open}
        setOpenModal={openModal}
        innerRef={cancelButtonRef}
      />
      <SignUpModal
        openSignUpModal={openSignUp}
        setOpenSignUpModal={openSignUpModal}
        innerRef={signUpCancelButtonRef}
      />
    </Menu>
  );
}

const profile = (router) => {
  router.push("/profile");
};

const Profile = () => {
  return (
    <div className="w-full max-w-sm text-white">
      <div className="flex items-center justify-end w-full pr-4 space-x-2 xl:space-x-0">
        <div className="w-[90px] -mr-1 hidden xl:inline-block">
          <img src="/navbar/leftnav.svg" />
          <p className="text-xs z-50 -mt-5">300</p>
        </div>
        <Avatar src="/profilePic.svg" />
        <div className="w-2/4 -ml-4 hidden xl:inline-block">
          <img src="/navbar/rightnavbox.svg" />
          <p className="text-xs z-50 -mt-5">ThisGuyRightHere</p>
        </div>

        <div className="flex flex-col py-2 xl:hidden">
          <h4 className="text-xs">ThisGuyRightHere</h4>
          <p className="text-xs">300</p>
        </div>
      </div>
    </div>
  );
};

const NotLoggedIn = () => {
  return (
    <div className="w-full max-w-sm text-white text-base font-semibold cursor-pointer flex items-center justify-center py-2" >
      <button className="bg-luxYellow py-1 px-2 rounded-lg">
      Login / Signup
      </button>
      </div>
  )}

const Avatar = ({ src }) => {
  return (
    <div
      className="bg-profile-blue-hexagon bg-cover w-14 h-16 
     bg-no-repeat flex items-center justify-center"
    >
      <Image src={src} objectFit="cover" width={32} height={40} />
    </div>
  );
};
