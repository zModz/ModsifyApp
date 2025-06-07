import { BASE_URL, API_VERSION, CLIENT_NAME, USERS } from "../config";

const getAuthParams = (userKey = "nonadmin") => {
  const user = USERS[userKey];
  return `u=${user.username}&t=${user.password}&v=${API_VERSION}&c=${CLIENT_NAME}&f=json`;
};

export const fetchFromSubsonic = async (
  endpoint,
  params = "",
  userKey = "nonadmin"
) => {
  const url = `${BASE_URL}/rest/${endpoint}?${getAuthParams(
    userKey
  )}&${params}`;
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`Subsonic API Error: ${res.status}`);
  }

  const data = await res.json();
  return data;
};
