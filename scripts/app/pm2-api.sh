#!/bin/sh

pm2 start \
  --name developer-api \
  --namespace api \
  --env ./.env \
  --instances 1 \
  ts-node -- -r tsconfig-paths/register \
  ./src/server.ts

pm2 save
