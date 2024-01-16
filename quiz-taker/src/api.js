import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8080/api', // Replace with your backend URL
});

export const sendUserName = async (name) => {
  try {
    const response = await instance.post('/user', { name });
    return response.data; // Assuming your backend returns the created user
  } catch (error) {
    throw error;
  }
};