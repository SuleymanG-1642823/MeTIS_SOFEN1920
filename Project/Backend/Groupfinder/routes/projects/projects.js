"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const $project_methods = require('./project_methods');
/**
 * Middleware that is specific to this router
 */
router.use((req, res, next) => {
    console.log(`Projects middleware is triggered`);
    next();
});
/////////////////////////////////////////////////////////////////////////////////////
// Define routes
/////////////////////////////////////////////////////////////////////////////////////
/**
 * Get project with specific ID from the database.
 */
router.get('/:project_id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const project_id = parseInt(req.params.project_id);
    try {
        const project = yield $project_methods.getProject(project_id);
        res.status(200).json({ project });
    }
    catch (err) {
        const statusCode = parseInt(err);
        res.status(statusCode).send("Error while fetching project from the database.");
    }
}));
/**
 * Get all projects sorted from newest to oldest from the database.
 */
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const projects = yield $project_methods.getAllProjects();
        res.status(200).json(projects);
    }
    catch (err) {
        const statusCode = parseInt(err);
        res.status(statusCode).send("Error while fetching all projects from the database.");
    }
}));
/**
 * Update existing project in the database.
 * @pre body of http request contains the project (type: Project) in JSON format
 */
router.put('/:project_id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const projectID = parseInt(req.params.project_id);
    const project = req.body.project;
    try {
        yield $project_methods.updateProject(projectID, project);
        res.status(200).send('Successfully updated project in the database.');
    }
    catch (err) {
        const statusCode = parseInt(err);
        res.status(statusCode).send("Error while updating project in the database.");
    }
}));
/**
 * Insert new project into the database. All profiles of the project will be added too.
 * @pre body of http request contains new project (type: Project) in JSON format
 */
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const project = req.body.project;
    try {
        const newProjectID = yield $project_methods.addProject(project);
        res.status(200).json({ id: newProjectID });
    }
    catch (err) {
        const statusCode = parseInt(err);
        res.status(statusCode).send("Error while inserting new project into the database.");
    }
}));
/**
 * Delete project from the database. All profiles of the project will be deleted too.
 */
router.delete('/:project_id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const projectID = parseInt(req.params.project_id);
    try {
        yield $project_methods.deleteProject(projectID);
        res.status(200).send("Successfully deleted project from the database.");
    }
    catch (err) {
        const statusCode = parseInt(err);
        res.status(statusCode).send("Error while deleting project from the database.");
    }
}));
module.exports = router;
//# sourceMappingURL=projects.js.map