import app from '../app';
import http from 'http';
import supertest from 'supertest';
import 'babel-polyfill';
const moment = require('moment');
var request;
var messageID;

describe("TESTING ALL MESSAGE ROUTES", () => {
    beforeAll((done) => {
        var test_server = http.createServer(app);
        test_server.listen(done);
        request = supertest(test_server);
    });
    afterAll((done) => {
        test_server.close(done);
    });
    describe("POST /messages/", () => {
        it("Should insert a new message into the database", (done) => {
            var message = {
                message: {
                    id: null,
                    sender_id: 1,
                    receiver_id: 2,
                    content: "test message",
                    sent_at: moment().format('YYYY-MM-DD hh:mm:ss')
                }
            }
            request.post('/messages/')
            .send(message)
            .end((err, res) => {
                if (err) return done(err);
                messageID = res.body.id;
                expect(res.status).toBe(200);
                expect(typeof(res.body.id)).toBe('number');
                done();
            })
        });
    });
    describe("GET /messages/conversation/:user_id1/:user_id2", () => {
        it("Should get a conversation between two users", (done) => {
            request.get(`/messages/conversation/1/2`)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.status).toBe(200);
                expect(typeof(res.body)).toBe('object');
                done();
            });
        });
    });
    describe("GET /messages/:user_id", () => {
        it("Should get all message received from / sent to a user", (done) => {
            request.get('/messages/1')
            .end((err, res) => {
                if (err) return done(err);
                expect(res.status).toBe(200);
                expect(typeof(res.body)).toBe('object');
                done();
            })
        });
    });
});