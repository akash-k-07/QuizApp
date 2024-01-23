import React, { Component } from 'react';
import quizService from '../quizservice';

class QuestionComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      questionList: [],
      currentQuestion: 0,
      points: 0,
      counter: 60,
      correctAnswer: 0,
      incorrectAnswer: 0,
      intervalId: null,
      progress: '0',
      isQuizCompleted: false,
    };
  }

  componentDidMount() {
    this.fetchData();
    this.startCounter();
  }

  componentWillUnmount() {
    clearInterval(this.state.intervalId);
  }

  fetchData = async () => {
    const name = localStorage.getItem('name') || '';
    this.setState({ name });

    try {
      const res = await quizService.getQuestionJson();
      console.log('Response from getQuestionJson:', res);
      console.log('Fetched data:', res);

      if (res && Array.isArray(res) && res.length > 0) {
        this.setState({ questionList: res });
      } else {
        console.error('Empty or invalid data received:', res);
        this.setState({ questionList: [] });
      }
    } catch (error) {
      console.error('Error fetching questions', error);
      this.setState({ questionList: [] });
    }
  };

  nextQuestion = () => {
    this.setState((prevState) => ({ currentQuestion: prevState.currentQuestion + 1 }), () => {
      this.getProgressPercent();
    });
  };

  prevQuestion = () => {
    this.setState((prevState) => ({ currentQuestion: prevState.currentQuestion - 1 }), () => {
      this.getProgressPercent();
    });
  };

  answer = (currentQno, option) => {
    const { questionList } = this.state;
  
    if (currentQno === questionList.length) {
      this.setState({ isQuizCompleted: true });
      this.stopCounter();
      this.submitQuiz();
    }
  
    const correctOption = questionList[currentQno]?.options.find(opt => opt.correct);
  
    console.log('Selected option:', option);
    console.log('Correct option:', correctOption);
  
    if (option.correct) {
      this.setState(
        (prevState) => ({
          points: prevState.points + 10,
          correctAnswer: prevState.correctAnswer + 1,
        }),
        () => {
          setTimeout(() => {
            this.nextQuestion();
            this.resetCounter();
          }, 1000);
        }
      );
    } else {
      console.log('Incorrect option chosen. Expected correct option:', correctOption);
      this.setState(
        (prevState) => ({
          points: prevState.points - 10,
          incorrectAnswer: prevState.incorrectAnswer + 1,
        }),
        () => {
          setTimeout(() => {
            this.nextQuestion();
            this.resetCounter();
          }, 1000);
        }
      );
    }
  };
  

  submitQuiz = async () => {
    const { name, points } = this.state;

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

  startCounter = () => {
    const intervalId = setInterval(() => {
      this.setState(
        (prevState) => ({ counter: prevState.counter - 1 }),
        () => {
          if (this.state.counter === 0) {
            this.nextQuestion();
            this.setState((prevState) => ({ counter: 60, points: prevState.points - 10 }));
          }
        }
      );
    }, 1000);

    this.setState({ intervalId });
  };

  stopCounter = () => {
    clearInterval(this.state.intervalId);
    this.setState({ counter: 0 });
  };

  resetCounter = () => {
    this.stopCounter();
    this.setState({ counter: 60 });
    this.startCounter();
  };

  resetQuiz = () => {
    this.resetCounter();
    this.setState({
      points: 0,
      counter: 60,
      currentQuestion: 0,
      progress: '0',
      isQuizCompleted: false,
    });
  };

  getProgressPercent = () => {
    const { currentQuestion, questionList } = this.state;

    if (questionList && questionList.length > 0) {
      const progressPercent = ((currentQuestion / (questionList.length - 1)) * 100).toFixed(0);
      this.setState({ progress: progressPercent.toString() });
    }
  };

  render() {
    const {
      name,
      questionList,
      currentQuestion,
      points,
      counter,
      progress,
      isQuizCompleted,
      correctAnswer,
      incorrectAnswer,
    } = this.state;

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

          {isQuizCompleted ? (
            <div className="row flex justify-center">
              <div className="text-center col-md-6 col-sm-12">
                <h3 className="text-xl font-bold">
                  Congratulations!! <br />
                  You have completed the quiz <br /> Below is your result:
                </h3>
                <p>Total Questions Attempted: {questionList.length} </p>
                <p>Total Correct Answered: {correctAnswer} </p>
                <p>Total Wrong Answered: {incorrectAnswer} </p>
                <p className="text-xl font-bold">Your Score: {points} Points </p>
              </div>
            </div>
          ) : (
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
              <div className="w-full bg-gray-200 rounded-full">
                <div
                  className="bg-blue-600 h-6 text-lg font-medium text-blue-100 text-center p-0.5 leading-none rounded-full"
                  style={{ width: progress + '%' }}
                >
                  {progress}%
                </div>
              </div>
              <div className="question mt-6">
                <div className="bg-white px-3 py-4 border rounded-xl border-slate-300 w-full">
                  <h3 className="text-xl font-bold">{questionList[currentQuestion]?.questionText}</h3>
                </div>
              </div>
              <div className="options mt-2">
                <ol className="list-decimal ml-5">
                  {questionList[currentQuestion]?.options &&
                    questionList[currentQuestion]?.options.map((option, index) => (
                      <li key={index} className="mt-2" onClick={() => this.answer(currentQuestion + 1, option)}>
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
                  onClick={this.prevQuestion}
                  disabled={currentQuestion === 0}
                >
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="5" d="M15 19l-7-7 7-7"></path>
                  </svg>
                </button>
                <button
                  className="inline-flex items-center justify-center w-16 h-16 mr-2 text-indigo-100 transition-colors duration-150 bg-blue-700 rounded-full focus:shadow-outline hover:bg-blue-800"
                  onClick={this.resetQuiz}
                >
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                  </svg>
                </button>
                <button
                  className="inline-flex items-center justify-center w-16 h-16 mr-2 text-indigo-100 transition-colors duration-150 bg-blue-700 rounded-full focus:shadow-outline hover:bg-blue-800"
                  onClick={this.nextQuestion}
                  disabled={currentQuestion === questionList.length - 1}
                >
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="5" d="M9 5l7 7-7 7"></path>
                  </svg>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default QuestionComponent;
