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
const $categories_methods = require('./categories_methods');
/**
 * Middleware that is specific to this router
 */
router.use((req, res, next) => {
    console.log(`Categories middleware is triggered`);
    next();
});
/////////////////////////////////////////////////////////////////////////////////////
// Define routes
/////////////////////////////////////////////////////////////////////////////////////
/**
 * Get category from the database.
 */
router.get('/:category_id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const categoryID = parseInt(req.params.category_id);
    try {
        const category = yield $categories_methods.getCategory(categoryID);
        res.status(200).json({ category });
    }
    catch (err) {
        const statusCode = parseInt(err);
        res.status(statusCode).send("Error while fetching category from the database.");
    }
}));
/**
 * Get all categories from the database.
 */
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categories = yield $categories_methods.getAllCategories();
        res.status(200).json(categories);
    }
    catch (err) {
        const statusCode = parseInt(err);
        res.status(statusCode).send("Error while fetching all category from the database.");
    }
}));
/**
 * Update an existing category in the database.
 * @pre the body of the request contains the updated category (type: Category) in JSON format
 */
router.put('/:category_id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const categoryID = parseInt(req.params.category_id);
    const category = req.body.category;
    try {
        yield $categories_methods.updateCategory(categoryID, category);
        res.status(200).send("Successfully updated category in the database.");
    }
    catch (err) {
        const statusCode = parseInt(err);
        res.status(statusCode).send("Error while updating category in the database.");
    }
}));
/**
 * Insert a new category into the database.
 * @pre the body of the request contains the new category (type: Category) in JSON format
 */
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const category = req.body.category;
    try {
        const newCategoryID = yield $categories_methods.addCategory(category);
        res.status(200).json({ id: newCategoryID });
    }
    catch (err) {
        const statusCode = parseInt(err);
        res.status(statusCode).send("Error while inserting category into the database.");
    }
}));
/**
 * Delete a category from the database.
 */
router.delete('/:category_id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const categoryID = parseInt(req.params.category_id);
    try {
        yield $categories_methods.deleteCategory(categoryID);
        res.status(200).send('Successfully deleted category from the database.');
    }
    catch (err) {
        const statusCode = parseInt(err);
        res.status(statusCode).send("Error while deleting category from the database.");
    }
}));
module.exports = router;
//# sourceMappingURL=categories.js.map