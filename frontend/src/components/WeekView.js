import React, { useEffect, useState } from 'react';
import { getTasks, updateTask } from '../api';

const WeekView = ({ weekNumber, onSelectTask, darkMode }) => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      const res = await getTasks({ week: weekNumber });
      setTasks(res.data);
    };
    fetchTasks();
  }, [weekNumber]);

  const statusColorsLight = {
    'Pending': 'bg-gray-300',
    'In Progress': 'bg-yellow-400',
    'Done': 'bg-green-500',
  };

  const statusColorsDark = {
    'Pending': 'bg-gray-600',
    'In Progress': 'bg-yellow-600',
    'Done': 'bg-green-700',
  };

  const handleStatusChange = async (task, newStatus) => {
    await updateTask(task._id, { status: newStatus });
    setTasks(tasks.map(t => t._id === task._id ? { ...t, status: newStatus } : t));
  };

  const statusColors = darkMode ? statusColorsDark : statusColorsLight;

  return (
    <div className={`${darkMode ? 'bg-gray-800 bg-opacity-80 text-gray-100' : 'bg-white bg-opacity-20 text-gray-900'} p-6 rounded-lg shadow-lg backdrop-blur-md`}>
      <h2 className={`${darkMode ? 'text-gray-100' : 'text-purple-900'} text-2xl font-bold mb-6`}>Week {weekNumber} Tasks</h2>
      <ul className="space-y-4">
        {tasks.map(task => (
          <li
            key={task._id}
            className={`flex items-center justify-between p-4 border rounded-lg cursor-pointer hover:bg-opacity-30 transition duration-300 ${statusColors[task.status] || ''} ${darkMode ? 'border-gray-700 hover:bg-gray-700' : 'border-purple-300 hover:bg-purple-100'}`}
          >
            <div onClick={() => onSelectTask(task)} className="flex-1 cursor-pointer">
              <h3 className={`${darkMode ? 'text-gray-100' : 'text-purple-800'} font-semibold`}>{task.topic}</h3>
              <p className={`${darkMode ? 'text-gray-300' : 'text-purple-700'} text-sm`}>{task.description}</p>
            </div>
            <select
              value={task.status}
              onChange={(e) => handleStatusChange(task, e.target.value)}
              className={`${darkMode ? 'bg-gray-700 border-gray-600 text-gray-100' : 'border rounded p-2'} border rounded p-2`}
              title="Change task status"
            >
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Done">Done</option>
            </select>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WeekView;
