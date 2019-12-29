import app from '../app';
import http from 'http';
import supertest from 'supertest';
import 'babel-polyfill';
const moment = require('moment');
var request;

describe("TESTING ALL USERS_SKILLS ROUTES", () => {
    beforeAll((done) => {
        var test_server = http.createServer(app);
        test_server.listen(done);
        request = supertest(test_server);
    });
    afterAll((done) => {
        test_server.close(done);
    });
    describe("POST /users_skills/:user_id", () => {
        it("Should insert a new entry in the user_skill table.", (done) => {
            var body = {
                skill: {
                    name: 'testSkill',
                    experience: 1,
                    weight: null
                }
            }
            request.post('/users_skills/1')
            .send(body)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.status).toBe(200)
                done();
            })
        })
    })
    describe("PUT /users_skills/:user_id/:skill_name", () => {
        it("Should update an existing skill of a user", (done) => {
            var body = {
                skill: {
                    name: 'testSkill',
                    experience: 2,
                    weight: null
                }
            }
            request.put(`/users_skills/1/testSkill`)
            .send(body)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.status).toBe(200);
                done();
            })
        });
    });
    describe("GET /users_skills/:user_id", () => {
        it("Should get all skills of a user", (done) => {
            request.get('/users_skills/1')
            .end((err, res) => {
                if (err) return done(err);
                expect(res.status).toBe(200);
                expect(typeof(res.body)).toBe('object');
                done();
            })
        });
    });
    describe("DELETE /users_skills/:user_id/:skill_name", () => {
        it("Should delete a skill of a user", (done) => {
            request.delete('/users_skills/1/testSkill')
            .end((err, res) => {
                if (err) return done(err);
                expect(res.status).toBe(200);
                done();
            })
        })
    })
});
