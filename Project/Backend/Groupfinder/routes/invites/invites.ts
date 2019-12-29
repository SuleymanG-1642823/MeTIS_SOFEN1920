import express from 'express';
import InvitesDBInterface from './invites_methods'
import Invite, { INVITE_STATUS } from '../../types/invite'

/**
 * Middleware that is specific to this router
 */
const router = express.Router();
router.use((req: any, res: any, next: Function) => {
    next()
});

/////////////////////////////////////////////////////////////////////////////////////
// Define routes
/////////////////////////////////////////////////////////////////////////////////////

/**
 * Insert a new invite into the database.
 * @pre the body of the http request constains the invite (type: Invite) in JSON format
 */
router.post('/', async (req:any, res:any) => {
    const invite: Invite = req.body.invite;
    try {
        await InvitesDBInterface.addInvite(invite);
        res.status(200).send();
    } catch(err) {
        const statusCode: number = parseInt(err);
        res.status(statusCode).send("Error while inserting new invite into the database.");
    }
});

/**
 * Get all the invites that are sent out for given profile.
 * @returns list of invites sent out for given profile.
 */
router.get('/profile/:profile_id', async (req: any, res: any) => {
    const profile_id: number = parseInt(req.params.profile_id);
    try{
        const invites: Invite[] = await InvitesDBInterface.getProfileInvites(profile_id);
        res.status(200).json(invites);
    } catch(err) {
        const statusCode: number = parseInt(err);
        res.status(statusCode).send(`Error while fetching all invites sent out for profile with id ${profile_id}.`);
    }
});

/**
 * Get invite that has given id.
 * @returns Invite object if it exists.
 */
router.get('/invite/:invite_id', async (req: any, res: any) => {
    const invite_id: number = parseInt(req.params.invite_id);
    try{
        const invite: Invite = await InvitesDBInterface.getInvite(invite_id);
        res.status(200).json(invite);
    } catch(err) {
        const statusCode: number = parseInt(err);
        if (statusCode === 404){
            res.status(statusCode).send(`There is no invite with id ${invite_id} in the database.`);
        }else{
            res.status(statusCode).send(`Error while fetching invite ${invite_id} from the database.`);
        }
    }
});

/**
 * Get invite that has given id.
 * @returns Invite object if it exists.
 */
router.get('/lastid/', async (req: any, res: any) => {
    try{
        const lastInviteID: number = await InvitesDBInterface.getLastInsertedInviteID();
        res.status(200).json({id: lastInviteID});
    } catch(err) {
        const statusCode: number = parseInt(err);
        if (statusCode === 404){
            res.status(statusCode).send(`There is no invites in the database yet.`);
        }else{
            res.status(statusCode).send(`Error while fetching last inserted id for invites.`);
        }
    }
});

/**
 * Update status of invite
 */
router.put('/:invite_id/:status', async (req:any, res:any) => {
    const inviteID: number = parseInt(req.params.invite_id);
    const statusCode: number = parseInt(req.params.status);
    try {
        await InvitesDBInterface.updateInviteStatus(inviteID, statusCode);
        res.status(200).send();
    } catch(err) {
        const statusCode: number = parseInt(err);
        res.status(statusCode).send(`Error while updating status of invite ${inviteID} to ${statusCode}`);
    }
});

/**
 * Update status of invite
 */
router.delete('/:invite_id', async (req:any, res:any) => {
    const inviteID: number = parseInt(req.params.invite_id);
    try {
        await InvitesDBInterface.deleteInvite(inviteID);
        res.status(200).send();
    } catch(err) {
        const statusCode: number = parseInt(err);
        res.status(statusCode).send(`Error while deleting invite ${inviteID} to ${statusCode}`);
    }
});


module.exports = router;