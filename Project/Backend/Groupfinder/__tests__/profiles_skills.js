import app from '../app';
import http from 'http';
import supertest from 'supertest';
import 'babel-polyfill';
var request;

describe("TESTING ALL PROFILE_SKILL ROUTES", () => {
    beforeAll((done) => {
        var test_server = http.createServer(app);
        test_server.listen(done);
        request = supertest(test_server);
    });
    afterAll((done) => {
        test_server.close(done);
    });
    describe("POST /profiles_skills/", () => {
        it("Should insert an entry in the profile_skill table", (done) => {
            var body = {
                profileID: 1,
                skill: {
                    "name": "testSkill",
                    "experience": 3,
                    "weight": 1
                }
            }
            request.post("/profiles_skills/")
            .send(body)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.status).toBe(200);
                done();
            })
        });
    });
    describe("GET /profiles_skills/:profile_id", () => {
        it("Should get all skills for a profile", (done) => {
            request.get(`/profiles_skills/1`)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.status).toBe(200);
                expect(typeof(res.body)).toBe('object');
                done();
            })
        });
    });
    describe("PUT /profiles_skills/:profile_id/:skill_name", () => {
        it("Should update an entry in the profile_skill table", (done) => {
            var body = {
                skill: {
                    "name": "testSkill",
                    "experience": 4,
                    "weight": 1
                }
            }
            request.put('/profiles_skills/1/testSkill')
            .send(body)
            .end((err,res) => {
                if (err) return done(err);
                expect(res.status).toBe(200);
                done();
            })
        })
    });
    describe("DELETE /profiles_skills/:profile_id/:skill_name", () => {
        it("Should delete an entry from the profile_skill table", (done) => {
            request.delete('/profiles_skills/1/testSkill')
            .end((err,res) => {
                if (err) return done(err);
                expect(res.status).toBe(200);
                done();
            })
        })
    });
});