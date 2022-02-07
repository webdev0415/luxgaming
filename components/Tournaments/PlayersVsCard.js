import React, { useState, useRef } from "react";
import { DuelActionCard, UserTournamentActions } from ".";
import Modal from "../Modal";

export const PlayersVsCard = ({ groups, roundId, tournament }) => {
  const [open, setOpen] = useState(false)
  const cancelButtonRef = useRef(null)

  let mappedUsernames = groups.map((group) => {
    return group["grpInfo"].map((e) => {return  {"username": e.userName, "groupId": group.groupId, idUser: e.idUser}});
  });
  let tournamentId = location.pathname.split("/").pop()
  return (
    <>
      {mappedUsernames.map((player, i) => {
        return (
          <div
            className="flex flex-col bg-forumBox border-[1px] rounded-sm from-forumBorderColor w-[6.3rem] h-24
        items-center justify-center text-xs p-2 space-y-2"
            key={i}
            onClick={() => setOpen(!open)}
          >
            <div className="flex w-full items-center space-x-3 text-white">
              <input type="checkbox" name="" id="" />
              <p>{player[0]["username"]}</p>
            </div>
            <p>VS</p>
            <div className="flex w-full items-center space-x-3 text-white">
              <input type="checkbox" name="" id="" />
              <p>{player[1]["username"]}</p>
            </div>
            {open ? <UserTournamentActions 
            tournament={tournament} 
            userInfo={mappedUsernames} 
            destUsername={player[0]["username"]} 
            roundId={{"roundId": roundId, "groupId": player[0]["groupId"]}} 
            tournamentId={tournamentId} 
            open={open} 
            setOpen={setOpen}
            innerRef={cancelButtonRef} /> : null}
          </div>
        );
      })}
    </>
  );
};


const ActionModal = () => {
  return (
    <Modal>
      </Modal>
  )
}