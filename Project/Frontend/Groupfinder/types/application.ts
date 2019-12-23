import Answer from './answer';

interface Application {
    id: number|null;
    user_id: number;
    project_id: number;
    profile_id: number;
    answers: Answer[];
    status: number;
    created_at: string; // 'YYYY-MM-DD hh:mm:ss' format
    edited_at: string; // 'YYYY-MM-DD hh:mm:ss' format
}

export default Application;