import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8080/api/quiz', // Set the base URL without the '/users'
});

export const sendUserName = async (name) => {
  try {
    const response = await instance.post('/users', { name }); // Update the URL path to '/users'
    return response.data; // Assuming your backend returns the created user
  } catch (error) {
    throw error;
  }
};
