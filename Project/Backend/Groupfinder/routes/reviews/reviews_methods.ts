import Review from '../../types/review';
const db_conn = require('../../databaseconnection');


/**
 * Get all reviews of a user (where user is the receiver, not the writer).
 * @param userID the id of the user
 */
function getReviewsForReceiver(userID: number): Promise<Review[]>{
    return new Promise(
        (resolve: any, reject: any) => {
            const select: string = "SELECT r.id as r_id, writer_id, writer.first_name as w_f, writer.last_name as w_l, receiver_id, receiver.first_name as r_f, receiver.last_name as r_l, r.project_id, r.rating, r.message ";
            const from: string = "FROM review AS r JOIN user AS receiver ON r.receiver_id = receiver.id JOIN user AS writer ON r.writer_id = writer.id ";
            const where: string = "WHERE receiver.id=?;";
            const query: string = select + from + where;
            //const query: string =  "SELECT * FROM review AS r JOIN user AS receiver ON r.receiver_id = receiver.id JOIN user AS writer ON r.writer_id = writer.id WHERE receiver_id=?;";
            const params: any[] = [userID];
            db_conn.query(query, params, (err: any, rows: any) => {
                if (err){
                    console.log(err);
                    reject('500');
                } else {
                    let reviews: Review[] = [];
                    for (let i = 0; i < rows.length; i++){
                        let review: Review = {
                            id: rows[i].r_id,
                            writer_id: rows[i].writer_id,
                            writer_first_name: rows[i].w_f,
                            writer_last_name: rows[i].w_l,
                            receiver_id: rows[i].receiver_id,
                            receiver_first_name: rows[i].r_f,
                            receiver_last_name: rows[i].r_l,
                            project_id: rows[i].project_id,
                            rating: rows[i].rating,
                            message: rows[i].message
                        }
                        reviews.push(review);
                    }
                    resolve(reviews);
                }
            });
        }
    );
}

module.exports = {
    getReviewsForReceiver
}