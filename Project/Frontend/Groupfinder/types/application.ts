interface Application {
    id: number|null;
    creator_id: number;
    project_id: number;
    profile_id: number;
    answers: any;
    status: number;
    created_at: string; // 'YYYY-MM-DD hh:mm:ss' format
    edited_at: string; // 'YYYY-MM-DD hh:mm:ss' format
}

export default Application;