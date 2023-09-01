FROM node:18 AS development

RUN curl -f https://get.pnpm.io/v6.16.js | node - add --global pnpm

WORKDIR /usr/src/app

ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}

COPY package.json ./
COPY pnpm-lock.yaml ./

RUN pnpm install

COPY . .

EXPOSE ${PORT:-3001}

CMD [ "pnpm" , "start:dev", "auth" ]

# PRODUCTION
FROM node:18 AS production

RUN curl -f https://get.pnpm.io/v6.16.js | node - add --global pnpm

WORKDIR /apps/auth

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

COPY ../../package.json .
COPY ../../pnpm-lock.yaml .
COPY ../../ ./source

RUN cd ./source && pnpm install
RUN cd ./source && pnpm build gateway

RUN cp -r ./source/dist/apps/auth ./
RUN rm -rf ./source

RUN pnpm install --prod

EXPOSE ${PORT:-3000}

CMD [ "node", "auth/main.js" ]



