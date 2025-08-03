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
npm install dotenv

BACKEND:
npm init
npm install dotenv
npm i cors
npm install --save-dev nodemon
$env:NODE_ENV="development"; npx nodemon ./bin/www
$env:NODE_ENV="production"; npx nodemon ./bin/www

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
react-native-redash
npm i @react-navigation/native-stack // make a stack in the app

npm i @expo/vector-icons // for icons

npm install jwt-decode
npm install react-native-linear-gradient // for gradient
npm install react-native-circular-progress
npm install react-native-dotenv

npx expo install expo@53.0.20 expo-constants@~17.1.7 react-native@0.79.5 // upfrading packages

$env:NODE_ENV="development"; npx expo start
$env:NODE_ENV="production"; npx expo start

DEPLOYNIG:
npm install -g eas-cli
eas login
eas build:configure
eas build --platform android

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
