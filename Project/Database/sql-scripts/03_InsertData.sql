USE groupfinder;

-- USERS
INSERT INTO user (id, first_name, last_name, is_admin, mail, city, password, available, private)
VALUES  (1, 'Lennert', 'Geebelen', TRUE, 'lennert.geebelen@student.uhasselt.be', 'Bree', '$2a$10$5sOZPGw9EqiWCBgWcmuI3.6uCX/yv8KlL7EN498xe8P2nWGDx/WY6', 1, 0),
        (2, 'Jurian', 'Lodewijk', FALSE, 'Jurian.Lodewijk@mail.com', 'Eupen', '$2a$10$jpvCdxgnT6ejUrXiFrmgmusepRCctuw9kOL.nHZREmcGZxNAjB4OS', 1, 0),
        (3, 'Mart', 'Bolink', FALSE, 'Mart.Bolink@mail.com', 'Charleroi', '$2a$10$yVlaF55Nw/ZWPL595Mgh6.wvBcywkipRkRCe4rNacwaLc2qo/1hRO', 1, 0),
        (4, 'Klaas', 'Budde', FALSE, 'Klaas.Budde@mail.com', 'Brussel', '$2a$10$iYHnK/Nh/gtB/LpMAb3AqOW8KfSx2.KLxfE98icojvyU02vKs4k3S', 0, 0),
        (5, 'Willem', 'Kreijkes', FALSE, 'Willem.Kreijkes@mail.com', 'Antwerpen', '$2a$10$Yi12KDq5PRu0NmZswuIehOfpD9cdw8GcyEEHuJmT.V6Guey28GOlS', 1, 0),
        (6, 'Robert', 'Louwes', FALSE, 'Robert.Louwes@mail.com', 'Deinze', '$2a$10$UScEJgbk9HCRWHcwpacTH.IvpPTjaj7J1dwJGq6YuPUO1kfAN6w.C', 1, 0);

-- PROJECTS
INSERT INTO project (id, creator_id, name, status, pitch, categories)
VALUES  (1, 3, 'Agenda website', 0, 'A website for managing tasks.', '[1]'),
        (2, 4, 'Image editing app', 0, 'A mobile application where users can easily edit pictures', '[8, 9]'),
        (3, 1, 'Resource monitoring program', 0, 'A PC application for visually monitoring system resources in real-time', '[5]'),
        (4, 1, 'PriceSpotter', 0, 'A mobile application for tracking the prices of products in grocery stores. It can also be used as a checklist while shopping.', '[8, 9]');

-- PROJECT PROFILES
INSERT INTO profile (id, name, project_id, questions)
VALUES  (1, 'Back-end developper', 1, '["What other projects have you worked on?", "What is your preferred backend language?"]'), 
        (2, 'Front-end developper', 1, '["What other projects have you worked on?", "What is your preferred JavaScript framework?"]'),
        (3, 'UI/UX designer android', 2, '["What other projects have you worked on?"]'), 
        (4, 'Sofware engineer', 2, '["What other projects have you worked on?", "What is your preferred programming language?"]'),
        (5, 'UI/UX designer', 3, '["What other projects have you worked on?"]'), 
        (6, 'Software engineer windows', 3, '["What other projects have you worked on?", "What is your preferred programming language?"]'),
        (7, 'Software engineer linux', 3, '["What other projects have you worked on?", "What is your preferred programming language?"]'),
        (8, 'Software engineer OSX', 3, '["What other projects have you worked on?", "What is your preferred programming language?"]'),
        (9, 'Frontend developer', 4, '["What other projects have you worked on?", "What is your preferred programming language?"]'),
        (10, 'Backend developer', 4, '["What other projects have you worked on?", "What is your preferred programming language?"]');

-- PROFILE APPLICATIONS
INSERT INTO application (user_id, project_id, profile_id, answers, status)
VALUES  (2, 3, 5, '[{"question": "What other projects have you worked on?", "answer": "None."}]', 0),
        (3, 3, 6, '[{"question": "What other projects have you worked on?", "answer": "None."}, {"question": "What is your preferred programming language?", "answer": "c++"}]', 0),
        (1, 3, 6, '[{"question": "What other projects have you worked on?", "answer": "None."}, {"question": "What is your preferred programming language?", "answer": "c++"}]', 0);

-- PROJECT MEMBERS 
INSERT INTO member -- (user_id, profile_id, project_id)
VALUES  (6, 7, 3),
        (4, 5, 3),
        (1, 2, 1);

-- INVITES
INSERT INTO invite (sender_id, receiver_id, profile_id, status, sent_count, max_count)
VALUES  (1, 5, 8, 0, 0, 0);

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
        (8, 'OSx', 3, 2),
        (9, 'Java', 1, 5),
        (10, 'Python', 2, 3),
        (10, 'SQL', 2, 7);

-- USER SKILLS
INSERT INTO user_skill -- (user_id, skill name, skill experience)
VALUES  (1, 'Node.js', 2),
        (1, 'Vue.js', 2),
        (1, 'Nuxt', 2),
        (1, 'Android Studio', 1),
        (1, 'C++', 3),
        (1, 'SQL', 2),
        (1, 'MySQL', 30),
        (2, 'Django', 24),
        (5, 'c++', 7),
        (5, 'AGILE', 5),
	(6, 'c++', 7),
        (6, 'python', 3),
        (6, 'AGILE', 5),
        (6, 'SCRUM', 3),
        (6, 'Extreme programming', 2),
        (6, 'Linux OS', 3),
        (6, 'MySQL', 5),
        (2, 'MyQt frameworkSQL', 2),
        (2, 'C++', 3),
        (3, 'C++', 5),
        (3, 'Windows OS', 3);

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
    (1, 'recommendedProjects', 'Check out the projects!'),
    (1, 'projectCreationForm', 'Create your own project!');
