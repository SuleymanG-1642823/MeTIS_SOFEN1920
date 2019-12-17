interface Questionnaire {
    id: number|null;
    name: string;
    creator_id: number;
    questions: string[];
}

export default Questionnaire;
