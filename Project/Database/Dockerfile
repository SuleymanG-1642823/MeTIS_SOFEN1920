FROM node:11.13.0-alpine as git-stage

RUN apk update && apk upgrade
RUN apk add git
RUN apk add --no-cache bash

RUN git clone https://github.com/SuleymanGuney/MeTIS_SOFEN1920.git

# Derived from official mysql image (our base image)
FROM mysql:5.7
# Set root password
ENV MYSQL_ROOT_PASSWORD root

# Add the content of the sql-scripts/ directory to your image
# All scripts in docker-entrypoint-initdb.d/ are automatically
# executed during container startup
COPY --from=git-stage /MeTIS_SOFEN1920/Project/Database/sql-scripts/ /docker-entrypoint-initdb.d/
#COPY ./sql-scripts/ /docker-entrypoint-initdb.d/

HEALTHCHECK --interval=5m --timeout=3s\
 CMD ["/usr/bin/mysql", "--user=finder", "-p'9=&c0dL$_N+9+_}pmgx]4JE*'", "--execute", "'show databases;'"]
 
EXPOSE 3306
