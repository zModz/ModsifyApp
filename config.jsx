import {
  NAVIDROME_URL,
  SUBSONIC_VERSION,
  SUBSONIC_CLIENT,
  ADMIN_USER,
  ADMIN_PASS,
  NONADMIN_USER,
  NONADMIN_PASS,
} from "@env";

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
