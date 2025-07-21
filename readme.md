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
    npx knex migrate:make categories
    npx knex migrate:latest
    npx knex migrate:rollback
    npx knex seed:make 01_user_images
    npm install bcryptjs --save
    npx knex seed:run

BACKEND:
    npm init

    npm install dotenv
    npm i cors

DOCKER
    docker ps
    docker compose down
    docker compose up

FRONTEND
    npm i @react-navigation/native-stack // make a stack in the app
    npm install @react-native-async-storage/async-storage // for saving user and token in AsyncStorage 
    npm install react-native-svg-transformer // for svg
    npx expo install react-native-svg // for svg
    npm install --save-dev expo-svg-transformer // for svg
    npx expo start -c // clean cache and open the app
    npx expo install @react-navigation/native @react-navigation/native-stack react-native-screens react-native-safe-area-context react-native-gesture-handler react-native-reanimated react-native-svg
    npm install -g expo-cli
    npx expo install expo-constants // for API
    npx expo install expo-av // for sounds
    npx expo install expo-audio // for sounds
    npm i @expo/vector-icons // for icons
    npx react-native-asset // for assets
    npm install jwt-decode
    react-native-reanimated v2
    react-native-svg
    react-native-redash 

PYTHON
    python -m pip --version
    pip install gtts playsound==1.2.2
    python word_sond.py

<!-- "show my words"
"add word to my list"
"remove word from my list"
"practice my saved words"
"track progress for my words" 
// "API_BASE": "http://172.20.10.2:3001"-->
