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
Object.defineProperty(exports, "__esModule", { value: true });
const db_conn = require('../../databaseconnection');
/**
 * Get category from the database.
 * @param categoryID the id of the category to be searched for
 */
function getCategory(categoryID) {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM category WHERE id=?;';
        const params = [categoryID];
        db_conn.query(query, params, (err, rows) => {
            if (err) {
                console.log(err);
                reject('500');
            }
            else if (rows.length < 1) {
                console.log('Could not find category.');
                reject('404');
            }
            else {
                const category = {
                    id: rows[0].id,
                    name: rows[0].name
                };
                resolve(category);
            }
        });
    });
}
/**
 * Get all categories stored in the database.
 * @returns a promise of the list of all categories
 */
function getAllCategories() {
    return new Promise((resolve, reject) => {
        const query = "SELECT * FROM category;";
        db_conn.query(query, (err, rows) => {
            if (err) {
                console.log(err);
                reject('500');
            }
            else {
                let categories = [];
                for (let i = 0; i < rows.length; i++) {
                    let category = {
                        id: rows[i].id,
                        name: rows[i].name
                    };
                    categories.push(category);
                }
                resolve(categories);
            }
        });
    });
}
/**
 * Update an existing category in the database.
 * @param categoryID the id of the category to be updated
 * @param category the category to be updated
 */
function updateCategory(categoryID, category) {
    return new Promise((resolve, reject) => {
        const query = 'UPDATE category SET name=? WHERE id=?;';
        const params = [category.name, categoryID];
        db_conn.query(query, params, (err, rows) => {
            if (err) {
                console.log(err);
                reject('500');
            }
            else {
                resolve();
            }
        });
    });
}
/**
 * Insert a new category into the database.
 * @param category the new category
 * @returns a promise of the id of the new category
 */
function addCategory(category) {
    return new Promise((resolve, reject) => {
        const query = 'INSERT INTO category (name) VALUES (?);';
        const params = [category.name];
        db_conn.query(query, params, (err, rows) => __awaiter(this, void 0, void 0, function* () {
            if (err) {
                console.log(err);
                reject('500');
            }
            else {
                try {
                    const newCategoryID = yield getCategoryID(category);
                    resolve(newCategoryID);
                }
                catch (err) {
                    reject(err);
                }
            }
        }));
    });
}
/**
 * Get the ID of a category
 * @param category the category for which we'll search the id
 */
function getCategoryID(category) {
    return new Promise((resolve, reject) => {
        const query = 'SELECT id FROM category WHERE name=? ORDER BY id DESC;';
        const params = [category.name];
        db_conn.query(query, params, (err, rows) => {
            if (err) {
                console.log(err);
                reject('500');
            }
            else if (rows.length < 1) {
                console.log('Could not find id of category.');
                reject('404');
            }
            else {
                const id = rows[0].id;
                resolve(id);
            }
        });
    });
}
/**
 * Delete a category from the database.
 * @param categoryID the id of the category to be deleted
 */
function deleteCategory(categoryID) {
    return new Promise((resolve, reject) => {
        const query = "DELETE FROM category WHERE id=?;";
        const params = [categoryID];
        db_conn.query(query, params, (err, rows) => {
            if (err) {
                console.log(err);
                reject('500');
            }
            else {
                resolve();
            }
        });
    });
}
module.exports = {
    getCategory,
    getAllCategories,
    updateCategory,
    addCategory,
    deleteCategory
};
//# sourceMappingURL=categories_methods.js.map