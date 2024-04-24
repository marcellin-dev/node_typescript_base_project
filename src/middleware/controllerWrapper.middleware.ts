import { NextFunction, Request, Response } from "express";
import AppError from "../errors/appError";
import { HandleError } from "../errors/handleError";

function controllerWrapper(controller: Function) {
  return async (request: Request, res: Response, next: NextFunction) => {
    const { body, query, params } = request;
    const locals = res?.locals;
    try {
      let resController = await controller({
        body,
        query,
        params,
        locals,
        // files,
        // file,
        host: request?.headers?.host,
      });

      return res.status(resController.status || 200).json(resController.data);
    } catch (err: any) {
      if (err instanceof AppError) {
        let response = { ...HandleError(err.code, null), data: err.data };
        res.status(err.status).json(response);
      } else res.status(500).json(err.message);
    }
  };
}

export default controllerWrapper;
