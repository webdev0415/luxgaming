import React, { useMemo } from "react";
import axios from "axios";
import { getSession } from "next-auth/client";

import { LatestGiveAway, Layout, LeaderboardTable, LeftSection } from "../components/Layout";
import { AvatarCell, RankCell } from "../components/Layout/LeaderboardTable";

function leaderboard({ tableData }) {

  let tdata = [];

  tableData.forEach((element) => {
    if (element.iType === 121) {
      tdata = JSON.parse(element.iInfo);
    }
  });

  const columns = useMemo(() => [
    {
      Header: "Username",
      accessor: "userName",
      Cell: AvatarCell,
      imgAccessor: "userAvatarPath",
    },
    
    {
      Header: "Total Points",
      accessor: "TotalAchievedPoints",
    },
    {
      Header: "Joined Tournaments",
      accessor: "TotalCountOfJoinedTournament",
    },
    {
      Header: "Rounds Played",
      accessor: "TotalCountOfPlayedRounds",
    },
    {
      Header: "Tournaments Won",
      accessor: "TotalCountOfWonTournament",
    },
    {
      Header: "Rank",
      Cell: RankCell,
      rankAccessor: "RankValue",
    },
  ]);


  const data = useMemo(() => tdata, [...tdata, ...tdata, ...tdata, ...tdata]);

  return (
    <Layout title="Leaderboard">
      <LeftSection pageMarker="/pagemarkers/leaderboard.svg">
        <LatestGiveAway/>
      </LeftSection>
      <div className=" bg-primary text-gray-300 col-span-3">
        <main className="max-w-5xl mx-auto px-4 sm:px-6">
          <LeaderboardTable columns={columns} data={data} />
        </main>
      </div>
    </Layout>
  );
}

export default leaderboard;

export async function getServerSideProps() {
  const session = await getSession();
  const token = session && session.accessToken;

  const res = await axios.get(`${process.env.BASE_API_URL}/User/GetRankOfAll`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  return {
    props: {
      tableData: res.data,
    },
  };
}
