FROM node:16 as nodebuild

WORKDIR usr/src/app

COPY . .
RUN npm install

RUN npx prisma migrate dev

RUN npm run build

FROM node:16-slim

WORKDIR usr/src/app

COPY --from=nodebuild usr/src/app usr/src/app

RUN npm install

CMD npm start