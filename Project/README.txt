
--- To build the project ---

run
    "sudo docker-compose build"

This will build the docker images, but will not put the containers up and running.


--- To build the project and set it up ---

run 
    "sudo docker-compose up"

This builds the project and puts the containers up and running.


-- To remove the project ---

run
    "sudo docker system prune -a && sudo docker volume prune"

This will remove all docker containers, images and volumes from the current PC.

