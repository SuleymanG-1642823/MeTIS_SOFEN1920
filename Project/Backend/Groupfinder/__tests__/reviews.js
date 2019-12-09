import app from '../app';
import http from 'http';
import supertest from 'supertest';
import 'babel-polyfill';
var request;

describe("TESTING ALL REVIEWS ROUTES", () => {
    beforeAll((done) => {
        var test_server = http.createServer(app);
        test_server.listen(done);
        request = supertest(test_server);
    });
    afterAll((done) => {
        test_server.close(done);
    });
    describe("GET /reviews/receiver/:user_id", () => {
        it("Should get all reviews about one user", (done) => {
            request.get(`/reviews/receiver/1`)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.status).toBe(200);
                expect(typeof(res.body)).toBe('object');
                done();
            })
        });
    });
});