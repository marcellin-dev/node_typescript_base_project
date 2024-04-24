import { NextFunction, Request, Response } from "express";

export function authorizeRoles(allowedRoles: Array<String>) {
  return (req: Request, res: Response, next: NextFunction) => {
    const current_user = res.locals.current_user;

    if (!allowedRoles.includes(current_user?.role))
      return res.status(403).json({ message: "Accès refusé" });
    next();
  };
}
