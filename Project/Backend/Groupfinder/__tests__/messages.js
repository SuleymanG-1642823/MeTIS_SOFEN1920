import app from '../app';
const request = require("supertest");
const moment = require('moment');
import 'babel-polyfill';
var messageID;

describe("TESTING ALL MESSAGE ROUTES", () => {
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
            request(app)
            .post('/messages/')
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
            request(app)
            .get(`/messages/conversation/1/2`)
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
            request(app)
            .get('/messages/1')
            .end((err, res) => {
                if (err) return done(err);
                expect(res.status).toBe(200);
                expect(typeof(res.body)).toBe('object');
                done();
            })
        });
    });
});