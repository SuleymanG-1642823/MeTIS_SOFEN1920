import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

chai.use(chaiHttp);
var expect = chai.expect;

var userID;

describe("TESTING ALL USER ROUTES", () => {
    describe("GET /users/:user_id", () => {
        it("Should get a single user with id 1", (done) => {
            chai.request(app)
                .get(`/users/1`)
                .end((err, res) => {
                    expect(err).to.be.null;
                    expect(res).to.have.status(200);
                    expect(res).to.have.header('content-type', 'application/json; charset=utf-8');
                    done();
                });
        });
        it("Should get a '404 not found' response", (done) => {
            chai.request(app)
                .get(`/users/0`)
                .end((err, res) => {
                    expect(err).to.be.null;
                    expect(res).to.have.status(404);
                    done();
                });
        });
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
            chai.request(app)
                .post('/users/')
                .send(user)
                .end((err, res) => {
                    if (res.body.id) {userID = res.body.id;}
                    expect(err).to.be.null;
                    expect(res).to.have.status(200);
                    expect(res).to.have.header('content-type', 'application/json; charset=utf-8');
                    expect(res.body.id).to.be.a('number');
                    done();
                });
        });
    })
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
            }
            chai.request(app)
                .put(`/users/${userID}`)
                .send(user)
                .end((err, res) => {
                    expect(err).to.be.null;
                    expect(res).to.have.status(200);
                    done();
                });
        });
    });
    describe("DELETE /users/:user_id", () => {
        it("Should delete a user from the database.", (done) => {
            chai.request(app)
                .delete(`/users/${userID}`)
                .end((err, res) => {
                    expect(err).to.be.null;
                    expect(res).to.have.status(200);
                    done();
                });
        });
    });
});