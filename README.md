backend/
└── TaskManagement/
    ├── Controllers/
    │   └── TasksController.cs        # Handles API endpoints for tasks
    ├── Models/
    │   └── TaskItem.cs               # Defines the TaskItem model
    ├── Services/
    │   ├── ITaskService.cs           # Interface for task services
    │   └── TaskService.cs            # Business logic for tasks
    ├── Properties/
    │   └── launchSettings.json       # Launch configuration
    ├── Program.cs                    # Entry point for ASP.NET Core
    ├── appsettings.json              # Default configuration
    ├── appsettings.Development.json  # Dev environment configuration
    └── TaskManagement.csproj         # .NET project file

frontend/
├── src/
│   ├── components/
│   │   ├── AddTask.tsx               # Form to add new tasks
│   │   ├── TaskItem.tsx              # UI component for a single task
│   │   └── TaskList.tsx              # Lists all tasks
│   ├── App.tsx                       # Main React component
│   ├── App.css                       # Global styles
│   ├── main.tsx                      # React entry point
│   └── index.css                     # Tailwind styles
├── public/
│   └── vite.svg
├── package.json                      # Frontend dependencies
├── tailwind.config.js                # Tailwind setup
└── vite.config.ts                    # Vite configuration

## Tech Stack

##Backend:

ASP.NET Core 8

C#

Swagger / OpenAPI

RESTful API Architecture

##Frontend:

React + TypeScript

Tailwind CSS

Vite

Fetch API for backend communication

## How to Run the Project
 1. Run the Backend (ASP.NET Core API)
      ```bash
    cd backend/TaskManagement
    dotnet run


This will start the backend server (default: http://localhost:5298 or as configured in launchSettings.json).

Once running, you can test API routes at:
 http://localhost:5298/swagger

 2. Run the Frontend (React App)
    ```bash
    cd frontend
    npm install
    npm run dev


 Frontend runs on default port 5173:
 Open in your browser: http://localhost:5173

 ## API Endpoints (Examples)

1. /api/v1/projects/{projectId}/schedule	POST	Schedule tasks and get recommended order
2. /api/v1/tasks	GET	Get all tasks
3. /api/v1/tasks	POST	Add a new task
 ## Features

 1. Add, update, and delete tasks

 2.Intelligent task scheduling based on dependencies
3. Backend with strong typing and modular service layer
4. Responsive and modern frontend with Tailwind
 5.Clear separation of concerns between API and UI

 ## Folder Explanation

Controllers/ → Defines all API endpoints

Models/ → Contains data models

Services/ → Handles logic and task scheduling

frontend/src/components → Contains React components for UI

App.tsx → Main app orchestrating components and API calls
