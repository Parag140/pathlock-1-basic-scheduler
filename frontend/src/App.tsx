import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskList from './components/TaskList';
import AddTask from './components/AddTask';
import './App.css';
import './index.css';

interface TaskItem {
  id: string;
  description: string;
  isCompleted: boolean;
  createdAt?: string;
}

type Filter = 'all' | 'active' | 'completed';

const App: React.FC = () => {
  const [tasks, setTasks] = useState<TaskItem[]>([]);
  const [filter, setFilter] = useState<Filter>('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const API_URL = 'http://localhost:5093/api/tasks';
  const LOCAL_STORAGE_KEY = 'react-task-manager-tasks';

  // Initial load: Try localStorage, then fetch from backend
  useEffect(() => {
    const loadInitialTasks = async () => {
      setLoading(true);
      const storedTasks = localStorage.getItem(LOCAL_STORAGE_KEY);
      
      if (storedTasks) {
        try {
          const parsedTasks = JSON.parse(storedTasks);
          setTasks(parsedTasks);
          // Sync with backend in background
          await fetchTasks();
        } catch (e) {
          console.error("Error parsing tasks from localStorage:", e);
          await fetchTasks();
        }
      } else {
        await fetchTasks();
      }
      setLoading(false);
    };
    loadInitialTasks();
  }, []);

  // Sync tasks state to localStorage
  useEffect(() => {
    if (tasks.length > 0) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(tasks));
    } else {
      localStorage.removeItem(LOCAL_STORAGE_KEY);
    }
  }, [tasks]);

  const fetchTasks = async () => {
    try {
      const response = await axios.get<TaskItem[]>(API_URL);
      setTasks(response.data);
      setError(null);
    } catch (error) {
      console.warn("Error fetching tasks from backend:", error);
      setError("Unable to sync with server. Using local data.");
    }
  };

  const handleAddTask = async (description: string) => {
    const newTask: TaskItem = {
      id: Date.now().toString(),
      description,
      isCompleted: false,
      createdAt: new Date().toISOString()
    };

    // Optimistic update
    setTasks(prev => [...prev, newTask]);

    try {
      const response = await axios.post<TaskItem>(API_URL, { 
        description, 
        isCompleted: false 
      });
      // Replace with server data
      setTasks(prev => prev.map(task => 
        task.id === newTask.id ? response.data : task
      ));
    } catch (error) {
      console.error("Error adding task:", error);
      setError("Failed to save task to server. It's stored locally.");
    }
  };

  const handleToggleComplete = async (id: string) => {
    const taskToUpdate = tasks.find((task) => task.id === id);
    if (!taskToUpdate) return;

    // Optimistic update
    setTasks(prev =>
      prev.map((task) =>
        task.id === id ? { ...task, isCompleted: !task.isCompleted } : task
      )
    );

    try {
      const updatedTask = { ...taskToUpdate, isCompleted: !taskToUpdate.isCompleted };
      await axios.put(`${API_URL}/${id}`, updatedTask);
    } catch (error) {
      console.error("Error toggling task completion:", error);
      // Revert on error
      setTasks(prev =>
        prev.map((task) =>
          task.id === id ? taskToUpdate : task
        )
      );
      setError("Failed to update task on server.");
    }
  };

  const handleDeleteTask = async (id: string) => {
    const taskToDelete = tasks.find((task) => task.id === id);
    
    // Optimistic update
    setTasks(prev => prev.filter((task) => task.id !== id));

    try {
      await axios.delete(`${API_URL}/${id}`);
    } catch (error) {
      console.error("Error deleting task:", error);
      // Revert on error
      if (taskToDelete) {
        setTasks(prev => [...prev, taskToDelete]);
      }
      setError("Failed to delete task from server.");
    }
  };

  const handleClearCompleted = () => {
    const completedTasks = tasks.filter(task => task.isCompleted);
    
    // Optimistic update
    setTasks(prev => prev.filter(task => !task.isCompleted));

    // Delete from server
    completedTasks.forEach(task => {
      axios.delete(`${API_URL}/${task.id}`).catch(error => {
        console.error("Error deleting completed task:", error);
        setError("Failed to delete some completed tasks from server.");
      });
    });
  };

  const handleRetrySync = () => {
    setError(null);
    fetchTasks();
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'active') return !task.isCompleted;
    if (filter === 'completed') return task.isCompleted;
    return true;
  });

  const completedCount = tasks.filter(task => task.isCompleted).length;
  const activeCount = tasks.length - completedCount;

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading your tasks...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-4">
            Task Manager
          </h1>
          <p className="text-gray-300 text-lg">
            Organize your life, one task at a time
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center border border-white/20">
            <div className="text-2xl font-bold text-white">{tasks.length}</div>
            <div className="text-gray-300 text-sm">Total</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center border border-white/20">
            <div className="text-2xl font-bold text-green-400">{activeCount}</div>
            <div className="text-gray-300 text-sm">Active</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center border border-white/20">
            <div className="text-2xl font-bold text-blue-400">{completedCount}</div>
            <div className="text-gray-300 text-sm">Done</div>
          </div>
        </div>

        {/* Error Banner */}
        {error && (
          <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-xl flex items-center justify-between backdrop-blur-sm">
            <div className="flex items-center text-red-300 flex-1">
              <svg className="w-5 h-5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-sm">{error}</span>
            </div>
            <button
              onClick={handleRetrySync}
              className="ml-4 px-3 py-1 bg-red-500/30 hover:bg-red-500/40 text-red-200 rounded-lg text-sm transition-colors border border-red-500/30"
            >
              Retry
            </button>
          </div>
        )}

        {/* Main Content Card */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/20 p-6">
          <AddTask onAddTask={handleAddTask} />

          {/* Filter Tabs */}
          <div className="flex bg-white/5 rounded-xl p-1 mb-6">
            {(['all', 'active', 'completed'] as Filter[]).map((filterType) => (
              <button
                key={filterType}
                onClick={() => setFilter(filterType)}
                className={`flex-1 py-3 px-4 rounded-lg font-medium text-sm transition-all duration-200 ${
                  filter === filterType
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                    : 'text-gray-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
                {filterType === 'all' && ` (${tasks.length})`}
                {filterType === 'active' && ` (${activeCount})`}
                {filterType === 'completed' && ` (${completedCount})`}
              </button>
            ))}
          </div>

          {/* Clear Completed Button */}
          {completedCount > 0 && (
            <div className="flex justify-end mb-4">
              <button
                onClick={handleClearCompleted}
                className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-300 rounded-lg text-sm transition-colors border border-red-500/30 flex items-center"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Clear Completed ({completedCount})
              </button>
            </div>
          )}

          <TaskList
            tasks={filteredTasks}
            onToggleComplete={handleToggleComplete}
            onDelete={handleDeleteTask}
          />

          {/* Empty State */}
          {filteredTasks.length === 0 && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4 opacity-50">📝</div>
              <p className="text-gray-400 text-lg mb-2">
                {tasks.length === 0 ? "No tasks yet" : `No ${filter} tasks`}
              </p>
              <p className="text-gray-500 text-sm">
                {tasks.length === 0 
                  ? "Get started by adding your first task above!" 
                  : "Try changing filters or create a new task"
                }
              </p>
            </div>
          )}
        </div>

        {/* Footer Info */}
        <div className="text-center mt-8 text-gray-400 text-sm">
          {tasks.length > 0 && (
            <p>
              Showing {filteredTasks.length} of {tasks.length} tasks • 
              {completedCount === tasks.length && tasks.length > 0 ? " All tasks completed! 🎉" : " Keep going!"}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;