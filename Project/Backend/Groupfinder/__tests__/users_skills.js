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
    describe("GET /users_skills/:user_id", () => {
        it("Should get all skills of a user", (done) => {
            request.get('/users_skills/6')
            .end((err, res) => {
                if (err) return done(err);
                expect(res.status).toBe(200);
                expect(typeof(res.body)).toBe('object');
                done();
            })
        });
    });
});