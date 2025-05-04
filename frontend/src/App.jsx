import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useParams } from 'react-router-dom';
import Dashboard from './components/Dashboard.jsx';
import WeekView from './components/WeekView.jsx';
import TaskView from './components/TaskView.jsx';
import Notes from './components/Notes.jsx';

const SunIcon = ({ className }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="12" cy="12" r="5" />
    <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M16.95 16.95l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M16.95 7.05l1.42-1.42" />
  </svg>
);

const MoonIcon = ({ className }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M21 12.79A9 9 0 1111.21 3a7 7 0 009.79 9.79z" />
  </svg>
);

const DashboardPage = ({ darkMode }) => {
  const navigate = useNavigate();

  const handleSelectWeek = (weekNumber) => {
    navigate(`/week/${weekNumber}`);
  };

  return <Dashboard onSelectWeek={handleSelectWeek} darkMode={darkMode} />;
};

const WeekPage = ({ darkMode }) => {
  const { weekNumber } = useParams();
  const navigate = useNavigate();

  const handleSelectTask = (task) => {
    navigate(`/week/${weekNumber}/task/${task._id}`);
  };

  const handleBackToDashboard = () => {
    navigate('/');
  };

  return (
    <>
      <button
        onClick={handleBackToDashboard}
        className={`mb-4 underline ${darkMode ? 'text-gray-300' : 'text-blue-600'}`}
      >
        &larr; Back to Dashboard
      </button>
      <WeekView weekNumber={parseInt(weekNumber, 10)} onSelectTask={handleSelectTask} darkMode={darkMode} />
    </>
  );
};

const TaskPage = ({ darkMode }) => {
  const { weekNumber, taskId } = useParams();
  const navigate = useNavigate();

  const handleBackToWeekView = () => {
    navigate(`/week/${weekNumber}`);
  };

  return (
    <>
      <button
        onClick={handleBackToWeekView}
        className={`mb-4 underline ${darkMode ? 'text-gray-300' : 'text-blue-600'}`}
      >
        &larr; Back to Week View
      </button>
      <TaskView task={{ _id: taskId }} onUpdate={() => {}} darkMode={darkMode} />
      <Notes taskId={taskId} onNoteAdded={() => {}} darkMode={darkMode} />
    </>
  );
};

const App = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <Router>
      <button
        onClick={toggleDarkMode}
        aria-label="Toggle Dark Mode"
        className={`fixed top-4 right-4 z-50 p-2 rounded-full focus:outline-none bg-gray-200 dark:bg-gray-700 text-yellow-500 dark:text-yellow-300 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-300`}
      >
        {darkMode ? <SunIcon className="w-6 h-6" /> : <MoonIcon className="w-6 h-6" />}
      </button>
      <div className={`min-h-screen p-4 flex flex-col ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gradient-to-r from-yellow-50 via-yellow-100 to-yellow-50 text-yellow-900'}`}>
        <div className="w-full max-w-[1600px] mx-auto flex-grow flex flex-col">
          <Routes>
            <Route path="/" element={<DashboardPage darkMode={darkMode} />} />
            <Route path="/week/:weekNumber" element={<WeekPage darkMode={darkMode} />} />
            <Route path="/week/:weekNumber/task/:taskId" element={<TaskPage darkMode={darkMode} />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
