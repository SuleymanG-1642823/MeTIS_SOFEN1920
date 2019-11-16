"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const db_conn = require('../../databaseconnection');
/**
 * Middleware that is specific to this router
 */
router.use((req, res, next) => {
    console.log(`Users middleware is triggered`);
    next();
});
/////////////////////////////////////////////////////////////////////////////////////
// Define routes
/////////////////////////////////////////////////////////////////////////////////////
/**
 * Get user with specific id from database
 */
router.get('/:user_id', (req, res) => {
    const user_id = parseInt(req.params.user_id);
    const query = 'SELECT * FROM User WHERE id=?';
    const params = [user_id];
    db_conn.query(query, params, (err, rows) => {
        if (err) {
            res.status(500).send("Error while fetching user data.");
        }
        else if (rows.length < 1) {
            res.status(404).send(`Error finding user with id=${user_id}`);
        }
        else {
            const row = rows[0];
            const user = {
                id: row.id,
                name: row.name,
                mail: row.mail,
                address: row.address,
                zip: row.zip,
                city: row.city,
                cv_loc: row.cv_loc,
                tel: row.tel,
                website: row.website,
                social_media: row.social_media
            };
            res.status(200).json(user);
        }
    });
});
/**
 * Insert new user into database
 */
router.post('/', (req, res) => {
    const user = req.body.user;
    const query = 'INSERT INTO Users (name, mail, address, zip, city, cv_loc, tel, website, social_media) VALUES (?,?,?,?,?,?,?,?,?)';
    const params = [user.name, user.mail, user.address, user.zip, user.city, user.cv_loc, user.tel, user.website, user.social_media];
    db_conn.query(query, params, (err, rows) => {
        if (err) {
            res.status(500).send("Error while inserting new user into database.");
        }
        else {
            res.status(200).send("Successfully inserted new user into database.");
        }
    });
});
module.exports = router;
//# sourceMappingURL=users.js.map