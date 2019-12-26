import app from '../app';
import http from 'http';
import supertest from 'supertest';
import 'babel-polyfill';
var request;

describe("TESTING ALL PREFERENCES ROUTES", () => {
    beforeAll((done) => {
        var test_server = http.createServer(app);
        test_server.listen(done);
        request = supertest(test_server);
    });
    afterAll((done) => {
        test_server.close(done);
    });
    describe('POST /preferences/:user_id/:type', () => {
        it("Should insert a new preference into the database", (done) => {
           var body = {
               categories: [
                   {
                        id: 1,
                        name: 'Website',
                        subcategory: null
                   },
                   {
                       id: 2,
                       name: 'Game Development',
                       subcategory: null
                   }
               ]
           }
           const userID = 1;
           const type = true;
           request.post(`/preferences/${userID}/${type}`)
           .send(body)
           .end((err, res) => {
               if (err) return done(err);
               expect(res.status).toBe(200);
               done();
           })
        });
    })
    describe('GET /preferences/:user_id/:type', () => {
        it("Should get all categories preferred by a user from the database.", (done) => {
           const userID = 1;
           const type = true;
           request.get(`/preferences/${userID}/${type}`)
           .end((err, res) => {
               if (err) return done(err);
               expect(res.status).toBe(200);
               expect(typeof(res.body)).toBe('object');
               done();
           })
        })
    })
    describe('DELETE /preferences/:user_id', () => {
        it("Should delete preferred categories from the database.", (done) => {
            var body = {
                categories: [
                    {
                         id: 1,
                         name: 'Website',
                         subcategory: null
                    },
                    {
                        id: 2,
                        name: 'Game Development',
                        subcategory: null
                    }
                ]
            }
            const userID = 1;
            request.delete(`/preferences/${userID}`)
            .send(body)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.status).toBe(200);
                done();
            })
        })
    })
})
