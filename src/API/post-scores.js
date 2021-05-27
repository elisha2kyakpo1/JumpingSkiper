const MyGameId = 'Zl4d7IVkemOTTVg2fUdz';
const baseURL = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/';

export default async function postScores(name, score) {
  const data = {
    user: `${name}`,
    score: `${score}`,
  };
  try {
    const response = await fetch(
      `${baseURL}/games/${MyGameId}/scores/`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      },
    );
    return response;
  } catch (e) {
    return e;
  }
}