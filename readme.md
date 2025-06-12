npx create-expo-app --template blank
npx expo install react-dom react-native-web @expo/metro-runtime

npm install expo

DATABASE:
    cd database
    npm init
    npm install knex
    npm install knex --save
    npx knex init
    npm install mysql2 --save
    npx knex migrate:make create_categories
    npx knex migrate:latest
    npx knex migrate:rollback
    npx knex seed:make 01_user_images
    npm install bcryptjs --save

BACKEND:
    npm init

    npm install dotenv

DOCKER
    docker ps
    docker compose down
    docker compose up