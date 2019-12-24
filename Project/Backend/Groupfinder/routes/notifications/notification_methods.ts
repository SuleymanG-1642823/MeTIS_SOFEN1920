import Notification from '../../types/notification';
import TimeStamp from '../../classes/TimeStamp';
const db_conn = require('../../databaseconnection');

/**
 * Returns all notifications belonging to the user with the given ID.
 */
function getNotifications(userID: number): Promise<Array<Notification>>{
    return new Promise((resolve: any, reject: any) => {
        const query: string = `
            SELECT id, user_id, status, dest_url, msg, DATE_FORMAT(created_at, "%Y-%m-%d %H:%i:%S") as created_at
            FROM notification
            WHERE user_id = ?
            ORDER BY created_at DESC
        `;
        const params: any[] = [userID];
        
        db_conn.query(query, params, async (err: any, rows: any) => {
            if (err){
                console.log(`Error while fetching notifications of a user from the database: ${err}`);
                reject("500");
            } else {
                try{
                    let notifications: Array<Notification> = [];

                    for (let i in rows){
                        let notif: Notification = {
                            id: rows[i].id,
                            user_id: rows[i].user_id,
                            status: rows[i].status,
                            dest_url: rows[i].dest_url,
                            msg: rows[i].msg,
                            created_at: rows[i].created_at
                        };

                        notifications.push(notif);
                    }

                    resolve(notifications);
                } catch (err) {
                    console.log("Error while fetching notifications of a user from the database.");
                    reject(err);
                }                    
            }
        });
    });
}

/**
 * Updates the status codes of the notifications of the given user to Seen (code: 1)
 */
function updateStateToSeen(userID: number): Promise<void>{
    return new Promise((resolve: any, reject: any) => {
        const query: string = `
            UPDATE notification
            SET notification.status = 1
            WHERE user_id = ?;
        `;
        const params: any[] = [userID];
        
        db_conn.query(query, params, async (err: any, rows: any) => {
            if (err){
                console.log(`Error while updating notification statusses in database: ${err}`);
                reject("500");
            } else {
                resolve()           
            }
        });
    });
}

/**
 * Inserts new notification in the database
 * @param notif: Notification object
 */
function addNotification(notif: Notification): Promise<void>{
    return new Promise((resolve: any, reject: any) => {
        const query: string = `
            INSERT INTO notification (user_id, status, dest_url, msg)
            VALUES (?, ?, ?, ?);
        `;
        const params: any[] = [notif.user_id, notif.status, notif.dest_url, notif.msg];
        
        db_conn.query(query, params, async (err: any, rows: any) => {
            if (err){
                console.log(`Error while inserting new notification into the database: ${err}`);
                reject("500");
            } else {
                resolve()           
            }
        });
    });
}

/**
 * returns the number of new notifications that the user with the given id has received.
 */
function getNumberOfNewNotifications(userID: number): Promise<number>{
    return new Promise((resolve: any, reject: any) => {
        const query: string = `
            SELECT COUNT(status) AS amount
            FROM notification
            WHERE user_id = ? AND status = 0
            LIMIT 1;
        `;
        const params: any[] = [userID];
        
        db_conn.query(query, params, async (err: any, rows: any) => {
            if (err){
                console.log(`Error while fetching number of new notifications from the database: ${err}`);
                reject("500");
            } else {
                console.log('########  ' + rows[0].amount + '  ##########');

                resolve(rows[0].amount);         
            }
        });
    });
}

module.exports = {
    getNotifications,
    updateStateToSeen,
    addNotification,
    getNumberOfNewNotifications
}
