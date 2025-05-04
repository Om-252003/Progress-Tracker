import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const getTasks = (params) => axios.get(`${API_BASE_URL}/tasks`, { params });
export const getTask = (id) => axios.get(`${API_BASE_URL}/tasks/${id}`);
export const createTask = (task) => axios.post(`${API_BASE_URL}/tasks`, task);
export const updateTask = (id, task) => axios.put(`${API_BASE_URL}/tasks/${id}`, task);
export const deleteTask = (id) => axios.delete(`${API_BASE_URL}/tasks/${id}`);

export const getWeeks = () => axios.get(`${API_BASE_URL}/weeks`);
export const getWeek = (number) => axios.get(`${API_BASE_URL}/weeks/${number}`);
export const createOrUpdateWeek = (week) => axios.post(`${API_BASE_URL}/weeks`, week);
export const deleteWeek = (number) => axios.delete(`${API_BASE_URL}/weeks/${number}`);

export const getNotesByTask = (taskId) => axios.get(`${API_BASE_URL}/notes/task/${taskId}`);
export const createNote = (note) => axios.post(`${API_BASE_URL}/notes`, note);
export const updateNote = (id, note) => axios.put(`${API_BASE_URL}/notes/${id}`, note);
export const deleteNote = (id) => axios.delete(`${API_BASE_URL}/notes/${id}`);
