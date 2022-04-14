FROM alpine:3.14

COPY deployments/install-node-alpine.sh .
RUN chmod +x install-node-alpine.sh && ./install-node-alpine.sh

COPY deployments/docker-entrypoint.sh /
RUN chmod +x /docker-entrypoint.sh
ENTRYPOINT ["/docker-entrypoint.sh"]

COPY src /app
WORKDIR /app

RUN npm install

CMD ["index.js"]
