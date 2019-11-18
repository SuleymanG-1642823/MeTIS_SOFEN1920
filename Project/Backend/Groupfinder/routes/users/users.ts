import express from 'express';
const router = express.Router();
const db_conn = require('../../databaseconnection');
import User from '../../types/user';

/**
 * Middleware that is specific to this router
 */
router.use((req: any, res: any, next: Function) => {
    console.log(`Users middleware is triggered`);
    next()
});

/////////////////////////////////////////////////////////////////////////////////////
// Define routes
/////////////////////////////////////////////////////////////////////////////////////

/**
 * Get user with specific id from database
 */
router.get('/:user_id', (req: any, res: any) => {
    const user_id: number = parseInt(req.params.user_id);
    const query: string = 'SELECT * FROM User WHERE id=?';
    const params: any[] = [user_id];
    db_conn.query(query, params, (err: any, rows: any) => {
        if (err){
            res.status(500).send("Error while fetching user data.");
        } 
        else if (rows.length < 1) {
            res.status(404).send(`Error finding user with id=${user_id}`)
        } else {
            const row = rows[0];
            const user: User = {
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
            }
            res.status(200).json(user);
        }
    });
});

/**
 * Insert new user into database
 */
router.post('/', (req: any, res: any) => {
    const user: User = req.body.user;
    const query: string = 'INSERT INTO Users (name, mail, address, zip, city, cv_loc, tel, website, social_media) VALUES (?,?,?,?,?,?,?,?,?); SELECT LAST_INSERT_ID() AS id;';
    const params: any[] = [user.name, user.mail, user.address, user.zip, user.city, user.cv_loc, user.tel, user.website, user.social_media];
    db_conn.query(query, params, (err: any, rows: any) => {
        if (err){
            res.status(500).send("Error while inserting new user into database.");
        } else {
            const new_id: number = rows[0].id;
            res.status(200).json({
                id: new_id
            });
        }
    });
});

module.exports = router;