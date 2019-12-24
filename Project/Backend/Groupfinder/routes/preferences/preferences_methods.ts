const db_conn = require('../../databaseconnection');
import Category from '../../types/category';

export class Preferences {
    public getPreferences(userID: number, type: boolean): Promise<Category[]> {
        return new Promise(
            (resolve, reject) => {
                const select: string = "SELECT id as id, name as name, subcategory as subcategory "
                const from: string = "FROM preference AS p JOIN category AS c ON p.category_id = c.id "
                const where: string = "WHERE p.type=? AND p.user_id=?;"
                const query: string = select + from + where;
                const params: any[] = [type, userID];
                db_conn.query(query, params, (err: any, rows: any) => {
                    if (err) {
                        console.log(err);
                        reject('500');
                    } else {
                        let categories: Category[] = [];
                        for (let i=0; i < rows.length; i++){
                            let category: Category = {
                                id: rows[i].id,
                                name: rows[i].name,
                                subcategory: rows[i].subcategory
                            }
                            categories.push(category);
                        }
                        resolve(categories);
                    }
                });
            }
        );
    }
}
