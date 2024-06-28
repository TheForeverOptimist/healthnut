import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

type Config = {
  baseUrl: string;
  // Add other configuration variables here
};

const config: Config = {
  baseUrl: process.env.NODE_ENV === "production"
      ? process.env.BASE_URL_PRODUCTION!
      : process.env.BASE_URL_DEVELOPMENT!,
  // Add other configuration variables here
};

export default config;
