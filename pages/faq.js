import React, { useState } from "react";
import { Layout, LeftSection, CenterSection } from "../components/Layout";

function faq() {
  return (
    <Layout>
      <div className="grid grid-cols-3 gap-x-4">
        <LeftSection pageMarker="/pagemarkers/faq.svg" />
        <InfoBooth />
      </div>
    </Layout>
  );
}

export default faq;

const InfoBooth = () => {
  const faqData = [
    {
      title: "Frequently Asked Question #1",
      content: `Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quis sapiente
          laborum cupiditate possimus labore, hic temporibus velit dicta earum
          suscipit commodi eum enim atque at? Et perspiciatis dolore iure
          voluptatem.`,
    },
    {
      title: "Frequently Asked Question #2",
      content: `Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quis sapiente
          laborum cupiditate possimus labore, hic temporibus velit dicta earum
          suscipit commodi eum enim atque at? Et perspiciatis dolore iure
          voluptatem.`,
    },
    {
      title: "Frequently Asked Question #3",

      content: `Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quis sapiente
          laborum cupiditate possimus labore, hic temporibus velit dicta earum  suscipit commodi eum enim atque at? Et perspiciatis dolore iure
          voluptatem.`,
    },
    {
      title: "Frequently Asked Question #4",
      content: `Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quis sapiente
          laborum cupiditate possimus labore, hic temporibus velit dicta earum  suscipit commodi eum enim atque at? Et perspiciatis dolore iure
          voluptatem.`,
    },
  ];

  return (
    <CenterSection>
      <main className="flex flex-col space-y-3 max-w-5xl w-full p-4">
          {faqData.map((f, i) => (
               <CollapsibleContainer title={f.title} content={f.content} key={i} />
           ) 
          )}
       
      </main>
    </CenterSection>
  );
};

const CollapsibleContainer = ({ title, content }) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className="relative p-4 w-full max-w-5xl text-gray-200 bg-forumNews rounded-sm cursor-pointer">
      <div
        onClick={() => setIsActive(!isActive)}
        className="w-full flex items-center space-x-4"
      >
        <div>
          {isActive ? (
            <img src="/triangle-up.svg" className="h-4 w-4" />
          ) : (
            <img src="/down.svg" className="h-6 w-6" />
          )}
        </div>
        <div className="w-full">{title}</div>
      </div>

      {isActive && (
        <div className="flex flex-wrap w-2/3 whitespace-wrap">{content}</div>
      )}
    </div>
  );
};
