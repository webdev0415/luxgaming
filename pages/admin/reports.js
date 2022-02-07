import React from 'react'
import { Layout } from "../../components/Admin";
import { CenterSection, LeftSection } from '../../components/Layout';

function reports() {
    return (
        <Layout>
            <main className="grid grid-cols-3 p-4">

            <LeftSection pageMarker="/pagemarkers/tournament.svg"/>
            <Reports/>
            </main>

        </Layout>
    )
}

export default reports

const Reports = () => {
    return (
    <CenterSection>
        <main className="text-white">

        </main>
    </CenterSection>
    )
}
