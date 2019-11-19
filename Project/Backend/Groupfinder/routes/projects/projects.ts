import express from 'express';
const router = express.Router();
const db_conn = require('../../databaseconnection');
import Project from '../../types/project';
const moment = require('moment');

/**
 * Middleware that is specific to this router
 */
router.use((req: any, res: any, next: Function) => {
    console.log(`Projects middleware is triggered`);
    next()
});

/////////////////////////////////////////////////////////////////////////////////////
// Define routes
/////////////////////////////////////////////////////////////////////////////////////

/**
 * Get project with specific ID from the database.
 */
router.get('/:project_id', (req: any, res: any) => {
    const project_id: number = parseInt(req.params.project_id);
    const query: string = 'SELECT * FROM project WHERE id=?;';
    const params: any[] = [project_id];
    db_conn.query(query, params, (err: any, rows: any) => {
        if (err){
            console.log(err);
            res.status(500).send(`Error while fetching project from database: ${err}`);
        } else if (rows.length < 1){
            res.status(404).send(`Error finding project with id ${project_id}.`);
        } else {
            const project: Project = {
                id: rows[0].id,
                creator_id: rows[0].creator_id,
                name: rows[0].name,
                status: rows[0].status,
                pitch: rows[0].pitch,
                created_at: rows[0].created_at,
                edited_at: rows[0].edited_at
            }
            res.status(200).json({project});
        }
    });
});


/**
 * Get all projects sorted from newest to oldest from the database.
 */
router.get('/', (req: any, res: any) => {
    const query: string = 'SELECT * FROM project ORDER BY created_at DESC;';
    db_conn.query(query, (err: any, rows: any) => {
        if (err) {
            console.log(err);
            res.status(500).send("Error while fetching all projects from the database.");
        } else {
            let allProjects: Project[] = [];
            for (let i = 0; i < rows.length; i++){
                let project: Project = {
                    id: rows[i].id,
                    creator_id: rows[i].creator_id,
                    name: rows[i].name,
                    status: rows[i].status,
                    pitch: rows[i].pitch,
                    created_at: moment(rows[i].created_at).format('YYYY-MM-DD hh:mm:ss'),
                    edited_at: moment(rows[i].edited_at).format('YYYY-MM-DD hh:mm:ss')
                }
                allProjects.push(project);
            }
            res.status(200).json(allProjects);
        }
    });
});


/**
 * Update existing project in the database.
 * @pre body of http request contains the project (type: Project) in JSON format
 */
router.put('/:project_id', (req: any, res: any) => {
    const projectID: number = parseInt(req.params.project_id);
    const project: Project = req.body.project;
    const query: string = 'UPDATE project SET creator_id=?, name=?, status=?, pitch=?, created_at=?, edited_at=? WHERE id=?;';
    const params: any[] = [project.creator_id, project.name, project.status, project.pitch, project.created_at, project.edited_at, projectID];
    db_conn.query(query, params, (err: any, rows: any) => {
        if (err) {
            console.log(err);
            res.status(500).send('Error while updating project in the database.');
        } else {
            res.status(200).send('Successfully updated project in the database.');
        }
    });
});


/**
 * Insert new project into the database.
 * @pre body of http request contains new project (type: Project) in JSON format
 */
router.post('/', async (req: any, res: any) => {
    const project: Project = req.body.project;
    const query: string = "INSERT INTO project (creator_id, name, status, pitch, created_at, edited_at) VALUES (?,?,?,?,?,?);";
    const params: any[] = [project.creator_id, project.name, project.status, project.pitch, project.created_at, project.edited_at];
    db_conn.query(query, params, async (err: any, rows: any) => {
        if (err) {
            console.log(err);
            res.status(500).send("Error while inserting new project into the database.");
        } else {
            try{
                const newID: number = await getProjectID(project);
                res.status(200).json({
                    id: newID
                });
            } catch (err) {
                console.log(err);
                res.status(500).send('Error while searching for project id.');
            }            
        }
    });
});


/**
 * Delete project from the database.
 */
router.delete('/:project_id', (req: any, res: any) => {
    const projectID: number = parseInt(req.params.project_id);
    const query: string = 'DELETE FROM project WHERE id=?;';
    const params: any[] = [projectID];
    db_conn.query(query, params, (err: any, rows: any) => {
        if (err) {
            console.log(err);
            res.status(500).send("Error while deleting project from the database.");
        } else {
            res.status(200).send("Successfully deleted project from the database.");
        }
    });
});


/////////////////////////////////////////////////////////////////////////////////////
// Define helper methods
/////////////////////////////////////////////////////////////////////////////////////

/**
 * Get id of project from the database.
 * @param project the project of which the id will be searched for (type: Project)
 * @returns promise of the project's id (type: Promise<number>)
 */
function getProjectID(project: Project): Promise<number>{
    return new Promise(
        (resolve, reject) => {
            const query: string = 'SELECT id FROM project WHERE creator_id=? AND name=? AND created_at=?;';
            const params: any[] = [project.creator_id, project.name, project.created_at];
            db_conn.query(query, params, (err: any, rows: any) => {
                if (err){
                    reject(err);
                } else if (rows.length < 1) {
                    reject("Could not find project's id.");
                } else {
                    const id: number = rows[0].id;
                    resolve(id);
                }
            });
        }
    );
}

module.exports = router;