import React, { useEffect, useState } from 'react';
import { getNotesByTask, updateTask } from '../api';

const TaskView = ({ task, onUpdate, darkMode }) => {
  const [notes, setNotes] = useState([]);
  const [status, setStatus] = useState(task?.status || 'Pending');

  useEffect(() => {
    const fetchNotes = async () => {
      if (!task || !task._id) return;
      const res = await getNotesByTask(task._id);
      setNotes(res.data);
    };
    fetchNotes();
  }, [task]);

  const handleStatusChange = async (e) => {
    const newStatus = e.target.value;
    setStatus(newStatus);
    if (task && task._id) {
      await updateTask(task._id, { status: newStatus });
      if (onUpdate) onUpdate();
    }
  };

  if (!task) return null;

  return (
    <div className={`p-6 rounded-lg shadow-lg backdrop-blur-md ${darkMode ? 'bg-gray-800 bg-opacity-80 text-gray-100' : 'bg-white bg-opacity-20 text-purple-900'}`}>
      <h2 className={`text-2xl font-bold mb-6 ${darkMode ? 'text-gray-100' : 'text-purple-900'}`}>{task.topic}</h2>
      <p className={`${darkMode ? 'text-gray-300' : 'text-purple-800'} mb-4`}>{task.description}</p>
      <p className={`${darkMode ? 'text-gray-300' : 'text-purple-800'} mb-4`}><strong>Difficulty:</strong> {task.difficulty}</p>
      <div className="mb-6">
        <strong className={`${darkMode ? 'text-gray-100' : 'text-purple-900'}`}>Resources:</strong>
        <ul className={`${darkMode ? 'text-gray-300' : 'text-purple-700'} list-disc list-inside`}>
          {(task.resources || []).map((res, idx) => (
            <li key={idx}>
              <a href={res} target="_blank" rel="noopener noreferrer" className={`${darkMode ? 'text-yellow-400' : 'text-purple-600'} underline hover:${darkMode ? 'text-yellow-300' : 'text-purple-800'}`}>
                {res}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className="mb-6">
        <label htmlFor="status" className={`block font-semibold mb-2 ${darkMode ? 'text-gray-100' : 'text-purple-900'}`}>Status:</label>
        <select
          id="status"
          value={status}
          onChange={handleStatusChange}
          className={`border rounded p-2 w-full max-w-xs ${darkMode ? 'bg-gray-700 border-gray-600 text-gray-100' : ''}`}
        >
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Done">Done</option>
        </select>
      </div>
      <div>
        <strong className={`${darkMode ? 'text-gray-100' : 'text-purple-900'}`}>Notes:</strong>
        <ul className={`${darkMode ? 'text-gray-300' : 'text-purple-700'} list-disc list-inside`}>
          {notes.map(note => (
            <li key={note._id}>{note.content}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TaskView;
