import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://quiz-app-backend-rt73.onrender.com/api/quiz',
});

export const sendUserName = async (name) => {
  try {
    const response = await instance.post('/users', { name }); 
    return response.data; 
  } catch (error) {
    throw error;
  }
};
