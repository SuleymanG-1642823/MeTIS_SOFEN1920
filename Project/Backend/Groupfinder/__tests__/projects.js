import app from "../app";
const request = require("supertest");
import 'babel-polyfill';
var projectID;

describe("TESTING ALL PROJECT ROUTES", () => {
    describe("POST /projects/", () => {
        it("Should insert a new project (with profiles) into the database", (done) => {
            var project = {
                project: {
                    id: null,
                    name: "test project",
                    status: 1,
                    pitch: "test pitch",
                    created_at: "2019-11-27 10:00:00", // 'YYYY-MM-DD hh:mm:ss' format
                    edited_at: "2019-11-27 10:00:00", // 'YYYY-MM-DD hh:mm:ss' format
                    creator_id: 1,
                    creator_first_name: 'Lennert',
                    creator_last_name: 'Geebelen',
                    profiles: [
                        {
                            id: null,
                            name: "test profile",
                            project_id: null
                        }
                    ]
                }
            }
            request(app)
            .post('/projects/')
            .send(project)
            .end((err, res) => {
                if (err) return done(err);
                projectID = res.body.id;
                expect(res.status).toBe(200);
                expect(typeof(res.body.id)).toBe('number');
                done();
            })
        });
    });
    describe("GET /projects/:project_id", () => {
        it("Should get a project from the database", (done) => {
            request(app)
            .get(`/projects/${projectID}`)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.status).toBe(200);
                done();
            })
        });
    });
    describe("GET /projects/", () => {
        it("Should get all projects from the database", (done) => {
            request(app)
            .get('/projects/')
            .end((err, res) => {
                if (err) return done(err);
                expect(res.status).toBe(200);
                done();
            })
        })
    });
    describe("PUT /projects/:project_id", () => {
        it("Should update an existing project in the database", (done) => {
            var project = {
                project: {
                    id: null,
                    name: "test project adapted",
                    status: 1,
                    pitch: "test pitch adapted",
                    created_at: "2019-11-27 10:00:00", // 'YYYY-MM-DD hh:mm:ss' format
                    edited_at: "2019-11-27 11:00:00", // 'YYYY-MM-DD hh:mm:ss' format
                    creator_id: 1,
                    creator_first_name: 'Lennert',
                    creator_last_name: 'Geebelen',
                    profiles: [
                        {
                            id: null,
                            name: "test profile adapted",
                            project_id: null
                        }
                    ]
                }
            }
            request(app)
            .put(`/projects/${projectID}`)
            .send(project)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.status).toBe(200);
                done();
            });
        })
    });
    describe("DELETE /projects/:project_id", () => {
        it("Should delete a profile from the database", (done) => {
            request(app)
            .delete(`/projects/${projectID}`)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.status).toBe(200);   
                done();
            });
        })
    });
});