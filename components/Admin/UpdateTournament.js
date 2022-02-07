import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/client";
import axios from "axios";
import {useRouter} from 'next/dist/client/router'

import LuxInputBox from "../LuxInputBox";
import { TournamentAlgorithmType, TournamentPaymentType } from "../../types";

export const UpdateTournament = ({ tournament }) => {
  let trn = [];
  let playerInfo = "";

  tournament.forEach((e) => {
    if (e.iType === 111) {
      trn = JSON.parse(e.iInfo)
    }

    if (e.iType === 113) {
      playerInfo = e.iInfo;
    }
  });

  const delay = 5;
  const [session] = useSession();
  const token = session && session.accessToken;
  const router = useRouter()

  const trnId = trn && trn[0].id;
  const [trnTitle, setTrnTitle] = useState(trn[0].title);
  const [trnDesc, setTrnDesc] = useState(trn[0].description);
  const [trnPrice, setTrnPrice] = useState(trn[0].cost);
  const [trnAlgoType, setTrnAlgoType] = useState(trn[0].idAlgorithmType);
  const [trnPaymentType, setTrnPaymentType] = useState(trn[0].idPaymentType);
  const [lstParticipants, setLstParticipants] = useState(playerInfo);
  const [lstFreeWinCandidates, setLstFreeWinCandidates] = useState("");
  const [lstJudges, setLstJudges] = useState("");
  const [prfJson, setPrfJson] = useState("");

  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

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
    });
    try {
      const res = await axios.post(
        `${process.env.BASE_API_URL}/Tournament/AddOrUpdate`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (res.status === 200) {
        setSuccessMsg("Tournament created successfully");
        router.push("/admin");
      }
    } catch (err) {
      setErrorMsg(`Error: ${err.response?.data}`);
    }
  };

  useEffect(() => {
    let msg = setTimeout(() => {
      setSuccessMsg("");
    }, delay * 2000);
    let err = setTimeout(() => {
      setErrorMsg("");
    }, delay * 2000);
    return () => clearTimeout(msg, err);
  }, [errorMsg, successMsg]);

  return (
    <div className="flex flex-col ">
      {successMsg ? (
        <div className="bg-green-500 text-white p-2 rounded">{successMsg}</div>
      ) : null}
      {errorMsg ? (
        <div className="bg-red-500 text-white p-2 rounded"> {errorMsg}</div>
      ) : null}
      <form method="post" onSubmit={addOrUpdateTournament}>
        <div className="flex flex-col justify-between  space-y-3 w-full items-center p-4 mb-6 overflow-scroll">
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

              {trnPaymentType === "21" && (
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
              rows="2"
              value={lstParticipants}
              onChange={(e) => setLstParticipants(e.target.value)}
              className="w-full bg-primary outline-none focus:bg-lxTopBar 
                text-gray-300 placeholder-gray-500 border-[1px] border-gray-400 rounded-lg p-4"
              required
            ></textarea>
          </div>
          <div className="flex flex-col space-y-1">
            <label
              htmlFor="tournamentTime"
              className="text-white text-left text-sm font-medium rounded-sm"
            >
              Add Free Win Candidates
            </label>
            <textarea
              name="lstParticipants"
              id="lstParticipants"
              cols="100"
              rows="2"
              value={lstFreeWinCandidates}
              onChange={(e) => setLstFreeWinCandidates(e.target.value)}
              className="w-full bg-primary outline-none focus:bg-lxTopBar 
                text-gray-300  placeholder-gray-500 border-[1px] border-gray-400 rounded-lg p-4"
              required
            ></textarea>
          </div>
          <div className="flex flex-col space-y-1">
            <label
              htmlFor="tournamentTime"
              className="text-white text-left text-sm font-medium rounded-sm"
            >
              List Judges
            </label>
            <textarea
              name="lstParticipants"
              id="lstParticipants"
              cols="100"
              rows="2"
              value={lstJudges}
              onChange={(e) => setLstJudges(e.target.value)}
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
            Update
          </button>
        </div>
      </form>
    </div>
  );
};
