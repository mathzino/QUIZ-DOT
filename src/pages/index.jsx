import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Layout from "../../components/layout";
import Button from "../../components/button";
import logOutIcon from "../assets/log-out.svg";
import Image from "next/image";
import { useRouter } from "next/router";
import { signOut, useSession } from "next-auth/react";
import { SCORE_INITIAL_STATE } from "../../store/score/score.reducer";
import { resetScoreHistory } from "../../store/score/score.action";
import { getSession } from "next-auth/react";
import { useDispatch } from "react-redux";
export default function Home() {
  const session = useSession();
  const dispatch = useDispatch();
  const router = useRouter();
  const scoreInformationSelect = useSelector((state) => state.score);
  const [scoreInformation, setScoreInformationSelect] = useState(SCORE_INITIAL_STATE);

  useEffect(() => {
    setScoreInformationSelect(scoreInformationSelect);
  }, [scoreInformationSelect]);
  function handleStartQuiz() {
    router.push("quiz");
  }
  function handleSignOut() {
    signOut();
  }
  function handleResetHistoryScore() {
    dispatch(resetScoreHistory());
  }

  return (
    <Layout>
      <div className=" h-52 bg-blue-500 w-full rounded-b-3xl relative px-4 pt-8 flex justify-center">
        <div className=" w-full flex justify-between">
          <div className=" font-semibold text-base text-white">Hi, {session.data.user.name}</div>
          <div onClick={handleSignOut} className=" w-8 h-8 rounded-full cursor-pointer hover:bg-neutral-200 hover:bg-opacity-50 flex justify-center items-center ">
            <Image alt="logout" src={logOutIcon}></Image>
          </div>
        </div>
        <div className=" grid grid-cols-2 grid-rows-1 bg-white py-6 rounded-xl absolute -bottom-12  w-64 shadow-md ">
          <div className="  text-center">
            <h1 className=" text-base text-blue-500 font-semibold">Highscore</h1>
            <p className=" text-2xl text-blue-500 font-semibold">{scoreInformation.highScore}</p>
          </div>
          <div className="  text-center">
            <h1 className=" text-base text-blue-500 font-semibold">Last score</h1>
            <p className=" text-2xl text-blue-500 font-semibold">{scoreInformation.currentScore}</p>
          </div>
        </div>
      </div>
      <div className="px-4">
        <div className=" mt-20">
          <Button onClick={handleStartQuiz}>Start quiz</Button>
        </div>
      </div>
      {scoreInformation.history.length > 0 && (
        <div className=" px-4 ">
          <div className=" flex justify-between items-center mt-8">
            <div className=" font-semibold text-base text-neutral-800">History</div>
            <Button onClick={handleResetHistoryScore}>Reset history</Button>
          </div>
          <div className=" mt-8 flex flex-col gap-4">
            {scoreInformation.history.map((score, index) => {
              return (
                <div className=" flex justify-between items-center shadow-md px-2 py-2 ">
                  <div className=" text-neutral-600 font-semibold text-sm">
                    {index + 1}. time : {score.durationTest}
                  </div>
                  <div className="text-blue-500 font-semibold text-base  ">{score.score} Pts</div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </Layout>
  );
}

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
