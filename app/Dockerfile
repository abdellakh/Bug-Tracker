#  SECTION APP
FROM node:10.7

# create destination directory
RUN mkdir -p /usr/src/nuxt-app
WORKDIR /usr/src/nuxt-app

# copy the app, note .dockerignore
COPY . /usr/src/nuxt-app/
RUN npm install

# Define environment variables
ENV NODE_ENV=production 

# build necessary, even if no static files are needed,
# since it builds the server as well
RUN npm run build

# expose 8080 on container
EXPOSE 8080

# set app serving to permissive / assigned
ENV NUXT_HOST=0.0.0.0
# set app port
ENV NUXT_PORT=8080

# start the app
CMD [ "npm", "start" ]
