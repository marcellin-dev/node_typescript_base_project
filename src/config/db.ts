import mongoose from "mongoose";
import userModel from "../modules/user/model/user.model";
import { config } from "./config";
const { connect } = mongoose;

let LINK_LOCAL = "mongodb://localhost:27017/KMXINVESTOR";

// @ts-ignore
connect(config.server.DB).then(
  async () => {
    let superAdmin = await userModel.findOne({
      email: "marcellin.lele@kamix.io",
    });

    if (!superAdmin)
      await userModel.create({
        email: "marcellin.lele@kamix.io",
        password: "Admin123@$",
        name: "Amdin",
        role: "admin",
      });

    console.log("connexion reussi a mongo db ", config.server.DB);
  },
  (err) => {
    console.log("erreur de connexion " + err);
  }
);
