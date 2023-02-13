# Client

## Installation
1. ```npm install```
2. ```npm run serve```


## High level summarize of what happens in client side:

The high-level design of the connections between the different components and modules in the code you provided could be summarized as follows:

The index.html file is the entry point for the application and loads the main JavaScript file index.js.
index.js initializes the app by attaching a router to the app-root element and loads the route configuration from the routes.js file.
The router listens for changes in the URL and navigates to the appropriate route based on the route configuration.
The route configuration maps each route to a component, which is lazy-loaded when the corresponding route is accessed. In this case, there is only one route that maps to the home-page component.
The home-page component renders the users-list and chat-room components, which are responsible for displaying the list of online users and the chat messages, respectively.
The chat-room component is also responsible for handling user input and sending messages to the server via a WebSocket connection.
The socket.js module provides the interface for establishing and maintaining the WebSocket connection and registering event listeners to receive incoming messages from the server.
Finally, the navbarUpdater.js module updates the app's navbar when the route changes.
