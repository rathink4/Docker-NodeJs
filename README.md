# Docker Commands

To build the docker image
`sudo docker build -t rathink4/node-docker-image:1.0 .`

To run the docker image
`sudo docker run -p 8000:8000 -dit --name node-docker-app rathink4/node-docker-image:1.0 bash`
But since we have docker-compose
`sudo docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d --build`

To check if it is running
`sudo docker ps`

To remove the image
`sudo docker-compose -f docker-compose.yml -f docker-compose.dev.yml down`

To remove anonymous volumes that are pilling up
Run up the container and then do `sudo docker volume prune`. This will remove all the volumes which are not currently in use

# TO-DOs

- User Sign up and Log In
- Redis integration
- Nginx for Load balancing to multiple containers
- Docker Swarm

