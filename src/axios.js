import axios from 'axios';

export const userInstance = axios.create({
	baseURL: 'http://localhost:5000/api/v1/user'
});

export const lobbyInstance = axios.create({
	baseURL: 'http://localhost:5000/api/v1/lobby'
});

export const chatInstance = axios.create({
	baseURL: 'http://localhost:5000/api/v1/chat'
});
