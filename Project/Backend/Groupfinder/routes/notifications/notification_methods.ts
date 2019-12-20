import Notification from '../../types/notification';
const db_conn = require('../../databaseconnection');

/**
 * Returns all notifications belonging to the user with the given ID.
 */
function getNotifications(userID: number): Promise<Array<Notification>>{
    return new Promise((resolve: any, reject: any) => {
        const query: string = `
            SELECT * 
            FROM notification
            WHERE user_id = ?
            ORDER BY id
        `;
        const params: any[] = [userID];
        
        db_conn.query(query, params, async (err: any, rows: any) => {
            if (err){
                console.log(`Error while fetching project from database: ${err}`);
                reject("500");
            } else {
                try{
                    //const profiles_result: Profile[] = await $profiles_methods.getProjectProfiles(rows[0].projectID);
                    let notifications: Array<Notification> = [];

                    for (let i in rows){
                        let notif: Notification = {
                            id: rows[i].id,
                            user_id: rows[i].user_id,
                            status: rows[i].status,
                            dest_url: rows[i].dest_url
                        };

                        notifications.push(notif);
                    }

                    resolve(notifications);
                } catch (err) {
                    console.log("Error while fetching profiles of a project from the database.");
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
            INSERT INTO notification (user_id, status, dest_url)
            VALUES (?, ?, ?);
        `;
        const params: any[] = [notif.user_id, notif.status, notif.dest_url];
        
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

module.exports = {
    getNotifications,
    updateStateToSeen
}
