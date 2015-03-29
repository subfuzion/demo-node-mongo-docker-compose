FROM ubuntu:14.04

RUN sudo apt-get update -yq && apt-get upgrade -yq
RUN curl -sL https://deb.nodesource.com/setup | bash -
RUN apt-get install -yq curl git
RUN curl -sL https://deb.nodesource.com/setup | sudo bash - && \
    apt-get install -yq nodejs build-essential
RUN sudo ln -s "$(which nodejs)" /usr/bin/node
RUN npm install -g npm grunt-cli gulp

# copy app and install deps
COPY . /src
RUN cd /src; npm install

EXPOSE 9000
CMD [ "node", "/src/app.js" ]

