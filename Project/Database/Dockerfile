# Derived from official mysql image (our base image)
FROM mysql:5.7
# Set root password
ENV MYSQL_ROOT_PASSWORD 'root'

# Add the content of the sql-scripts/ directory to your image
# All scripts in docker-entrypoint-initdb.d/ are automatically
# executed during container startup
COPY ./sql-scripts/ /docker-entrypoint-initdb.d/

HEALTHCHECK --interval=5m --timeout=3s\
 CMD ["/usr/bin/mysql", "--user=finder", "-p'9=&c0dL$_N+9+_}pmgx]4JE*'", "--execute", "'show databases;'"]
 
EXPOSE 3306
