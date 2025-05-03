import React, { useState } from 'react';
import { createNote } from '../api';
import Toast from './Toast';

const Notes = ({ taskId, onNoteAdded, darkMode }) => {
  const [noteContent, setNoteContent] = useState('');
  const [toastMessage, setToastMessage] = useState('');

  const handleAddNote = async () => {
    if (!noteContent.trim()) return;
    await createNote({ task: taskId, content: noteContent });
    setNoteContent('');
    setToastMessage('Note added successfully');
    if (onNoteAdded) onNoteAdded();
  };

  return (
    <div className={`${darkMode ? 'bg-gray-800 bg-opacity-80 text-gray-100' : ''} mt-4`}>
      <textarea
        className={`${darkMode ? 'bg-gray-700 border-gray-600 text-gray-100' : 'bg-white border'} w-full border rounded p-2`}
        rows="3"
        placeholder="Add a personal note..."
        value={noteContent}
        onChange={(e) => setNoteContent(e.target.value)}
      />
      <button
        onClick={handleAddNote}
        className={`${darkMode ? 'bg-yellow-500 hover:bg-yellow-600 text-gray-900' : 'bg-blue-600 text-white hover:bg-blue-700'} mt-2 px-4 py-2 rounded`}
      >
        Add Note
      </button>
      {toastMessage && (
        <Toast message={toastMessage} onClose={() => setToastMessage('')} darkMode={darkMode} />
      )}
    </div>
  );
};

export default Notes;
