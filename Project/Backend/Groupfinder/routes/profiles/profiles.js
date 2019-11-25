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
const $profiles_methods = require('./profiles_methods');
/**
 * Middleware that is specific to this router
 */
router.use((req, res, next) => {
    console.log(`Profiles middleware is triggered`);
    next();
});
/////////////////////////////////////////////////////////////////////////////////////
// Define routes
/////////////////////////////////////////////////////////////////////////////////////
/**
 * Get all profiles of a project.
 */
router.get('/:project_id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const projectID = parseInt(req.params.project_id);
    try {
        const profiles = yield $profiles_methods.getProjectProfiles(projectID);
        res.status(200).json(profiles);
    }
    catch (err) {
        const statusCode = parseInt(err);
        res.status(statusCode).send("Error while fetching all profiles of a project.");
    }
}));
/**
 * Update existing profile in the database.
 * @pre the body of the http request contains the updated profile (type: Profile) in JSON format
 */
router.put('/:profile_id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const profileID = parseInt(req.params.profile_id);
    const profile = req.body.profile;
    try {
        yield $profiles_methods.updateProfile(profileID, profile);
        res.status(200).send("Successfully updated profile in the database.");
    }
    catch (err) {
        const statusCode = parseInt(err);
        res.status(statusCode).send("Error while updating profile in the database.");
    }
}));
/**
 * Insert a new profile into the database.
 * @pre the body of the http request contains the new profile (type: Profile) in JSON format
 */
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const profile = req.body.profile;
    try {
        const newProfileID = yield $profiles_methods.addProfile(profile);
        res.status(200).json({ id: newProfileID });
    }
    catch (err) {
        const statusCode = parseInt(err);
        res.status(statusCode).send("Error while inserting new profile into the database.");
    }
}));
/**
 * Delete a profile from the database.
 */
router.delete('/:profile_id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const profileID = parseInt(req.params.profile_id);
    try {
        yield $profiles_methods.deleteProfile(profileID);
        res.status(200).send("Successfully deleted profile from the database.");
    }
    catch (err) {
        const statusCode = parseInt(err);
        res.status(statusCode).send("Error while deleting profile from the database.");
    }
}));
module.exports = router;
//# sourceMappingURL=profiles.js.map