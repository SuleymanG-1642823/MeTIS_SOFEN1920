import app from '../app';
const request = require("supertest");
import 'babel-polyfill';
var profileID;

describe("TESTING ALL PROFILE ROUTES", () => {
    describe("POST /profiles/", () => {
        it("Should insert a new profile into the database", (done) => {
            var profile = {
                profile: {
                    id: null,
                    name: "web programmer",
                    project_id: 1
                }
            }
            request(app)
            .post('/profiles/')
            .send(profile)
            .end((err, res) => {
                if (err) return done(err);
                profileID = res.body.id;
                expect(res.status).toBe(200);
                expect(typeof(res.body.id)).toBe('number');
                done();
            })
        });
    });
    describe("GET /profiles/:project_id", () => {
        it("Should get all profiles of a project from the database", (done) => {
            request(app)
            .get(`/profiles/1`)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.status).toBe(200);
                done();
            })
        });
    });
    describe("PUT /profiles/:profile_id", () => {
        it("Should update an existing profile in the database", (done) => {
            var profile = {
                profile: {
                    id: null,
                    name: "java programmer",
                    project_id: 1
                }
            }
            request(app)
            .put(`/profiles/${profileID}`)
            .send(profile)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.status).toBe(200);
                done();
            });
        })
    });
    describe("DELETE /profiles/:profile_id", () => {
        it("Should delete a profile from the database", (done) => {
            request(app)
            .delete(`/profiles/${profileID}`)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.status).toBe(200);   
                done();
            });
        })
    });
});