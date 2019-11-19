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
    const query: string = 'SELECT * FROM user WHERE id=?;';
    const params: any[] = [user_id];
    db_conn.query(query, params, (err: any, rows: any) => {
        if (err){
            console.log(err);
            res.status(500).send(`Error while fetching user data: ${err}`);
        } 
        else if (rows.length < 1) {
            res.status(404).send(`Error finding user with id=${user_id}`)
        } else {
            const row = rows[0];
            const user: User = {
                id: row.id,
                first_name: row.first_name,
                last_name: row.last_name,
                mail: row.mail,
                address: row.addr,
                zip: row.zip,
                city: row.city,
                tel: row.tel,
                website: row.website,
                social_media: row.social_media
            }
            res.status(200).json(user);
        }
    });
});


/**
 * Change data of existing user in the database.
 * @pre body of http request contains existing user (type: User) in JSON format
 */
router.put('/:user_id', (req: any, res: any) => {
    const user_id: number = parseInt(req.params.user_id);
    const user: User = req.body.user;
    const query: string = 'UPDATE user SET first_name=?, last_name=?, mail=?, addr=?, zip=?, city=?, tel=?, website=?, social_media=? WHERE id=?;';
    const params: any[] = [user.first_name, user.last_name, user.mail, user.address, user.zip, user.city, user.tel, user.website, user.social_media, user_id];
    db_conn.query(query, params, (err: any, rows: any) => {
        if (err){
            res.status(500).send(`Error while updating user.\n${err}`);
        } else {
            res.status(200).send('Succesfully updated user data.');
        }
    });
});


/**
 * Insert new user into database
 * @pre body of http request contains new user (type: User) in JSON format
 */
router.post('/', async (req: any, res: any) => {
    const user: User = req.body.user;
    const query: string = 'INSERT INTO user (first_name, last_name, mail, addr, zip, city, tel, website, social_media) VALUES (?,?,?,?,?,?,?,?,?);';
    const params: any[] = [user.first_name, user.last_name, user.mail, user.address, user.zip, user.city, user.tel, user.website, user.social_media];
    db_conn.query(query, params, async (err: any, rows: any) => {
        if (err){
            console.log(err);
            res.status(500).send("Error while inserting new user into database.");
        } else {
            try{
                const new_id: number = await getNewID(user);
                res.status(200).json({
                    id: new_id
                });
            }
            catch (err){
                res.status(500).send(`Could not find id.\n${err}`);
            }
        }
    });
});


/**
 * Delete user from the database.
 */
router.delete('/:user_id', (req: any, res: any) => {
    const user_id: number = parseInt(req.params.user_id);
    const query: string = 'DELETE FROM user WHERE id=?;';
    const params: any[] = [user_id];
    db_conn.query(query, params, (err: any, rows: any) => {
        if (err){
            res.status(500).send(`Error while deleting user.\n${err}`);
        } else {
            res.status(200).send(`Succesfully deleted user with id ${user_id}.`);
        }
    });
});

/////////////////////////////////////////////////////////////////////////////////////
// Define helper methods
/////////////////////////////////////////////////////////////////////////////////////

/**
 * Get id of user from database.
 * @param user The user whose id will be searched for. (type: User)
 * @returns promise of the user's id (type: Promise<number>)
 */
function getNewID(user: User): Promise<number>{
    return new Promise(
        (resolve, reject) => {
            const query: string = 'SELECT id FROM user WHERE mail=?;';
            const params: any[] = [user.mail];
            db_conn.query(query, params, (err: any, rows: any) => {
                if(err){
                    reject(err);
                } else if (rows.length < 1){
                    reject('No records returned.');
                } else {
                    const id: number = rows[0].id;
                    resolve(id);
                }
            });
        }
    );
}

module.exports = router;