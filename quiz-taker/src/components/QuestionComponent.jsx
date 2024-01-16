import React, { useEffect, useState } from 'react';


const QuestionComponent = ({ quizService }) => {
  const [name, setName] = useState('');
  const [questionList, setQuestionList] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [points, setPoints] = useState(0);
  const [counter, setCounter] = useState(60);
  const [correctAnswer, setCorrectAnswer] = useState(0);
  const [incorrectAnswer, setIncorrectAnswer] = useState(0);
  const [interval$, setInterval$] = useState(null);
  const [progress, setProgress] = useState('0');
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setName(localStorage.getItem('name') || '');

      try {
        const res = await quizService.getQuestionJson();
        setQuestionList(res.questions);
        startCounter();
      } catch (error) {
        console.error('Error fetching questions', error);
      }
    };

    fetchData();

    return () => clearInterval(interval$);
  }, [quizService]);

  const nextQuestion = () => {
    setCurrentQuestion((prevQuestion) => prevQuestion + 1);
  };

  const prevQuestion = () => {
    setCurrentQuestion((prevQuestion) => prevQuestion - 1);
  };

  const answer = (currentQno, option) => {
    if (currentQno === questionList.length) {
      setIsQuizCompleted(true);
      stopCounter();
      submitQuiz();
    }

    if (option.correct) {
      setPoints((prevPoints) => prevPoints + 10);
      setCorrectAnswer((prevCorrect) => prevCorrect + 1);

      setTimeout(() => {
        nextQuestion();
        resetCounter();
        getProgressPercent();
      }, 1000);
    } else {
      setTimeout(() => {
        nextQuestion();
        resetCounter();
        setIncorrectAnswer((prevIncorrect) => prevIncorrect + 1);
        getProgressPercent();
      }, 1000);
      setPoints((prevPoints) => prevPoints - 10);
    }
  };

  const submitQuiz = async () => {
    try {
      const quizData = {
        playerName: name,
        points: points,
      };

      const response = await quizService.submitQuiz(quizData);
      console.log('Quiz response submitted successfully', response);
    } catch (error) {
      console.error('Error submitting quiz response', error);
    }
  };

  const startCounter = () => {
    const intervalId = setInterval(() => {
      setCounter((prevCounter) => prevCounter - 1);

      if (counter === 0) {
        nextQuestion();
        setCounter(60);
        setPoints((prevPoints) => prevPoints - 10);
      }
    }, 1000);

    setInterval$(intervalId);
  };

  const stopCounter = () => {
    clearInterval(interval$);
    setCounter(0);
  };

  const resetCounter = () => {
    stopCounter();
    setCounter(60);
    startCounter();
  };

  const resetQuiz = () => {
    resetCounter();
    setPoints(0);
    setCounter(60);
    setCurrentQuestion(0);
    setProgress('0');
    setIsQuizCompleted(false);
  };

  const getProgressPercent = () => {
    const progressPercent = ((currentQuestion / questionList.length) * 100).toFixed(0);
    setProgress(progressPercent.toString());
  };

  return (
<div className="container-fluid mt-10 flex align-content-center justify-center">
      <div className="bg-white p-8 border rounded-xl border-slate-300 sm:w-full mx-5 lg:w-10/12 xl:w-1/2">
        <div className="flex justify-between p-3">
          <div className="image">
            <img src="/images/stopwatch.png" width="100" alt="" />
          </div>
          <div className="quiz-header mt-2">
            <h4 className="text-xl font-bold">Quiz</h4>
            <span>Welcome {name}</span>
          </div>
        </div>

        {!isQuizCompleted && (
          <div>
            <div className="flex justify-around py-3 text-lg font-bold">
              <div className="score">
                <h5>{points} Points</h5>
              </div>
              <div className="question-remaining">
                <span>Question {currentQuestion + 1} of {questionList.length}</span>
              </div>
              <div className="timer">
                <h5>{counter} sec ⌛</h5>
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full dark:bg-gray-150">
              <div
                className="bg-blue-600 h-6 text-lg font-medium text-blue-100 text-center p-0.5 leading-none rounded-full"
                style={{ width: progress + '%' }}
              >
                {progress}%
              </div>
            </div>
            <div className="question mt-6">
              <div className="bg-white px-3 py-4 border rounded-xl border-slate-300 w-full ">
                <h3 className="text-xl font-bold">{questionList[currentQuestion]?.questionText}</h3>
              </div>
            </div>
            <div className="options mt-2">
              <ol className="list-decimal ml-5">
                {questionList[currentQuestion]?.options.map((option, index) => (
                  <li key={index} className="mt-2" onClick={() => answer(currentQuestion + 1, option)}>
                    <div
                      className={`px-3 py-4 border rounded-xl border-slate-300 w-full cursor-pointer duration-300 ease-in-out hover:transition-all hover:duration-500 text-lg font-semibold`}
                    >
                      {option.text}
                    </div>
                  </li>
                ))}
              </ol>
            </div>
            <div className="flex justify-between mt-10">
              <button
                className="inline-flex items-center justify-center w-16 h-16 mr-2 text-indigo-100 transition-colors duration-150 bg-blue-700 rounded-full focus:shadow-outline hover:bg-blue-800"
                onClick={prevQuestion}
                disabled={currentQuestion === 0}
              >
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="5" d="M15 19l-7-7 7-7"></path>
                </svg>
              </button>
              <button
                className="inline-flex items-center justify-center w-16 h-16 mr-2 text-indigo-100 transition-colors duration-150 bg-blue-700 rounded-full focus:shadow-outline hover:bg-blue-800"
                onClick={resetQuiz}
              >
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                </svg>
              </button>
              <button
                className="inline-flex items-center justify-center w-16 h-16 mr-2 text-indigo-100 transition-colors duration-150 bg-blue-700 rounded-full focus:shadow-outline hover:bg-blue-800"
                onClick={nextQuestion}
                disabled={currentQuestion === questionList.length - 1}
              >
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="5" d="M9 5l7 7-7 7"></path>
                </svg>
              </button>
            </div>
          </div>
        )}

        {isQuizCompleted && (
          <div className="row flex justify-center">
            <div className="text-center col-md-6 col-sm-12">
              <h3 className="text-xl font-bold">Congratulations!!
                <br />You have completed the quiz<br /> Below is your result:
              </h3>
              <p>Total Questions Attempted : {questionList.length} </p>
              <p>Total Correct Answered : {correctAnswer} </p>
              <p>Total Wrong Answered : {incorrectAnswer} </p>
              <p className="text-xl font-bold">Your Score : {points} Points </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuestionComponent;