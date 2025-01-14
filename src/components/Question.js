import Options from "./Options";

export default function Question({ question, dispatch, answer }) {
  return (
    <>
      <h4>{question.question}</h4>
      <Options question={question} dispatch ={dispatch} answer ={answer} />
    </>
  );
}
