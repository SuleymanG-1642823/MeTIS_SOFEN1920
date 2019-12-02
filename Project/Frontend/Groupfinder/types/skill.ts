interface Skill {
    name: string;
    experience: number;
    weight: number|null; // null if object is related to a user's skill, number if object is related to a profile's skill
}
export default Skill;