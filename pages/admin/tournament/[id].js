import React, { useState, useRef, useEffect } from "react";
import { useSession, getSession } from "next-auth/client";
import router from "next/router";
import { DocumentReportIcon, GiftIcon } from "@heroicons/react/solid";
import axios from "axios";

import {
  LeftSection,
  CenterSection,
  FeaturedGames,
} from "../../../components/Layout";
import { DuelActionCard, RoundTabs, TrnInfoTable } from "../../../components/Tournaments";
import { Layout, ReportsTabs,UpdateTournament, CreatePrizeModal } from "../../../components/Admin";


function index({ tournament }) {
  const [session] = useSession();
  const token = session && session.accessToken;
  let tourns = [];
  let rounds = [];
  let players = []

  tournament.forEach((value) => {
    if (value.iType === 111) {
      tourns = JSON.parse(value.iInfo);
    }

    if (value.iType === 121 && value.iInfo.length > 0) {
      rounds = JSON.parse(value.iInfo);
    }

    if (value?.iType === 131 && value.iInfo.length > 0) {
       players = JSON.parse(value.iInfo)
    }
  });

  const roundId = rounds && rounds[0]?.idRound;

 

  return (
    <Layout>
      <div>
        <div className="grid grid-cols-4 gap-x-5">
          <LeftSection pageMarker="/pagemarkers/tournament.svg">
            <DuelActionCard
              tournament={tourns[0]}
              tournamentId={tourns[0].id}
              roundId={roundId}
              destUsername={tourns}
              userInfo={tourns}
            />
          </LeftSection>
          <TournamentDetails
            tournaments={tourns}
            rounds={rounds}
            token={token}
            tournId={tourns}
            players={players}
            tournament={tournament}
            />
          <FeaturedGames />
        </div>
      </div>
    </Layout>
  );
}

const createTournamentRound = async (idTournament, token, setErrorMsg, setSuccessMsg) => {
  try {
    const round = await axios.get(
      `${process.env.BASE_API_URL}/Tournament/RoundCreate`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          idTournament: parseInt(idTournament),
        },
      }
    );
    if (round.status === 200) {
      setTimeout(() => {
        setSuccessMsg("Round has been created successfully!");
      }, 5000);
      router.replace(router.asPath);
    }
  } catch (err) {
    setErrorMsg(`Error: ${err?.response?.data}`);
  }
};

export default index;

const TournamentDetails = ({ tournaments, rounds, token, tournId, players, tournament}) => {
  const [open, setOpen] = useState(false);
  const cancelButtonRef = useRef(null);

  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const [openTab, setOpenTab] = useState(1);

  const openModal = () => {
    setOpen(!open);
  };

  const tournamentAction = async (action) => {
    try {
      const trnAction = await axios.get(
        `${process.env.BASE_API_URL}/Tournament/${action}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            idTournament: tournaments[0].id,
          },
        }
      );
      if (trnAction.status === 200) {
        setSuccessMsg("Action successfull!");
        router.replace(router.asPath);
      }
    } catch (err) {
      if (err.response?.data) {
        setErrorMsg(`Error: ${err?.response?.data}`);
      }
    }
  };


  return (
    <CenterSection>
      {successMsg ? (
        <div className="bg-green-500 text-white p-2 rounded">{successMsg}</div>
      ) : null}
      {errorMsg ? (
        <div className="bg-red-500 text-white p-2 rounded"> {errorMsg}</div>
      ) : null}
      <div className="flex flex-col w-full text-white space-y-3">
        <div className="border-[1px] border-forumBorderColor">
          <div
            className=" bg-gradient-to-r from-tournamentDetailsHeader to-transparent 
                      p-2 flex items-center justify-between"
          >
            <h1 className="text-base font-medium capitalize">
              {tournaments[0].title}
            </h1>
            <div className="flex space-x-3">
              <button
                className="flex relative cursor-pointer h-8"
                onClick={() => openModal()}
              >
                <GiftIcon className="w-8 h-8" />
              </button>
              <button
                className="flex relative cursor-pointer h-8"
                onClick={(e) => {
                  e.preventDefault();
                  setOpenTab(2);
                }}
              >
                <DocumentReportIcon className="w-8 h-8" />
              </button>

              <button
                className="flex relative cursor-pointer h-8"
                onClick={() => tournamentAction("Delete")}
              >
                <img src="/tournament/deleteIcon.svg" />
              </button>
            </div>
          </div>

          {/* Admin  Action Buttons */}
          <div className="flex text-[10px] py-4 gap-2 px-2 overflow-scroll scrollbar-hide">
            <button
              className="rounded-md border border-green-500 shadow-sm px-10 py-2 bg-green-600 text-base 
               font-medium text-white focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-xs"
              onClick={(e) => {
                e.preventDefault();
                setOpenTab(1);
              }}
            >
              Overview
            </button>
            

            {tournaments[0].idState < 31 && (
              <button
                className="rounded-md border border-forumBorderColor shadow-sm px-10 py-2 bg-primary text-base 
            font-medium text-white focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-xs"
                onClick={(e) => {e.preventDefault();
                setOpenTab(4)}}
              >
                Update Tournament
              </button>
            )}

            {tournaments[0].idState < 21 && (
              <button
                className="rounded-md border border-forumBorderColor shadow-sm px-10 py-2 bg-forumBorderColor text-base 
            font-medium text-white focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-xs"
                onClick={() => tournamentAction("MakeAvailable")}
              >
                Make Available
              </button>
            )}

            {tournaments[0].idState < 31 && (
              <button
                className="rounded-md border border-forumBorderColor shadow-sm px-10 py-2 bg-forumBorderColor text-base 
            font-medium text-white focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-xs"
                onClick={() => tournamentAction("Start")} >
                Start Tournament
              </button>
            )}

            {tournaments[0].idState >= 31 && (
              <button
              className="rounded-md border border-green-500 shadow-sm px-10 py-2 bg-green-600 text-base 
               font-medium text-white focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-xs"
              onClick={(e) => {
                e.preventDefault();
                setOpenTab(3);
              }}
            >
              Standings
            </button>
            )}

            <button
              className="rounded-md border border-gray-500 shadow-sm px-10 py-2 bg-gray-500 text-base 
              font-medium text-white focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-xs"
              onClick={() => tournamentAction("Archive")} >
              Archive
            </button>
          </div>
          {/* End of Action Buttons */}

        </div>

        <img src="/longlinebreaker.svg" />
        <TournamentDetailsHeader />

        {/* Tabs Reports & Overview */}
        <div className={ openTab === 1 ? "flex flex-row p-2 space-x-3 w-full" : "hidden" } >
          <SideBar
            rounds={rounds}
            idTournament={tournaments[0].id}
            token={token}
            setErrorMsg={setErrorMsg}
            setSuccessMsg={setSuccessMsg}
          />
        </div>
        <div className={ openTab === 2 ? "flex flex-row p-2 space-x-3 w-full" : "hidden"} >
          <ReportsTabs tournId={tournId} />
        </div>
         
         <div className={ openTab === 3 ? "flex flex-col p-2 space-x-3 w-full" : "hidden"} >
              <TrnInfoTable players={players}/>
         </div>
         <div className={ openTab === 4 ? "flex flex-col p-2 space-x-3 w-full" : "hidden"} >
              <UpdateTournament tournament={tournament}/>
         </div>
         {/* End of Tabs Reports & Overview */}
      </div>
      {/* Prize Modal */}
      <CreatePrizeModal
        openModal={open}
        setOpenModal={openModal}
        innerRef={cancelButtonRef}
        tournament={tournaments}
      />
    </CenterSection>
  );
};

const SideBar = ({ rounds, idTournament, token, setErrorMsg, setSuccessMsg }) => {
  return (
    <div className="hidden lg:flex flex-col space-y-2">
      <CreateTournamentButton
        title="New Round"
        idTournament={idTournament}
        token={token}
        setErrorMsg={setErrorMsg}
        setSuccessMsg={setSuccessMsg}
      />
      <RoundTabs rounds={rounds} />
    </div>
  );
};

const CreateTournamentButton = ({
  title,
  idTournament,
  token,
  setErrorMsg,
  setSuccessMsg
}) => {
  return (
    <div
      className="border-forumSection bg-forumBox rounded-br-3xl border-[1px] h-[6.2rem] w-28 flex 
                   items-center justify-center cursor-pointer shadow-forumBox text-center text-sm"
      onClick={() => createTournamentRound(idTournament, token, setErrorMsg, setSuccessMsg)}
    >
      {title}
    </div>
  );
};

const TournamentDetailsHeader = () => {
  return (
    <div className="flex w-full text-white space-y-3 bg-downloadBar p-2 justify-end space-x-3 items-center">
      <div className="border-[1px] border-forumBorderColor w-1/3">
        <div className="flex p-1">
          <input
            type="text"
            className="outline-none bg-transparent px-2 text-xs"
          />
          <img src="/search.svg" className="h-4 pt-1" />
        </div>
      </div>
      <img src="/tournament/download.svg" className="h-4" />
      <img src="/tournament/column.svg" className="h-4" />
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
    revalidate: 10,
  };
}
