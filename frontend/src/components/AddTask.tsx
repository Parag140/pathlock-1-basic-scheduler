// import React, { useState } from 'react';

// interface AddTaskProps {
//   onAddTask: (description: string) => void;
// }

// const AddTask: React.FC<AddTaskProps> = ({ onAddTask }) => {
//   const [description, setDescription] = useState('');

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (description.trim()) {
//       onAddTask(description);
//       setDescription('');
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="flex mb-4">
//       <input
//         type="text"
//         value={description}
//         onChange={(e) => setDescription(e.target.value)}
//         placeholder="Add a new task"
//         className="flex-grow p-2 border border-gray-300 rounded-l"
//       />
//       <button
//         type="submit"
//         className="bg-blue-500 text-white px-3 py-2 sm:px-4 rounded-r hover:bg-blue-600"
//       >
//         Add Task
//       </button>
//     </form>
//   );
// };

// export default AddTask;

import React, { useState } from 'react';

interface AddTaskProps {
  onAddTask: (description: string) => void;
}

const AddTask: React.FC<AddTaskProps> = ({ onAddTask }) => {
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim()) return;

    setIsSubmitting(true);
    try {
      await onAddTask(description.trim());
      setDescription('');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="What needs to be done? ✨"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            disabled={isSubmitting}
            className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-lg backdrop-blur-sm"
          />
          {description && (
            <button
              type="button"
              onClick={() => setDescription('')}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
            >
              ✕
            </button>
          )}
        </div>
        <button
          type="submit"
          disabled={isSubmitting || !description.trim()}
          className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:from-gray-600 disabled:to-gray-600 disabled:cursor-not-allowed text-white font-semibold rounded-2xl transition-all duration-200 shadow-lg hover:shadow-xl disabled:shadow-none flex items-center justify-center min-w-[140px] text-lg"
        >
          {isSubmitting ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
              Adding...
            </>
          ) : (
            <>
              <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add Task
            </>
          )}
        </button>
      </div>
    </form>
  );
};

export default AddTask;