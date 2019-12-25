import app from '../app';
import http from 'http';
import supertest from 'supertest';

import 'babel-polyfill';
import { isArray } from 'util';

const db_conn = require('../databaseconnection');

var request;
var testUser1ID = 9999;

describe("TESTING ALL NOTIFICATION ROUTES", () => {
    beforeAll((done) => {
        var test_server = http.createServer(app);
        test_server.listen(done);
        request = supertest(test_server);
    });
    afterAll((done) => {
        test_server.close(done);
    });
    describe("GET /notifications/:user_id", () => {
        test("Should return no notifications because the user has no notifications", async (done) => {
            let userID = 645182; // id of a user that has no notifs
            request.get(`/notifications/${userID}`)
            .end((err, response) => {
                if (err) return done(err);
                expect(response.status).toBe(200); // Request must succeed
                expect(isArray(response.body)).toBe(true); // Response must be an array; 
                
                // body is an array object we can use its length property
                expect(response.body.length).toBe(0);

                // var myArray = Array.from(response.body);
                // console.log("len array: " + myArray.length);
                // console.log("array: " + myArray);
                // console.log("len body: " + response.body.length);
                // console.log("body : " + response.body);
                done();
            })
        });
        test("Should return some notifications because user with ID has notifications (see DB insert data file)", async (done) => {
            let userID = 1;
            request.get(`/notifications/${userID}`)
            .end((err, response) => {
                if (err) return done(err);
                expect(response.status).toBe(200); // Request must succeed
                expect(isArray(response.body)).toBe(true); // Response must be an array; 
                
                // body is an array object we can use its length property
                expect(response.body.length).toBeGreaterThan(0);

                done();
            })
        });
    });
    describe("POST /notifications/:user_id", () => {
        // insert a test user
        // let query =`
        // INSERT INTO user (id, first_name, last_name, mail, password)
        // VALUES  (?, 'Testuser1', 'notif', 'test.user1@test.be', '');
        // `;
        // 
        // let param = [testUser1ID];
        // let ready = false;
        // db_conn.query(query, param, (err, rows) => {
        //     ready = true;
        // });
        
        // test("Should return no notifications because the testuser has no notifications", async (done) => {            
        //     request.get(`/notifications/${testUser1ID}`)
        //     .end((err, response) => {
        //         if (err) return done(err);
        //         expect(response.status).toBe(200); // Request must succeed
        //         expect(isArray(response.body)).toBe(true); // Response must be an array; 
        //         
        //         // body is an array object we can use its length property
        //         expect(response.body.length).toBe(0);
// 
        //         // var myArray = Array.from(response.body);
        //         // console.log("len array: " + myArray.length);
        //         // console.log("array: " + myArray);
        //         // console.log("len body: " + response.body.length);
        //         // console.log("body : " + response.body);
// 
        //         // remove test user
        //         
        //         done();
        //     })
        // });
        test("Should add a notification for the test user", async (done) => {
            let data = {
                user_id: 1,
                dest_url: "",
                msg: "This is a testnotification added by Jest tests"
            }
            request.post(`/notifications/`)
            .send(data)
            .set('Content-Type', 'application/json')
            .end((err, response) => {
                if (err) return done(err);
                expect(response.status).toBe(200);
                done();
            })
        });
        test("Number oof new notifications should be > 0 because a new one was just added", async (done) => {
            request.get(`/notifications/numOfNewNotifications/1`)
            .end((err, response) => {
                if (err) return done(err);
                expect(response.status).toBe(200);
                expect(response.body).toBeGreaterThan(0);
                done();
            })
        });

        // query =`delete from user where id = ?;`;
        // param = [testUser1ID];
        // db_conn.query(query, param);
    });
});
