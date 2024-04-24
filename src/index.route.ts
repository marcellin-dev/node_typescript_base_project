import { Router } from "express";

import userRoute from "./modules/user/route/user.route";
const router = Router();



//facture routes
router.use("/user", userRoute);


export default router;
