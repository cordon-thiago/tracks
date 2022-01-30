# Track APP

## Mongo DB (track-server)

1 - Check if the local IP is allowed in the MongoDB cluster:

Cluster UI: https://cloud.mongodb.com/v2/61a209f84c7ba4628bfead7e#clusters

## Instructions to run in DEV

1 - Open Git Bash (Windows) or Shell (Linux) and start the API express
```
cd  ~/courses/202106-udemy-react-native/track-server
npm run dev
```

2 - In another Git Bash (Windows) or Shell (Linux), start the ngrok to create a bridge between your app and the API express
```
cd  ~/courses/202106-udemy-react-native/tracks
ngrok http 3000 
```
Copy the URL generated by ngrok to the App (tracker.js file).

3 - In another Git Bash (Windows) or Shell (Linux), start the app
```
cd  ~/courses/202106-udemy-react-native/tracks
npm start
```

## Instructions to reset permissions in Android Emulator

Run on the terminal:
```
adb shell pm reset-permissions
```