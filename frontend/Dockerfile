FROM node:16-alpine3.15
EXPOSE 3000
WORKDIR /usr/src/app
COPY package.json .
COPY package-lock.json .
RUN npm install
# files/ /files/
ADD public ./public
ADD src ./src
RUN cd /usr/src/app
RUN ls
CMD ["npm","start"]