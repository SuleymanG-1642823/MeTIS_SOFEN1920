import { genSalt, hash } from 'bcryptjs'
import * as jwt from "jsonwebtoken";
import User from '../types/user';
import { JWT_SECRET, JWT_TOKEN_EXPIRY } from '../Helpers/constants';

function validatePassword(password: string): [boolean, string[]]{
    let isValid = false;
    let messages = [];
    if (password.length < 8){
        messages.push("Your password must contain at least 8 characters.");
    }
    if (! (/.*[A-Z]+.*/.test(password))){
        messages.push("Your password must contain at least 1 capital letter.");
    }
    if (! (/.*[a-z]+.*/.test(password))){
        messages.push("Your password must contain at least 1 lowercase letter.");
    }
    if (! (/.*[0-9]+.*/.test(password))){
        messages.push("Your password must contain at least 1 number digit.");
    }
    if(messages.length == 0){
        isValid = true;
    }
    return [isValid, messages];
}

/**
 * Hash a password.
 * @param password the plain text password to be hashed
 */
function hashPassword(plainTextPassword: string): Promise<string>{
    return new Promise((resolve, reject) => {
        genSalt(10, function(err: any, salt: any) {
            hash(plainTextPassword, salt, function(err: any, hash: any) {
                if (err){
                    reject(err)
                } else {
                    resolve(hash)
                }
            });
        });
    });
}

function generateJWT(user: User): Promise<string> {
    return new Promise((resolve: any, reject: any) => {
        const timeInMilliseconds = (new Date()).getTime();
        const expiryInMilliseconds = parseInt(JWT_TOKEN_EXPIRY);
        jwt.sign({ id: user.id, email: user.mail, isAdmin: user.is_admin, iat: timeInMilliseconds, expiry: expiryInMilliseconds }, JWT_SECRET, {
            expiresIn: JWT_TOKEN_EXPIRY   // The token is valid for duration set via env variable
            }, (err, token) => {
                if(err){
                    reject(err);
                }
                else{
                    resolve(token);
                }
            });
    })
}

function refreshJWT(jwtData: any): string {
    const { id, email, isAdmin} = jwtData;
    const timeInMilliseconds = (new Date()).getTime();
    const expiryInMilliseconds = parseInt(JWT_TOKEN_EXPIRY);
    const newToken = jwt.sign({ id, email, isAdmin, iat: timeInMilliseconds, expiry:expiryInMilliseconds }, JWT_SECRET, {
        expiresIn: JWT_TOKEN_EXPIRY   // The token is valid for duration set via env variable
        });
    return newToken;
}

function timeToExpiration(token:string) {
    let tokenData;
    let millisecondsRemaining;
    try {   // Try to validate the token and get data
        tokenData = <any>jwt.verify(token, JWT_SECRET);
        const iat = tokenData.iat,
            expiry = tokenData.expiry,
            now = (new Date()).getTime();
        millisecondsRemaining = (iat + expiry) - now; // Always positive (verification failed otherwise)
    } catch (error) {
        //If token is not valid, 0 milliseconds remain
        millisecondsRemaining = 0;
    }
    return millisecondsRemaining;
}

export default {
    validatePassword,
    hashPassword,
    generateJWT,
    refreshJWT,
    timeToExpiration
}