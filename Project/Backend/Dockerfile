FROM node:10-alpine

# Create app directory and set it as current working directory (CWD)
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Copy package & package-lock.json to CWD
COPY Groupfinder/package*.json ./

# Install dependencies
RUN npm install

# Bundle app source code
COPY ./Groupfinder/ .

# Let container listen on port 4000 at runtime
EXPOSE 4000

# Similar to 'npm run start'
CMD ["npm", "start"]