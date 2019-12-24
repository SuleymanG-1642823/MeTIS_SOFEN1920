interface Notification {
    id: number|null;
    user_id: number;
    status: number;
    dest_url: string;
    msg: string;
    created_at: string;
}

export default Notification;