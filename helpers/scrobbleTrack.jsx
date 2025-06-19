import { fetchFromSubsonic } from "./subsonic";

const scrobbleTrack = async (trackId) => {
  const timestamp = Math.floor(Date.now() / 1000); // Current time in seconds

  try {
    await fetchFromSubsonic(
      "scrobble",
      `id=${trackId}&submission=true&time=${timestamp}`
    );
    console.log(`Track ${trackId} scrobbled successfully at ${timestamp}`);
  } catch (error) {
    console.error("Error scrobbling track:", error);
    throw new Error("Failed to scrobble track");
  }
};

export default scrobbleTrack;
