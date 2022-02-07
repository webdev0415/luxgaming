import React from "react";
import Head from "next/head";
import { Header } from ".";

import { useEffect } from "react";
import { useSession } from "next-auth/client";
import { useRouter } from "next/dist/client/router";

function Layout({ children}) {
  const [session, loading] = useSession();
  const [content, setContent] = React.useState(null);

  const router = useRouter();


    useEffect(()=>{
      const fetchData = async () => {
        const res = await fetch('/api/protected')
        const json = await res.json()
        if (json.content) { setContent(json.content) }
      }
      fetchData()
    },[session])

    useEffect(() => {
      if (!loading && !session?.accessToken) {
        router.push('/admin/login')
      }
    }, [loading, session])
  
    if (typeof window !== 'undefined' && loading) return null
  
    if (!session) { return  <div className="flex items-center justify-center text-4xl text-gray-900">You need to be signed in.</div>}
  
    if (session.role !== 91) { return <div className="flex items-center justify-center text-4xl text-gray-900">Access denied.</div> }

    

  return (
    <div className="flex flex-col items-center min-h-screen bg-map w-full ">
      <Head>
        <title>Luxury Gaming</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

     <Header/>      
      <main className="flex items-center justify-center p-6 w-full ">
        {children}
      </main>
    </div>
  );
}

export default Layout;