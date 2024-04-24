import mongoose from "mongoose";
import AppError from "../../../errors/appError";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["admin", "editor", "user"],
      default: "user",
      required: true,
    },
    isDelete: {
      type: Boolean,
      default: false,
    },
    investor: {
      type: mongoose.Types.ObjectId,
      ref: "investor",
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  // this.date = createLocalDate();
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.statics.login = async function (email: String, password: String) {
  const user = await this.findOne({ email });

  if (user) {
    console.log("utilisateur trouvé");
    const auth = await bcrypt.compare(String(password), user.password);

    if (auth) {
      return user;
    }
    throw new AppError("", 401, "INCORRECT_CREDENTIALS");
  }
  throw new AppError("", 401, "INCORRECT_CREDENTIALS");
};

const userModel = mongoose.model("user", userSchema);
export default userModel;
