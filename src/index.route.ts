import { Router } from "express";
import factureRoute from "./modules/factures/facture.route";
const router = Router();



//facture routes
router.use("/facture", factureRoute);


export default router;
