#!/bin/env bash
sleep 4
npx sequelize db:create
npx sequelize db:migrate
npx sequelize db:seed:all
npm run dev
