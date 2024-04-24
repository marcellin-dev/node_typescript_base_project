import jwt from "jsonwebtoken";


import { config } from "./config/config";
const configServer = config;
import bcrypt from "bcrypt";

import mongoose from "mongoose";
import { IQueryPaginate } from "./types/types";
import fs from "fs";


export function uniqueId() {
  return "";
}

export function generateToken(id: string, duraration?: number) {
  let el = {
    id,
  };
  let expireIn = duraration ? duraration + "h" : "1h";

  let secret = config.server.SECRET_TOKEN ||"";
  return jwt.sign(el, secret, {
    expiresIn: expireIn,
  });
}

export function sendMail(
  to: string,
  subject: string,
  html: string,
  files?: any,
  done?: any,
  bcc = false,
  debug = true
) {



}

export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt();
  let hashPassword = await bcrypt.hash(password, salt);

  return hashPassword;
}

export function createLocalDate(): Date {
  const timeZone = "Africa/Lagos";
  const now = new Date();
  const targetOffsetMs =
    new Date(
      now.toLocaleString("en-US", { timeZone, timeZoneName: "short" })
    ).getTimezoneOffset() *
    60 *
    1000;
  const targetTimestamp = now.getTime() - targetOffsetMs;
  const dateObject = new Date(targetTimestamp);
  return dateObject;
}

export function formatDate(start: string, end: string, istimestamp?: boolean) {
  if (
    start !== null &&
    end !== null &&
    new Date(start).toString() !== "Invalid Date" &&
    new Date(end).toString() !== "Invalid Date"
  ) {
    if (istimestamp) {
      return {
        $gte: new Date(start).getTime(),
        $lte: new Date(end).getTime(),
      };
    } else
      return {
        $gte: new Date(start),
        $lte: new Date(end),
      };
  } else return null;
}

export function checkObjectId(objectId: string) {
  if (mongoose.Types.ObjectId.isValid(objectId)) {
    return true;
  } else {
    return false;
  }
}

export const paginate = async (
  model: any,
  query: IQueryPaginate,
  filter = {},
  selectedField?: string,
  sorted = { createdAt: -1 },
  populatedOptions?: any | undefined
) => {
  const page = query.page;
  const limit = query.limit;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const result: any = {};
  // change model.length to model.countDocuments() because you are counting directly from mongodb
  let total = await model
    .find({ ...filter })
    .countDocuments()
    .exec();
  result.total = total;
  if (endIndex < total) {
    result.next = {
      page: page + 1,
      limit: limit,
    };
  }
  if (startIndex > 0) {
    result.previous = {
      page: page - 1,
      limit: limit,
    };
  }
  try {
    result.results = await model
      .find({ ...filter })
      .sort(sorted)
      .limit(limit)
      .skip(startIndex)
      .select(selectedField)
      .populate(populatedOptions)
      .exec();

    result.next = { page: page };
    return result;
  } catch (e: any) {
    console.log(e.message);
  }
};
export function generateOtp() {
  let code = Math.floor(Math.random() * (999999 - 100000) + 100000);

  return code;
}

export async function deleteFile(path: string) {
  fs.unlink(path, (err) => {
    if (err) {
      console.error(err);
      // Gérer l'erreur
    } else {
      console.log("Fichier supprimé avec succès==> ", path);
      // Fichier supprimé avec succès
    }
  });
}



