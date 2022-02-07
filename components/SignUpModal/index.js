import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import styles from "./SignUpModal.module.css";
import { XCircleIcon } from "@heroicons/react/outline";
import LuxInputBox from "../LuxInputBox";

export default function SignUpModal({openSignUpModal, setOpenSignUpModal, innerRef}) {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const register =  async () => {
    const res = await fetch(`${process.env.BASE_API_URL}/User/Register`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        accept: "*/*",
        "Access-Control-Allow-Origin": "*",
        "userName": username,
        "email": email,
        "password": password
      },
    }).then(response => response.json())
    .then (res => {
      if(res.d) {
        const info = JSON.parse(res.d)
        const user = info[0].iInfo
      }
    })
    .catch(err => {
      console.log('Error', err);
    })
    if(res.status === 200) {
      setOpenSignUpModal(false);
      
    }
     
  }



  return (
    <Transition.Root show={openSignUpModal} as={Fragment}>
      <Dialog
        as="div"
        className={styles.dialog}
        initialFocus={innerRef}
        onClose={setOpenSignUpModal}
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
              <div className="w-full flex justify-end px-4 pt-2">
                <XCircleIcon
                  className="text-gray-200 h-6 cursor-pointer"
                  onClick={() => setOpenSignUpModal()}
                  ref={innerRef}
                />
              </div>

              <form className="bg-primary px-4 pt-5 pb-4 sm:p-6 sm:pb-4 flex flex-col space-y-3 items-center"
              onSubmit={register}>

                <h2>
                  <span className="w-full text-center text-lg text-gray-300">
                    Create your account
                  </span>
                </h2>
                
                <LuxInputBox placeholder="Enter your email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <LuxInputBox placeholder="Enter your username" type="text" value={username} onChange={(e) => setUsername(e.target.value)}/>
                <LuxInputBox placeholder="Enter your password" type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>

                <div className=" px-4 py-3 w-full flex items-center justify-center">
                  <button
                    type="submit"
                    className={styles.loginButton}
                  >
                    Create Account
                  </button>
                </div>
              </form>
              <p className="text-sm text-gray-400 -mt-4 text-center">
                Already have an account? <span className="text-lightBrown">Sign in</span>
              </p>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
