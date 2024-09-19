export default function Progress({ numQuestions, index, point, totalPoint,answer }) {
  return (
    <header className="progress">
        <progress max={numQuestions} value={index + Number(answer !== null)}/>
      <p>
        Question <strong>{index + 1}</strong> / {numQuestions}
      </p>
      <p>
        <strong>{point}</strong> / {totalPoint}
      </p>
    </header>
  );
}
