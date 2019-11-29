import Profile from './profile';

interface Project {
    id: number|null;
    name: string;
    status: number; // 0: just created looking for members, 1: looking for members, 2: found all members, awaiting approval, 3: found all members, approved
    pitch: string;
    created_at: string; // 'YYYY-MM-DD hh:mm:ss' format
    edited_at: string; // 'YYYY-MM-DD hh:mm:ss' format
    creator_id: number;
    creator_first_name: string;
    creator_last_name: string;
    profiles: Profile[];
}

export default Project;