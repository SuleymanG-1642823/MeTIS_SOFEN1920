import Skill from "./skill";
import Questionnaire from "./questionnaire";

interface Profile {
    id: number|null;
    name: string;
    project_id: number;
    skills: Skill[];
    questionnaire: Questionnaire;
}

export default Profile;
