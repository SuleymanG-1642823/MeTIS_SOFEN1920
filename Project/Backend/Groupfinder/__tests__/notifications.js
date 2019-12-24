import app from '../app';
import http from 'http';
import supertest from 'supertest';

import 'babel-polyfill';

var request;
var userID;
var notifMsg = 'TESTNOTIFICATION';

describe("TESTING ALL NOTIFICATION ROUTES", () => {
    beforeAll((done) => {
        var test_server = http.createServer(app);
        test_server.listen(done);
        request = supertest(test_server);
    });
    afterAll((done) => {
        test_server.close(done);
    });
    describe("POST /notifications/:user_id", () => {
        it("Should add a notification for a user", (done) => {
            userID = 5;
            var newNotif = {
                'id': null,
                'user_id': userID,
                'status': 0,
                'msg': notifMsg,
                'dest_url': '',
                'created_at': ''
            };

            request.post(`/notifications/${userID}`)
            .send(newNotif)
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .end((err, res) => {
                if (err) return done(err);
                expect(res.status).toBe(200);
                done();
            })
        });
    });
    describe("GET /notifications/numOfNewNotifications/:user_id", () => {
        it("Should return the number of new notifications for a user", (done) => {
            request.get(`/notifications/numOfNewNotifications/${userID}`)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.status).toBe(200);
                expect(res.body).toBe(1);
                done();
            })
        });
    });
    describe("GET /notifications/:user_id", () => {
        it("Should return all notifications of a user", (done) => {
            userID = 1;
            request.get(`/notifications/${userID}`)
            .end((err, res) => {
                if (err) return done(err);
                categoryID = res.body.id;
                expect(res.status).toBe(200);
                expect(typeof(res.body)).toBe('object');
                done();
            })
        });
    });
    describe("PUT /notifications/:user_id", () => {
        it("Should update the status of all notifications to seen for a user", (done) => {
            let userID = 1;
            request.put(`/notifications/${userID}`)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.status).toBe(200);
                done();
            })
        });
        it("Should return 0, because there shouldn't be new notifs", (done) => {
            request.get(`/notifications/numOfNewNotifications/${userID}`)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.status).toBe(200);
                expect(res.body).toBe(0);
                done();
            })
        });
    });
    
});