import React, { useEffect, useState } from 'react';
import { getWeeks, getTasks } from '../api';

const Dashboard = ({ onSelectWeek, darkMode }) => {
  const [weeks, setWeeks] = useState([]);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const weeksRes = await getWeeks();
      setWeeks(weeksRes.data);
      const tasksRes = await getTasks();
      setTasks(tasksRes.data);
    };
    fetchData();
  }, []);

  const calculateProgress = (weekNumber) => {
    const weekTasks = tasks.filter(task => task.week === weekNumber);
    if (weekTasks.length === 0) return 0;
    const doneTasks = weekTasks.filter(task => task.status === 'Done');
    return Math.round((doneTasks.length / weekTasks.length) * 100);
  };

  return (
    <div className={`${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gradient-to-r from-yellow-50 via-yellow-100 to-yellow-50 text-yellow-900'} min-h-screen p-12 transition-colors duration-500`}>
      <div className="max-w-[1400px] mx-auto relative">
        <h1 className="text-5xl font-extrabold mb-12 flex items-center gap-4">
          Interview Prep Dashboard
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12">
          {weeks.map(week => (
            <div
              key={week._id}
              onClick={() => onSelectWeek(week.number)}
              className={`cursor-pointer rounded-2xl p-12 shadow-2xl transition-shadow duration-500 ${
                darkMode
                  ? 'bg-gray-800 shadow-yellow-900 hover:shadow-yellow-700'
                  : 'bg-white shadow-yellow-300 hover:shadow-yellow-400'
              }`}
            >
              <h2 className={`text-3xl font-semibold mb-6 ${darkMode ? 'text-yellow-400' : 'text-yellow-700'}`}>Week {week.number}</h2>
              <div className={`w-full rounded-full h-8 mb-6 ${darkMode ? 'bg-yellow-900' : 'bg-yellow-200'}`}>
                <div
                  className="h-8 rounded-full bg-yellow-500 transition-all duration-500"
                  style={{ width: `${calculateProgress(week.number)}%` }}
                ></div>
              </div>
              <p className={`font-semibold text-xl ${darkMode ? 'text-yellow-300' : 'text-yellow-800'}`}>
                {calculateProgress(week.number)}% completed
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
