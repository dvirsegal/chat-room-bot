require('dotenv').config();
const express = require('express');
const httpServer = require('http');
const cors = require('cors');
const {initElasticSearchClient} = require('./db/elasticsearch');
const {initSocketServer} = require('./socket/socket');

const app = express();
const port = process.env.PORT || 3000;
app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello World!')
});

const http = httpServer.createServer(app);

initElasticSearchClient();
initSocketServer(http);

http.listen(port, () => {
    console.log('listening on port: ' + port);
});
