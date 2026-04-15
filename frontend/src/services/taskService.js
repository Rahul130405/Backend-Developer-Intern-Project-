import API from './api';

const getTasks = async () => {
  const response = await API.get('/tasks');
  return response.data;
};

const createTask = async (taskData) => {
  const response = await API.post('/tasks', taskData);
  return response.data;
};

const updateTask = async (taskId, taskData) => {
  const response = await API.put(`/tasks/${taskId}`, taskData);
  return response.data;
};

const deleteTask = async (taskId) => {
  const response = await API.delete(`/tasks/${taskId}`);
  return response.data;
};

const taskService = {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
};

export default taskService;
