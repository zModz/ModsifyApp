import {
  NAVIDROME_URL,
  SUBSONIC_VERSION,
  SUBSONIC_CLIENT,
  ADMIN_USER,
  ADMIN_PASS,
  NONADMIN_USER,
  NONADMIN_PASS,
} from "@env";

// env variables dont load properly if this block is not present
// console.log(
//   `Config loaded: NAVIDROME_URL=${NAVIDROME_URL}, SUBSONIC_VERSION=${SUBSONIC_VERSION}, SUBSONIC_CLIENT=${SUBSONIC_CLIENT}` +
//     `, ADMIN_USER=${ADMIN_USER}, ADMIN_PASS=${ADMIN_PASS}, NONADMIN_USER=${NONADMIN_USER}, NONADMIN_PASS=${NONADMIN_PASS}`
// );

export const BASE_URL = NAVIDROME_URL;
export const API_VERSION = SUBSONIC_VERSION;
export const CLIENT_NAME = SUBSONIC_CLIENT;

export const USERS = {
  admin: {
    username: ADMIN_USER,
    password: ADMIN_PASS,
  },
  nonadmin: {
    username: NONADMIN_USER,
    password: NONADMIN_PASS,
  },
};
