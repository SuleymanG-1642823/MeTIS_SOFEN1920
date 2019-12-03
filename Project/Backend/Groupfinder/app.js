var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var bodyParser = require('body-parser');

var usersRouter = require('./routes/users/users');
var projectsRouter = require('./routes/projects/projects');
var messagesRouter = require('./routes/messages/messages');
var profilesRouter = require('./routes/profiles/profiles');
var categoriesRouter = require('./routes/categories/categories');
var projects_categories_router = require('./routes/projects_categories/projects_categories');
var profiles_skills_router = require('./routes/profiles_skills/profiles_skills');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/users', usersRouter);
app.use('/projects', projectsRouter);
app.use('/messages', messagesRouter);
app.use('/profiles', profilesRouter);
app.use('/categories', categoriesRouter);
app.use('/projects-categories', projects_categories_router);
app.use('/profiles_skills', profiles_skills_router);

module.exports = app;