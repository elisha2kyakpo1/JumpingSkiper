const myRank = (scores, myScore) => {
  let myPos = 0;
  scores.forEach((el, idx) => {
    if (+el.score === myScore) {
      myPos = idx + 1;
    }
  });
  return myPos;
};
export default myRank;