import express from 'express';
import Notification from '../../types/notification';
const router = express.Router();
const $notification_methods = require('./notification_methods');


/**
 * Middleware that is specific to this router
 */
router.use((req: any, res: any, next: Function) => {
    next()
});

/**
 * Get all notifications of the user that has the given id.
 */
router.get('/:user_id', async (req: any, res: any) => {
    const user_id: number = parseInt(req.params.user_id);
    try{
        let notifications: Notification[] = await $notification_methods.getNotifications(user_id);
        res.status(200).json(notifications);
    } catch (err) {
        const statusCode: number = parseInt(err);
        res.status(statusCode).send("Error while fetching notifications from the database.");
    }    
});

/**
 * Update the states of all notifications with state 0 to 1 (only the notifications of the user with the given ID)
 * TODO: security, check if the one requesting it has the given id as user id
 */
router.put('/:user_id', async (req: any, res: any) => {
    const user_id: number = parseInt(req.params.user_id);
    try{
        await $notification_methods.updateStateToSeen(user_id);
        res.status(200).json("Successfully updated notification statusses to \"Seen\" for user with ID " + user_id);
    } catch (err) {
        const statusCode: number = parseInt(err);
        res.status(statusCode).send("Error while updating notification statusses for user with ID " + user_id);
    }    
});

/**
 * Insert new notification into the database.
 * @pre the notification is in the body of the request in JSON format
 */
router.post('/', async (req: any, res: any) => {
    try{
        const notification: Notification = req.body;
        await $notification_methods.addNotification(notification);
        res.status(200).json("Successfully inserted new notification for user " + notification.user_id + ", status notification: " + notification.status);
    } catch (err) {
        const statusCode: number = parseInt(err);
        res.status(statusCode).send("Error while inserting new notifications into the database.");
    }
});

module.exports = router;