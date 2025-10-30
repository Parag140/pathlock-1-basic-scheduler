using Microsoft.AspNetCore.Mvc;
using TaskManagement.Models;
using TaskManagement.Services;

namespace TaskManagement.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TasksController : ControllerBase
    {
        private readonly ITaskService _taskService;

        public TasksController(ITaskService taskService)
        {
            _taskService = taskService;
        }

        // GET: api/tasks
        [HttpGet]
        public ActionResult<IEnumerable<TaskItem>> GetTasks()
        {
            var tasks = _taskService.GetAllTasks();
            return Ok(tasks);
        }

        // POST: api/tasks
        [HttpPost]
        public ActionResult<TaskItem> AddTask([FromBody] TaskItem task)
        {
            var newTask = _taskService.AddTask(task);
            return CreatedAtAction(nameof(GetTasks), new { id = newTask.Id }, newTask);
        }

        // PUT: api/tasks/{id}
        [HttpPut("{id}")]
        public ActionResult<TaskItem> UpdateTask(Guid id, [FromBody] TaskItem task)
        {
            var updatedTask = _taskService.UpdateTask(id, task);

            if (updatedTask == null)
                return NotFound();

            return Ok(updatedTask);
        }

        // DELETE: api/tasks/{id}
        [HttpDelete("{id}")]
        public IActionResult DeleteTask(Guid id)
        {
            _taskService.DeleteTask(id);
            return NoContent();
        }
    }
}

