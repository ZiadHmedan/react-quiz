export default function Finish({ point, totalPoint, highScore, dispatch}) {
  const percentage = (point / totalPoint) * 100;
  let emoji;
  if (percentage === 100) emoji = "🥇";
  if (percentage >= 80 && percentage < 100) emoji = "🎉";
  if (percentage >= 50 && percentage < 80) emoji = "🙃";
  if (percentage >= 0 && percentage < 50) emoji = "🤨";
  if (percentage === 0) emoji = "🤦‍♂️";

  return (
    <>
      <p className="result">
        <span>{emoji}</span>
        You scored <strong>{point}</strong> out of ( {totalPoint} )   {Math.ceil(percentage)}%
      </p>
      <p className="highscore">(HighScore: {highScore} points)</p>
      <button className="btn btn-ui" onClick={()=>dispatch({type:"restart"})}>Restart</button>
    </>
  );
}
