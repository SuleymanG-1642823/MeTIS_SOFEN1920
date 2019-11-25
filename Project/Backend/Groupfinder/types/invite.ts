interface Invite {
    id: number|null;
    sender_id: number;
    receiver_id: number;
    profile_id: number;
    status: number;
    sent_count: number;
    max_count: number;
    last_sent_at: string|null //YYYY-MM-DD hh:mm:ss
}

export default Invite;