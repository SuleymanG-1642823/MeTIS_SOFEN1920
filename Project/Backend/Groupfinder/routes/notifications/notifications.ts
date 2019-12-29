import express from 'express';
import Notification from '../../types/notification';
const router = express.Router();
import { NotificationController } from './notification_methods';

let notificationcontroller: NotificationController = new NotificationController();

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
        let notifications: Notification[] = await notificationcontroller.getNotifications(user_id);
        res.status(200).json(notifications);
    } catch (err) {
        const statusCode: number = parseInt(err);
        res.status(statusCode).send("Error while fetching notifications from the database.");
    }    
});

/**
 * Get the number of new notifications that the user with the given id has received.
 */
router.get('/numOfNewNotifications/:user_id', async (req: any, res: any) => {
    const user_id: number = parseInt(req.params.user_id);
    try{
        let amount: number = await notificationcontroller.getNumberOfNewNotifications(user_id);
        res.status(200).json(amount);
    } catch (err) {
        const statusCode: number = parseInt(err);
        res.status(statusCode).send("Error while fetching number of new notifications from the database.");
    }    
});

/**
 * Update the states of all notifications with state 0 to 1 (only the notifications of the user with the given ID)
 * TODO: security, check if the one requesting it has the given id as user id
 */
router.put('/:user_id', async (req: any, res: any) => {
    const user_id: number = parseInt(req.params.user_id);
    try{
        await notificationcontroller.updateStateToSeen(user_id);
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
        await notificationcontroller.addNotification(notification);
        res.status(200).json("Successfully inserted new notification for user " + notification.user_id + ", status notification: " + notification.status);
    } catch (err) {
        const statusCode: number = parseInt(err);
        res.status(statusCode).send("Error while inserting new notifications into the database.");
    }
});

module.exports = router;