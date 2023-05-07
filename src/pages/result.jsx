import Layout from "../../components/layout";
import Button from "../../components/button";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { SCORE_INITIAL_STATE } from "../../store/score/score.reducer";
import { useEffect, useState } from "react";
export default function Result() {
  const router = useRouter();
  const quizInformationSelect = useSelector((state) => state.score);
  const [quizInformation, setQuizInformation] = useState(SCORE_INITIAL_STATE);

  function handleBack() {
    router.push("/");
  }
  useEffect(() => {
    setQuizInformation(quizInformationSelect);
  }, [quizInformationSelect]);
  return (
    <Layout>
      <div className=" relative py-11 px-7">
        <div className=" w-full  bg-blue-500 rounded-2xl mx-auto p-10 flex flex-col gap-10 items-center">
          <div className=" font-semibold text-base leading-5 p-3 rounded-2xl bg-blue-400 text-white flex justify-center items-center w-fit">Quiz selesai</div>
          <div className="  text-white text-sm leading-4 font-semibold ">Kamu mendapatkan nilai</div>
          <div className=" w-52 h-52 rounded-full bg-white flex justify-center items-center text-6xl text-blue-500 font-bold">{quizInformation.currentScore}</div>
        </div>
        <div className=" grid grid-cols-2 grid-rows-2 w-full gap-x-20 gap-y-10 my-8 px-4">
          <div>
            <h3 className=" text-neutral-400 text-xs leading-4">Jawaban benar</h3>
            <p className=" font-bold text-lg  text-neutral-900">{quizInformation.currentCorrectAnswers} soal</p>
          </div>
          <div>
            <h3 className=" text-neutral-400 text-xs leading-4">Soal dilewati</h3>
            <p className=" font-bold text-lg  text-neutral-900">{quizInformation.currentUnansweredQuestions} soal</p>
          </div>
          <div>
            <h3 className=" text-neutral-400 text-xs leading-4">Jawaban salah</h3>
            <p className=" font-bold text-lg  text-neutral-900">{quizInformation.currentWrongAnswers} soal</p>
          </div>
          <div>
            <h3 className=" text-neutral-400 text-xs leading-4">Akurasi</h3>
            <p className=" font-bold text-lg  text-neutral-900">{(quizInformation.currentAccuracy * 100).toFixed(1)}%</p>
          </div>
        </div>
        <div className="relative -bottom-4 ">
          <Button onClick={handleBack}>Kembali ke beranda</Button>
        </div>
      </div>
    </Layout>
  );
}

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
