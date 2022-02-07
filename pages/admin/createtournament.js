import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/client";
import { useRouter } from "next/dist/client/router";

import axios from "axios";

import { Layout } from "../../components/Admin";
import { FeaturedGames, LeftSection } from "../../components/Layout";
import { DuelActionCard } from "../../components/Tournaments/DuelActionCard";
import LuxInputBox from "../../components/LuxInputBox";
import { TournamentAlgorithmType, TournamentPaymentType } from "../../types";

function createtournament() {

  return (
    <Layout>
      <main className="grid grid-cols-4 w-full gap-x-5">
        <LeftSection pageMarker="/pagemarkers/tournament.svg">
          <DuelActionCard />
        </LeftSection>
        <CreateTournament />
        <FeaturedGames />
      </main>
    </Layout>
  );

}

export default createtournament;

const CreateTournament = () => {
  const router = useRouter();

  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const trnId = 0;
  const [trnTitle, setTrnTitle] = useState("");
  const [trnDesc, setTrnDesc] = useState("");
  const [trnPrice, setTrnPrice] = useState(0);
  const [trnAlgoType, setTrnAlgoType] = useState(11);
  const [trnPaymentType, setTrnPaymentType] = useState(11);
  const [lstParticipants, setLstParticipants] = useState('');
  const [lstFreeWinCandidates, setLstFreeWinCandidates] = useState('');
  const [lstJudges, setLstJudges] = useState('');
  const [prfJson, setPrfJson] = useState('');


  const [session] = useSession();
  const token = session && session.accessToken ;


  const addOrUpdateTournament = async (e) => {
    e.preventDefault();
    const data = JSON.stringify({
      idTournament: trnId,
      idTournamentAlgorithmType: parseInt(trnAlgoType),
      idTournamentPaymentType: parseInt(trnPaymentType),
      trnTitle: trnTitle,
      trnDesc: trnDesc,
      trnCost: parseInt(trnPrice),
      lstParticipants: lstParticipants,
      lstFreeWinCandidate: lstFreeWinCandidates,
      lstJudges: lstJudges,
      prfJson: prfJson,
    })
     try{
    const res = await axios.post(`${process.env.BASE_API_URL}/Tournament/AddOrUpdate`, data, {
   
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'

        },
      })
      if(res.status === 200){
        setSuccessMsg("Tournament created successfully");
        router.push('/admin')
      }
    }catch(err){
      setErrorMsg( `Error: ${err.response?.data}`)} 
  };

  return (
    <div className="col-span-2 h-[90%] bg-primary flex flex-col p-4 space-y-4 rounded-sm">
      {successMsg ? (
        <div className="bg-green-500 text-white p-2 rounded">{successMsg}</div>
      ) : null}
      {errorMsg ? (
        <div className="bg-red-500 text-white p-2 rounded"> {errorMsg}</div>
      ) : null}
      <div
        className="bg-tournamentAdminBtn border-[1px] border-forumBorderColor
       p-6 cursor-pointer shadow-forumBox"
      >
        <h2 className="text-white text-left text-xs font-medium">Create New</h2>
        <h2 className="text-white text-left text-xs font-medium">Tournament</h2>
      </div>

      <img className="w-full" src="/longlinebreaker.svg" />

      <div>
        <form method="post" onSubmit={addOrUpdateTournament}>
          <div className="flex flex-col justify-between  space-y-3 w-full items-center p-4 mb-6">
            <label
              htmlFor="tournamentName"
              className="text-white text-left text-sm font-medium w-full"
            >
              Tournament Name
            </label>
            <LuxInputBox
              type="text"
              value={trnTitle}
              onChange={(e) => setTrnTitle(e.target.value)}
              required
            />

            <div className="flex flex-col space-y-1">
              <label
                htmlFor="tournamentTime"
                className="text-white text-left text-sm font-medium rounded-sm"
              >
                Description
              </label>
              <textarea
                name="trnDescription"
                id="trnDescription"
                cols="100"
                rows="3"
                value={trnDesc}
                onChange={(e) => setTrnDesc(e.target.value)}
                className="w-full bg-primary outline-none focus:bg-lxTopBar 
                text-gray-300 placeholder-gray-500 border-[1px] border-gray-400 rounded-lg p-4"
                required
              ></textarea>
            </div>

            <div className="grid grid-cols-2 w-full space-x-2 ">
              <div className="flex flex-col space-y-3">
                <label
                  htmlFor="tournamentType"
                  className="text-white text-left text-sm font-medium"
                >
                  Payment Type
                </label>
                <select
                  name="trnPrice"
                  id="trnPrice"
                  className="mt-1 p-2 block w-full border-gray-400 border-[1px] rounded-md shadow-sm 
                   focus:ring-opacity-50 bg-primary text-gray-300"
                  value={trnPaymentType}
                  onChange={(e) => setTrnPaymentType(e.target.value)}
                  required
                >
                  {TournamentPaymentType.map((option, index) => (
                    <option
                      key={index}
                      value={option.i}
                      onChange={() => setTrnPaymentType(e.target.value)}
                    >
                      {option.v}
                    </option>
                  ))}
                </select>

                {trnPaymentType === '21' && (
                  <div>
                    <label className="text-white text-left text-sm font-medium">
                      Entry Fee
                    </label>
                    <LuxInputBox
                      type="number"
                      value={trnPrice}
                      onChange={(e) => setTrnPrice(e.target.value)}
                    />
                  </div>
                )}
              </div>

              <div className="flex flex-col space-y-3">
                <label
                  htmlFor="trnType"
                  className="text-white text-left text-sm font-medium"
                >
                  Algorithm Type
                </label>
                <select
                  name="trnType"
                  id="trnType"
                  className="mt-1 p-2 block w-full border-gray-400 border-[1px] rounded-md shadow-sm 
                   focus:ring-opacity-50 bg-primary text-gray-300"
                  value={trnAlgoType}
                  onChange={(e) => setTrnAlgoType(e.target.value)}
                  required
                >
                  {TournamentAlgorithmType.map((option, index) => (
                    <option
                      key={index}
                      value={option.i}
                      onChange={() => setTrnPaymentType(e.target.value)}
                    >
                      {option.v}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex flex-col space-y-1">
              <label
                htmlFor="tournamentTime"
                className="text-white text-left text-sm font-medium rounded-sm"
              >
                Add Participants
              </label>
              <textarea
                name="lstParticipants"
                id="lstParticipants"
                cols="100"
                rows="3"
                value={lstParticipants}
                onChange={(e) => setLstParticipants(e.target.value)}
                className="w-full bg-primary outline-none focus:bg-lxTopBar 
                text-gray-300 placeholder-gray-500 border-[1px] border-gray-400 rounded-lg p-4"
                required
              ></textarea>
            </div>
          </div>
          <div className="bg-create-tournament-btn bg-contain bg-no-repeat">
            <button
              type="submit"
              className="text-white text-xs text-center w-1/3"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
