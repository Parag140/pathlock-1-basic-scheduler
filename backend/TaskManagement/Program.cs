using TaskManagement.Services;

var creater = WebApplication.CreateBuilder(args);

creater.Services.AddControllers();
creater.Services.AddSingleton<ITaskService, TaskService>();
creater.Services.AddEndpointsApiExplorer();
creater.Services.AddSwaggerGen();

creater.Services.AddCors(options =>
{
    options.AddDefaultPolicy(creater =>
    {
        creater.WithOrigins("http://localhost:3000", "http://localhost:5173") 
               .AllowAnyHeader()
               .AllowAnyMethod();
    });
});

var app = creater.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors(); 

app.UseAuthorization();

app.MapControllers(); 

app.Run();
