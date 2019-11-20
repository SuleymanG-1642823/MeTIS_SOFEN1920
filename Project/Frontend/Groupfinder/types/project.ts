import Profile from './profile';

interface Project {
    id: number|null;
    name: string;
    status: number;
    pitch: string;
    created_at: string; // 'YYYY-MM-DD hh:mm:ss' format
    edited_at: string; // 'YYYY-MM-DD hh:mm:ss' format
    creator_id: number;
    creator_first_name: string;
    creator_last_name: string;
    profiles: Profile[];
}

export default Project;