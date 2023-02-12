const friendlyAnswers = [
    "The answer, my friend, is - ",
    "I'm here to help! The answer is ",
    "Don't worry, I've got the answer - ",
    "Look no further, for the answer is ",
    "Rest assured, I have the answer - ",
    "I'm happy to provide the answer, which is "
];
const friendlify = message => {
    const randomIndex = Math.floor(Math.random() * friendlyAnswers.length);
    return friendlyAnswers[randomIndex] + message;
};

module.exports = {friendlify};
