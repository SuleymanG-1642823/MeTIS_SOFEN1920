const db_conn = require('../../databaseconnection');
const moment = require('moment');
import Message from '../../types/message';


/**
 * Get all messages sent between two users sorted by date (ascending).
 * @param userID1 first user of the conversation
 * @param userID2 second user of the conversation
 */
function getConversation(userID1: number, userID2: number): Promise<Message[]>{
    return new Promise(
        (resolve, reject) => {
            const query: string = 'SELECT * FROM message WHERE sender_id=? AND receiver_id=? OR sender_id=? AND receiver_id=? ORDER BY sent_at ASC;';
            const params: any[] = [userID1, userID2, userID2, userID1];
            db_conn.query(query, params, (err: any, rows: any) => {
                if (err) {
                    console.log(err);
                    reject('500');
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
                    resolve(messages);
                }
            });
        }
    );
}


/**
 * Get all users that have a conversation with a specific user (with user_id as id).
 * @param userID the id of the user for which we'll search the correspondents
 */
function getCorrespondents(userID: number): Promise<number[]> {
    return new Promise(
        (resolve: any, reject: any) => {
            const query: string = 'SELECT receiver_id AS id FROM message WHERE sender_id=? GROUP BY receiver_id UNION SELECT sender_id AS id FROM message WHERE receiver_id=? GROUP BY sender_id;';
            const params: any[] = [userID, userID];
            db_conn.query(query, params, (err: any, rows: any) => {
                if (err) {
                    console.log(err);
                    reject('500');
                } else {
                    let userIDs: number[] = [];
                    for (let i=0; i < rows.length; i++){
                        userIDs.push(rows[i].id);
                    }
                    resolve(userIDs);
                }
            });
        }
    );
}


/**
 * Insert new message into the database.
 * @param msg the message that has to be inserted into the database.
 */
function addMessage(msg: Message): Promise<number> {
    return new Promise(
        (resolve: any, reject: any) => {
            const query: string = 'INSERT INTO message (sender_id, receiver_id, content, sent_at) VALUES (?,?,?,?);';
            const params: any[] = [msg.sender_id, msg.receiver_id, msg.content, msg.sent_at];
            db_conn.query(query, params, async (err: any, rows: any) => {
                if (err) {
                    console.log(err);
                    reject('500');
                } else {
                    try{
                        const messageID: number = await getMessageId(msg);
                        resolve(messageID);
                    } catch (err) {
                        reject(err);
                    }                
                }
            });
        }
    );
}


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
                    console.log(err);
                    reject('500');
                } else if (rows.length < 1) {
                    console.log('Could not find message id.');
                    reject('404');
                } else {
                    const projectID: number = rows[0].id;
                    resolve(projectID);
                }
            });
        }
    );
}


module.exports = {
    getConversation,
    getCorrespondents,
    addMessage
}