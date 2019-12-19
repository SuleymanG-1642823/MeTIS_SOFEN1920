// https://medium.com/javascript-in-plain-english/creating-a-rest-api-with-jwt-authentication-and-role-based-authorization-using-typescript-fbfa3cab22a4
import { Request, Response, NextFunction } from "express";
import * as _ from "lodash";
import * as jwt from "jsonwebtoken";
import { JWT_SECRET, JWT_TOKEN_EXPIRY, REFRESH_TOKEN, NON_AUTH_PATHS  } from "../Helpers/constants";

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
    const { id, email, isAdmin } = tokenData;
    const newToken = jwt.sign({ id, email, isAdmin }, JWT_SECRET, {
      expiresIn: JWT_TOKEN_EXPIRY   // The token is valid for duration set via env variable
      });
    res.setHeader("access-token", newToken);
}

  // Call the next middleware or controller
  next();
};

// https://medium.com/quick-code/handling-authentication-and-authorization-with-node-7f9548fedde8
/*
import { verify } from "jsonwebtoken";
import { JWT_SECRET } from "../Helpers/constants";

export default function(req, res, next) {
  //get the token from the header if present
  const token = req.headers["x-access-token"] || req.headers["authorization"];
  //if no token found, return response (without going to the next middelware)
  if (!token) return res.status(401).send("Access denied. No token provided.");

  try {
    //if can verify the token, set req.user and pass to next middleware
    const decoded = verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (ex) {
    //if invalid token
    res.status(400).send("Invalid token.");
  }
};
*/

