import React, {useEffect} from "react";
import Head from "next/head";
import TopBar from "../TopBar/TopBar";
import {useSession} from "next-auth/client";
import { useRouter } from 'next/dist/client/router';

function Layout({ children, title }) {
  const [session, loading] = useSession();

  const router = useRouter();

  useEffect(() => {
    if (!loading && !session?.accessToken) {
      router.push('/')
    }
  }, [loading, session])


  return (
    <div className="flex flex-col items-center min-h-screen bg-map w-full">
      <Head>
        <title>Luxury Gaming</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <TopBar title={title}/>
      <main className="flex items-center justify-center lg:p-6">
        {children}
      </main>
    </div>
  );
}

export default Layout;
