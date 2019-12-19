/**
 * This class is a simple interface to the database that can be used to insert
 * data with its function calls. It's simple because it can only insert data.
 * 
 * Why the functions are async: The function for executing a query in the db is async,
 * it has a Promise that needs handling. So to wait for an async function to finish
 * the keyword await needs to be used but that is possible only if the function that
 * is going to await is async itself! Hence all the public functions are async so they
 * can behave synchronously -_-
 * 
 * Other attempts resulted in an unhandled promise rejection warning.
 */

export default class SimpleDBInterface{
    private db_conn: any = null;

    constructor(db_conn: any){
        this.db_conn = db_conn;
    }

    private dbQueryHelper(query: string, params: any[]): Promise<void>{
        return new Promise((resolve: any, reject: any) => {
            this.db_conn.query(query, params, async (err: any, rows: any) => {
                if (err){
                    reject();
                }
            });
            resolve();
        });
    }

    /**
     * Insert a new user record, update if given id exists.
     * @param id user id
     * @param firstName users' name 
     * @param lastName 
     * @param mail users' mail
     */
    public async insertNewUser(id: number, firstName: string, lastName: string, mail: string){
        const query = `
            INSERT INTO user (id, first_name, last_name, mail) 
            VALUES (?, ?, ?, ?) 
            ON DUPLICATE KEY UPDATE 
                first_name = ?, 
                last_name = ?, 
                mail = ?;
        `;
        let params = [id, firstName, lastName, mail, firstName, lastName, mail];

        try{
            await this.dbQueryHelper(query, params);            
        }catch(e){}
    }

    /**
     * Insert a new project record, update if given id exists.
     * @param id prohect id
     * @param creator_id user id of creator
     * @param name project name
     * @param status project status
     */
    public async insertNewProject(id: number, creator_id: number, name: string, status: number){
        const query = `
            INSERT INTO project (id, creator_id, name, status) 
            VALUES (?, ?, ?, ?) 
            ON DUPLICATE KEY UPDATE 
                creator_id = ?, 
                name = ?, 
                status = ?;
        `;
        let params = [id, creator_id, name, status, creator_id, name, status];

        try{
            await this.dbQueryHelper(query, params);            
        }catch(e){}            
    }

    /**
     * Insert a new profile record, update if given id exists.
     * @param id profile id
     * @param name profile name
     * @param project_id id of project that the profile belongs to
     */
    public async insertNewProfile(id: number, name: string, project_id: number){
        const query = `
            INSERT INTO profile (id, name, project_id) 
            VALUES (?, ?, ?) 
            ON DUPLICATE KEY UPDATE
                name = ?,
                project_id = ?; 
        `;
        let params = [id, name, project_id, name, project_id];

        try{
            await this.dbQueryHelper(query, params);            
        }catch(e){}          
    }

    /**
     * Insert a new profile skill record, update if given id exists.
     * @param profile_id id of profile to which this skill belongs to
     * @param skill_name 
     * @param skill_experience experience of skill (in months)
     * @param weight weight of skill
     */
    public async insertNewProfileSkill(profile_id: number, skill_name: string, skill_experience: number, weight: number){
        const query = `
            INSERT INTO profile_skill (profile_id, skill_name, skill_experience, weight)
            VALUES (?, ?, ?, ?) 
            ON DUPLICATE KEY UPDATE 
                skill_name = ?, 
                skill_experience = ?, 
                weight = ?;
        `;
        let params = [profile_id, skill_name, skill_experience, weight, skill_name, skill_experience, weight];

        try{
            await this.dbQueryHelper(query, params);            
        }catch(e){}        
    }

    /**
     * Insert a new user skill record, update if given id exists.
     * @param user_id id of user that has this skill
     * @param skill_name 
     * @param skill_experience 
     */
    public async insertNewUserSkill(user_id: number, skill_name: string, skill_experience: number){
        const query = `
            INSERT INTO user_skill (user_id, skill_name, skill_experience)
            VALUES (?, ?, ?) 
            ON DUPLICATE KEY UPDATE 
                skill_name = ?, 
                skill_experience = ?;
        `;
        let params = [user_id, skill_name, skill_experience, skill_name, skill_experience];

        try{
            await this.dbQueryHelper(query, params);            
        }catch(e){}        
    }
}