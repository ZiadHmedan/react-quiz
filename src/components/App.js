import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";
import NextButton from "./NextButton";
import Progress from "./Progress";
import Finish from "./Finish";
import { Footer } from "./Footer";
import Timer from "./Timer";
const SEC_PER_QUESTION = 30;
const initial = {
  questions: [],
  index: 0,
  answer: null,
  point: 0,
  highScore: 0,
  secondRemaining: null,
  //loding, error , ready, active, finished
  status: "loading",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" };
    case "dataFailed":
      return { ...state, status: "error" };
    case "start":
      return {
        ...state,
        status: "active",
        secondRemaining: state.questions.length * SEC_PER_QUESTION,
      };
    case "newAnswer":
      const question = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        point:
          question.correctOption === action.payload
            ? state.point + question.points
            : state.point,
      };
    case "nextQuestion":
      return {
        ...state,
        answer: null,
        index: state.index + 1,
      };
    case "tick":
      return {
        ...state,
        secondRemaining: state.secondRemaining - 1,
        status: state.secondRemaining === 0 ? "finish" : state.status,
      };
    case "finished":
      return {
        ...state,
        status: "finish",
        highScore:
          state.point > state.highScore ? state.point : state.highScore,
      };
    case "restart":
      return { ...initial, questions: state.questions, status: "ready" };

    default:
      return;
  }
};
export default function App() {
  const [
    { questions, status, index, answer, point, highScore, secondRemaining },
    dispatch,
  ] = useReducer(reducer, initial);
  useEffect(() => {
    fetch("http://localhost:9000/questions")
      .then(res => res.json())
      .then(data => dispatch({ type: "dataReceived", payload: data }))
      .catch(err => dispatch({ type: "dataFailed" }));
  }, []);
  const numQuestions = questions.length;
  const totalPoint = questions.reduce((acc, cur) => acc + cur.points, 0);
  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen numQuestions={numQuestions} dispatch={dispatch} />
        )}
        {status === "active" && (
          <>
            <Progress
              index={index}
              numQuestions={numQuestions}
              point={point}
              totalPoint={totalPoint}
              answer={answer}
            />

            <Question
              question={questions[index]}
              dispatch={dispatch}
              answer={answer}
            />
            <Footer>
              <Timer secondRemaining={secondRemaining} dispatch={dispatch} />
              <NextButton
                answer={answer}
                dispatch={dispatch}
                index={index}
                numQuestions={numQuestions}
              />
            </Footer>
          </>
        )}
        {status === "finish" && (
          <Finish
            numQuestions={numQuestions}
            point={point}
            highScore={highScore}
            totalPoint={totalPoint}
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  );
}
