import React from 'react'
import { FeaturedGames, LeftSection, Layout } from '../components/Layout'
import { Tournaments } from '../components/Tournaments'
import { getSession } from "next-auth/client";
import {  tourn_state } from '../types'

function tournament({tournament}) {
    const tournObjc = []
    const trnState = new Set()
    tournament && tournament.forEach((value, idx) => {
        const newObj = {}
        let tournKey = tourn_state[value.idState]
        if (trnState.has(tournKey)) {
            tournObjc.forEach((value_) => {
                if (value_["trnState"] === tournKey && value_["trnState"] !== undefined) {
                    value_["tournaments"].push(value)
                }
            })
        } else {
            trnState.add(tournKey)
            newObj["trnState"] = tournKey
            newObj["tournaments"] = [value]
            tournObjc.push(newObj)
        }
    })

    return (
        <Layout title="Tournament">
            <div className="grid grid-cols-4 w-full py-4 gap-x-5">
                <LeftSection pageMarker="/pagemarkers/tournament.svg"/>
                <Tournaments tournaments={tournObjc}/>
                <FeaturedGames />
            </div>
        </Layout>
    )
}

export default tournament

export async function getServerSideProps() {
    const session = await getSession();
    const token = session && session.accessToken
    const tournaments = await fetch(`${process.env.BASE_API_URL}/Tournament/GetList`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
        }
    ).then(res => res.json());

    const data = tournaments[0].iInfo
    const info = JSON.parse(data)

    return {
        props: {
            tournament: info
        },
    };
}