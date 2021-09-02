FROM node:16.5.0-alpine
COPY zthun-gateway.api*.tgz /usr/src/packages/zthun-gateway.api.tgz
RUN npm install -g /usr/src/packages/zthun-gateway.api.tgz
EXPOSE 3000
CMD ["zthun-gateway"]
