// import React from 'react';

// interface TaskItemProps {
//   task: { id: string; description: string; isCompleted: boolean };
//   onToggleComplete: (id: string) => void;
//   onDelete: (id: string) => void;
// }

// const TaskItem: React.FC<TaskItemProps> = ({ task, onToggleComplete, onDelete }) => {
//   return (
//     <div className="flex items-center justify-between p-2 border-b border-gray-200">
//       <div className="flex items-center">
//         <input
//           type="checkbox"
//           checked={task.isCompleted}
//           onChange={() => onToggleComplete(task.id)}
//           className="mr-2"
//         />
//         <span className={task.isCompleted ? 'line-through text-gray-500' : ''}>
//           {task.description}
//         </span>
//       </div>
//       <button
//         onClick={() => onDelete(task.id)}
//         className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 sm:px-3"
//       >
//         Delete
//       </button>
//     </div>
//   );
// };

// export default TaskItem;

import React from 'react';

interface TaskItemProps {
  task: TaskItem;
  onToggleComplete: (id: string) => void;
  onDelete: (id: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onToggleComplete, onDelete }) => {
  const getTimeAgo = (createdAt?: string) => {
    if (!createdAt) return '';
    const now = new Date();
    const created = new Date(createdAt);
    const diffInHours = (now.getTime() - created.getTime()) / (1000 * 60 * 60);
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${Math.floor(diffInHours)}h ago`;
    return `${Math.floor(diffInHours / 24)}d ago`;
  };

  return (
    <div className="group bg-white/5 hover:bg-white/10 rounded-xl p-4 transition-all duration-200 border border-white/10 hover:border-white/20 backdrop-blur-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4 flex-1 min-w-0">
          {/* Custom Checkbox */}
          <button
            onClick={() => onToggleComplete(task.id)}
            className={`flex-shrink-0 w-6 h-6 rounded-lg border-2 transition-all duration-200 flex items-center justify-center ${
              task.isCompleted
                ? 'bg-gradient-to-r from-green-500 to-emerald-500 border-transparent shadow-lg'
                : 'border-gray-400 hover:border-blue-400 hover:bg-blue-400/20'
            }`}
          >
            {task.isCompleted && (
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            )}
          </button>

          {/* Task Content */}
          <div className="flex-1 min-w-0">
            <p className={`text-lg truncate transition-all duration-200 ${
              task.isCompleted 
                ? 'text-gray-400 line-through' 
                : 'text-white'
            }`}>
              {task.description}
            </p>
            {task.createdAt && (
              <p className="text-gray-400 text-xs mt-1">
                {getTimeAgo(task.createdAt)}
              </p>
            )}
          </div>
        </div>

        {/* Delete Button */}
        <button
          onClick={() => onDelete(task.id)}
          className="flex-shrink-0 ml-4 p-2 text-gray-400 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-all duration-200 opacity-0 group-hover:opacity-100 focus:opacity-100"
          title="Delete task"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default TaskItem;