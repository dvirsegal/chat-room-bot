const httpServer = require('http');
const express = require('express');
const cors = require('cors');
const {initElasticSearchClient} = require('../src/db/elasticsearch');
const {initSocketServer} = require('../src/socket/socket');


jest.mock('../src/db/elasticsearch', () => ({
    initElasticSearchClient: jest.fn(),
}));

jest.mock('../src/socket/socket', () => ({
    initSocketServer: jest.fn(),
}));

describe('http server', () => {
    let app;
    let http;

    beforeEach(() => {
        process.env.PORT = 3000;
        app = express();
        app.use(cors());
        http = httpServer.createServer(app);
    });

    afterEach(() => {
        jest.resetModules();
        http.close();
    });

    it('should listen on port 3000', () => {
        console.log = jest.fn();
        require('../src/index');

        expect(console.log).toHaveBeenCalledWith('listening on port: 3000');

    });

    it('should initialize elasticsearch client', () => {
        require('../src/index');

        expect(initElasticSearchClient).toHaveBeenCalled();
    });

    it('should initialize socket server', () => {
        require('../src/index');

        expect(initSocketServer).toHaveBeenCalledWith(http);
    });

    it('should use cors middleware', () => {
        require('../src/index');

        expect(app.use).toHaveBeenCalledWith(cors());
    });

    it('should return "Hello World!" on root endpoint', () => {
        app.get = jest.fn((_, res) => res.send('Hello World!'));
        require('../src/index');

        expect(app.get).toHaveBeenCalledWith('/', expect.any(Function));
    });
});
