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
const $messages_methods = require('./messages_methods');
/**
 * Middleware that is specific to this router
 */
router.use((req, res, next) => {
    console.log(`Messages middleware is triggered`);
    next();
});
/////////////////////////////////////////////////////////////////////////////////////
// Define routes
/////////////////////////////////////////////////////////////////////////////////////
/**
 * Get all messages sent between two users
 */
router.get('/conversation/:user_id1/:user_id2', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userID1 = parseInt(req.params.user_id1);
    const userID2 = parseInt(req.params.user_id2);
    try {
        const messages = yield $messages_methods.getConversation(userID1, userID2);
        res.status(200).json(messages);
    }
    catch (err) {
        const statusCode = parseInt(err);
        res.status(statusCode).send("Error while fetching conversation from the database.");
    }
}));
/**
 * Get all users that have a conversation with a specific user (with user_id as id).
 */
router.get('/:user_id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userID = parseInt(req.params.user_id);
    try {
        const userIDs = yield $messages_methods.getCorrespondents(userID);
        res.status(200).json(userIDs);
    }
    catch (err) {
        const statusCode = parseInt(err);
        res.status(statusCode).send("Error while fetching correspondents from the database.");
    }
}));
/**
 * Insert new message into the database.
 * @pre body of http request contains the new message (type: Message) in JSON format
 */
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const msg = req.body.message;
    try {
        const newMessageID = yield $messages_methods.addMessage(msg);
        res.status(200).json({ id: newMessageID });
    }
    catch (err) {
        const statusCode = parseInt(err);
        res.status(statusCode).send("Error while inserting new message into the database.");
    }
}));
module.exports = router;
//# sourceMappingURL=messages.js.map