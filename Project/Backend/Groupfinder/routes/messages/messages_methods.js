"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_conn = require('../../databaseconnection');
const moment = require('moment');
/**
 * Get all messages sent between two users sorted by date (ascending).
 * @param userID1 first user of the conversation
 * @param userID2 second user of the conversation
 */
function getConversation(userID1, userID2) {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM message WHERE sender_id=? AND receiver_id=? OR sender_id=? AND receiver_id=? ORDER BY sent_at ASC;';
        const params = [userID1, userID2, userID2, userID1];
        db_conn.query(query, params, (err, rows) => {
            if (err) {
                console.log(err);
                reject('500');
            }
            else {
                let messages = [];
                for (let i = 0; i < rows.length; i++) {
                    let message = {
                        id: rows[i].id,
                        sender_id: rows[i].sender_id,
                        receiver_id: rows[i].receiver_id,
                        content: rows[i].content,
                        sent_at: moment(rows[i].sent_at).format('YYYY-MM-DD hh:mm:ss')
                    };
                    messages.push(message);
                }
                resolve(messages);
            }
        });
    });
}
/**
 * Get all users that have a conversation with a specific user (with user_id as id).
 * @param userID the id of the user for which we'll search the correspondents
 */
function getCorrespondents(userID) {
    return new Promise((resolve, reject) => {
        const query = 'SELECT receiver_id AS id FROM message WHERE sender_id=? GROUP BY receiver_id UNION SELECT sender_id AS id FROM message WHERE receiver_id=? GROUP BY sender_id;';
        const params = [userID, userID];
        db_conn.query(query, params, (err, rows) => {
            if (err) {
                console.log(err);
                reject('500');
            }
            else {
                let userIDs = [];
                for (let i = 0; i < rows.length; i++) {
                    userIDs.push(rows[i].id);
                }
                resolve(userIDs);
            }
        });
    });
}
/**
 * Insert new message into the database.
 * @param msg the message that has to be inserted into the database.
 */
function addMessage(msg) {
    return new Promise((resolve, reject) => {
        const query = 'INSERT INTO message (sender_id, receiver_id, content, sent_at) VALUES (?,?,?,?);';
        const params = [msg.sender_id, msg.receiver_id, msg.content, msg.sent_at];
        db_conn.query(query, params, (err, rows) => __awaiter(this, void 0, void 0, function* () {
            if (err) {
                console.log(err);
                reject('500');
            }
            else {
                try {
                    const messageID = yield getMessageId(msg);
                    resolve(messageID);
                }
                catch (err) {
                    reject(err);
                }
            }
        }));
    });
}
/**
 * Search for a message's ID in the database.
 * @param message the message for which the id will be searched
 */
function getMessageId(message) {
    return new Promise((resolve, reject) => {
        const query = "SELECT id FROM message WHERE sender_id=? and receiver_id=? and content=? and sent_at=?;";
        const params = [message.sender_id, message.receiver_id, message.content, message.sent_at];
        db_conn.query(query, params, (err, rows) => {
            if (err) {
                console.log(err);
                reject('500');
            }
            else if (rows.length < 1) {
                console.log('Could not find message id.');
                reject('404');
            }
            else {
                const projectID = rows[0].id;
                resolve(projectID);
            }
        });
    });
}
module.exports = {
    getConversation,
    getCorrespondents,
    addMessage
};
//# sourceMappingURL=messages_methods.js.map