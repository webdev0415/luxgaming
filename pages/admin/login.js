import React, { useState } from "react";
import { signIn } from "next-auth/client";
import { useRouter } from "next/dist/client/router";

import LuxInputBox from "../../components/LuxInputBox";

function login() {
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const onLoginSubmit = async (e) => {
    e.preventDefault();
    const res = await signIn('credentials',
      {
        username,
        password,
        callbackUrl: `${window.location.origin}`,
        redirect: false,
      }
    )
    if(res.status === 200 && res.error === null) {
      setTimeout(() => {
        setSuccessMsg("Login Successful");
      }, 2000);
      router.push('/admin')
    } else {
      setErrorMsg(res.error)
    }
  };


  return (
    <div className="flex flex-col items-center min-h-screen bg-map bg-no-repeat w-full ">
      <main className="flex items-center justify-center p-6 w-full">
    <form className="w-full flex flex-col items-center bg-primary  max-w-3xl mx-auto p-4 mt-14"
    onSubmit={onLoginSubmit}>
      {successMsg ? (<div className="text-white bg-green-500 p-2 rounded">{successMsg}</div> ): null}
      {errorMsg ? (<div className="text-white bg-red-500 p-2 rounded">{errorMsg}</div> ): null}
      <div className="space-y-6 text-white w-full text-center p-6">
          <h2 className="text-2xl font-medium">Enter your details to Login</h2>
        <label className="flex flex-col space-y-2 w-full text-left">
          <p>Username</p>
          <LuxInputBox
            placeholder="Enter Your Username"
            type="text"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            required
          />
        </label>

        <label className="flex flex-col space-y-2 text-left">
          <p>Password</p>
          <LuxInputBox
            placeholder="Enter Your Username"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          />
        </label>

        <div className="px-4 py-3 w-full flex items-center justify-center">
          <button
            type="submit"
            className="rounded-md border border-yellow shadow-sm px-12 py-2 bg-luxYellow text-base 
    font-medium text-gray-700 focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
          >
            Login
          </button>
        </div>
      </div>
      </form>
      </main>
    </div>
  );
}

export default login;
