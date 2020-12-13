#!/bin/env bash
sleep 10
npx sequelize db:create
npx sequelize db:migrate
npx sequelize db:seed:all
npm run dev
