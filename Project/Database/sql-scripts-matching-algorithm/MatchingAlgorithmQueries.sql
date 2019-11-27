-------------------------------------------------------------------------------------
-- ID's of profiles that have matching skills with given user (ID), doesn't contain
-- the skills not possessed by the user.
-- result name: profile_ids_with_matching_skills
SELECT profile_skills.id as profile_id
FROM 
  (
    SELECT skill_name as user_skill_name
    FROM user INNER JOIN user_skill AS us ON us.user_id = user.id 
    WHERE user.id = ?
  ) AS user_skills,
  (
    SELECT skill_name as profile_skill_name, profile.id
    FROM profile_skill AS ps INNER JOIN profile ON ps.profile_id = profile.id
  ) profile_skills
WHERE user_skill_name = profile_skill_name
GROUP BY profile_skills.id
-------------------------------------------------------------------------------------
-- All profiles with skills. Each profile has at least one common skill with the 
-- given user. Each profile has all its skills, there might be skills the user doesn't have.
-- There are no profiles that have no common skills with the user (this querry removes those)
-- result name: profiles_with_matching_skills
SELECT project_id, profile_id, name as profile_name, skill_name, skill_experience, weight as skill_weight
FROM profile_skill AS ps INNER JOIN profile ON ps.profile_id = profile.id
WHERE exists(
    SELECT 1 -- optimization, 1 is saved instead of record data
    FROM profile_ids_with_matching_skills
    WHERE profile_ids_with_matching_skills.profile_id = profile.id
    LIMIT 1 -- optimization, query stops as soon as a match is found
)
-------------------------------------------------------------------------------------
-- All profiles with profiles and skills. There are only profiles that have a common 
-- skill with the user. There are no projects that have no profiles with skills that
-- the user also has. 
-- PROBLEM: profiles with no matching skills are not selected so that means the following
--       scenario is true: let A be a project and let bb and cc be A's profiles,
--       if bb has matching skills with the user and cc does not, then cc won't be selected. 
SELECT project_skills.*, not IsNull(user_skills.id)as matches
FROM 
  (
    SELECT skill_name, user.id
    FROM user INNER JOIN user_skill AS us ON us.user_id = user.id 
    WHERE user.id = ?
  ) AS user_skills
  RIGHT JOIN
  (
    SELECT proj.id AS project_id, proj.name AS project_name,
            prof.profile_id, prof.profile_name,
            prof.skill_name, prof.skill_experience, prof.skill_weight
    FROM profiles_with_matching_skills as prof INNER JOIN project AS proj
      ON prof.project_id = proj.id
  ) AS project_skills
  ON user_skills.skill_name = project_skills.skill_name
ORDER BY project_id, profile_id;
-------------------------------------------------------------------------------------
-- Working example on sql fiddle:
SELECT project_skills.*, not IsNull(user_skills.id) as matches
FROM 
  (
    SELECT skill_name, user.id
    FROM user INNER JOIN user_skill AS us ON us.user_id = user.id 
    WHERE user.id = ?
  ) AS user_skills
  RIGHT JOIN
  (
    SELECT proj.id AS project_id, proj.name AS project_name,
            prof.profile_id, prof.profile_name,
            prof.skill_name, prof.skill_experience, prof.skill_weight
    FROM 
    (
      SELECT project_id, profile_id, name as profile_name, skill_name, skill_experience, weight as skill_weight
      FROM profile_skill AS ps INNER JOIN profile ON ps.profile_id = profile.id
      WHERE exists
      (
          SELECT 1
          FROM 
          (
            SELECT profile_skills.id as profile_id
            FROM 
              (
                SELECT skill_name as user_skill_name
                FROM user INNER JOIN user_skill AS us ON us.user_id = user.id 
                WHERE user.id = ?
              ) AS user_skills,
              (
                SELECT skill_name as profile_skill_name, profile.id
                FROM profile_skill AS ps INNER JOIN profile ON ps.profile_id = profile.id
              ) profile_skills
            WHERE user_skill_name = profile_skill_name
            GROUP BY profile_skills.id
          ) AS profiles_with_matching_skills
          WHERE profiles_with_matching_skills.profile_id = profile.id
          LIMIT 1
      )
    ) as prof INNER JOIN project AS proj
      ON prof.project_id = proj.id
  ) AS project_skills
  ON user_skills.skill_name = project_skills.skill_name
ORDER BY project_id, profile_id;
-------------------------------------------------------------------------------------
-- A variation, added GROUP BY clause for grouping per profile, two new columns:
--    1) count_skills: number of skills the profile has
--    2) count_matching_skills: number of skills that match with the users' skills
-- 
--  This query is enough if you only want a matching percentage that is proportianal 
--  to the number of matching skills and are not interested in a percentage that also
--  depends on the difference in required and possessed skill level and weight of the skill.
-- 
SELECT project_id, project_name, profile_id, profile_name, COUNT(profile_id) as count_skills, SUM(not IsNull(user_skills.id)) as count_matching_skills
FROM 
  (
    SELECT skill_name, user.id
    FROM user INNER JOIN user_skill AS us ON us.user_id = user.id 
    WHERE user.id = ?
  ) AS user_skills
  RIGHT JOIN
  (
    SELECT proj.id AS project_id, proj.name AS project_name,
            prof.profile_id, prof.profile_name,
            prof.skill_name, prof.skill_experience, prof.skill_weight
    FROM 
    (
      SELECT project_id, profile_id, name as profile_name, skill_name, skill_experience, weight as skill_weight
      FROM profile_skill AS ps INNER JOIN profile ON ps.profile_id = profile.id
      WHERE exists
      (
          SELECT 1
          FROM 
          (
            SELECT profile_skills.id as profile_id
            FROM 
              (
                SELECT skill_name as user_skill_name
                FROM user INNER JOIN user_skill AS us ON us.user_id = user.id 
                WHERE user.id = ?
              ) AS user_skills,
              (
                SELECT skill_name as profile_skill_name, profile.id
                FROM profile_skill AS ps INNER JOIN profile ON ps.profile_id = profile.id
              ) profile_skills
            WHERE user_skill_name = profile_skill_name
            GROUP BY profile_skills.id
          ) AS profiles_with_matching_skills
          WHERE profiles_with_matching_skills.profile_id = profile.id
          LIMIT 1
      )
    ) as prof INNER JOIN project AS proj
      ON prof.project_id = proj.id
  ) AS project_skills
  ON user_skills.skill_name = project_skills.skill_name
GROUP BY profile_id
ORDER BY project_id, profile_id;