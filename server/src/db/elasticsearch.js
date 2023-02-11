'use strict'

const {Client} = require('@elastic/elasticsearch');

/**@type {Client} */
let client;

/**
 * Initialize elasticsearch client
 */
function initElasticSearchClient() {
    client = new Client({
        // cloud: {
        //     id: process.env.ES_CLOUD_ID
        // },
        // auth: {
        //     username: process.env.ES_USER,
        //     password: process.env.ES_PASSWORD
        // },
        node: 'http://localhost:9200',
        pingTimeout: 30000,
        maxRetries: 5,
        resurrectStrategy: 'optimistic'
    });
}

/**
 * Get all messages on the chat history.
 */
async function loadChatHistory() {
    try {
        const exists = await client.indices.exists({index: 'chat-history'});
        if (!exists) {
            const result = await client.indices.create({
                index: 'chat-history'
            });
            result?.acknowledged && console.log('Chat history index created');
        }
        const countResponse = await client.count({
            index: 'chat-history'
        });

        const result = await client.search({
            index: 'chat-history',
            body: {
                size: countResponse.count,
                query: {
                    match_all: {}
                }
            }
        });

        return result.hits.hits?.map((hit) => hit._source);
    } catch (exception) {
        console.error(JSON.stringify(exception));
    }
}

/**
 * Sends message to the chat-history index
 *
 * @param {String} sender
 * @param {String} content
 * @param {Date} timestamp
 */
async function sendMessage(sender, content, timestamp) {
    try {
        await client.index({
            index: 'chat-history',
            body: {
                sender,
                content,
                timestamp
            }
        });
    } catch (exception) {
        console.error(exception);
    }
}

/**
 * Get the answer for a question.
 * Searching the 'chat-history' index for a document that matches either of two conditions
 * 1. The document's content field contains the question
 * 2. The document's content field contains a fuzzy match and the question matches the wildcard
 * @param phrase
 * @returns {Promise<*>}
 */
async function getAnswerForQuestion(phrase) {
    try {
        const findMatchingQuestion = await client.search({
            index: 'chat-history',
            body: {
                query: {
                    bool: {
                        should: [
                            {
                                regexp: {
                                    content: {
                                        value: '*?*'
                                    }
                                }
                            },
                            {
                                match: {
                                    content: {
                                        query: phrase,
                                        fuzziness: 'AUTO',
                                        analyzer: 'standard'
                                    }
                                }
                            }
                        ]
                    }
                }
            }
        });

        const question = findMatchingQuestion.hits.hits[0]?._source;

        if (!question) return;

        const answer = await client.search({
            index: 'chat-history',
            body: {
                sort: [{
                    timestamp: {order: 'asc'}
                }],
                query: {
                    bool: {
                        must: [
                            {
                                range: {
                                    timestamp: {
                                        gt: question.timestamp
                                    }
                                }
                            }
                        ],
                        must_not: [
                            {
                                match: {
                                    sender: question.sender
                                }
                            },
                            {
                                wildcard: {
                                    content: {
                                        value: '*\\?*'
                                    }
                                }
                            }
                        ]
                    }
                }
            }
        });

        return answer.hits.hits[0]?._source;
    } catch (exception) {
        console.error(exception);
    }
}

module.exports = {
    getAnswerForQuestion,
    sendMessage,
    loadChatHistory,
    initElasticSearchClient
};
