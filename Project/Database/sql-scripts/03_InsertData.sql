USE groupfinder;

-- USERS
INSERT INTO user (id, first_name, last_name, mail, password, available, private)
VALUES  (1, 'Lennert', 'Geebelen', 'lennert.geebelen@student.uhasselt.be', ' $2a$10$xNkcrieExKemWxBlqNDS8ORKbY8QV0Y5N2WYUO4iW6FTudjgfm9KS', 1, 0),
        (2, 'Jurian', 'Lodewijk', 'Jurian.Lodewijk@mail.com', ' $2a$10$xNkcrieExKemWxBlqNDS8ORKbY8QV0Y5N2WYUO4iW6FTudjgfm9KS', 1, 0),
        (3, 'Mart', 'Bolink', 'Mart.Bolink@mail.com', ' $2a$10$xNkcrieExKemWxBlqNDS8ORKbY8QV0Y5N2WYUO4iW6FTudjgfm9KS', 1, 0),
        (4, 'Klaas', 'Budde', 'Klaas.Budde@mail.com', ' $2a$10$xNkcrieExKemWxBlqNDS8ORKbY8QV0Y5N2WYUO4iW6FTudjgfm9KS', 0, 0),
        (5, 'Willem', 'Kreijkes', 'Willem.Kreijkes@mail.com', ' $2a$10$xNkcrieExKemWxBlqNDS8ORKbY8QV0Y5N2WYUO4iW6FTudjgfm9KS', 1, 0),
        (6, 'Robert', 'Louwes', 'Robert.Louwes@mail.com', ' $2a$10$xNkcrieExKemWxBlqNDS8ORKbY8QV0Y5N2WYUO4iW6FTudjgfm9KS', 1, 0);
      


-- PROJECTS
INSERT INTO project (id, creator_id, name, status, pitch)
VALUES  (1, 3, 'Agenda website', 0, 'A website for managing tasks.'),
        (2, 4, 'Image editing app', 0, 'A mobile application where users can easily edit pictures'),
        (3, 5, 'Resource monitoring program', 0, 'A PC application for visually monitoring system resources in real-time');

-- PROJECT PROFILES
INSERT INTO profile (name, project_id, questions)
VALUES  ('Back-end developper', 1, '["What other projects have you worked on?", "What is your preferred backend language?"]'), 
        ('Front-end developper', 1, '["What other projects have you worked on?", "What is your preferred JavaScript framework?"]'),
        ('UI/UX designer android', 2, '["What other projects have you worked on?"]'), 
        ('Sofware engineer', 2, '["What other projects have you worked on?", "What is your preferred programming language?"]'),
        ('UI/UX designer', 3, '["What other projects have you worked on?"]'), 
        ('Software engineer windows', 3, '["What other projects have you worked on?", "What is your preferred programming language?"]'),
        ('Software engineer linux', 3, '["What other projects have you worked on?", "What is your preferred programming language?"]'), 
        ('Software engineer OSX', 3, '["What other projects have you worked on?", "What is your preferred programming language?"]');


-- PROFILE SKILLS
INSERT INTO profile_skill -- (profile_id, name, experience, weight)
VALUES  (1, 'Django', 2, 2),
        (1, 'Unit testing', 2, 1),
	(1, 'MySQL', 2, 2),
	(1, 'AGILE', 1, 1),
        (2, 'Vue', 3, 1),
        (2, 'Typescript', 3, 1),
        (3, 'Android SDK', 2, 3),
        (3, 'Android Studio', 2, 1),
        (4, 'Java', 3, 3),
        (4, 'Android SDK', 2, 3),
        (4, 'Android Studio', 2, 1),
	(4, 'AGILE', 1, 1),
        (5, 'Qt framework', 2, 2),
        (5, 'C++', 2, 4),
        (6, 'C++', 3, 4),
        (6, 'AGILE', 3, 2),
        (6, 'Windows OS', 3, 2),
        (7, 'C++', 3, 4),
        (7, 'AGILE', 3, 2),
        (7, 'Linux OS', 3, 2),
        (8, 'C++', 3, 4),
        (8, 'AGILE', 3, 2),
        (8, 'OSx', 3, 2);

-- USER SKILLS
INSERT INTO user_skill -- (user_id, skill name, skill experience)
VALUES  (5, 'c++', 7),
        (5, 'AGILE', 5),
	(6, 'c++', 7),
        (6, 'python', 3),
        (6, 'AGILE', 5),
        (6, 'SCRUM', 3),
        (6, 'Extreme programming', 2),
        (6, 'Linux OS', 3),
        (6, 'MySQL', 5);

-- CATEGORIES
INSERT INTO category
VALUES  (1, 'Website', NULL),
        (2, 'Game Development', NULL),
        (3, 'AR', NULL),
        (4, 'AI', NULL),
        (5, 'Desktop OS', 'Windows'),
        (6, 'Desktop OS', 'Linux'),
        (7, 'Desktop OS', 'MacOS'),
        (8, 'Mobile OS', 'iOS'),
        (9, 'Mobile OS', 'Android');

-- QUESTIONNAIRES
INSERT INTO questionnaire (name, creator_id, questions)
VALUES  ("Fronend-Developer", 1, '["What other projects have you worked on?", "What is your preferred backend language?"]');

-- NOTIFICATIONS
INSERT INTO notification (user_id, dest_url, msg)
VALUES 
    (1, '', 'Welcome to groupfinder!'),
    (1, 'recommendedProjects', 'Check out the projects!');