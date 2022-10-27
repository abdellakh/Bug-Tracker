FROM ubuntu:18.04

RUN mkdir -p /app

WORKDIR /app

RUN apt-get upgrade

RUN \
    apt-get update && \
    apt-get clean && \
    apt-get install -y curl build-essential software-properties-common unoconv imagemagick ghostscript poppler-utils musl-dev tesseract-ocr zip -y

RUN ln -s /usr/lib/x86_64-linux-musl/libc.so /lib/libc.musl-x86_64.so.1

# Install node
RUN curl -sL https://deb.nodesource.com/setup_12.x | bash -

RUN apt-get install nodejs -y

RUN npm install -g nodemon

# Install app dependencies
COPY package.json /app
RUN npm install

# Bundle app source
COPY . /app

CMD [ "nodemon", "app.js" ]
