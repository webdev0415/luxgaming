import { Fragment, useState, useEffect } from "react";
import { useRouter } from "next/dist/client/router";
import { signIn, getCsrfToken } from "next-auth/client";

import { Dialog, Transition } from "@headlessui/react";
import styles from "./LogInModal.module.css";
import LuxInputBox from "../LuxInputBox";
import { XCircleIcon } from "@heroicons/react/outline";

export default function LogInModal({
  openModal,
  setOpenModal,
  csrfToken,
  innerRef,
}) {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const onLoginSubmit = async (e) => {
    e.preventDefault();
    const res = await signIn("credentials", {
      username,
      password,
      callbackUrl: `${window.location.origin}`,
      redirect: false,
    });
    if (res.error === null) {
      setTimeout(() => {
        setSuccessMsg("Login Successfull!");
      }, 3000);
      setOpenModal(false);
      router.push("/");
    } else {
      setTimeout(() => {
        setErrorMsg("Incorrect username or password!");
      }, 3000);
    
    }
  };

  return (
    <Transition.Root show={openModal} as={Fragment}>
      <Dialog
        as="div"
        className={styles.dialog}
        initialFocus={innerRef}
        onClose={setOpenModal}
      >
        <div className={styles.transition}>
          <Transition.Child
            as={Fragment}
            enter={styles.transitionEnter}
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave={styles.transitionLeave}
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className={styles.dialogOverlay} />
          </Transition.Child>

          <span className={styles.centerWrapper} aria-hidden="true">
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter={styles.transitionEnter}
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave={styles.transitionLeave}
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className={styles.modal}>
              {successMsg ? (
                <div className="bg-green-500 text-white p-2 rounded">
                  {successMsg}
                </div>
              ) : null}
              {errorMsg ? (
                <div className="bg-red-500 text-white p-2 rounded">
                  {" "}
                  {errorMsg}
                </div>
              ) : null}
              <div className="w-full flex justify-end px-4 pt-2">
                <XCircleIcon
                  className="text-gray-200 h-6 cursor-pointer"
                  onClick={() => setOpenModal()}
                  ref={innerRef}
                />
              </div>

              <form
                className="bg-primary px-4 pt-5 pb-4 sm:p-6 sm:pb-4 flex flex-col space-y-3 items-center"
                onSubmit={onLoginSubmit}
              >
                <input
                  name="csrfToken"
                  type="hidden"
                  defaultValue={csrfToken}
                />

                <h2>
                  <span className="w-full text-center text-lg text-gray-300">
                    Log in to your account
                  </span>
                </h2>

                <LuxInputBox
                  placeholder="Enter your username/email"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <LuxInputBox
                  placeholder="Enter your password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                <div className="px-4 py-3 w-full flex items-center justify-center">
                  <button type="submit" className={styles.loginButton}>
                    Login
                  </button>
                </div>
              </form>

              <p className="text-sm text-gray-400 -mt-4 text-center">
                No Account? <span className="text-lightBrown">Sign up</span>
              </p>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

export async function getServerSideProps(context) {
  return {
    props: {
      csrfToken: await getCsrfToken(context),
    },
  };
}
