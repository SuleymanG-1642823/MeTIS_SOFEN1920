import express, { Request, Response } from 'express';
import { compare } from 'bcryptjs'
import User from '../../types/user';
import authHelpers from '../../Helpers/authHelpers';
import { UserController } from '../users/users_methods'
const usercontroller: UserController = new UserController();
const router = express.Router();
/////////////////////////////////////////////////////////////////////////////////////
// Define routes
/////////////////////////////////////////////////////////////////////////////////////

/**
 * Create a new user with data in body
 */
router.post('/register', async (req: Request, res: Response) => {
    const {fname, lname, mail, mailConfirmation, password} : {fname: string, lname: string, mail:string, mailConfirmation: string, password: string} = req.body;
    // Make sure arguments are valid.
    if(!fname || !lname || !mail || !mailConfirmation || !password){
        return res.status(400).send("Bad request. Provide fname, lname, mail, mailConfirmation and password.");
    }
    else if(mail !== mailConfirmation){
        return res.status(422).json({messages: ["Mail confirmation is incorrect."]});
    }

    const [ validPassword, messages ]= authHelpers.validatePassword(password);
    if(!validPassword){
        return res.status(422).json({messages})
    }
    // Check if a user already exists for the given email
    let newUser = true;
    usercontroller.userExists(mail)
    .then((exists: boolean) => {
        if( exists ){ 
            newUser = false
            return res.status(422).json({messages: [`User already exists for ${mail}`]});
        }
        else{
            // Insert user data with hashed password and respond with new token
            authHelpers.hashPassword(password)
            .then((hash) => {
                const user : User = {first_name: fname, last_name: lname, mail: mail, password: hash, is_admin: false, address:"", zip:"", city:"", tel:"", website:"", social_media:"", available: true, private: true }
                usercontroller.addUser(user, hash)
                .then((newID: number) => {
                    if(newID){
                        user.id = newID
                        authHelpers.generateJWT(user)
                            .then((token) =>{
                                res.setHeader("Authorization", "Bearer " + token)
                                delete user.password // Remove password hash
                                return res.status(201).json({ user });
                            }).catch(() => {
                                return res.status(500).send("Internal server error. Could not create token.");
                            });
                    }
                })
                .catch(() => {
                    res.status(500).send("Internal server error.");}
                );
            })
            .catch(() => {
                res.status(500).send("Internal server error.");}
            );
        }
    })
    .catch(() =>{
        return res.status(500).send("Internal server error.")
    });
});

/**
 * Get user with specific email from database and create new token
 */
router.post('/login', async (req: Request, res: Response) => {
    const { mail, password }  = req.body; // Get arguments from body
    if(!mail || !password){     // Abort if arguments aren't passed
        return res.status(400).send("Bad request. Provide mail and password.");
    }
    usercontroller.getUserForLogin(mail)
        .then((user : User) => {
            if(!user){
                // Don't reveal reason
                return res.status(422).json({messages: ["Invalid email/password combination"]});
            }

            // If user is found for given email, check the password
            compare(password, user.password).then( matches => {
                if(matches){ // Create JWT and send data back
                    authHelpers.generateJWT(user)
                    .then((token) =>{
                        res.setHeader("Authorization", "Bearer " + token)
                        delete user.password // Remove password from data
                        return res.status(200).json({user});
                    }).catch(() => {
                        return res.status(500).send("Internal server error. Could not create token.");
                    });
                }
                else{
                    return res.status(422).json({messages: ["Invalid email/password combination"]});
                }
            }).catch(() => {
                res.status(500).send("Internal server error.");
            });
        }).catch((err: string) => {
            const statusCode: number = parseInt(err);
            res.status(statusCode).send("Error while fetching user from the database.");
        });
});

/**
 * Get the remaining time before expiration (in milliseconds) of the token in header, returns 0 if token is invalid
 */
router.get('/expiry', async (req: Request, res: Response) => {
    const headerData = <string> req.headers["authorization"];
    if(!headerData){
        return res.status(400).send("No bearer token provided")
    }
    const token = headerData.split(" ")[1];
    const time = authHelpers.timeToExpiration(token);
    res.status(200).json({time});
});

module.exports = router;