const app = require('../app');
const http = require('http');
const supertest = require('supertest');

import 'babel-polyfill';
import { isExportDeclaration } from 'typescript';
var request;
var applicationID;

describe("TESTING ALL APPLICATION ROUTES", () => {
    beforeAll((done) => {
        var test_server = http.createServer(app);
        test_server.listen(done);
        request = supertest(test_server);
    });
    afterAll((done) => {
        test_server.close(done);
    });
    describe("POST /applications/", () => {
        it("Should inser a new application into the database", (done) => {
            var application = {
                id: null,
                user_id: 1,
                project_id: 1,
                profile_id: 1,
                answers: [
                    {question: "This is a question", answer: "This is an answer"},
                    {question: "This is a question 2", answer: "This is an answer 2"}
                ],
                status: 0,
                created_at: "2019-12-16 14:00:43",
                edited_at: "2019-12-16 14:00:43"
            };
            application = {application: application};
            request.post('/applications/').send(application).end((err, res) => {
                if (err) return done(err);
                applicationID = res.body.id;
                expect(res.status).toBe(200);
                expect(typeof(res.body.id)).toBe('number');
                done();
            })
        })
    });
    describe("PUT /applications/status/:application_id/:status", () => {
        it("Should change the status of the application", (done) => {
            request.put(`/applications/status/${applicationID}/1`).end((err, res) => {
                if (err) return done(err);
                expect(res.status).toBe(200);
                done();
            })
        })
    });
    describe("DELETE /applications/:application_id", () => {
        it("Should delete the application", (done) => {
            request.delete(`/applications/${applicationID}`).end((err, res) => {
                if (err) return done(err);
                expect(res.status).toBe(200);
                done();
            })
        })
    })
});