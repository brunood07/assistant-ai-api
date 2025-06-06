FROM node:20-alpine

WORKDIR /usr/src/app

COPY package*.json yarn.lock ./

RUN npm install -g prisma
RUN yarn install --frozen-lockfile

COPY . .

RUN npx prisma generate
RUN yarn build

EXPOSE 3000
CMD ["yarn", "start"]