#See https://aka.ms/customizecontainer to learn how to customize your debug container and how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM node:18-alpine
WORKDIR /app
COPY . .
RUN npm install
RUN npm install primereact
RUN npm install moment
RUN npm install guid-typescript
RUN npm run build
ENV NODE_ENV production
EXPOSE 3000
CMD [ "npx", "serve","-s", "build" ]