FROM node:6.10.0

WORKDIR /usr/src/app

COPY app app
COPY public public
COPY package.json .

RUN npm install --only=production

ENV PORT 8080
EXPOSE 8080

CMD ["npm", "start"]
