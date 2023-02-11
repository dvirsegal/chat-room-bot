## Forter Chat Bot

# Hi there! :)

This is a little chat room with a bot that answers previously asked questions by indexing all questions to elasticsearch
then analyzing incoming messages.
The full challenge description can be
found [here](https://docs.google.com/document/d/1g9d3-i1bCUSCMYMcodb_YKX6J8K2QmeVT4S4qUyeZH8/edit?usp=sharing)

It is based on the following tech stack:

* [dojo-starter](https://github.com/lirown/dojo-starter) repository.
* [lit](https://lit.dev/) - A simple library for building fast, lightweight web components.
* [Node.js](https://nodejs.org/) - A JavaScript runtime.
* [express](https://expressjs.com/) - Fast, unopinionated, minimalist web framework for Node.js.
* [socket.io](https://socket.io/) - A library for real-time, bidirectional and event-based communication between the
  browser and the server.
* [elasticsearch](https://www.elastic.co/elasticsearch/) - A distributed, RESTful search and analytics engine.
    * [elasticsearch-js](https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/index.html) - The
      official Elasticsearch client for Node.js.
    * [docker.elastic.co/elasticsearch/elasticsearch:8.6.1](https://www.docker.elastic.co/r/elasticsearch/elasticsearch) -
      The official Elasticsearch Docker image.

## Getting started

1. Clone the repository.
2. Install elastic search locally:
    1. Create docker network:
       ```bash
       docker network create elastic
       ``` 
    2. Pull the image:
       ```bash
       docker pull docker.elastic.co/elasticsearch/elasticsearch:8.6.1
       ```
    3. Run the container without authentication:
       ```bash
       docker run --name elasticsearch --net elastic -p 9200:9200 -p 9300:9300 -e "discovery.type=single-node"  -e "xpack.security.enabled=false" -t docker.elastic.co/elasticsearch/elasticsearch:8.6.1
       ```
3. Install the dependencies both on the server and client.
    1. Under the root folder, simply run:
       ```bash
       cd client 
       npm install
       ```
    2. Then,
       ```bash
       cd server
       npm install
       ```
4. Start the development server.
    1. This command serves the app at `http://localhost:8000`:
       ```bash
       npm run serve
       ```
    2. The command will also start the express server at `http://localhost:8001`
    3. You can run the only server manually by using this command on the "server" directory
       ```bash
       npm run start:dev
       ```
5. Profit!

## Some notes

1. For each of access to elastic search, you can use the highly convenient chrome
   extension [Elasticsearch Head](https://chrome.google.com/webstore/detail/multi-elasticsearch-head/cpmmilfkofbeimbmgiclohpodggeheim).
2. The app logo was generated using DALL-E 2.0, a neural network trained on 400 million image pairs from the internet.
   You can read more about it [here](https://openai.com/blog/dall-e/).
3. The bot attitude was chosen to be more personal and friendly as according to various researches, it is more
   effective in increasing the user's engagement with the chatbot. You can read more about
   it [here](https://www.mdpi.com/0718-1876/17/1/11).
4. The bot's answers were generated using ChatGPT, a large-scale generative pre-trained language model. You can read
   more about it [here](https://chat.openai.com/chat).
5. The robot's voice was generated using [UberDuck](https://app.uberduck.ai) learnt from Jerry Seinfeld's voice.
