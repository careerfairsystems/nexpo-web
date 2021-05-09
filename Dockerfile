FROM node:12

EXPOSE 3000

WORKDIR /app

# NOTE: the "|| true" addition to yarn install is needed until the flow types are fixed as it errors out otherwise
# Optimize caching so we don't need to install on every file change
COPY package.json .
COPY yarn.lock .
RUN yarn install || true
#RUN npx browserslist@latest --update-db

# Copy the rest of the files
COPY . .
# Connect to host machine instead of container localhost
RUN sed -i 's/localhost/host.docker.internal/' package.json
# Not sure if needed (I don't understand how flow works exactly) but this is pretty fast
RUN yarn install || true

CMD yarn run start
