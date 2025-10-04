FROM node:22

WORKDIR /usr/src/app

COPY package*.json ./

ENV NODE_ENV=development
RUN npm ci --include=dev

COPY . .

RUN npx prisma generate

EXPOSE 8080
CMD ["npm", "run", "dev"]