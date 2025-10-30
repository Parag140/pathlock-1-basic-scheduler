using TaskManagement.Models;

namespace TaskManagement.Services
{
    public class TaskService : ITaskService
    {
        private readonly List<TaskItem> _tasks = new List<TaskItem>();

        public TaskService()
        {
            
            _tasks.Add(new TaskItem { Id = Guid.NewGuid(), Description = "Learn C#", IsCompleted = false });
            _tasks.Add(new TaskItem { Id = Guid.NewGuid(), Description = "Build a .NET API", IsCompleted = true });
            _tasks.Add(new TaskItem { Id = Guid.NewGuid(), Description = "Learn React", IsCompleted = false });
        }

        public IEnumerable<TaskItem> GetAllTasks()
        {
            return _tasks;
        }

        public TaskItem AddTask(TaskItem task)
        {
            task.Id = Guid.NewGuid();
            _tasks.Add(task);
            return task;
        }

        public TaskItem? UpdateTask(Guid id, TaskItem updatedTask)
        {
            var existingTask = _tasks.FirstOrDefault(t => t.Id == id);
            if (existingTask == null)
            {
                return null;
            }

            existingTask.Description = updatedTask.Description; 
            existingTask.IsCompleted = updatedTask.IsCompleted;
            return existingTask;
        }

        public void DeleteTask(Guid id)
        {
            _tasks.RemoveAll(t => t.Id == id);
        }
    }
}
