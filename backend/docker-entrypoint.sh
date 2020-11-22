#!/bin/env bash
sleep 2
npx sequelize db:create
npx sequelize db:migrate
npx sequelize db:seed:all
npm run dev
