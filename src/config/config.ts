import dotenv from "dotenv";
const PORT = process.env.PORT || 5000;
const SECRET_TOKEN = process.env.SECRET_TOKEN;
dotenv.config();

const DB = process.env.DB;

export const config = {
  server: {
    port: PORT,
    SECRET_TOKEN,
    DB
  },
};
