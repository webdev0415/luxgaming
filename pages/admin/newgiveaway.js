import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/client";
import { useRouter } from "next/dist/client/router";

import axios from "axios";

import { Layout } from "../../components/Admin";
import { FeaturedGames, LatestGiveAway, LeftSection } from "../../components/Layout";
import LuxInputBox from "../../components/LuxInputBox";
import { TournamentPrizeType } from '../../types'

function createtournament() {

  return (
    <Layout>
      <main className="grid grid-cols-4 w-full gap-x-5">
        <LeftSection pageMarker="/pagemarkers/shop.svg">
          <LatestGiveAway/>
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

  const gaId = 0;
  const [gaTitle, setGaTitle] = useState("");
  const [gaDesc, setGaDesc] = useState("");
  const [gaFinDate, setGaFinDate] = useState('');
  const [gaPrizeType, setGaPrizeType] = useState('');
  const [productId, setProductId] = useState('');
  const [gaPrizeValue, setGaPrizeValue] = useState('');
  const [gaLevel, setGaLevel] = useState('');
  const [gaPrizeName, setGaPrizeName] = useState('');
  const [gaPrizeDesc, setGaPrizeDesc] = useState('');

  const lstJson = JSON.stringify({
    idGiveawayPrize: gaId,
    idGiveawayPrizeType: gaPrizeType,
    idProduct: productId,
    gaValue: gaPrizeValue,
    gaLevel: gaLevel,
    gaTitle: gaPrizeName,
    gaDescription: gaPrizeDesc
  })

  const [session] = useSession();
  const token = session && session.accessToken ;

  const addOrUpdateGA = async (e) => {
    e.preventDefault();
    const data = JSON.stringify({
        idGiveaway: gaId,
        gaTitle: gaTitle,
        gaDescription: gaDesc,
        gaFinishDate: gaFinDate,
        lstPrizesAsJson: lstJson
     
    })
     try{
    const res = await axios.post(`${process.env.BASE_API_URL}/Giveaway/AddOrUpdate`, data, {
   
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
    <div className="col-span-2 bg-primary flex flex-col p-4 space-y-4 rounded-sm">
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
        <h2 className="text-white text-left text-xs font-medium">Giveaway</h2>
      </div>

      <img className="w-full" src="/longlinebreaker.svg" />

      <div>
        <form method="post" onSubmit={addOrUpdateGA}>
          <div className="flex flex-col justify-between  space-y-3 w-full items-center p-4 mb-6">
            <label
              htmlFor="tournamentName"
              className="text-white text-left text-sm font-medium w-full"
            >
              Giveaway Title
            </label>
            <LuxInputBox
              type="text"
              value={gaTitle}
              onChange={(e) => setGaTitle(e.target.value)}
              required
            />

            <div className="flex flex-col space-y-1">
              <label
                htmlFor="tournamentTime"
                className="text-white text-left text-sm font-medium rounded-sm"
              >
                Giveaway Description
              </label>
              <textarea
                name="trnDescription"
                id="trnDescription"
                cols="100"
                rows="3"
                value={gaDesc}
                onChange={(e) => setGaDesc(e.target.value)}
                className="w-full bg-primary outline-none focus:bg-lxTopBar 
                text-gray-300 placeholder-gray-500 border-[1px] border-gray-400 rounded-lg p-4"
                required
              ></textarea>
            </div>

            <div className="flex flex-col space-y-1 w-full">
              <label
                htmlFor="tournamentTime"
                className="text-white text-left text-sm font-medium rounded-sm"
              >
                Enter Finish Date
              </label>
              <LuxInputBox type="date"  value={gaFinDate} onChange={(e) => setGaFinDate(e.target.value)} required />
            </div>

            <div className="flex flex-col space-y-1 w-full">
              <label
                htmlFor="tournamentTime"
                className="text-white text-left text-sm font-medium rounded-sm"
              >
               Select Type Of Prize
              </label>
              <select
                  name="trnPrice"
                  id="trnPrice"
                  className="mt-1 p-2 block w-full border-gray-400 border-[1px] rounded-md shadow-sm 
                   focus:ring-opacity-50 bg-primary text-gray-300"
                  value={gaPrizeType}
                  onChange={(e) => setGaPrizeType(e.target.value)}
                  required
                >
                  {TournamentPrizeType.map((option, index) => (
                    <option
                      key={index}
                      value={option.i}
                      onChange={() => setGaPrizeType(e.target.value)}>
                      {option.v}
                    </option>
                  ))}
                </select>
            </div>
            <div className="flex flex-col space-y-1 w-full">
              <label
                htmlFor="tournamentTime"
                className="text-white text-left text-sm font-medium rounded-sm"
              >
                Product ID
              </label>
              <LuxInputBox type="text"  value={productId} onChange={(e) => setProductId(e.target.value)} required />
            </div>
            <div className="flex flex-col space-y-1 w-full">
              <label
                htmlFor="tournamentTime"
                className="text-white text-left text-sm font-medium rounded-sm"
              >
                Giveaway Prize Value
              </label>
              <LuxInputBox type="number"  value={gaPrizeValue} onChange={(e) => setGaPrizeValue(e.target.value)} required />
            </div>
            <div className="flex flex-col space-y-1 w-full">
              <label
                htmlFor="tournamentTime"
                className="text-white text-left text-sm font-medium rounded-sm"
              >
               Giveaway Round Level
              </label>
              <LuxInputBox type="number"  value={gaLevel} onChange={(e) => setGaLevel(e.target.value)} required />
            </div>
            <div className="flex flex-col space-y-1 w-full">
              <label
                htmlFor="tournamentTime"
                className="text-white text-left text-sm font-medium rounded-sm"
              >
               Giveaway Prize Name
              </label>
              <LuxInputBox type="text"  value={gaPrizeName} onChange={(e) => setGaPrizeName(e.target.value)} required />
            </div>
            <div className="flex flex-col space-y-1 w-full">
              <label
                htmlFor="tournamentTime"
                className="text-white text-left text-sm font-medium rounded-sm"
              >
               Giveaway Prize Description
              </label>
              <LuxInputBox type="text"  value={gaPrizeDesc} onChange={(e) => setGaPrizeDesc(e.target.value)} required />
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
