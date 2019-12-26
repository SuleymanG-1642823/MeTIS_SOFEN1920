// https://medium.com/javascript-in-plain-english/creating-a-rest-api-with-jwt-authentication-and-role-based-authorization-using-typescript-fbfa3cab22a4
import { Request, Response, NextFunction } from "express";
import * as _ from "lodash";
import * as jwt from "jsonwebtoken";
import authHelpers from '../Helpers/authHelpers'
import { JWT_SECRET, REFRESH_TOKEN, NON_AUTH_PATHS  } from "../Helpers/constants";

export const checkJWT = (req: Request, res: Response, next: NextFunction) => {
  if(_.includes(NON_AUTH_PATHS, req.path)) {
    return next();  // Continue if path doesn't require authentication
  }

  // Get the jwt token from the head
  const token : string = <string> req.headers["access-token"];
  let tokenData;
  try {   // Try to validate the token and get data
    tokenData = <any>jwt.verify(token, JWT_SECRET);
    res.locals.tokenData = tokenData;
  } catch (error) {
    //If token is not valid, respond with 401 (unauthorized)
    res.status(401).send("Invalid token");
    return;
  }

  if(REFRESH_TOKEN=='yes'){ // Send a new token on every request 
    const newToken = authHelpers.refreshJWT(tokenData)
    res.setHeader("access-token", newToken);
  }

  // Call the next middleware or controller
  next();
};
