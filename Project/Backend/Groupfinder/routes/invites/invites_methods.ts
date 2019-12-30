const db_conn = require('../../databaseconnection');
import Invite from '../../types/invite'

export default class InvitesDBInterface{
    private static DB: any = db_conn;

    /**
     * Inserts a new invite into the database
     * @param invite: invite to insert
     */
    public static addInvite(invite: Invite): Promise<void>{
        return new Promise(async (resolve: any, reject: any) => {
            const query: string = `
                INSERT INTO invite (sender_id, receiver_id, profile_id, status, sent_count, max_count)
                VALUES (?, ?, ?, ?, ?, ?);
            `;
            const params: any[] = [invite.sender_id, invite.receiver_id, invite.profile_id, invite.status, invite.sent_count, invite.max_count];
            db_conn.query(query, params, async (err: any, rows: any) => {
                if (err) {
                    console.log(err);
                    reject('500');
                } else {
                    resolve();
                }
            });
        });
    }

    public static getProfileInvites(profileID: number): Promise<Invite[]>{
        return new Promise(async (resolve: any, reject: any) => {
            const query: string = `
                SELECT *
                FROM invite
                WHERE profile_id = ?;
            `;
            const params: any[] = [profileID];
            db_conn.query(query, params, async (err: any, rows: any) => {
                if (err) {
                    console.log(err);
                    reject('500');
                } else {
                    let invites: Invite[] = [];
                    for (let i in rows){
                        let newInvite: Invite = {
                            id: rows[i].id,
                            sender_id: rows[i].sender_id,
                            receiver_id: rows[i].receiver_id,
                            profile_id: rows[i].profile_id,
                            status: rows[i].status,
                            sent_count: rows[i].sent_count,
                            max_count: rows[i].max_count,
                            last_sent_at: rows[i].last_sent_at
                        };
                        invites.push(newInvite);
                    }
                    resolve(invites);
                }
            });
        });
    }

    /**
     * Returns requested invite
     * @param inviteID 
     */
    public static getInvite(inviteID: number): Promise<Invite>{
        return new Promise(async (resolve: any, reject: any) => {
            const query: string = `
                SELECT *
                FROM invite
                WHERE id = ?;
            `;
            const params: any[] = [inviteID];
            db_conn.query(query, params, async (err: any, rows: any) => {
                if (err) {
                    console.log(err);
                    reject('500');
                } else {
                    if (rows.length > 0){
                        let newInvite: Invite = {
                            id: rows[0].id,
                            sender_id: rows[0].sender_id,
                            receiver_id: rows[0].receiver_id,
                            profile_id: rows[0].profile_id,
                            status: rows[0].status,
                            sent_count: rows[0].sent_count,
                            max_count: rows[0].max_count,
                            last_sent_at: rows[0].last_sent_at
                        }
                        resolve(newInvite);
                    }
                    else{
                        reject('404');
                    }
                }
            });
        });
    }

    /**
     * Inserts status of invite.
     * @param inviteID: id of invite to update.
     * @param status: new status value.
     */
    public static updateInviteStatus(inviteID: number, status: number): Promise<void>{
        return new Promise(async (resolve: any, reject: any) => {
            const query: string = `
                UPDATE invite
                SET status = ?
                WHERE id = ?;
            `;
            const params: any[] = [status, inviteID];
            db_conn.query(query, params, async (err: any, rows: any) => {
                if (err) {
                    console.log(err);
                    reject('500');
                } else {
                    resolve();
                }
            });
        });
    }

    /**
     * Returns ID of last inserted invite.
     */
    public static getLastInsertedInviteID(): Promise<number>{
        return new Promise(async (resolve: any, reject: any) => {
            const query: string = `
                SELECT id
                FROM invite
                order by id desc
                limit 1;
            `;
            const params: any[] = [];
            db_conn.query(query, params, async (err: any, rows: any) => {
                if (err) {
                    console.log(err);
                    reject('500');
                } else {
                    if (rows.length > 0){
                        resolve(rows[0].id);
                    }
                    else{
                        reject('404');
                    }
                }
            });
        });
    }

    /**
     * Deletes invite with given ID from database. 
     */
    public static deleteInvite(inviteID: number): Promise<void>{
        return new Promise(async (resolve: any, reject: any) => {
            const query: string = `
                DELETE FROM invite
                WHERE id = ?;
            `;
            const params: any[] = [inviteID];
            db_conn.query(query, params, async (err: any, rows: any) => {
                if (err) {
                    console.log(err);
                    reject('500');
                } else {
                    resolve();
                }
            });
        });
    }
}