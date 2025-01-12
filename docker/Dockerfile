### STAGE 1: Test & Build ###
FROM cypress/browsers:node-22.12.0-chrome-131.0.6778.139-1-ff-133.0.3-edge-131.0.2903.99-1 AS build
WORKDIR /opt/app
COPY . .
RUN npm install
RUN npx cypress install
RUN npm run test
RUN npm run build

### STAGE 2: Run ###
FROM nginx:latest
COPY docker/nginx.conf /etc/nginx/nginx.conf
COPY --from=build /opt/app/dist/github-explorer-app/browser /usr/share/nginx/html
EXPOSE 80
