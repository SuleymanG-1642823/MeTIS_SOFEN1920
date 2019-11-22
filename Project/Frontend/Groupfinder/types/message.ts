interface Message{
    id: number|null;
    sender_id: number;
    receiver_id: number;
    content: string;
    sent_at: string; // 'YYYY-MM-DD hh:mm:ss' format
}

export default Message;