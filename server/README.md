# Server

## Installation 
1. ```npm install```
2. ```npm run start:dev```

## Server architecture diagram

![server architecture diagram excalidraw](https://user-images.githubusercontent.com/15158978/218548979-cf92331e-98a9-4032-a445-a4487a42a8eb.png)


### Here's what each file does:

`index.js`: This is the main entry point of the application. It creates an HTTP server, initializes the ElasticSearch client, and starts the Socket.IO server.

`socket/socket.js`: This file contains the event handlers for the Socket.IO server. It handles user connections and disconnections, and sends and receives messages between clients and the server.

`db/elastic-search.js`: This file defines the ElasticSearch index and provides functions for querying and updating the index.

`bot/attitude.js`: This file defines a simple "bot" that provides friendly responses to messages that contain questions or other triggers.

`client/`: This directory contains the front-end code for the application, including HTML, CSS, and JavaScript files.

Overall, the application allows users to connect to a Socket.IO server and exchange messages with each other. The messages are saved in an ElasticSearch index, and a simple bot provides friendly responses to messages that contain questions or other triggers.
