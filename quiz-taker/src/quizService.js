class QuizService {
    async getQuestionJson() {
      // Fetch questions from the server or database
      const response = await fetch('/api/questions'); // Replace with your actual endpoint
      const data = await response.json();
      return data;
    }
  
    async submitQuiz(quizData) {
      // Submit quiz data to the server
      const response = await fetch('/api/submit-quiz', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(quizData),
      });
  
      return response.json();
    }
  
    // Add more methods as needed...
  }
  
  export default new QuizService();