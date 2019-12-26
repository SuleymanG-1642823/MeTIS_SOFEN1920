import app from '../app';
import http from 'http';
import supertest from 'supertest';
import 'babel-polyfill';
const testMail = "test@test.be";
const goodPass = "Test1abc";   // Includes a lower and an uppercase letter, a digit and is 8 characters long 
const badPass  = "+"; 
var request;
var userID;

describe("TESTING ALL AUTH ROUTES", () => {
    beforeAll((done) => {
        var test_server = http.createServer(app);
        test_server.listen(done);
        request = supertest(test_server);
    });
    afterAll((done) => {
        request.delete(`/users/${userID}`);
        test_server.close(done);
    });
    describe("POST /register/", () => {
        it("Should add a user to the database and return it along with a token", (done) => {
            const fname = "te",
                lname = "st",
                mail = testMail,
                mailConfirmation = testMail,
                password = goodPass;
            request.post('/auth/register')
            .send({fname, lname, mail, mailConfirmation, password})
            .end((err, res) => {
                if (err) return done(err);
                userID = res.body.user.id;
                expect(res.status).toBe(201);
                expect(typeof(res.body.user)).toBe('object');
                expect(res.header).toHaveProperty('access-token');
                done();
            })
        });
        it("Should not accept data because of wrong mail values", (done) => {
            const data = {
                fname: "te",
                lname: "st",
                mail: testMail,
                mailConfirmation: testMail + "s",
                password: goodPass
               };
            request.post('/auth/register/')
            .send(data)
            .end((err, res) => {
                if (err){ return done(err)};
                expect(res.status).toBe(422);
                expect(res.body.messages.length).toBe(1);
                expect(res.header).not.toHaveProperty('access-token');
                done();
            });
        });
        it("Should not accept data because of wrong password", (done) => {
            const fname = "te",
                lname = "st",
                mail = testMail,
                mailConfirmation = testMail,
                password = badPass;
               
            request.post('/auth/register/')
            .send({fname, lname, mail, mailConfirmation, password})
            .end((err, res) => {
                if (err) return done(err);
                expect(res.status).toBe(422);
                expect(res.body.messages.length).toBe(4);
                expect(res.header).not.toHaveProperty('access-token');
                done();
            });
        });
    });
    describe("POST /auth/login", () => {
        it("Should return a user in the body and a token in the header.",(done) => {
            const data = { mail: testMail, password: goodPass}
            request.post(`/auth/login`)
            .send(data)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.status).toBe(200);   
                expect(typeof(res.body.user)).toBe('object');
                expect(res.header).toHaveProperty('access-token');
                done();
            });
        });
        it("Should not accept login because of incorrect password.",(done) => {
            const data = { mail: testMail, password: goodPass + "s"}
            request.post(`/auth/login`)
            .send(data)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.status).toBe(422);   
                expect(res.body.messages.length).toBe(1);
                expect(res.header).not.toHaveProperty('access-token');
                done();
            });
        });
    });
});
