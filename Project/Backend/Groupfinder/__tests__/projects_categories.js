import app from "../app";
const request = require("supertest");
import 'babel-polyfill';

describe("TESTING ALL PROJECT_CATEGORY ROUTES", () => {
    describe("POST /projects-categories/", () => {
        it("Should insert a new entry into project_category table", (done) => {
            request(app)
            .post('/projects-categories/1/1')
            .end((err, res) => {
                if (err) return done(err);
                expect(res.status).toBe(200);
                done();
            })
        });
    });
    describe("GET /projects-categories/project/:project_id", () => {
        it("Should get all categories to which a project belongs", (done) => {
            request(app)
            .get(`/projects-categories/project/1`)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.status).toBe(200);
                expect(typeof(res.body)).toBe('object');
                done();
            })
        });
    });
    describe("GET /projects-categories/category/:category_id", () => {
        it("Should get all projects that belong to a certain category", (done) => {
            request(app)
            .get('/projects-categories/category/1')
            .end((err, res) => {
                if (err) return done(err);
                expect(res.status).toBe(200);
                expect(typeof(res.body)).toBe('object');
                done();
            })
        })
    });
    describe("DELETE /projects-categories/:project_id/:category_id", () => {
        it("Should delete an entry from the project_category table", (done) => {
            request(app)
            .delete(`/projects-categories/1/1`)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.status).toBe(200);   
                done();
            });
        })
    });
});