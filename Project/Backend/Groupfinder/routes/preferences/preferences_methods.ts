const db_conn = require('../../databaseconnection');
import Category from '../../types/category';

/**
 * Manage all actions with the preference (and category) table in the database.
 * This class can get, insert, change and delete categories preferred by a user.
 */
export class PreferenceController {
    /**
     * Get all preferred categories by a user.
     * @param userID the id of the user.
     * @param type true for fetching preferred categories, false for fetching non-preferred categories
     */
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


    /**
     * Insert categories (non-)preferred by a user into the database.
     * @param userID the id of the user.
     * @param categories categories to be inserted.
     * @param type true for fetching preferred categories, false for fetching non-preferred categories.
     */
    public addPreferences(userID: number, categories: Category[], type: boolean): Promise<void> {
        return new Promise(
            async (resolve, reject) => {
                try{
                    for (let i = 0; i < categories.length; i++) {
                        await this.addPreference(userID, categories[i], type);
                    }
                    resolve();
                } catch (err) {
                    reject(err);
                }
            }
        );
    }


    /**
     * Delete preferred categories from the database.
     * @param userID id of the user.
     * @param categories categories to be deleted as preferred category.
     * @param type true for deleting preferred category, false for deleting non-preferred category.
     */
    public deletePreferences(userID: number, categories: Category[]): Promise<void> {
        return new Promise(
            async (resolve, reject) => {
                try{
                    for (let i = 0; i < categories.length; i++){
                        await this.deletePreference(userID, categories[i]);
                    }
                    resolve();
                } catch (err) {
                    reject(err);
                }

            }
        );
    }


    /**
     * Insert category (non-)preferred by a user into the database.
     * @param userID the id of the user.
     * @param category (non-)preferred category to be inserted.
     * @param type true for inserting preferred category, false for inserting non-preferred category.
     */
    private addPreference(userID: number, category: Category, type: boolean): Promise<void> {
        return new Promise(
            (resolve, reject) => {
                const query: string = "INSERT INTO preference VALUES (?,?,?);";
                const params: any[] = [userID, category.id, type];
                db_conn.query(query, params, (err: any, rows: any) => {
                    if (err) {
                        console.log(err);
                        reject('500')
                    } else {
                        resolve();
                    }
                })
            }
        );
    }


    /**
     * Delete a user's category preference from the database.
     * @param userID id of the user.
     * @param category category to be deleted as preferred category.
     * @param type true for deleting preferred category, false for deleting non-preferred category.
     */
    private deletePreference(userID: number, category: Category): Promise<void> {
        return new Promise(
            (resolve, reject) => {
                const query: string = "DELETE FROM preference WHERE user_id=? AND category_id=?;";
                const params: any[] = [userID, category.id];
                db_conn.query(query, params, (err: any, rows: any) => {
                    if (err) {
                        console.log(err);
                        reject('500');
                    } else {
                        resolve();
                    }
                })
            }
        );
    }
}
