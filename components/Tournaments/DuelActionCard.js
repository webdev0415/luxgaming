import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/client";
import router from 'next/router'
import axios from "axios";

const pointsDets = {
  "swiss-win": 3,
  "swiss-draw": 1,
  "singleElm-win": 1,
};

// [
//   {idUser: 102, point: 3}
// ]

export const DuelActionCard = ({
  tournament,
  tournamentId,
  roundId,
  destUsername,
  userInfo,
}) => {
  const delay = 5
  const [openReport, setOpenReport] = useState(false);
  const [report, setReport] = useState("");

  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const [openMessage, setOpenMessage] = useState(false);
  const [message, setMessage] = useState("");
  const [title, setTitle] = useState("");

  const [session] = useSession();
  const token = session ? session.accessToken : null;
  const playerInfos = userInfo && userInfo.flatMap((e) => e);


  useEffect(() => {
    let msg = setTimeout(() => { setSuccessMsg(""); }, delay * 2000);
    let err = setTimeout(() => { setErrorMsg(""); }, delay * 2000);
    return () => clearTimeout(msg, err);
  }, [errorMsg, successMsg]);

  return (
    <div className="flex flex-col space-y-3">
      {successMsg ? (<div className="text-white bg-green-500 p-2 rounded">{successMsg}</div> ): null}
      {errorMsg ? (<div className="text-white bg-red-500 p-2 rounded">{errorMsg}</div> ): null}
      <div className="flex flex-row text-white justify-between items-center">
        <h1 className="text-sm">Tournament Name</h1>
        <p className="text-xs">Time Remaining</p>
      </div>
      {playerInfos && (
        <DuelCard
          roundId={roundId}
          tournamentId={tournamentId}
          token={token}
          playerOne={playerInfos[0]}
          playerTwo={playerInfos[1]}
          tournament={tournament}
          setErrorMsg={setErrorMsg}
          setSuccessMsg={setSuccessMsg}
        />
      )}
      <div className="grid grid-cols-2 gap-x-2">
        <LeftActionButtons
          title="Call Judge"
          onClick={() =>
            tournamentId && roundId
              ? requestJudge(tournamentId, roundId, token, setErrorMsg, setSuccessMsg)
              : null
          }
        />
        <RightActionButtons
          title="Send Message"
          onClick={() => setOpenMessage(!openMessage)}
        />
        <LeftActionButtons
          title="Send Report"
          onClick={() => setOpenReport(!openReport)}
        />
        <RightActionButtons title="Button" />
      </div>
      {openReport && (
        <div className="w-full">
          <textarea
            rows="4"
            value={report}
            onChange={(e) => setReport(e.target.value)}
            className="text-gray-200 border border-gray-400 h-[45px] w-full bg-transparent"
          ></textarea>
          <div className="cursor-pointer px-[3px] py-1 bg-green-600 rounded-lg text-white flex w-1/2  justify-center">
            <div
              onClick={() =>
                roundId
                  ? createReport(report, roundId, token, setOpenReport,  setSuccessMsg, setErrorMsg,)
                  : null
              }
            >
              Send Report
            </div>
          </div>
        </div>
      )}
      {openMessage && (
        <div className="w-full space-y-2">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            type="text"
            className="text-gray-200 border border-gray-400 h-[30px] w-full bg-transparent"
          />
          <div>
            <textarea
              rows="4"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="text-gray-200 border border-gray-400 h-[45px] w-full bg-transparent"
            ></textarea>
            <div className="cursor-pointer px-[3px] py-1 bg-green-600 rounded-lg text-white flex w-1/2  justify-center">
              <div
                onClick={() =>
                  destUsername &&
                  sendMessage(
                    title,
                    message,
                    destUsername,
                    token,
                    setOpenMessage,
                    setErrorMsg,
                    setSuccessMsg
                  )
                }
              >
                Send Message
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const DuelCard = ({
  playerOne,
  playerTwo,
  tournament,
  token,
  roundId,
  tournamentId,
  setErrorMsg,
  setSuccessMsg
}) => {

  const algoType = tournament && tournament.idAlgorithmType
  
  return (
    <div className="bg-tournament-duel-card bg-no-repeat bg-cover w-full border-r-[1px] border-forumBorderColor">
      <div className="flex text-white text-center items-center w-full pb-[9px]">
        <div className="w-1/2 flex flex-col items-center ">
          <Avatar src="/profilePic.svg" />
          <p className="text-xs">{playerOne && playerOne["username"]}</p>
          <div
            className="relative h-14 w-14"
            onClick={() =>
              createPoints(
                [
                  {
                    idUser: playerOne["idUser"],
                    point: algoType === 21 ? 3 : 1,
                  },
                  { idUser: playerTwo["idUser"], point: 0 },
                ],
                token,
                roundId,
                tournamentId,
                setErrorMsg,
                setSuccessMsg
              )
            }
          >
            <Image src="/tournament/thumbsUp.svg" layout="fill" />
          </div>
        </div>

        <div className="flex flex-col space-y-2 cursor-pointer">
          <div className="h-10"></div>
          <h2>VS</h2>
          <div
            className="relative h-14 w-14"
            onClick={() =>
              algoType === 21
                ? createPoints(
                    [
                      { idUser: playerOne["idUser"], point: 1 },
                      { idUser: playerTwo["idUser"], point: 1 },
                    ],
                    token,
                    roundId,
                    tournamentId,
                    setErrorMsg,
                setSuccessMsg
                  )
                : null
            }
          >
            <Image src="/tournament/dot.svg" layout="fill" />
          </div>
          <div className="h-2"></div>
        </div>

        <div className="w-1/2 flex flex-col items-center">
          <Avatar src="/profilePic.svg" />
          <p className="text-xs">{playerTwo && playerTwo["username"]}</p>
          <div
            className="relative h-14 w-14"
            onClick={() =>
              createPoints(
                [
                  { idUser: playerOne["idUser"], point: 0 },
                  {
                    idUser: playerTwo["idUser"],
                    point: algoType === 21 ? 3 : 1,
                  },
                ],
                token,
                roundId,
                tournamentId,
                setErrorMsg,
                setSuccessMsg
              )
            }
          >
            <Image src="/tournament/thumbsUp.svg" layout="fill" />
          </div>
        </div>
      </div>
    </div>
  );
};

const Avatar = ({ src }) => {
  return (
    <div className="bg-profile-blue-hexagon bg-cover w-14 h-16 bg-no-repeat flex items-center justify-center">
      <Image src={src} objectFit="cover" width={32} height={40} />
    </div>
  );
};

const LeftActionButtons = ({ title, onClick }) => {
  return (
    <div className="flex flex-col text-white text-xs font-light gap-x-2 gap-y-2">
      <div className="bg-tournament-action-left h-8 bg-no-repeat bg-contain text-center pt-[2px]">
        <button onClick={onClick}>{title}</button>
      </div>
    </div>
  );
};

const RightActionButtons = ({ title, onClick }) => {
  return (
    <div className="flex flex-col text-white text-xs font-light gap-x-2">
      <div className="bg-tournament-action-right h-6 bg-no-repeat bg-contain text-center pt-[2px]">
        <button onClick={onClick}>{title}</button>
      </div>
    </div>
  );
};

const requestJudge = async (tournamentId, roundId, token) => {
  try{
  let request = await axios.get(
    `${process.env.BASE_API_URL}/User/TournamentJudgeRequest`,
    {
      headers: {
        idTournament: tournamentId,
        idRound: roundId["roundId"],
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  )
  if(request.status === 200){
    setSuccessMsg("Request sent")
  }
 
}
  catch(err){
    setErrorMsg(`Error: ${err.response?.data}`)
}
}

const createReport = async (body, roundId, token, setOpenReport, setSuccessMsg, setErrorMsg) => {
  const data = JSON.stringify({
    body,
  });
  try{
  let request = await axios.post(
    `${process.env.BASE_API_URL}/User/TournamentReport`,
    data,
    {
      headers: {
        rpGroupID: roundId["groupId"],
        idRound: roundId["roundId"],
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  )
  if (request.status === 200) {
    setSuccessMsg("Report created successfully")
    setOpenReport(false);
  }
}catch(err){
  setErrorMsg(`Error: ${err.response?.data}`)
}
};

const sendMessage = async (
  title,
  msgContent,
  lstDestUsernames,
  token,
  setOpenMessage,
  setErrorMsg, setSuccessMsg
) => {
  const data = JSON.stringify({
    msgTitle: title,
    msgContent: msgContent,
    lstDestUsernames: lstDestUsernames,
  });
  try{
  let request = await axios.post(
    `${process.env.BASE_API_URL}/Message/Add`,
    data,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  )
  if (request.status === 200) {
    setSuccessMsg("Message sent successfully")
    setOpenMessage(false);

  }
}catch(err){
  setErrorMsg(`Error: ${err.response?.data}`)

}
}

const createPoints = async (body, token, roundId, tournamentId, setErrorMsg, setSuccessMsg) => {
  const data = JSON.stringify(body);
  try{
  let request = await axios.post(
    `${process.env.BASE_API_URL}/Tournament/RoundParticipantPointSet`,
    data,
    {
      headers: {
        idTournament: tournamentId,
        idRound: roundId["roundId"],
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  )
  if (request.status === 200) {
    setSuccessMsg("Points created successfully")
  }
  } catch(err){
    setErrorMsg(`Error: ${err.response?.data}`)
  }
};


