import Image from "next/image";
import { Inter } from "next/font/google";
import { useEffect, useState } from "react";
import axios from "axios";
import correctButtonIcon from "../assets/check-circle-white.svg";
import correctButtonIconGreen from "../assets/check-circle-green.svg";
import wrongButtonIconWhite from "../assets/x-white.svg";
import wrongButtonIconRed from "../assets/x-red.svg";
import nextButtonIcon from "../assets/arrow-right.svg";
import prevButtonIcon from "../assets/arrow-left.svg";
import backButtonIcon from "../assets/back.svg";
import clockIcon from "../assets/clock.svg";
import Layout from "../../components/layout";
import { redirect } from "next/dist/server/api-utils";
import { useDispatch, useSelector } from "react-redux";
import { fetchQuestionsStart, resetQuizInformation, selectAnswer, updateCurrentQuestionIndex } from "../../store/quiz/quiz.action";
import { submitScore } from "../../store/score/score.action";
import { useRouter } from "next/router";

// const inter = Inter({ subsets: ["latin"] });
// type Questions = {
//   category: string;
//   type: string;
//   difficulty: string;
//   question: string;
//   correct_answer: string;
//   incorrect_answer: string[];
// };
// interface RedirectReturn {
//   redirect: {
//     destination: string;
//     permanent: boolean;
//   };
// }
// interface SessionPropsReturn {
//   props: any;
// }
const Quiz = (props) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const maxTime = "01.00";
  const questionLong = 10;
  const maxQuestionIndex = 9;
  const minQuestionIndex = 0;
  const questionsMapSelect = useSelector((state) => state.quiz.questions);
  const currentQuestionIndexSelect = useSelector((state) => state.quiz.currentQuestionIndex);
  const answersMapSelect = useSelector((state) => state.quiz.answers);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [questionsMap, setQuestionsMap] = useState([]);
  const [answersMap, setAnswerMap] = useState({});
  const [countDownTimer, setCountDonwTimer] = useState("00.00");
  useEffect(() => {
    if (questionsMap.length == 0) dispatch(fetchQuestionsStart());
    countDown(1, 0);
  }, []);
  useEffect(() => {
    setQuestionsMap(questionsMapSelect);
  }, [questionsMapSelect]);
  useEffect(() => {
    setCurrentQuestionIndex(currentQuestionIndexSelect);
  }, [currentQuestionIndexSelect]);
  useEffect(() => {
    setAnswerMap(answersMapSelect);
  }, [answersMapSelect]);

  function prevQuestion() {
    if (currentQuestionIndexSelect > minQuestionIndex) {
      dispatch(updateCurrentQuestionIndex(currentQuestionIndexSelect - 1));
    }
  }
  function nextQuestion() {
    if (currentQuestionIndexSelect < maxQuestionIndex) {
      dispatch(updateCurrentQuestionIndex(currentQuestionIndexSelect + 1));
    }
  }
  const [timesUp, setTimesUp] = useState(false);

  function handleChoseIndexQuestion(index) {
    dispatch(updateCurrentQuestionIndex(index));
  }
  function answering(state, index) {
    const wrapAnwer = {
      [index]: state,
    };
    dispatch(selectAnswer(wrapAnwer));
  }
  function countScore(questionsMap, answersMap) {
    let score = 0;
    questionsMap.forEach((question, index) => {
      if (question.correct_answer == answersMap[index]) {
        score = score + 10;
      }
    });
    return score;
  }
  function countUnansweredQuestions(questionLong, answersMap) {
    const answerLength = Object.keys(answersMap).length;
    return questionLong - answerLength;
  }
  function countCorrectAnswer(questionsMap, answersMap) {
    let count = 0;
    questionsMap.forEach((question, index) => {
      if (question.correct_answer == answersMap[index]) {
        count = count + 1;
      }
    });
    return count;
  }

  function countWrongAnswer(questionsMap, answersMap) {
    let count = 0;
    questionsMap.forEach((question, index) => {
      if (question.correct_answer != answersMap[index] && answersMap[index] != undefined) {
        count = count + 1;
      }
    });
    return count;
  }
  function calculatorTime(maxDuration, userTestDuration) {
    const [maxDurationMinutes, maxDurationSeconds] = maxDuration.split(".").map(parseFloat);
    const [userTestDurationMinutes, userTestDurationSeconds] = userTestDuration.split(".").map(parseFloat);

    let hoursDiff = maxDurationMinutes - userTestDurationMinutes;
    let minutesDiff = maxDurationSeconds - userTestDurationSeconds;

    if (minutesDiff < 0) {
      hoursDiff -= 1;
      minutesDiff += 60;
    }

    const hoursDiffString = String(Math.abs(hoursDiff)).padStart(2, "0");
    const minutesDiffString = String(minutesDiff).padStart(2, "0");

    return `${hoursDiffString}.${minutesDiffString}`;
  }
  function countDown(minutes, seconds) {
    let totalSeconds = minutes * 60 + seconds;

    let timer = setInterval(function () {
      let remainingMinutes = Math.floor(totalSeconds / 60);
      let remainingSeconds = totalSeconds % 60;

      let formattedMinutes = ("0" + remainingMinutes).slice(-2);
      let formattedSeconds = ("0" + remainingSeconds).slice(-2);

      setCountDonwTimer(formattedMinutes + "." + formattedSeconds);
      if (--totalSeconds < 0) {
        clearInterval(timer);
        setTimesUp(true);
      }
    }, 1000);
  }

  useEffect(() => {
    if (timesUp) {
      handleSubmit();
    }
  }, [timesUp]);

  function handleSubmit() {
    const score = countScore(questionsMap, answersMap);
    const durationTest = calculatorTime(maxTime, countDownTimer);
    const unAnsweredQuestions = countUnansweredQuestions(questionLong, answersMap);
    const correctAnswer = countCorrectAnswer(questionsMap, answersMap);
    const wrongAnswer = countWrongAnswer(questionsMap, answersMap);
    const accuracy = correctAnswer / (correctAnswer + wrongAnswer);
    const result = { score, durationTest, unAnsweredQuestions, correctAnswer, wrongAnswer, accuracy };
    console.log(result);
    dispatch(submitScore(result));
    dispatch(resetQuizInformation());
    router.push("result");
  }
  function handleBack() {
    router.push("/");
    dispatch(resetQuizInformation());
  }
  return (
    <Layout>
      <div className=" py-11 px-7">
        {/* timer */}
        <div className="flex flex-col gap-8">
          <div className=" flex justify-between ">
            <div onClick={handleBack} className="w-8 h-8 flex justify-center items-center rounded-full hover:bg-neutral-100 cursor-pointer">
              <Image alt="back" src={backButtonIcon} />
            </div>
            {/* timer comp */}
            <div className=" flex gap-2 justify-center items-center ">
              <Image alt="clock" src={clockIcon} />
              <div className=" text-blue-500 font-medium w-11">{countDownTimer}</div>
            </div>
          </div>
          {/* list soal */}
          {questionsMap.length > 0 && (
            <div className=" flex gap-2  overflow-x-auto customscrollbar__bar py-3">
              {questionsMap.map((question, index) => {
                return index == currentQuestionIndexSelect ? (
                  <div key={index} className="cursor-pointer w-8 h-8 bg-blue-500 flex justify-center items-center rounded-full text-white leading-[18px] font-semibold shrink-0">
                    {index + 1}
                  </div>
                ) : (
                  <div
                    onClick={() => {
                      handleChoseIndexQuestion(index);
                    }}
                    key={index}
                    className=" cursor-pointer w-8 h-8 border text-blue-500 border-blue-500 flex justify-center items-center rounded-full  leading-[18px] font-semibold shrink-0"
                  >
                    {index + 1}
                  </div>
                );
              })}
            </div>
          )}

          {/* soal */}
          {questionsMap.length > 0 && (
            <div className="flex flex-col ">
              <div className=" flex gap-1 text-base  font-semibold">
                <div>{currentQuestionIndex + 1}. </div>
                <div className=" "> {questionsMap[0] && questionsMap[currentQuestionIndex].question}</div>
              </div>
              {/* answer section */}
              <div className=" flex justify-center  gap-10 my-10">
                {answersMap[currentQuestionIndex] == "True" ? (
                  <div
                    onClick={() => {
                      answering("True", currentQuestionIndexSelect);
                      nextQuestion();
                    }}
                    className=" w-12 h-12 flex justify-center items-center   rounded-full transition-colors cursor-pointer bg-green-400 hover:bg-green-500 "
                  >
                    <Image src={correctButtonIcon} alt="correct-answer" width={30} />
                  </div>
                ) : (
                  <div
                    onClick={() => {
                      answering("True", currentQuestionIndexSelect);
                      nextQuestion();
                    }}
                    className=" w-12 h-12 flex justify-center items-center   rounded-full transition-colors cursor-pointer bg-white border border-green-500 hover:bg-green-500 "
                  >
                    <Image src={correctButtonIconGreen} alt="correct-answer" width={30} />
                  </div>
                )}
                {answersMap[currentQuestionIndex] == "False" ? (
                  <div
                    onClick={() => {
                      answering("False", currentQuestionIndexSelect);
                      nextQuestion();
                    }}
                    className="   w-12 h-12 flex justify-center items-center   rounded-full transition-colors cursor-pointer bg-red-400 hover:bg-red-500  "
                  >
                    <Image src={wrongButtonIconWhite} alt="wrong-anwer" width={30} />
                  </div>
                ) : (
                  <div
                    onClick={() => {
                      answering("False", currentQuestionIndexSelect);
                      nextQuestion();
                    }}
                    className="   w-12 h-12 flex justify-center items-center   rounded-full transition-colors cursor-pointer bg-white border border-red-400 hover:bg-red-400  "
                  >
                    <Image src={wrongButtonIconRed} alt="wrong-anwer" width={30} />
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* button */}
        <div className=" absolute bottom-10 left-0 flex justify-between w-full gap-8 px-4">
          {currentQuestionIndexSelect == minQuestionIndex ? (
            <div onClick={prevQuestion} className="py-4 px-4 rounded-full bg-blue-300  transition-colors  flex justify-center items-center">
              <Image src={prevButtonIcon} alt="prevButtonIcon" />
            </div>
          ) : (
            <div onClick={prevQuestion} className="py-4 px-4 rounded-full bg-blue-500 cursor-pointer transition-colors  hover:bg-blue-600 flex justify-center items-center">
              <Image src={prevButtonIcon} alt="prevButtonIcon" />
            </div>
          )}

          <div onClick={handleSubmit} className=" border-blue-500 text-blue-500 border hover:bg-blue-500 hover:text-white transition-colors cursor-pointer    rounded-md   grow flex justify-center items-center ">
            Submit Quiz
          </div>
          {currentQuestionIndexSelect == maxQuestionIndex ? (
            <div onClick={nextQuestion} className="py-4 px-4 rounded-full bg-blue-300 flex justify-center items-center  ">
              <Image src={nextButtonIcon} alt="nextButtonIcon" />
            </div>
          ) : (
            <div onClick={nextQuestion} className="py-4 px-4 rounded-full bg-blue-500 cursor-pointer transition-colors  hover:bg-blue-600 flex justify-center items-center  ">
              <Image src={nextButtonIcon} alt="nextButtonIcon" />
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};
import { getSession } from "next-auth/react";

export async function getServerSideProps({ req }) {
  const session = await getSession({ req });
  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
  // authorize user return session
  return {
    props: { session },
  };
}

export default Quiz;
