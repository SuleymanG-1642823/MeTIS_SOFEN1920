interface Review {
    id: number|null;
    writer_id: number;
    writer_first_name: string;
    writer_last_name: string;
    receiver_id: number;
    receiver_first_name: string;
    receiver_last_name: string;
    project_id: number;
    rating: number;
    message: string;
}

export default Review;