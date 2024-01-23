import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8080/api/quiz', // Updated to match the common path
});

const quizService = {
  getQuestionJson: async () => {
    try {
      const response = await instance.get('questions/all');
      const questions = response.data.map(question => ({
        ...question,
        options: question.options.map(option => ({
          text: option.text,
          correct: option.correct || false, // Ensure correct flag is set, default to false if not provided
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
