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

# Install React Navigation stack

npm install @react-navigation/native @react-navigation/native-stack

# Install AsyncStorage for storing user/token

npm install @react-native-async-storage/async-storage

# Install SVG support

npm install react-native-svg-transformer expo-svg-transformer @expo/vector-icons
npx expo install react-native-svg

# Install navigation dependencies

npx expo install react-native-screens react-native-safe-area-context react-native-gesture-handler react-native-reanimated

# Install Expo tools

npm install -g expo-cli
npx expo install expo@53.0.20 expo-constants@~17.1.7 react-native@0.79.5

# Install audio/video

npx expo install expo-av expo-audio

# Other utilities

npm install jwt-decode react-native-linear-gradient react-native-circular-progress react-native-dotenv react-native-safe-area-context

# React Native assets

npx react-native-asset

$env:NODE_ENV="development"; npx expo start
$env:NODE_ENV="production"; npx expo start

# build

npx expo login
npx eas build:configure
eas build --platform android --profile production

Remove-Item -Recurse -Force .expo // deletes .expo folder (for reloading the app)
npx expo start -c

DEPLOYNIG:
npm install -g eas-cli
eas login
eas build:configure
eas build --platform android --profile production
eas credentials

PYTHON
python -m pip --version
pip install gtts playsound==1.2.2
python word_sond.py

<!-- "show my words"
"add word to my list"
"remove word from my list"
"practice my saved words"
"track progress for my words"
