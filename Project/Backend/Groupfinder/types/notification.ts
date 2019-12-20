/**
 * Status codes:
 *      0: not seen
 *      1: seen
 */
interface Notification {
    id: number|null;
    user_id: number;
    status: number;
    dest_url: string;
}

export default Notification;