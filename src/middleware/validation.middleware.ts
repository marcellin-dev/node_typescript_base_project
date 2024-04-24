import { NextFunction, Request, Response } from "express";
import AppError from "../errors/appError";
import { HandleError } from "../errors/handleError";


function validationFormData(schemaValidation: any) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      let validate = schemaValidation.validate(req.body);

      if (validate.error) {
        throw new AppError("", 400, undefined, validate.error.details);
      } else next();
    } catch (err: any) {
      if (err instanceof AppError) {
        res.status(err.status).json({ ...HandleError(err.code, err.data) });
      } else res.status(500).json(err.message);
    }
  };
}



export { validationFormData, };
