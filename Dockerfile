# image to build from
FROM    node:latest

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY    package*.json ./
RUN     npm install

# Bundle app source
#COPY    CONTROL/*         ./CONTROL/
#COPY    SERVER/*          ./SERVER/
#COPY    images/*          ./images/
#COPY    javascript/*      ./javascript
#COPY    lib/*             ./lib/
#COPY    stylesheet/*      ./stylesheet/
#
#COPY    config.json       .
#COPY    favicon.ico       .
#COPY    index.html        .
#COPY    server_index.html .
#
#COPY    servercert.pem    .
#COPY    serverkey.pem     .

 COPY    .                 .
#COPY    XPH               .
#COPY    XPH*.zip          .
#COPY    XPH.zip           .

# PORT
EXPOSE  83
EXPOSE 446

# LAUNCH
CMD    ["node", "SERVER/server.js"]

