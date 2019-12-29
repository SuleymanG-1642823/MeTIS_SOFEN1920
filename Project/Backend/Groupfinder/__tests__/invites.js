const app = require('../app');
const http = require('http');
const supertest = require('supertest');

import 'babel-polyfill';
import { isExportDeclaration, idText } from 'typescript';
import { isArray } from 'util';

var request;

let inviteID;
let inviteProfileID = 8;

describe("TESTING ALL MEMBERS ROUTES", () => {
    beforeAll((done) => {
        var test_server = http.createServer(app);
        test_server.listen(done);
        request = supertest(test_server);
    });
    afterAll((done) => {
        test_server.close(done);
    });
    describe("POST /invites/", () => {
        it("Should insert a new invite into the database.", (done) => {
            let newInvite = {
                id: null,
                sender_id: 1,
                receiver_id: 2, 
                profile_id: inviteProfileID,
                status: 0,
                sent_count: 0,
                max_count: 0,
                last_sent_at: ''
            }
            request.post(`/invites/`)
            .send({invite: newInvite})
            .set('Content-Type', 'application/json')
            .end((err, response) => {
                if (err) return done(err);
                expect(response.status).toBe(200);
                done();
            })
        })
    });
    describe("GET /invites/lastid/", () => {
        it("Should return the id  of the last inserted invite (inserted by previous test).", (done) => {
            request.get(`/invites/lastid/`).end((err, res) => {
                if (err) return done(err);
                expect(res.status).toBe(200);
                expect(typeof(res.body.id)).toBe('number');
                inviteID = res.body.id;
                done();
            })
        });
    });
    describe("GET /invites/invite/:invite_id", () => {
        it("Should return invite with given id (id of invite inserted by the test).", (done) => {
            request.get(`/invites/invite/${inviteID}`).end((err, res) => {
                if (err) return done(err);
                expect(res.status).toBe(200);
                expect(typeof(res.body)).toBe('object');
                done();
            })
        });
    });
    describe("GET /invites/profile/:profile_id", () => {
        it("Should return all invites belonging to given profile.", (done) => {
            request.get(`/invites/profile/${inviteProfileID}`).end((err, res) => {
                if (err) return done(err);
                expect(res.status).toBe(200);
                expect(typeof(res.body)).toBe('object');
                expect(isArray(res.body)).toBe(true);
                expect(res.body.length).toBeGreaterThan(0);
                done();
            })
        });
    });
    describe("PUT /invites/:invite_id/:status", () => {
        it("Should status of invite with given id to given status.", (done) => {
            request.put(`/invites/${inviteID}/${1}`).end((err, res) => {
                if (err) return done(err);
                expect(res.status).toBe(200);
                done();
            })
        });
    });
    describe("GET /invites/invite/:invite_id", () => {
        test("The status of the invite inserted in this test should be 1.", (done) => {
            request.get(`/invites/invite/${inviteID}`).end((err, res) => {
                if (err) return done(err);
                expect(res.status).toBe(200);
                expect(res.body.status).toBe(1);
                done();
            })
        });
    });
    describe("DELETE /invites/:invite_id", () => {
        test("Should delete invite with given id.", (done) => {
            request.delete(`/invites/${inviteID}`).end((err, res) => {
                if (err) return done(err);
                expect(res.status).toBe(200);
                done();
            })
        });
    });
    describe("GET /invites/invite/:invite_id", () => {
        test("Should return status code 404 becuase we deleted the invite on the previous test.", (done) => {
            request.get(`/invites/${inviteID}/${1}`).end((err, res) => {
                if (err) return done(err);
                expect(res.status).toBe(404);
                done();
            })
        });
    });
});