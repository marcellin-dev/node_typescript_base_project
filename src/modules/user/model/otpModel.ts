import mongoose from "mongoose";

const otpSchema = new mongoose.Schema(
  {
    email: {
      type: String,
    },

    code: {
      type: String,
    },

    createdAt: { type: Date, expires: "6m", default: Date.now },
  },
  { timestamps: true }
);

const otpModel = mongoose.model("otp", otpSchema);
export default otpModel;
