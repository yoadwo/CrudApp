# Stage 1: Build Angular App
FROM node:20-alpine3.18 AS build
WORKDIR /app
COPY package*.json /app/
RUN npm install
COPY . /app/
RUN npx ng build --configuration=development

FROM nginx:alpine
RUN rm -rf /usr/share/nginx/html/* && rm -rf /etc/nginx/conf.d/default.conf && rm -rf /etc/nginx/nginx.conf
COPY nginx.conf /etc/nginx
COPY --from=build /app/dist/my-blog-app /usr/share/nginx/html

EXPOSE 80