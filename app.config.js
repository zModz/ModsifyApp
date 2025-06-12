import "dotenv/config"; // This loads .env values into process.env

export default ({ config }) => {
  const ENV = process.env.APP_ENV || "development";

  return {
    ...config,
    expo: {
      name: ENV === "production" ? "Modsify" : `Modsify (${ENV})`,
      slug: "Modsify",
      version: "1.0.0",
      orientation: "portrait",
      icon: "./assets/icon.png",
      userInterfaceStyle: "light",
      splash: {
        image: "./assets/splash.png",
        resizeMode: "contain",
        backgroundColor: "#ffffff",
      },
      assetBundlePatterns: ["**/*"],
      ios: {
        supportsTablet: true,
      },
      android: {
        adaptiveIcon: {
          foregroundImage: "./assets/adaptive-icon.png",
          backgroundColor: "#ffffff",
        },
      },
      web: {
        favicon: "./assets/favicon.png",
      },
      extra: {
        env: ENV,
        apiUrl: process.env.API_URL,
      },
    },
  };
};
