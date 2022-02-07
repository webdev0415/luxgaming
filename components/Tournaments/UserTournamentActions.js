import React, { Fragment } from "react";
import { DuelActionCard } from ".";
import Modal from "../Modal";

const UserTournamentActions = ({
  open,
  setOpen,
  innerRef,
  tournamentId,
  roundId,
  destUsername,
  userInfo,
  tournament,
}) => {
  return (
    <Modal open={open} setOpen={setOpen} innerRef={innerRef}>
      <ActionCard>
        <DuelActionCard
          tournament={tournament}
          userInfo={userInfo}
          destUsername={destUsername}
          roundId={roundId}
          tournamentId={tournamentId}
        />
      </ActionCard>
    </Modal>
  );
};

const ActionCard = ({ children }) => {
  return (
    <div className="rounded-lg w-[386px]">
      <Bottom>{children}</Bottom>
    </div>
  );
};

const Bottom = ({ children }) => {
  return (
    <div className="w-full max-w-sm flex flex-col bg-gradient-to-l from-primary to-secondary p-4 space-y-2">
      {children}
    </div>
  );
};

export default UserTournamentActions;
