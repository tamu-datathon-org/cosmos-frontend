const attemptMatchesChallenge = (challenge, attempt) =>
    challenge.project === attempt.project &&
    challenge.lesson === attempt.lesson &&
    challenge.challenge === attempt.challenge;

const attemptIsPassing = (challenge, attempt) =>
    attempt.score >= challenge.passingThreshold;

const hasPassedChallenge = (challenge, attempts) => {
    const matches = (attempt) => attemptMatchesChallenge(challenge, attempt);
    const passes = (attempt) => attemptIsPassing(challenge, attempt);
    const matchesAndPasses = (attempt) => matches(attempt) && passes(attempt);
    return attempts.filter(matchesAndPasses).length > 0;
};

const zipTwo = (a, b) => a.map((ai, i) => [ai, b[i]]);

// For each challenge c, look up c in attempts to see if its been passed
// Add a passed field to the challenge object
export const joinAttemptsAndChallenges = (challenges, attempts) => {
    const passed = challenges.map((c) => hasPassedChallenge(c, attempts));
    return zipTwo(challenges, passed).map((c, p) => ({ ...c, passed: p }));
};

// return true if all challenges are passed
export const hasPassedLesson = (challenges) =>
    challenges.map((c) => c.passed).every((x) => x);
