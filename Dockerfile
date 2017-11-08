FROM mhart/alpine-node

COPY package.json server.js /opt/hello-node/
COPY node_modules /opt/hello-node/node_modules

EXPOSE 8090

CMD ["node", "/opt/hello-node/server.js"]
