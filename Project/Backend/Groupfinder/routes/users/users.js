"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
/**
 * Middleware that is specific to this router
 */
router.use(function usersMiddleware(req, res, next) {
    console.log(`Users middleware is triggered`);
    next();
});
/////////////////////////////////////////////////////////////////////////////////////
// define routes
/////////////////////////////////////////////////////////////////////////////////////
router.get('/:user_id', (req, res) => {
    const user_id = parseInt(req.params.user_id);
    console.log(req.params.user_id);
    // Normally, user data would be fetched from the database here.
    const user = {
        id: user_id,
        first_name: 'Liese',
        last_name: 'Bekkers',
        email: 'liese.bekkers@student.uhasselt.be'
    };
    res.status(200).json(user);
});
router.post('/', (req, res) => {
    // Normally, data from the payload would be handled here.
    res.status(200).send('POST request received.');
});
module.exports = router;
//# sourceMappingURL=users.js.map