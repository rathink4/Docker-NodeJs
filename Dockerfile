# creating layers of the docker file
# docker caches the results after executing each layer

# base image
FROM node:18

# keeping working directory as /app
WORKDIR /app

# Reason : Optimization to cache package_json first and then copy everything again but it will be faster
COPY package.json .

ARG NODE_ENV
RUN if [ "$NODE_ENV" = "development" ]; \
        then npm install; \
        else npm install --only=production; \
        fi

# copy everything again in the directory to /app directory
COPY . .

ENV PORT=8000

EXPOSE $PORT

# each container can run only one commmand
CMD ["node", "index.js"]
