import React from "react";
import { useRouter } from "next/dist/client/router";
import { getSession } from "next-auth/client";
import { Layout, Tournaments, } from "../../components/Admin";
import {
  FeaturedGames,
  CenterSection,
  LeftSection,
  LatestGiveAway
} from "../../components/Layout";
import {  TournamentState } from '../../types'
import axios from "axios";

function index({ tournament, giveaway }) {
  return (
    <Layout>
      <main className="grid grid-cols-4 gap-x-5">
        <LeftSection pageMarker="/pagemarkers/tournament.svg">
          <LatestGiveAway giveaway={giveaway}/>
        </LeftSection>
        <TournamentSection tournament={tournament} />
        <FeaturedGames />
      </main>
    </Layout>
  );
}

const TournamentSection = ({ tournament }) => {
  const tournObjc = []
    const trnState = new Set()
    tournament && tournament.forEach((value, idx) => {
        const newObj = {}
        let tournKey = TournamentState[value.idState]
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
  const router = useRouter();
  const newTournament = () => {
    router.push("/admin/createtournament");
  };
  const newGiveaway = () => {
    router.push("/admin/newgiveaway");
  };

  return (
    <CenterSection>
      <div className="flex flex-col space-y-3 p-4 overflow-scroll scrollbar-hide">
        <div className="flex space-x-3">
          <div
            className="bg-tournamentAdminBtn border-[1px] border-forumBorderColor
              p-6 cursor-pointer shadow-forumBox w-40 rounded-br-2xl text-white"
            onClick={newTournament}
          >
            <h2 className="text-white text-left text-xs font-medium">
              Create New
            </h2>
            <h2 className="text-white text-left text-xs font-medium">
              Tournament
            </h2>
          </div>
          <div
            className="bg-tournamentAdminBtn border-[1px] border-forumBorderColor
              p-6 cursor-pointer shadow-forumBox w-40 rounded-br-2xl text-white"
            onClick={newGiveaway}
          >
            <h2 className="text-white text-left text-xs font-medium">
              Create New
            </h2>
            <h2 className="text-white text-left text-xs font-medium">
              Giveaway
            </h2>
          </div>
        </div>

        <img className="w-full" src="/longlinebreaker.svg" />
        <Tournaments tournaments={tournObjc}/>
      </div>
    </CenterSection>
  );
};

export default index;

export async function getServerSideProps() {
  const session = await getSession();
  const token = session && session.accessToken;


  const tournaments = await fetch(
    `${process.env.BASE_API_URL}/Tournament/GetList`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  ).then((res) => res.json());

  const LatestGA = await axios.get(
    `${process.env.BASE_API_URL}/Giveaway/GetLatest`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      }
    })



  const data = tournaments[0].iInfo;
  const info = JSON.parse(data);

  return {
    props: {
      tournament: info,
      giveaway: LatestGA.data
    },
  };
}
