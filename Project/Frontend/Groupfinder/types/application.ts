import Answer from './answer';

interface Application {
    id: number|null;
    user_id: number;
    project_id: number;
    profile_id: number;
    answers: Answer[];
    status: number; // 0 = pending, 1 = accepted, 2 = rejected
    created_at: string; // 'YYYY-MM-DD hh:mm:ss' format
    edited_at: string; // 'YYYY-MM-DD hh:mm:ss' format
}

enum STATUS {
    PENDING = 0,
    ACCEPTED = 1,
    REJECTED = 2
}

export default Application;
export {STATUS as APPLICATION_STATUS};