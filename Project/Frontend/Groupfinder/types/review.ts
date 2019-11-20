interface Review {
    id: number|null;
    writer_id: number;
    receiver_id: number;
    project_id: number;
    rating: number;
    message: string;
}

export default Review;