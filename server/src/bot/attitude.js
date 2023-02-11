const friendlyAnswers = [
    "Let's keep moving forward! The answer, my friend, is - ",
    "I'm here to help! The answer is ",
    "Don't worry, we'll get there! It's ",
    "You got this! The answer is ",
    "No need to stress! The answer is still ",
    "It's all good, let me simplify it for you - the answer is ",
    "No need to be tired, I'm here to assist! The answer is undoubtedly "
];
const friendlify = message => {
    const randomIndex = Math.floor(Math.random() * friendlyAnswers.length);
    return friendlyAnswers[randomIndex] + message;
};

module.exports = {friendlify};
