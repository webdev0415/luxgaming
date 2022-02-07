import React from 'react'
import { CenterSection, LeftSection, RightSection } from '../components/Forum';
import {Layout }from "../components/Layout";


function forum() {
    return (
        <Layout title="Forum">
            <main className="flex flex-col space-y-3 lg:grid lg:grid-cols-4 lg:gap-x-5 
             py-4 h-full items-center justify-center">
            <LeftSection/>
            <CenterSection/>
            <RightSection/>
            </main>
            
        </Layout>
    )
}

export default forum





