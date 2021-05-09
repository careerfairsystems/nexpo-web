FROM node:12

EXPOSE 3000

WORKDIR /app

COPY . .
# Connect to host machine instead of container localhost
RUN sed -i 's/localhost/host.docker.internal/' package.json
RUN yarn install || true

CMD yarn run start
