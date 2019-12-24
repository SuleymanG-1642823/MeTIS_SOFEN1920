DROP DATABASE IF EXISTS groupfinder;
CREATE DATABASE groupfinder;
USE groupfinder;

CREATE TABLE user (
    id int NOT NULL AUTO_INCREMENT,
    first_name varchar(255) NOT NULL,
    last_name  varchar(255) NOT NULL,
    mail nvarchar(255) NOT NULL,
    password varchar(255) NOT NULL,
    addr varchar(255),
    zip varchar(255),
    city varchar(255),
    -- cv_loc varchar(255),             cvs/user_id could be used to retrieve cv
    tel varchar(255),
    website varchar(255),
    social_media JSON,
    UNIQUE(mail),
    PRIMARY KEY (id)
) ENGINE=InnoDB;

CREATE TABLE project (
    id int NOT NULL AUTO_INCREMENT,
    creator_id int,
    name varchar(255) NOT NULL,
    status int NOT NULL,
    pitch text,
    -- video_loc varchar(255),              similarly to cv_loc, videos/project_id could be used
    created_at datetime,
    edited_at datetime,
    categories JSON,
    CONSTRAINT fk_project_user_id FOREIGN KEY (creator_id)
        REFERENCES user(id)
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    PRIMARY KEY (id)
) ENGINE=InnoDB;

CREATE TABLE profile (
    id int NOT NULL AUTO_INCREMENT,
    name varchar(255) NOT NULL,
    project_id int,
    questions JSON,
    CONSTRAINT fk_profile_project_id FOREIGN KEY (project_id)
        REFERENCES project(id)
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    PRIMARY KEY (id)
) ENGINE=InnoDB;

CREATE TABLE notification(
    id int NOT NULL AUTO_INCREMENT,
    user_id int NOT NULL,
    status int NOT NULL, 
    dest_url varchar(255),
    msg varchar(512),
    created_at timestamp,
    PRIMARY KEY (id),
    CONSTRAINT fk_notification_user_id FOREIGN KEY (user_id)
        REFERENCES user(id)
        ON UPDATE CASCADE
        ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE message (
    id int NOT NULL AUTO_INCREMENT,
    sender_id int NOT NULL,
    receiver_id int NOT NULL,
    content text NOT NULL,
    sent_at datetime NOT NULL,       -- 'YYYY-MM-DD hh:mm:ss' format
    CONSTRAINT fk_message_sender_id FOREIGN KEY (sender_id)
        REFERENCES user(id)
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    CONSTRAINT fk_message_receiver_id FOREIGN KEY (receiver_id)
        REFERENCES user(id)
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    PRIMARY KEY (id)
) ENGINE=InnoDB;


CREATE TABLE application (
    id int NOT NULL AUTO_INCREMENT,
    user_id int NOT NULL,
    project_id int NOT NULL,        -- could be left out
    profile_id int NOT NULL,
    answers JSON NOT NULL,
    status int NOT NULL,
    created_at datetime,
    edited_at datetime,
    CONSTRAINT fk_application_user_id FOREIGN KEY (user_id)
        REFERENCES user(id)
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    CONSTRAINT fk_application_project_id FOREIGN KEY (project_id)
        REFERENCES project(id)
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    CONSTRAINT fk_application_profile_id FOREIGN KEY (profile_id)
        REFERENCES profile(id)
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    UNIQUE KEY (user_id, project_id, profile_id),
    PRIMARY KEY (id)
) ENGINE=InnoDB;

CREATE TABLE review (
    id int NOT NULL AUTO_INCREMENT,
    writer_id int NOT NULL,
    receiver_id int NOT NULL,
    project_id int NOT NULL,
    rating int NOT NULL,
    message varchar(255),
    CONSTRAINT fk_review_writer_id FOREIGN KEY (writer_id)
        REFERENCES user(id)
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    CONSTRAINT fk_review_receiver_id FOREIGN KEY (receiver_id)
        REFERENCES user(id)
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    CONSTRAINT fk_review_project_id FOREIGN KEY (project_id)
        REFERENCES project(id)
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    UNIQUE KEY (writer_id, receiver_id, project_id),
    PRIMARY KEY (id)
) ENGINE=InnoDB;

CREATE TABLE category (
    id int NOT NULL AUTO_INCREMENT,
    name varchar(255) NOT NULL,
    subcategory varchar(255),
    PRIMARY KEY (id)
) ENGINE=InnoDB;

CREATE TABLE invite (
    id int NOT NULL AUTO_INCREMENT,
    sender_id int NOT NULL,
    receiver_id int NOT NULL,
    profile_id int NOT NULL,
    status int NOT NULL,
    sent_count int NOT NULL,
    max_count int NOT NULL,
    last_sent_at datetime,      -- 'YYYY-MM-DD hh:mm:ss' format
    CONSTRAINT fk_invite_sender_id FOREIGN KEY (sender_id)
        REFERENCES user(id)
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    CONSTRAINT fk_invite_receiver_id FOREIGN KEY (receiver_id)
        REFERENCES user(id)
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    CONSTRAINT fk_invite_profile_id FOREIGN KEY (profile_id)
        REFERENCES profile(id)
        ON UPDATE CASCADE
        ON DELETE CASCADE,  
    UNIQUE KEY (sender_id, receiver_id, profile_id),
    PRIMARY KEY (id)
) ENGINE=InnoDB;

CREATE TABLE member (
    user_id int NOT NULL,
    profile_id int NOT NULL,
    project_id int NOT NULL,
    CONSTRAINT fk_member_user_id FOREIGN KEY (user_id)
        REFERENCES user(id)
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    CONSTRAINT fk_member_project_id FOREIGN KEY (project_id)
        REFERENCES project(id)
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    CONSTRAINT fk_member_profile_id FOREIGN KEY (profile_id)
        REFERENCES profile(id)
        ON UPDATE CASCADE
        ON DELETE CASCADE,          
    PRIMARY KEY (user_id, project_id)
) ENGINE=InnoDB;

CREATE TABLE preference (
    user_id int NOT NULL,
    category_id INT NOT NULL,
    type BOOLEAN NOT NULL,
    CONSTRAINT fk_preference_user_id FOREIGN KEY (user_id)
        REFERENCES user(id)
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    CONSTRAINT fk_preference_category_id FOREIGN KEY (category_id)
        REFERENCES category(id)
        ON UPDATE CASCADE
        ON DELETE CASCADE, 
    PRIMARY KEY (user_id, category_id)
) ENGINE=InnoDB;

CREATE TABLE project_category (
    project_id int NOT NULL,
    category_id INT NOT NULL,
    CONSTRAINT fk_category_project_id FOREIGN KEY (project_id)
        REFERENCES project(id)
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    CONSTRAINT fk_project_category_id FOREIGN KEY (category_id)
        REFERENCES category(id)
        ON UPDATE CASCADE
        ON DELETE CASCADE, 
    PRIMARY KEY (project_id, category_id)
) ENGINE=InnoDB;

CREATE TABLE profile_skill (
    profile_id int NOT NULL,
    skill_name varchar(255) NOT NULL,
    skill_experience int NOT NULL,
    weight int NOT NULL,
    CONSTRAINT fk_skill_profile_id FOREIGN KEY (profile_id)
        REFERENCES profile(id)
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    PRIMARY KEY (profile_id, skill_name)
) ENGINE=InnoDB;

CREATE TABLE user_skill (
    user_id int NOT NULL,
    skill_name varchar(255) NOT NULL,
    skill_experience int NOT NULL,
    CONSTRAINT fk_skill_user_id FOREIGN KEY (user_id)
        REFERENCES user(id)
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    PRIMARY KEY (user_id, skill_name)
) ENGINE=InnoDB;

CREATE TABLE questionnaire (
    id int NOT NULL AUTO_INCREMENT,
    name varchar(255) NOT NULL,
    creator_id int NOT NULL,
    questions JSON,
    CONSTRAINT fk_questionnaire_user_id FOREIGN KEY (creator_id)
        REFERENCES user(id)
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    PRIMARY KEY (id)
) ENGINE=InnoDB;


