USE groupfinder;
INSERT INTO user (id, first_name, last_name, mail)
VALUES (1, 'Lennert', 'Geebelen', 'lennert.geebelen@student.uhasselt.be');
INSERT INTO user (id, first_name, last_name, mail)
VALUES (2, 'Dore', 'Staquet', 'dore.staquet@student.uhasselt.be');
INSERT INTO project (id, creator_id, name, status)
VALUES (1, 2, 'Price Spotter', 1);
INSERT INTO profile (id, name, project_id)
VALUES (1, 'Android app developer', 1);
INSERT INTO profile_skill
VALUES (1, 'Android Studio', 1, 1);
INSERT INTO category 
VALUES (1, 'Mobile');