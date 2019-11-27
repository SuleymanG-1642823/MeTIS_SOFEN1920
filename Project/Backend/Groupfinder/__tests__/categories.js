import app from '../app';
const request = require("supertest");
import 'babel-polyfill';
var categoryID;

describe("TESTING ALL CATEGORY ROUTES", () => {
    describe("POST /categories/", () => {
        it("Should insert a new category into the database", (done) => {
            var category = {
                category: {
                    id: null,
                    name: "testCategory"
                }                
            }
            request(app)
            .post('/categories/')
            .send(category)
            .end((err, res) => {
                if (err) return done(err);
                categoryID = res.body.id;
                expect(res.status).toBe(200);
                expect(typeof(res.body.id)).toBe('number');
                done();
            })
        });
    });
    describe("GET /categories/:category_id", () => {
        it("Should get a '404 not found' response", (done) => {
            request(app)
            .get(`/categories/0`)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.status).toBe(404);
                done();
            });
        });
        it("Should get a single category", (done) => {
            request(app)
            .get(`/categories/${categoryID}`)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.status).toBe(200);
                done();
            });
        });
    });
    describe("GET /categories", () => {
        it("Should get all categories from the database", (done) => {
            request(app)
            .get('/categories/')
            .end((err, res) => {
                if (err) return done(err);
                expect(res.status).toBe(200);
                expect(typeof(res.body)).toBe('object');
                done();
            })
        });
    });
    describe("PUT /categories/:category_id", () => {
        it("Should update an existing category in the database.", (done) => {
            var category = {
                category: {
                    id: null,
                    name: "adapted category"
                }                
            }
            request(app)
            .put(`/categories/${categoryID}`)
            .send(category)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.status).toBe(200);   
                done();
            });
        });
    });
    describe("DELETE /categories/:category_id", () => {
        it("Should delete a category from the database", (done) => {
            request(app)
            .delete(`/categories/${categoryID}`)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.status).toBe(200);   
                done();
            });
        });
    });
});