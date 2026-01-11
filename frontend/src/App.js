import { useEffect, useState } from "react";
import { Container, Typography, Box } from "@mui/material";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

function App() {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const apiUrl = process.env.REACT_APP_API_URL || "http://127.0.0.1:8000";

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = () => {
    fetch(`${apiUrl}/api/tasks/`)
      .then(res => res.json())
      .then(data => setTasks(data))
      .catch(err => console.error(err));
  };

  const handleSubmit = (formData) => {
    if (editingTask) {
      // Update task
      fetch(`${apiUrl}/api/tasks/${editingTask.id}/`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
        .then(res => res.json())
        .then(() => {
          fetchTasks();
          setEditingTask(null);
        })
        .catch(err => console.error(err));
    } else {
      // Create task
      fetch(`${apiUrl}/api/tasks/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
        .then(res => res.json())
        .then(() => fetchTasks())
        .catch(err => console.error(err));
    }
  };

  const handleDelete = (id) => {
    fetch(`${apiUrl}/api/tasks/${id}/`, { method: "DELETE" })
      .then(() => fetchTasks())
      .catch(err => console.error(err));
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h3" align="center" gutterBottom>
          Task Manager
        </Typography>
        <TaskForm task={editingTask} onSubmit={handleSubmit} onCancel={() => setEditingTask(null)} />
        <TaskList tasks={tasks} onEdit={setEditingTask} onDelete={handleDelete} />
      </Box>
    </Container>
  );
}

export default App;