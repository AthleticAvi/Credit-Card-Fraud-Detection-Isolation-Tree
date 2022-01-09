# Credit-Fraud-Detection-Isolation-Tree
We built an app, which lets banks collaborate with their clients on finding and detecting new fraud patterns.
The app also provides a model per user and tries to stop known fraud patterns.
The app also uses the user feedback on suspicious transactions by asking the user if they made it or if it was fraud. This helps update the database to limit fraud.
The more the app is used, the better it is suited to the user and the more fraud that gets blocked.

Applying this method across many banks will provide better protection and will limit fraud on a country wide scale.

important : to run the app, you need the server's ip, so get the computer current ip you have and put in the string in the file client/ip.js

client :
This folder is the frontend files.
the main files are the app.js and folder named pages. the others are dependencies prepared by react.

server :
contain the backend files
the main files are the webserver.py and folder named controllers.
the others are queries to prepare the database and the models for the users.

jupyter :
contain the files we used to manipulate and prepare the data and also contain the files we used to train the models.
this files we used in the preprocessing step and we don't need them while the app is running. we can use them while maintaining the app.
if you want to take a look, open the files in order:
1- prepare data
2- prepareTest
3- algorithm and training
4- evaluation

in order to start the app :
client: node.js should be downloaded on the computer :
1- open the terminal and go to the client folder : cd client
2- install the react native dependencies, run the following commands:
    2.1- npm i -g expo-cli
    2.2- expo install 
        2.2.1- if expo install didn't work then you can type the command: npm install
3- to start the client app, run the command : expo start / npm start
4- the browser will open, then you can click on "open on web browser"

server: python and pip should be downloaded on the computer :
1- open the terminal and go to the server folder : cd server
2- installing the libraries we used by running the following commands:
    2.1- pip install psycopg2
    2.2- pip install json
    2.3- pip install pandas
3- to run the server : python webserver.py



users that can use to log in :

last 4 digits   ,   id
-----------------------
    0758        ,   782
    6548        ,   540
    9806        ,   253
    0127        ,   524
    4608        ,   875
    8504        ,   163
    4931        ,   780
    5425        ,   645