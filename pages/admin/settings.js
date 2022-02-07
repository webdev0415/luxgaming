import React, {useState} from "react";
import { getSettings } from "../../lib/hooks";

import { EmailSettings, Layout, RankRangeTable, RankWeighTable } from "../../components/Admin";
import { CenterSection } from "../../components/Layout";

function settings() {
  const [openTab, setOpenTab] = useState(1);
  const {data} = getSettings();
  let settings = [];
  
  data?.forEach((value) => {
    if (value.iType === 111) {
      settings = JSON.parse(value.iInfo);
    }
  });

  const emailSettings = settings.filter(obj => obj.sGroup === "Email");
  const weighSettings = settings.filter(obj => obj.sGroup === "RankWeigh");
  const rangeSettings = settings.filter(obj => obj.sGroup === "RankRange");


  return (
    <Layout>
      <CenterSection>
        <div className="flex flex-wrap w-full max-w-6xl">
        <div className="w-full">
          <ul
            className="flex mb-0 list-none flex-wrap pt-3  flex-row"
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
                onClick={e => {
                  e.preventDefault();
                  setOpenTab(1);
                }}
                data-toggle="tab"
                href="#link1"
                role="tablist"
              >
                <i className="fas fa-space-shuttle text-base mr-1"></i> Email Settings
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
                onClick={e => {
                  e.preventDefault();
                  setOpenTab(2);
                }}
                data-toggle="tab"
                href="#link2"
                role="tablist"
              >
                <i className="fas fa-cog text-base mr-1"></i>  Rank Weigh Settings
              </a>
            </li>
            <li className="-mb-px mr-2 last:mr-0 flex-auto text-center bg-primary">
              <a
                className={
                  "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                  (openTab === 3
                    ? "text-gray-200 border-b-[2px] border-yellow"
                    : "text-gray-500")
                }
                onClick={e => {
                  e.preventDefault();
                  setOpenTab(3);
                }}
                data-toggle="tab"
                href="#link2"
                role="tablist"
              >
                <i className="fas fa-cog text-base mr-1"></i> Rank Range Settings
              </a>
            </li>
          </ul>

          <div className="relative flex flex-col min-w-0 break-words bg-primary w-full mb-6 shadow-lg">
            <div className="px-4 py-5 flex-auto text-gray-300 text-sm">
              <div className="tab-content tab-space">
                <div className={openTab === 1 ? "block" : "hidden"} id="link1">
                 <EmailSettings settings={emailSettings} />
                </div>
                <div className={openTab === 2 ? "block" : "hidden"} id="link2">
                <RankWeighTable settings={weighSettings}/>
                </div>
                <div className={openTab === 3 ? "block" : "hidden"} id="link2">
                <RankRangeTable settings={rangeSettings}/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </CenterSection>
    </Layout>
  );
}

export default settings;

