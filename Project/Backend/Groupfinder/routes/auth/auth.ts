import express, { Request, Response } from 'express';
import { genSalt, hash, compare } from 'bcryptjs'
import * as jwt from "jsonwebtoken";
import User from '../../types/user';
import { JWT_SECRET, JWT_TOKEN_EXPIRY } from '../../Helpers/constants';
import { request } from 'http';
const users_methods = require('../users/users_methods');
const router = express.Router();
/////////////////////////////////////////////////////////////////////////////////////
// Define routes
/////////////////////////////////////////////////////////////////////////////////////

/**
 * Get user with specific email from database
 */
router.post('/login', async (req: Request, res: Response) => {
    const { mail, password }  = req.body; // Get arguments from body
    if(!mail || !password){     // Abort if arguments aren't passed
        return res.status(400).send("Bad request. Provide mail and password.");
    }
    users_methods.getUserForLogin(mail)
        .then((user : User) => {
            if(!user){
                return res.status(404).send("No user found for given email.")
            }
            // If user is found for given email, check the password
            compare(password, user.pw_hash).then( matches => {
                if(matches){ // Create JWT and send data back
                    const newToken = jwt.sign({ id: user.id, email: user.mail, isAdmin: user.is_admin }, JWT_SECRET, {
                        expiresIn: JWT_TOKEN_EXPIRY   // The token is valid for duration set via env variable
                        });
                    res.setHeader("access-token", newToken)
                    delete user.pw_hash // Remove password from data
                    return res.status(200).json({user});
                }
                else{
                    return res.status(400).send("Incorrect password.")
                }
            }).catch(() => {
                res.status(500).send("Internal server error.");});
        }).catch((err: string) => {
            const statusCode: number = parseInt(err);
            res.status(statusCode).send("Error while fetching user from the database.");
        });
});

module.exports = router;