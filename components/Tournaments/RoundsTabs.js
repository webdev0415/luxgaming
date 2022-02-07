import { useEffect, useState } from "react";
import { useSession } from "next-auth/client";
import axios from "axios";
import { PlayersVsCard } from "./index";

export const RoundTabs = ({ rounds, tournament }) => {
    const [openTab, setOpenTab] = useState(0);
    const [roundInfo, setRoundInfo] = useState([]);
    const [session] = useSession();
    const token = session && session.accessToken;
    const grpInfo = [];
    const rndInfo = [];
    const roundId = rounds && rounds[0]?.idRound || null
    const freeWinners = [];

    
    const getRoundInfo = async () => {
      if(roundId !== null){
      const round = await axios
        .get(
          `${process.env.BASE_API_URL}/Tournament/RoundGet?idRound=${roundId}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        ).then(response => {
          const info = response.data
          setRoundInfo(info)
        })
        .catch((err) => {
          console.log(err);
        });
    }
    };
  
    roundInfo.forEach((value) => {
      if (value.iType === 211 && value.iInfo.length > 0) {
        grpInfo = JSON.parse(value.iInfo);
      }
      if (value.iType === 121 && value.iInfo.length > 0) {
        rndInfo = JSON.parse(value.iInfo);
      }
    });

    useEffect(() => {
      getRoundInfo();
    }, []);
    
    return (
      <div className="flex flex-row space-y-2">
        <ul
          className="flex mb-0 list-none flex-wrap pt-3  flex-col"
          role="tablist"
        >
          {rounds.map((value, i) => (
            <li
              className="-mb-px  last:mr-0 flex-auto text-center bg-primary"
              key={i}
            >
              <a
                className={
                  "border-forumSection bg-forumBox rounded-br-3xl border-[1px] h-[6.2rem] w-28 flex items-center justify-center cursor-pointer shadow-forumBox text-center text-sm" +
                  (openTab === value.level
                    ? "text-gray-200 border-b-[3px] border-yellow"
                    : "text-gray-500")
                }
                onClick={(e) => {
                  e.preventDefault();
                  getRoundInfo();
                  setOpenTab(value.level);
                }}
                data-toggle="tab"
                href="#link1"
                role="tablist"
              >
                <i className="fas fa-space-shuttle text-base mr-1"></i>
                {`Round ${value.level + 1}`}
              </a>
            </li>
          ))}
        </ul>
  
        <div className="flex px-4 py-2 flex-auto text-gray-300 text-sm flex-col">
          <div className="tab-content tab-space">
            {rndInfo.map((value, i) => (
            <div
              className={openTab === value.level ? "flex flex-row space-x-3" : "hidden"}
              id="link1" key={i}
            >
                  <PlayersVsCard
                    key={i}
                    roundId={roundId}
                    groups={grpInfo}
                    tournament={tournament}
                  />
             
            </div>
            ))}
          </div>
        </div>
      </div>
    );
  };