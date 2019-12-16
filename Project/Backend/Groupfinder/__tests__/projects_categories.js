/*
import app from '../app';
import http from 'http';
import supertest from 'supertest';
*/
const app = require('../app');
const http = require('http');
const supertest = require('supertest');

import 'babel-polyfill';
var request;

describe("TESTING ALL PROJECT_CATEGORY ROUTES", () => {
    beforeAll((done) => {
        var test_server = http.createServer(app);
        test_server.listen(done);
        request = supertest(test_server);
    });
    afterAll((done) => {
        test_server.close(done);
    });
    describe("POST /projects-categories/", () => {
        it("Should insert a new entry into project_category table", (done) => {
            request.post('/projects-categories/1/1')
            .end((err, res) => {
                if (err) return done(err);
                expect(res.status).toBe(200);
                done();
            })
        });
    });
    describe("GET /projects-categories/project/:project_id", () => {
        it("Should get all categories to which a project belongs", (done) => {
            request.get(`/projects-categories/project/1`)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.status).toBe(200);
                expect(typeof(res.body)).toBe('object');
                done();
            })
        });
    });
    describe("GET /projects-categories/category/:category_id", () => {
        it("Should get all projects that belong to a certain category", (done) => {
            request.get('/projects-categories/category/1')
            .end((err, res) => {
                if (err) return done(err);
                expect(res.status).toBe(200);
                expect(typeof(res.body)).toBe('object');
                done();
            })
        })
    });
    describe("DELETE /projects-categories/:project_id/:category_id", () => {
        it("Should delete an entry from the project_category table", (done) => {
            request.delete(`/projects-categories/1/1`)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.status).toBe(200);   
                done();
            });
        })
    });
});