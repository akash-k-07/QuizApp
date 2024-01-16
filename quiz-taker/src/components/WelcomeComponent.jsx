import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { sendUserName } from '../api'; // Update with your correct path

const WelcomeComponent = () => {
  const navigate = useNavigate();
  const nameRef = useRef(null);

  const startQuiz = async () => {
    const name = nameRef.current.value;

    try {
      await sendUserName(name);
      // Use navigate function to go to the next page
      navigate('/question');
    } catch (error) {
      if (error.response && error.response.status === 409) {
        // User with the same name already exists, handle conflict
        console.error('User with the same name already exists');
        // You may want to display a message to the user or take other actions
      } else {
        console.error('Error sending user data to the backend', error);
        // Handle other errors as needed
      }
    }
  };

  return (
    <div className="container-fluid mt-10 flex align-content-center justify-center">
      <div className="bg-white p-8 border rounded-3xl border-slate-300 shadow-lg shadow-gray-500/50 sm:w-full mx-5 lg:w-5/6">
        <h1 className="text-4xl font-extrabold text-left">Welcome to Quiz App</h1>
        <p className="text-left text-lg">This quiz will contain a total of 9 questions. Each question holds 1 points.</p>
        <h4 className="text-2xl font-bold mt-5">Rules:</h4>
        <ol className="list-decimal ml-5 text-lg">
          <li>Correct Question gives you 1 points</li>
          <li>Incorrect Question gives you -0.25 points</li>
          <li>You will have 10 seconds to answer each question</li>
          <li>Refreshing the page will reset the question</li>
        </ol>
        <h1 className="text-center font-semibold text-4xl">All the best!</h1>

        <div className="flex justify-center">
          <div className="flex flex-row flex-wrap justify-center sm:w-full md:w-11/12 lg:w-1/2">
            <input
              placeholder="Enter your Name"
              ref={nameRef}
              className="text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200 focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-100 focus:outline-none focus:shadow-lg focus:ring-0 ring-offset-current ring-offset-1 ring-gray-400"
            />
            <button
              className="transition mt-5 ease-in-out delay-150 bg-blue-500 hover:-translate-y-1 hover:scale-110 duration-300 shadow-lg shadow-blue-500/50 py-2 px-3 rounded-lg font-bold text-white hover:bg-blue-600"
              onClick={startQuiz}
            >
              Start the quiz
            </button>
          </div>
        </div>
      </div>
    </div> 
  );
};

export default WelcomeComponent;