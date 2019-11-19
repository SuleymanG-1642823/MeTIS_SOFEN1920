import express from 'express';
const router = express.Router();
const db_conn = require('../../databaseconnection');
import Message from '../../types/message';
const moment = require('moment');

/**
 * Middleware that is specific to this router
 */
router.use((req: any, res: any, next: Function) => {
    console.log(`Messages middleware is triggered`);
    next()
});


/////////////////////////////////////////////////////////////////////////////////////
// Define routes
/////////////////////////////////////////////////////////////////////////////////////

/**
 * Get all messages sent between two users
 */
router.get('/conversation/:user_id1/:user_id2', (req: any, res: any) => {
    const userID1: number = parseInt(req.params.user_id1);
    const userID2: number = parseInt(req.params.user_id2);
    const query: string = 'SELECT * FROM message WHERE sender_id=? AND receiver_id=? OR sender_id=? AND receiver_id=?;';
    const params: any[] = [userID1, userID2, userID2, userID1];
    db_conn.query(query, params, (err: any, rows: any) => {
        if (err) {
            console.log(err);
            res.status(500).send("Error while fetching messages of a conversation.");
        } else {
            let messages: Message[] = [];
            for (let i=0; i < rows.length; i++){
                let message: Message = {
                    id: rows[i].id,
                    sender_id: rows[i].sender_id,
                    receiver_id: rows[i].receiver_id,
                    content: rows[i].content,
                    sent_at: moment(rows[i].sent_at).format('YYYY-MM-DD hh:mm:ss')
                }
                messages.push(message);
            }
            res.status(200).json(messages);
        }
    });
});


/**
 * Get all users that have a conversation with a specific user (with user_id as id).
 */
router.get('/:user_id', (req: any, res: any) => {
    const userID: number = parseInt(req.params.user_id);
    const query: string = 'SELECT receiver_id AS id FROM message WHERE sender_id=? GROUP BY receiver_id UNION SELECT sender_id AS id FROM message WHERE receiver_id=? GROUP BY sender_id;';
    const params: any[] = [userID, userID];
    db_conn.query(query, params, (err: any, rows: any) => {
        if (err) {
            console.log(err);
            res.status(500).send("Error while fetching correspondents from the database.");
        } else {
            let userIDs: number[] = [];
            for (let i=0; i < rows.length; i++){
                userIDs.push(rows[i].id);
            }
            res.status(200).json(userIDs);
        }
    });
});


/**
 * Insert new message into the database.
 * @pre body of http request contains the new message (type: Message) in JSON format
 */
router.post('/', (req: any, res: any) => {
    const msg: Message = req.body.message;
    const query: string = 'INSERT INTO message (sender_id, receiver_id, content, sent_at) VALUES (?,?,?,?);';
    const params: any[] = [msg.sender_id, msg.receiver_id, msg.content, msg.sent_at];
    db_conn.query(query, params, async (err: any, rows: any) => {
        if (err) {
            console.log(err);
            res.status(500).send("Error while inserting message into the database.");
        } else {
            try{
                const projectID: number = await getMessageId(msg);
                res.status(200).json({id: projectID});
            } catch (err) {
                console.log(err);
                res.status(500).send("Error while searching for message id.");
            }                
        }
    });
});

/////////////////////////////////////////////////////////////////////////////////////
// Define helper methods
/////////////////////////////////////////////////////////////////////////////////////

/**
 * Search for a message's ID in the database.
 * @param message the message for which the id will be searched 
 */
function getMessageId(message: Message): Promise<number> {
    return new Promise(
        (resolve, reject) => {
            const query: string = "SELECT id FROM message WHERE sender_id=? and receiver_id=? and content=? and sent_at=?;";
            const params: any[] = [message.sender_id, message.receiver_id, message.content, message.sent_at];
            db_conn.query(query, params, (err: any, rows: any) => {
                if (err) {
                    reject(err);
                } else if (rows.length < 1) {
                    reject('Could not find message id.');
                } else {
                    const projectID: number = rows[0].id;
                    resolve(projectID);
                }
            });
        }
    );
}

module.exports = router;