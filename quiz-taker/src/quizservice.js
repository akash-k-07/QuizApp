import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://quiz-app-backend-rt73.onrender.com/api/quiz', 
});

const quizService = {
  getQuestionJson: async () => {
    try {
      const response = await instance.get('questions/all');
      const questions = response.data.map(question => ({
        ...question,
        options: question.options.map(option => ({
          text: option.text,
          correct: option.correct || false, 
        })),
      }));
      return questions;
    } catch (error) {
      throw error;
    }
  },
  submitQuiz: async (quizData) => {
    try {
      const response = await instance.post('/responses/submit', quizData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  // Add other quiz-related methods here
};

export default quizService;
