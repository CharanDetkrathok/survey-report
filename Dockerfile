# 1. ng build --prod --base-href /ชื่อ URL ที่ต้องการ และ location ที่จะกำหนดใน reverse proxy/ --deploy-url /ชื่อ URL ที่ต้องการ และ location ที่จะกำหนดใน reverse proxy/ 

# FROM nginx:1.18.0-alpine
# COPY nginx/default.conf /etc/nginx/conf.d/default.conf
# COPY . /usr/share/nginx/html/
# EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]

# 1. ng build --prod --base-href /ชื่อ URL ที่ต้องการ และ location ที่จะกำหนดใน reverse proxy/ --deploy-url /ชื่อ URL ที่ต้องการ และ location ที่จะกำหนดใน reverse proxy/ 

	FROM node:16.13.0-alpine AS build

	WORKDIR /usr/src/app

	COPY package.json .
	COPY package-lock.json .

	RUN npm install

	COPY . .

	RUN npm run ng -- build --prod --base-href /survey-report/ --deploy-url /survey-report/

	FROM nginx:alpine

	COPY nginx/default.conf /etc/nginx/conf.d/default.conf

	COPY --from=build /usr/src/app/dist/* /usr/share/nginx/html

    EXPOSE 80

	CMD ["nginx","-g","daemon off;"]

