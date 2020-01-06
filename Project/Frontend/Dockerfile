 FROM node:11.13.0-alpine
 
 #Create destination directory
 #RUN mkdir -p /usr/src/nuxt-app
 #WORKDIR /usr/src/nuxt-app
 
 #Update and install dependency
 RUN apk update && apk upgrade
 RUN apk add git
 RUN apk add --no-cache bash
 
 #Pull from the git repository
 RUN git clone -b test-login https://github.com/SuleymanGuney/MeTIS_SOFEN1920.git
 
 #Copy the app, note .dockerignore
 #COPY ./Groupfinder /usr/src/nuxt-app
 RUN cd /MeTIS_SOFEN1920/Project/Frontend/Groupfinder && npm install
 
 #Expose 3000 on container
 EXPOSE 3000
 
 #Set app serving to permissive / assigned
 ENV NUXT_HOST=0.0.0.0
 #Set app port
 ENV NUXT_PORT=3000
 
 #Start the app
 #CMD ["npm", "run", "dev"]
 RUN chmod +x ./MeTIS_SOFEN1920/Project/Frontend/Groupfinder/frontendStartscript.sh
 CMD ["./MeTIS_SOFEN1920/Project/Frontend/Groupfinder/wait-for-it.sh" , "backend:4000" , "--strict" , "--timeout=300" , "--" , "./MeTIS_SOFEN1920/Project/Frontend/Groupfinder/frontendStartscript.sh"]

