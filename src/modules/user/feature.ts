import { generateOtp, sendMail } from "../../util";
import otpModel from "./model/otpModel";

export function formatUser(user: any, token?: string) {
  return {
    email: user.email,
    role: user.role,
    isDelete: user.isDelete,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
    investor: user.investor,
    _id: user._id,
    token: token,
  };
}

export async function handleSendOtp(
  email: string,
  messageOtp?: string,
  subject?: string
) {
  let code = generateOtp();
  await otpModel.create({ email, code });
  let message = messageOtp || `Utisez ce code Otp  <strong> ${code} </strong> `;
  sendMail(email, subject || "KAMIX OTP", message);
}
