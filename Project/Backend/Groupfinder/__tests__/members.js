const app = require('../app');
const http = require('http');
const supertest = require('supertest');

import 'babel-polyfill';
import { isExportDeclaration, idText } from 'typescript';
var request;

describe("TESTING ALL MEMBERS ROUTES", () => {
    beforeAll((done) => {
        var test_server = http.createServer(app);
        test_server.listen(done);
        request = supertest(test_server);
    });
    afterAll((done) => {
        test_server.close(done);
    });
    describe("POST /members/:user_id/:profile_id/:project_id", () => {
        it("Should insert a new member into the database", (done) => {
            request.post('/members/2/1/1').end((err, res) => {
                if (err) return done(err);
                expect(res.status).toBe(200);
                done();
            })
        })
    });
    describe("GET /members/profile/:profile_id", () => {
        it("Should return all the members for one profile", (done) => {
            request.get('/members/profile/1').end((err, res) => {
                if (err) return done(err),
                expect(res.status).toBe(200);
                expect(res.text[0]).toBeTruthy();
                done();
            })
        })
    });
    describe("DELETE /members/:user_id/:profile_id/:project_id", () => {
        it("Should remove the member from the profile", (done) => {
            request.delete('/members/2/1/1').end((err, res) => {
                if (err) return done(err),
                expect(res.status).toBe(200);
                done();
            })
        })
    });
});