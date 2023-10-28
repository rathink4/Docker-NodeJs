# Docker Development Help

- To build the docker image
`sudo docker build -t your_username/node-docker-image:1.0 .`

- To run the docker image
`sudo docker run -p 8000:8000 -dit --name node-docker-app your_username/node-docker-image:1.0 bash`

- But since we have docker-compose
`sudo docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d --build`

- To check if it is running
`sudo docker ps`

- To remove the image
`sudo docker-compose -f docker-compose.yml -f docker-compose.dev.yml down`

- To remove anonymous volumes that are pilling up

Run up the container and then do `sudo docker volume prune`. This will remove all the volumes which are not currently in use

- To check whether scalability exist

`sudo docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d --scale node-docker-app=2`

This will run 2 instances of the app and you can verify that Nginx does load balancing accordingly.

# Docker production help

First push all the code on the GitHub and the pull any changes to your Ubuntu production server/instance

- To build the docker image
`sudo -E docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d --build`

- To pull down the image
`sudo -E docker-compose -f docker-compose.yml -f docker-compose.prod.yml down`

- To recreate only certain containers in docker file
`sudo -E docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d --build container_name`

- Sometimes the container may have dependencies and will recreate the dependencies when building again, to avoid that
`sudo -E docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d --build --no-deps container_name`

- If you want to just rebuild certain image even though there are no changes
`sudo -E docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d --force-recreate --no-deps container_name`

The issue with these commands is that you should never be building your docker image in the production server.

Why? --> 
Because it takes resources and CPU cycles, memory, etc.

Solution?

1. Build the image on development server
2. Push the build image on `dockerhub`
3. Production server will pull the image, do docker-compose up on that image, rebuild the container.

# Docker Swarm

Docker Swarm has Manager nodes and Worker nodes. The manager nodes make tasks for the worker nodes and those nodes do the tasks (creating service, deleting service, etc)

Creating docker swarm
`sudo -E docker swarm init --advertise-addr your-prod-instance-ip`

Running docker swarm
`sudo -E docker stack deploy -c docker-compose.yml -c docker-compose.prod.yml app-name`

Docker ps for Docker Swarm
`sudo -E docker stack services app-name`

# Why use sessions?

Sessions basically allow to reduces the amount of times a user hits the server. You don't want to interact with the server again and again
after every user log in to use the features of the application (i.e.- checking the credentials, privileges, etc.)

# What does Redis do?

It just holds the sessions that each user create and it is an in-memory store. Basically a cache to hold the sessions of users using the application.

