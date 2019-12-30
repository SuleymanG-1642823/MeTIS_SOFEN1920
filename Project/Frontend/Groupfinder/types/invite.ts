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

enum STATUS {
    PENDING = 0,
    ACCEPTED = 1,
    REJECTED = 2
}


export default Invite;
export {STATUS as INVITE_STATUS};