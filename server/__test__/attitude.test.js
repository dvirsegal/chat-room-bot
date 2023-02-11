const {friendlify} = require('../src/bot/attitude');

describe('friendlify', () => {
    it('returns a friendly message with the answer', () => {
        const message = '42, the answer to life, the universe and everything';
        const friendlyMessage = friendlify(message);
        expect(friendlyMessage).toContain(message);
    });

    it('returns a different friendly message each time it is called', () => {
        const message = 'Just a random message';
        const friendlyMessage1 = friendlify(message);
        const friendlyMessage2 = friendlify(message);
        expect(friendlyMessage1).not.toBe(friendlyMessage2);
    });
});
