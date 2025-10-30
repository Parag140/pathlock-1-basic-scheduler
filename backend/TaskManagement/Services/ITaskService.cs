using TaskManagement.Models;

namespace TaskManagement.Services
{
    public interface ITaskService
    {
        IEnumerable<TaskItem> GetAllTasks();
        TaskItem AddTask(TaskItem task);
        TaskItem? UpdateTask(Guid id, TaskItem task);
        void DeleteTask(Guid id);
    }
}
