
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
    EXPOSE 8880

	CMD ["nginx","-g","daemon off;"]

