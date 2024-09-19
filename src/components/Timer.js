import { useEffect } from "react";

export default function Timer({ dispatch, secondRemaining }) {
  useEffect(() => {
    const id = setInterval(() => {
      dispatch({ type: "tick" });
    }, 1000);

    return () => {
      clearInterval(id);
    };
  }, [dispatch]);
  const mins = Math.floor(secondRemaining / 60);
  const seconds = secondRemaining % 60;
  return (
    <div className="timer">
      {mins < 10 && 0}
      {mins}:{seconds < 10 && 0}
      {seconds}
    </div>
  );
}
