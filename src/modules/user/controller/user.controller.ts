import { Request, Response } from "express";
import userModel from "../model/user.model";
import AppError from "../../../errors/appError";
import { HandleError } from "../../../errors/handleError";
import {
  checkObjectId,
  generateOtp,
  generateToken,
  hashPassword,
  paginate,
  sendMail,
} from "../../../util";
import { formatUser, handleSendOtp } from "../feature";

import otpModel from "../model/otpModel";

import { IControllerParams } from "../../../types/controller.type";


async function createUser(data: IControllerParams) {
  const { email } = data.body;

    let checkUser = await userModel.findOne({ email: email });
    if (checkUser)
      throw new AppError("", 409, "USER_EXIST");


  let user = await userModel.create({ ...data.body });

  // await handleSendOtp(email);

  return {
    status: 201,
    data: {
      message: "Utilisateur créé avec succès",
      user: formatUser(user),
    },
  };
}

async function login(data: IControllerParams) {
  const { email, password } = data.body;

  // @ts-ignore
  let user = await userModel.login(email, password);

  let token = generateToken(user._id, 24);
  return {
    status: 200,
    data: { message: "Login réussi", user: formatUser(user, token) },
  };
}

async function updateUser(data: IControllerParams) {
  const current_user = data.locals.current_user;

  let user = await userModel.findByIdAndUpdate(
    current_user._id,
    {
      $set: {
        ...data.body,
      },
    },
    { new: true }
  );

  return { code: 200, data: user };
}

async function refreshToken(data: IControllerParams) {
  const current_user = data.locals.current_user;

  let token = generateToken(current_user._id, 24);
  return {
    status: 200,
    data: { message: "Refresh réussi", token },
  };
}





async function sendOtp(data: IControllerParams) {
  const { email } = data.params;

  let otpExist = await otpModel.findOne({ email });

  if (otpExist) throw new AppError("", 400, "OTP_EXIST");

  let emailExist = await userModel.findOne({ email });
  if (!emailExist)
    return {
      code: 200,
      data: { message: "" },
    };
  await handleSendOtp(email);

  return {
    code: 200,
    data: { message: "" },
  };
}

async function resetPassword(data: IControllerParams) {
  const { email, code, password } = data.body;

  let otpExist = await otpModel.findOneAndDelete({ email, code });

  if (!otpExist) throw new AppError("", 400, "INVALID_OTP");

  let newPassword = await hashPassword(password);

  await userModel.findOneAndUpdate(
    { email },
    { $set: { password: newPassword } }
  );

  let message = `Vous venez de modifier votre mot de passe avec succès si ce n'est pas vous veuillez nous contacter ou réinitialiser votre mot de passe`;

  sendMail(email, "KAMIX Alerte ", message);

  return { code: 200, data: "ok" };
}

export {
  createUser,
  login,
  updateUser,

  sendOtp,
  resetPassword,
  refreshToken,

};
