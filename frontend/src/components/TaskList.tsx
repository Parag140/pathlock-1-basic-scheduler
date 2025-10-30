// import React from 'react';
// import TaskItem from './TaskItem';

// interface TaskListProps {
//   tasks: { id: string; description: string; isCompleted: boolean }[];
//   onToggleComplete: (id: string) => void;
//   onDelete: (id: string) => void;
// }

// const TaskList: React.FC<TaskListProps> = ({ tasks, onToggleComplete, onDelete }) => {
//   return (
//     <div>
//       {tasks.map((task) => (
//         <TaskItem
//           key={task.id}
//           task={task}
//           onToggleComplete={onToggleComplete}
//           onDelete={onDelete}
//         />
//       ))}
//     </div>
//   );
// };

// export default TaskList;

import React from 'react';
import TaskItem from './TaskItem';

interface TaskListProps {
  tasks: TaskItem[];
  onToggleComplete: (id: string) => void;
  onDelete: (id: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onToggleComplete, onDelete }) => {
  return (
    <div className="space-y-3 max-h-96 overflow-y-auto pr-2 custom-scrollbar">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggleComplete={onToggleComplete}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default TaskList;