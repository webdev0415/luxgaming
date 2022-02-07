import React, {  useState } from "react";
import { useSession, getSession } from "next-auth/client";
import axios from "axios";

import {
  CenterSection,
  FeaturedGames,
  Layout,
  LeftSection,
} from "../../components/Layout";
import {  RoundTabs } from "../../components/Tournaments";

function index({ tournament }) {
  const [session] = useSession();
  const token = session && session.accessToken;
  let tourns = [];
  let rounds = [];
  let players = "";
  let player = [];
  let roundInfo = [];

  tournament.forEach((value) => {
    if (value.iType === 111) {
      tourns = JSON.parse(value.iInfo);
    }

    if (value.iType === 121 && value.iInfo.length > 0) {
      rounds = JSON.parse(value.iInfo);
    }
    if (value.iType === 113 && value.iInfo.length > 0) {
      players = value.iInfo;
      player = players.split(",");
    }
    if (value.iType === 131 && value.iInfo.length > 0) {
      roundInfo = JSON.parse(value.iInfo);
    }
  });


  return (
    <Layout>
      <div className="grid grid-cols-4 gap-x-5">
        <LeftSection pageMarker="/pagemarkers/tournament.svg"/>

        <TournamentDetails
          tournaments={tourns}
          rounds={rounds}
          token={token}
          roundInfo={roundInfo}
        />
        <FeaturedGames />
      </div>
    </Layout>
  );
}

export default index;

const TournamentDetails = ({ tournaments, rounds, token, roundInfo }) => {
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const tournamentAction = async (action) => {
    const trnAction = await axios
      .get(`${process.env.BASE_API_URL}/User/${action}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          idTournament: parseInt(tournaments[0].id),
        },
      })
      .catch((err) => {
        console.log(err);
      });
    if (trnAction && trnAction.status === 200) {
      setSuccessMsg("Tournament joined successfully");
    } else {
      setErrorMsg("Tournament not available to join");
    }
  };
  return (
    <CenterSection>
      {successMsg ? (
        <div className="bg-green-500 text-white p-2 rounded">{successMsg}</div>
      ) : null}
      {errorMsg ? (
        <div className="bg-red-500 text-white p-2 rounded">{errorMsg}</div>
      ) : null}
      <div className="flex flex-col w-full text-white space-y-3">
        <div className="border-[1px] border-forumBorderColor">
          <div
            className="bg-gradient-to-r from-tournamentDetailsHeader to-transparent 
                      p-2 flex items-center justify-between"
          >
            <h1 className="text-base font-medium capitalize">
              {tournaments[0].title}
            </h1>
          </div>
          <div className="flex flex-wrap text-[10px] p-2 gap-2 justify-between">
            <div className="flex flex-col space-y-2 text-sm text-white">
              <p>{tournaments[0].description}</p>
              {tournaments[0].cost > 0 ? (
                <div className="flex flex-col space-y-2 text-sm text-white">
                  <p>Entry Fee : ${tournaments[0].cost}</p>
                </div>
              ) : null}
            </div>

            {tournaments[0].idState === 21 &&  tournaments[0].cost > 0 && (
              <div className="flex space-x-2">
                <button
                  className="rounded-md border border-forumBorderColor shadow-sm px-12 py-2 bg-payPal text-base 
              font-medium text-white focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => tournamentAction("TournamentJoinFree")}
                >
                  Join via Paypal
                </button>
                <button
                  className="rounded-md border border-green-500 shadow-sm px-12 py-2 bg-green-600  text-base 
              font-medium text-white focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => tournamentAction("TournamentJoinViaLb")}
                >
                  Join via LB
                </button>
              </div>
            )}
            {tournaments[0].idState === 21 && tournaments[0].cost === 0 && (
              <button
                className="rounded-md border border-green-500 shadow-sm px-12 py-2 bg-green-600 text-base 
              font-medium text-white focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                onClick={() => tournamentAction("TournamentJoinFree")}
              >
                Join Tournament
              </button>
            )}
            {tournaments[0].idState === 31 && (
              <button
                className="rounded-md border border-red-700 shadow-sm px-12 py-2 bg-red-500 text-base 
          font-medium text-white focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                onClick={() => tournamentAction("TournamentLeave")}
              >
                Leave Tournament
              </button>
            )}
          </div>
        </div>

        <img src="/longlinebreaker.svg" />

        <div className="flex flex-col p-2 space-x-3 w-full">
          <div className="flex flex-col space-y-2 w-full">
            <TournamentDetailsHeader trn={tournaments} />
          </div>
          {/* <TrnInfoTable players={roundInfo} /> */}
          <RoundTabs rounds={rounds} tournament={tournaments[0]}/>
        </div>
      </div>
    </CenterSection>
  );
};


const TournamentDetailsHeader = ({ trn }) => {
  return (
    <div className="flex w-full bg-downloadBar justify-between">
      <div className="w-full flex items-center px-2 text-green-500 text-sm underline">
        {trn[0].idState === 31 && <h4>Tournament has started!</h4>}
        {trn[0].idState === 21 && <h4>Tournament is available to join!</h4>}
        {trn[0].idState === 41 && <h4>Tournament has ended!</h4>}
      </div>

      <div className="flex w-full text-white p-2 justify-end space-x-3 items-center">
        <div className="border-[1px] flex border-forumBorderColor p-1">
          <input
            type="text"
            className="outline-none bg-transparent px-2 text-xs"
          />
          <img src="/search.svg" className="h-4" />
        </div>
        <img src="/tournament/download.svg" className="h-4" />
        <img src="/tournament/column.svg" className="h-4" />
      </div>
    </div>
  );
};

export async function getStaticPaths() {
  const session = await getSession();
  const token = session && session.accessToken;
  const tournaments = await axios.get(
    `${process.env.BASE_API_URL}/Tournament/GetList`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const data = tournaments && tournaments.data[0].iInfo;
  const info = JSON.parse(data);
  const paths = info.map((value) => ({
    params: { id: `${value.id}` },
  }));

  return {
    paths,
    fallback: "blocking",
  };
}

export async function getStaticProps({ params }) {
  const session = await getSession();
  const token = session && session.accessToken;
  const { id } = params;
  const tournamentDetails = await axios.get(
    `${process.env.BASE_API_URL}/Tournament/Get?idTournament=${id}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );


  return {
    props: { tournament: tournamentDetails.data },
    revalidate: 1,
  };
}
