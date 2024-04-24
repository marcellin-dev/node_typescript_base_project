import { JwtPayload, VerifyErrors } from "jsonwebtoken";

const jwt = require("jsonwebtoken");
import { NextFunction, Request, Response } from "express";
import { config } from "../config/config";
import userModel from "../modules/user/model/user.model";

const checkUser = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers["authorization"];

  let token: string | undefined = "";
  //stop all if there is not headers
  if (!authHeader) {
    if (req.query.key) {
      token = req.query.key?.toString();
    } else
      return res.status(401).json({
        message: "Attention",
      });
  } else {
    token = authHeader && authHeader.split(" ")[1];
  }

  let secret = config.server.SECRET_TOKEN;
  //check if token is present in header and verify the signature of token
  if (token) {
    jwt.verify(
      token,
      secret,
      async (err: VerifyErrors, decodedToken: JwtPayload) => {
        //if error occurs during verification
        if (err) {
          res
            .status(401)
            .json({ err: err, message: "erreur de verification du token" });
        } else {
          let current_user = await userModel
            .findById(decodedToken.id)
            .select(" -password -__v")
            .populate("investor");
          console.log(current_user);

          if (current_user?.isDelete)
            return res.status(401).json({ message: "Compte supprimé" });

          res.locals.current_user = current_user;

          next();
        }
      }
    );
  } else {
    return res.sendStatus(401).json({ message: "vous n'êtes pas autorisé" });
  }
};

export { checkUser };
