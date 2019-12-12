import app from '../app';
import http from 'http';
import supertest from 'supertest';
import 'babel-polyfill';
var request;
var userID;

describe("TESTING ALL USER ROUTES", () => {
    beforeAll((done) => {
        var test_server = http.createServer(app);
        test_server.listen(done);
        request = supertest(test_server);
    });
    afterAll((done) => {
        test_server.close(done);
    });
    describe("POST /users/", () => {
        it("Should insert a user into the database", (done) => {
            let user = {
                user: {
                    id: null,
                    first_name: 'test',
                    last_name: 'test',
                    mail: 'test',
                    address: null,
                    zip: null,
                    city: null,
                    tel: null,
                    website: null,
                    social_media: null
                }
            }
            request.post('/users/')
            .send(user)
            .end((err, res) => {
                if (err) return done(err);
                userID = res.body.id;
                expect(res.status).toBe(200);
                expect(typeof(res.body.id)).toBe('number');
                done();
            })
        });
    });
    describe("GET /users/:user_id", () => {
        it("Should get a single user", (done) => {
            request.get(`/users/${userID}`)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.status).toBe(200);
                done();
            });
        });
        it("Should get a '404 not found' response", (done) => {
            request.get(`/users/0`)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.status).toBe(404);
                done();
            });
        });
    });
    describe("PUT /users/:user_id", () => {
        it("Should update an existing user in the database.", (done) => {
            let user = {
                user: {
                    id: null,
                    first_name: 'adapted',
                    last_name: 'test',
                    mail: 'test',
                    address: null,
                    zip: null,
                    city: null,
                    tel: null,
                    website: null,
                    social_media: null
                }
            };
            request.put(`/users/${userID}`)
            .send(user)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.status).toBe(200);   
                done();
            });
        });
    });
    describe("PUT /users/password/:user_id", () => {
        it ("Should change a user's password in the database.", (done) => {
            const data = {
                password: "newPassword"
            }
            request.put(`/users/password/${userID}`)
            .send(data)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.status).toBe(200);   
                done();
            });
        })
    })
    describe("DELETE /users/:user_id", () => {
        it("Should delete a user from the database.",(done) => {
            request.delete(`/users/${userID}`)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.status).toBe(200);   
                done();
            });
        });
    });
});