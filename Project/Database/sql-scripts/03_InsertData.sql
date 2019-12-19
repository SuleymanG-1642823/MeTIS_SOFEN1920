USE groupfinder;

-- USERS
INSERT INTO user (first_name, last_name, is_admin, mail, pw_hash)
VALUES  ('Lennert', 'Geebelen', TRUE, 'lennert.geebelen@student.uhasselt.be', '$2a$10$5sOZPGw9EqiWCBgWcmuI3.6uCX/yv8KlL7EN498xe8P2nWGDx/WY6'),
        ('Jurian', 'Lodewijk', FALSE, 'Jurian.Lodewijk@mail.com', '$2a$10$jpvCdxgnT6ejUrXiFrmgmusepRCctuw9kOL.nHZREmcGZxNAjB4OS'),
        ('Mart', 'Bolink', FALSE, 'Mart.Bolink@mail.com', '$2a$10$yVlaF55Nw/ZWPL595Mgh6.wvBcywkipRkRCe4rNacwaLc2qo/1hRO'),
        ('Klaas', 'Budde', FALSE, 'Klaas.Budde@mail.com', '$2a$10$iYHnK/Nh/gtB/LpMAb3AqOW8KfSx2.KLxfE98icojvyU02vKs4k3S'),
        ('Willem', 'Kreijkes', FALSE, 'Willem.Kreijkes@mail.com', '$2a$10$Yi12KDq5PRu0NmZswuIehOfpD9cdw8GcyEEHuJmT.V6Guey28GOlS'),
        ('Robert', 'Louwes', FALSE, 'Robert.Louwes@mail.com', '$2a$10$UScEJgbk9HCRWHcwpacTH.IvpPTjaj7J1dwJGq6YuPUO1kfAN6w.C');
      

-- PROJECTS
INSERT INTO project (id, creator_id, name, status, pitch)
VALUES  (1, 3, 'Agenda website', 0, 'A website for managing tasks.'),
        (2, 4, 'Image editing app', 0, 'A mobile application where users can easily edit pictures'),
        (3, 5, 'Resource monitoring program', 0, 'A PC application for visually monitoring system resources in real-time')
;

-- PROJECT PROFILES
INSERT INTO profile (id, name, project_id)
VALUES  (1, 'Back-end developper', 1), 
        (2, 'Front-end developper', 1),
        (3, 'UI/UX designer android', 2), 
        (4, 'Sofware engineer', 2),
        (5, 'UI/UX designer', 3), 
        (6, 'Software engineer windows', 3),
        (7, 'Software engineer linux', 3), 
        (8, 'Software engineer OSX', 3);


-- PROFILE SKILLS
INSERT INTO profile_skill -- (profile_id, name, experience, weight)
VALUES  (1, 'Django', 2, 2),
        (1, 'Unit testing', 2, 1),
        (1, 'MySQL', 2, 2),
        (2, 'Vue', 3, 1),
        (2, 'Typescript', 3, 1),
        (3, 'Android SDK', 2, 3),
        (3, 'Android Studio', 2, 1),
        (4, 'Java', 3, 3),
        (4, 'Android SDK', 2, 3),
        (4, 'Android Studio', 2, 1),
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
VALUES  (6, 'c++', 7),
        (6, 'python', 3),
        (6, 'AGILE', 5),
        (6, 'SCRUM', 3),
        (6, 'Extreme programming', 2),
        (6, 'Linux OS', 3),
        (6, 'MySQL', 5);
INSERT INTO category 
VALUES (1, 'Mobile');