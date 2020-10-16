# Use Node latest stable from https://hub.docker.com as base image 
FROM node:latest
# Upgrade packages
RUN apt-get update
RUN apt-get -y upgrade
# Install Node.js
RUN apt-get -y install nodejs

EXPOSE 3000

CMD ["npm", "start"]