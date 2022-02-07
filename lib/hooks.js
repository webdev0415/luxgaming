import useSWR from "swr";
import { useSession } from "next-auth/client";

const fetcher = async (url, token) => {
  const res = await fetch(url, {
    headers: { Authorization: "Bearer " + token },
  });
  if (res.status === 401 || res.status === 403) {
    return null;
  }
  return res.json();
};

const reportsFetcher = async (url, token, tournId) => {

  const res = await fetch(url, {
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
      idTournament: tournId,
    },
  });
  if (res.status === 401 || res.status === 403) {
    return null;
  }
  return res.json();
};

export function useUser() {
  const [session] = useSession();
  const authToken = session ? session.accessToken : null;

  const { data, error } = useSWR(
    [`${process.env.BASE_API_URL}/User/ProfileGet`, authToken],
    session ? fetcher : null
  );

  return {
    user: data,
    isLoading: !error && !data,
    isError: error,
  };
}

export function getReports(tournId) {
  const [session] = useSession();
  const authToken = session ? session.accessToken : null;

  const { data, error } = useSWR(
    [`${process.env.BASE_API_URL}/Tournament/ReportGet`, authToken, tournId],
    session ? reportsFetcher : null
  );


  return {
    reports: data,
    isLoading: !error && !data,
    isError: error,
  };
}

export function getSettings() {
  const [session] = useSession();
  const authToken = session ? session.accessToken : null;

  const { data, error } = useSWR(
    [`${process.env.BASE_API_URL}/Settings/GetAll`, authToken],
    session ? fetcher : null
  );

  return {
    data: data,
    isLoading: !error && !data,
    isError: error,
  };
}

export function getLatestGiveway() {
  const [session] = useSession();
  const authToken = session ? session.accessToken : null;

  const { data, error } = useSWR(
    [`${process.env.BASE_API_URL}/Giveaway/GetLatest`, authToken],
    session ? fetcher : null
  );

  return {
    data: data,
    isLoading: !error && !data,
    isError: error,
  };
}