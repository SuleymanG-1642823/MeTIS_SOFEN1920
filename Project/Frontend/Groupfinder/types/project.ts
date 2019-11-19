interface Project {
    id: number|null;
    creator_id: number;
    name: string;
    status: number;
    pitch: string;
    created_at: string; // 'YYYY-MM-DD hh:mm:ss' format
    edited_at: string; // 'YYYY-MM-DD hh:mm:ss' format
}

export default Project;