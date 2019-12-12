const app = require('../app');
const http = require('http');
const supertest = require('supertest');

import 'babel-polyfill';
var request;
var questionnaireID;

describe("TESTING ALL QUESTIONNAIRE ROUTES", () => {
    beforeAll((done) => {
        var test_server = http.createServer(app);
        test_server.listen(done);
        request = supertest(test_server);
    });
    afterAll((done) => {
        test_server.close(done);
    });
    describe("POST /profiles/", () => {
        it("Should insert a new questionnaire into the database", (done) => {
            var questionnaire = {
                id: null,
                name: "Frontend_profile_questionnaire",
                creator_id: 1,
                questions: ["Test quesion?"]
            };
            request.post('/questionnaires/').send(questionnaire).end((err, res) => {
                if (err) return done(err);
                questionnaireID = res.body.id;
                expect(res.status).toBe(200);
                expect(typeof(res.body.id)).toBe('number');
                done();
            })
        })
    });
});