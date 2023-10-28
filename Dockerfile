FROM node
MAINTAINER yon11b <hayeonbaekjjang@gmail.com>
RUN npm install -g http-server
WORKDIR /app/frontend
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build --mode production

# Nginx를 사용하여 빌드된 애플리케이션을 호스팅하는 단계
#FROM nginx:alpine
#COPY --from=build-stage /app/frontend/dist /usr/share/nginx/html
EXPOSE 3000
#CMD ["npm", "run", "prod"]
#CMD ["nginx", "-g", "daemon off;"]
