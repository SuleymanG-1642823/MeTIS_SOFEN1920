import Skill from "./skill";

interface Profile {
    id: number|null;
    name: string;
    project_id: number;
    skills: Skill[];
    questions: string[];
}

export default Profile;
