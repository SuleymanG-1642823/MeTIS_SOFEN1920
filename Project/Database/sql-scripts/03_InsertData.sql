USE groupfinder;

-- USERS
INSERT INTO user (first_name, last_name, mail)
VALUES  ('Lennert', 'Geebelen', 'lennert.geebelen@student.uhasselt.be'),
        ('Jurian', 'Lodewijk', 'Jurian.Lodewijk@mail.com'),
        ('Mart', 'Bolink', 'Mart.Bolink@mail.com'),
        ('Klaas', 'Budde', 'Klaas.Budde@mail.com'),
        ('Willem', 'Kreijkes', 'Willem.Kreijkes@mail.com'),
        ('Robert', 'Louwes', 'Robert.Louwes@mail.com')
;
-- PROJECTS
INSERT INTO project (creator_id, name, status, pitch)
VALUES  (3, 'Agenda website', 0, 'A website for managing tasks.'),
        (4, 'Image editing app', 0, 'A mobile application where users can easily edit pictures'),
        (5, 'Resource monitoring program', 0, 'A PC application for visually monitoring system resources in real-time')
;

-- PROJECT PROFILES
INSERT INTO profile (name, project_id)
VALUES  ('Back-end developper', 1), ('Front-end developper', 1),
        ('UI/UX designer android', 2), ('Sofware engineer', 2),
        ('UI/UX designer', 3), ('Software engineer windows', 3),
        ('Software linux', 3), ('Software OSX', 3);

-- PROFILE SKILLS
INSERT INTO profile_skill -- (profile_id, name, experience, weight)
VALUES  (1, 'Django', 2, 1),
        (1, 'Unit testing', 2, 1),
        (2, 'Vue', 3, 1),
        (2, 'Typescript', 3, 1),
        (3, 'Android SDK', 2, 3),
        (3, 'Android Studio', 2, 1),
        (4, 'Java', 3, 3),
        (4, 'Android SDK', 2, 3),
        (4, 'Android Studio', 2, 1),
        (5, 'Qt framework', 2, 2),
        (5, 'C++', 2, 2),
        (6, 'C++', 3, 2),
        (6, 'AGILE', 3, 2),
        (6, 'Windows OS', 3, 2),
        (7, 'C++', 3, 2),
        (7, 'AGILE', 3, 2),
        (7, 'Linux OS', 3, 2),
        (8, 'C++', 3, 2),
        (8, 'AGILE', 3, 2),
        (8, 'OSx', 3, 2);

-- USER SKILLS
INSERT INTO user_skill -- (user_id, skill name, skill experience)
VALUES  (6, 'c++', 7),
        (6, 'python', 3),
        (6, 'AGILE', 5),
        (6, 'SCRUM', 3),
        (6, 'Extreme programming', 2),
        (6, 'Linux OS', 3);