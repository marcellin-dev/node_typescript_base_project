
import {Request, Response} from "express";
import factureModel from "./facture.model";

const getFacture = async (req:Request, res:Response) => {
  res.status(200).json("yess facture controller")

};

const createFacture = async  (req:Request, res:Response) => {

  const {numero_facture, montant} = req.body
  try {

    const facture = await factureModel.create({numero_facture, montant})

    res.status(201).json(facture)
  }catch (e) {
    console.log(e)
  }
}


export { getFacture, createFacture };
