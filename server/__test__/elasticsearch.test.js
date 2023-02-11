const {Client} = require('@elastic/elasticsearch');
jest.mock('@elastic/elasticsearch', () => ({
    Client: jest.fn(() => ({

        indices: {
            exists: jest.fn(() => Promise.resolve(true)),
            create: jest.fn(() => Promise.resolve({acknowledged: true}))
        },
        index: jest.fn(() => Promise.resolve()),
        count: jest.fn(() => Promise.resolve({count: 10})),
        search: jest.fn(() => Promise.resolve({hits: {hits: [{_source: {}}]}}))
    }))
}));

const {
    initElasticSearchClient,
    loadChatHistory,
    sendMessage,
    getAnswerForQuestion
} = require('../src/db/elasticsearch');

describe('elasticsearch', () => {
    describe('initElasticSearchClient', () => {
        it('initializes the elasticsearch client', () => {
            initElasticSearchClient();
            expect(Client).toHaveBeenCalledWith({
                node: 'http://localhost:9200',
                pingTimeout: 30000,
                maxRetries: 5,
                resurrectStrategy: 'optimistic'
            });
        });
    });

    describe('loadChatHistory', () => {
        it('gets all messages in the chat history', async () => {
            const result = await loadChatHistory();
            expect(result).toEqual([{}]);
        });
    });

    describe('sendMessage', () => {
        it('sends message to the chat-history index', async () => {
            const result = await sendMessage('avatar', 'sender', 'content', new Date());
            expect(result).toBeUndefined();
        });
    });

    describe('getAnswerForQuestion', () => {
        it('gets the answer for a question', async () => {
            const result = await getAnswerForQuestion('question');
            expect(result).toEqual({});
        });
    });
});
