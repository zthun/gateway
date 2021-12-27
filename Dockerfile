FROM node:17.2.0 as setup
WORKDIR /usr/dev
COPY . .
RUN yarn install

FROM setup as analyze
RUN yarn lint

FROM setup as build
RUN yarn build

FROM setup as test
RUN yarn test

FROM  nginx:1.17.3-alpine as privacy-web
COPY --from=build /usr/dev/packages/privacy.web/dist/. /usr/share/nginx/html/

FROM nginx:1.17.3-alpine as terms-web
COPY --from=build /usr/dev/packages/terms.web/dist/. /usr/share/nginx/html/
