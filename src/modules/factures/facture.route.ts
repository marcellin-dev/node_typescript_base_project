// const router = require("express").Router();
import { Router } from "express";
import {createFacture, getFacture} from "./facture.controller";


const router = Router();

router.get("/", getFacture);
router.post("/", createFacture)

export default router;
