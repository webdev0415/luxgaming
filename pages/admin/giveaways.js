import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/dist/client/router";
import axios from "axios";

import { ExclamationIcon, GiftIcon } from "@heroicons/react/outline";
import { Dialog } from "@headlessui/react";

import { Layout } from "../../components/Admin";
import {
  LeftSection,
  CenterSection,
  LatestGiveAway,
} from "../../components/Layout";
import Modal from "../../components/Modal";
import { getLatestGiveway } from "../../lib/hooks";

function giveaways() {
  const { data } = getLatestGiveway();
  const giveaway = []
 

  data?.forEach(e => {
    if(e.iType === 111 && e.iInfo.length > 0){
      giveaway = JSON.parse(e.iInfo)
    }
  })
  const endDate = new Date(giveaway[0]?.finishDate)
  const date = endDate.toDateString();

  return (
    <Layout>
      <div className="grid grid-cols-3 gap-x-10">
        <LeftSection pageMarker="/pagemarkers/shop.svg">
          <LatestGiveAway />
        </LeftSection>
        <GiveawaysContainer giveaway={giveaway}/>
      </div>
    </Layout>
  );
}

export default giveaways;

const GiveawaysContainer = ({giveaway}) => {
  const router = useRouter();
  const newGA = () => {
    router.push("/admin/newgiveaway");
  };
  return (
    <CenterSection>
      <main className="flex flex-col p-10 space-y-4 overflow-scroll ">
        <div
          className="p-4 bg-forumNews w-40 text-gray-200 text-lg cursor-pointer"
          onClick={newGA}
        >
          Create New Giveaway
        </div>
        <GACard giveaway={giveaway}/>
      </main>
    </CenterSection>
  );
};

const GACard = ({giveaway}) => {
  const delay = 5;
  const cancelButtonRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [winnerModalOpen, setWinnerModalOpen] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const openModal = () => {
    setOpen(!open);
  };

  const openWinnerModal = () => {
    setWinnerModalOpen(!winnerModalOpen);
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
    <div>
      {successMsg ? (
        <div className="bg-green-500 text-white p-2 rounded">{successMsg}</div>
      ) : null}
      {errorMsg ? (
        <div className="bg-red-500 text-white p-2 rounded"> {errorMsg}</div>
      ) : null}
      <div className="w-full lg:max-w-full lg:flex bg-forumNews border border-forumNews">
        <div className="relative h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden">
          <Image src="/bod.png" layout="fill" />
        </div>
        <div className="p-4 flex flex-col justify-between leading-normal">
          <div className="mb-8">
            <div className="text-gray-300 font-bold text-xl mb-2">
              {giveaway[0]?.title}
            </div>
            <p className="text-gray-400 text-base">
              {giveaway[0]?.description}
            </p>
          </div>
          <div className="flex items-center">
            <div className="flex space-x-3">
              <button
                className="rounded-md border  border-green-700 shadow-sm px-10 py-2 bg-green-600 text-base 
            font-medium text-white focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-xs"
                onClick={() => openModal()}
              >
                Set Winner
              </button>
              <button
                className="rounded-md border  border-red-800 shadow-sm px-10 py-2 bg-red-800 text-base 
            font-medium text-white focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-xs"
                onClick={() => openModal()}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
      <DeleteModal
        open={open}
        setOpen={openModal}
        innerRef={cancelButtonRef}
        giveaway={giveaway}
        setErrorMsg={setErrorMsg}
        setSuccessMsg={setSuccessMsg}
      />
      <WinnerModal
        open={winnerModalOpen}
        setOpen={openWinnerModal}
        innerRef={cancelButtonRef}
        giveaway={giveaway}
        setErrorMsg={setErrorMsg}
        setSuccessMsg={setSuccessMsg}
      />
    </div>
  );
};

const DeleteModal = ({
  open,
  setOpen,
  innerRef,
  giveaway,
  setErrorMsg,
  setSuccessMsg,
}) => {
  return (
    <Modal open={open} setOpen={setOpen} innerRef={innerRef}>
      <div className="bg-primary px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
        <div className="sm:flex sm:items-start">
          <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
            <ExclamationIcon
              className="h-6 w-6 text-red-600"
              aria-hidden="true"
            />
          </div>
          <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
            <Dialog.Title
              as="h3"
              className="text-lg leading-6 font-medium text-gray-300"
            >
              Delete Giveaway
            </Dialog.Title>
            <div className="mt-2">
              <p className="text-sm text-gray-200">
                Are you sure you want to delete this giveaway? It will be
                permanently removed. This action cannot be undone.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-primary px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
        <button
          type="button"
          className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
          onClick={() => {
            ModalActions("Delete", giveaway[0].id, setSuccessMsg, setErrorMsg);
            setOpen(false);
          }}
        >
          Delete
        </button>
        <button
          type="button"
          className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
          onClick={() => setOpen(false)}
          ref={innerRef}
        >
          Cancel
        </button>
      </div>
    </Modal>
  );
};

const WinnerModal = ({
  open,
  setOpen,
  innerRef,
  giveaway,
  setSuccessMsg,
  setErrorMsg,
}) => {

  return (
    <Modal open={open} setOpen={setOpen} innerRef={innerRef}>
      <div className="bg-primary px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
        <div className="sm:flex sm:items-start">
          <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
            <GiftIcon className="h-6 w-6 text-green-600" aria-hidden="true" />
          </div>
          <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
            <Dialog.Title
              as="h3"
              className="text-lg leading-6 font-medium text-gray-300"
            >
                Set Winner
            </Dialog.Title>
            <div className="mt-2">
              <p className="text-gray-200 text-sm">
                End this giveaway and set a winner.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-primary px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
        <button
          type="button"
          className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
          onClick={() => {
            ModalActions(
              action = "WinnerSet",
              id= giveaway[0].id,
              setSuccessMsg,
              setErrorMsg
            );
            setOpen(false);
          }}
        >
          Confirm
        </button>
        <button
          type="button"
          className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
          onClick={() => setOpen(false)}
          ref={innerRef}
        >
          Cancel
        </button>
      </div>
    </Modal>
  );
};

const ModalActions = async ({ action, id, setSuccessMsg, setErrorMsg }) => {
  try {
    const res = await axios.get(
      `${process.env.BASE_API_URL}/Giveaway/${action}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          idGiveaway: id,
        },
      }
    );
    if (res.status === 200) {
      action === "Delete"
        ? setSuccessMsg("Successfully deleted giveaway")
        : setSuccessMsg("Successfully added giveaway winner");
    }
  } catch (err) {
    setErrorMsg(`Error: ${err.response?.data}`);
  }
};
