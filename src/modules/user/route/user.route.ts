import { Router } from "express";

import {
  adminUpdateUserValidationSchema,
  createUserValidationSchema,
  loginUserValidationSchema,
  resetPasswordUserValidationSchema,
  updateUserValidationSchema,
  validateUserValidationSchema,
} from "../model/userValidationSchema";
import {
  createUser,

  login,
  refreshToken,
  resetPassword,
  sendOtp,
  updateUser,

} from "../controller/user.controller";
import { checkUser } from "../../../middleware/auth.middleware";

import { validationFormData } from "../../../middleware/validation.middleware";
import { authorizeRoles } from "../../../middleware/role.middleware";
import controllerWrapper from "../../../middleware/controllerWrapper.middleware";

const router = Router();

router.post(
  "/",
  checkUser,
  authorizeRoles(["admin"]),
  validationFormData(createUserValidationSchema),
  controllerWrapper(createUser)
);

router.post(
  "/login",
  validationFormData(loginUserValidationSchema),
  controllerWrapper(login)
);



router.get("/:email/otp", controllerWrapper(sendOtp));

router.put(
  "/password-reset",
  validationFormData(resetPasswordUserValidationSchema),
  controllerWrapper(resetPassword)
);

router.get(
  "/refresh-token",
  checkUser,
  authorizeRoles(["user", "editor", "admin"]),
  controllerWrapper(refreshToken)
);

const userRoute = router;

export default userRoute;
