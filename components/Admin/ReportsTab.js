import React, { useState } from "react";
import { getReports } from "../../lib/hooks";

export const ReportsTabs = ({ tournId }) => {
  const [openTab, setOpenTab] = useState(1);
  const { reports } = getReports(tournId[0].id);

  const report = [];
  const reportMsg = [];
  let reportDate;

  reports?.forEach((v) => {
    if (v.iType === 121 && v.iInfo.length > 0) {
      report = JSON.parse(v.iInfo);
    }
  });

  report?.forEach((v) => {
    reportMsg = JSON.parse(v.reportDescription);
    reportDate = v.reportDate;
  });

  const body = reportMsg.body;
  const newDate = new Date(reportDate);
  const date = newDate.toDateString();

  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full">
          <ul
            className="flex mb-0 list-none  pt-3  flex-row w-full"
            role="tablist"
          >
            <li className="-mb-px  last:mr-0 flex-auto text-center bg-primary">
              <a
                className={
                  "text-xs font-bold uppercase px-5 py-3 shadow-lg  block leading-normal " +
                  (openTab === 1
                    ? "text-gray-200 border-b-[3px] border-yellow"
                    : "text-gray-500")
                }
                onClick={(e) => {
                  e.preventDefault();
                  setOpenTab(1);
                }}
                data-toggle="tab"
                href="#link1"
                role="tablist"
              >
                <i className="fas fa-space-shuttle text-base mr-1"></i> Reports
              </a>
            </li>
            <li className="-mb-px mr-2 last:mr-0 flex-auto text-center bg-primary">
              <a
                className={
                  "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                  (openTab === 2
                    ? "text-gray-200 border-b-[2px] border-yellow"
                    : "text-gray-500")
                }
                onClick={(e) => {
                  e.preventDefault();
                  setOpenTab(2);
                }}
                data-toggle="tab"
                href="#link2"
                role="tablist"
              >
                <i className="fas fa-cog text-base mr-1"></i> Judge Calls
              </a>
            </li>
          </ul>

          <div className="relative flex flex-col min-w-0 break-words bg-primary w-full mb-6 shadow-lg">
            <div className="px-4 py-5 flex-auto text-gray-300 text-sm">
              <div className="tab-content tab-space">
                <div className={openTab === 1 ? "block" : "hidden"} id="link1">
                  <div className="flex flex-col p-2">
                    {report.length > 0 ? (
                      <>
                        {report.map((v, i) => {
                          return (
                            <div
                              className="flex flex-col space-y-2 text-gray-200"
                              key={i}
                            >
                              <p className="text-sm text-pink-400 ">
                                <span className="text-sm font-semibold underline">
                                  {v.userName}
                                </span>{" "}
                                made a report!
                              </p>
                              <div className="flex flex-col space-y-2">
                                <p>Message:</p>
                                <p className="text-sm rounded-lg border border-gray-400 p-2">
                                  {body}
                                </p>
                              </div>
                              <div className="flex flex-row space-x-5">
                                <p className="text-gray-300 text-sm font-light">
                                  {" "}
                                  Level:
                                  <span className="text-sm font-semibold text-gray-200">
                                    {" "}
                                    {v.levelOfRound}
                                  </span>
                                </p>
                                <p className="flex space-x-2 text-gray-300 text-sm font-light">
                                  <span>Date: </span>
                                  <span className="text-sm font-semibold text-gray-200">
                                    {date}
                                  </span>
                                </p>
                              </div>

                              <button className="rounded-lg text-sm bg-green-600 text-white py-2">
                                Send Message to Players
                              </button>
                            </div>
                          );
                        })}
                      </>
                    ) : (
                      <p className="text-white text-lg font-semibold">
                        No reports yet
                      </p>
                    )}
                  </div>
                </div>
                <div className={openTab === 2 ? "block" : "hidden"} id="link2">
                  Judge Calls
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const MessagePlayers = async () => {
  const body = JSON.stringify({
    msgTitle: "string",
    msgContent: "string",
    lstDestUsernames: "string",
    lstMediaIDs: "",
  });
  try {
    const response = await axios.post(
      "https://api.tournify.com/api/v1/messages/send",
      body,
      {
        headers: {
          Authorization: "Bearer " + "string",
          "Content-Type": "application/json",
        },
      }
    );
    if (response.status === 200) {
      console.log(response);
    }
  } catch (err) {
    console.log(err);
  }
};
