 FROM node:11.13.0-alpine
 
 #Create destination directory
 RUN mkdir -p /usr/src/nuxt-app
 WORKDIR /usr/src/nuxt-app
 
 #Update and install dependency
 RUN apk update && apk upgrade
 RUN apk add git
 
 #Copy the app, note .dockerignore
 COPY ./Groupfinder /usr/src/nuxt-app
 RUN npm install
 
 #Build necessary, even if no static files are needed
 #Since it builds the server as well
 RUN npm run build
 
 #Expose 3000 on container
 EXPOSE 3000
 
 #Set app serving to permissive / assigned
 ENV NUXT_HOST=0.0.0.0
 #Set app port
 ENV NUXT_PORT=3000
 
 #Start the app
 CMD ["npm", "start"]
