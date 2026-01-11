import { useState, useEffect } from "react";
import { Box, TextField, Button, Card, CardContent, Typography } from "@mui/material";

export default function TaskForm({ task, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({ title: "", description: "" });

  useEffect(() => {
    if (task) {
      setFormData(task);
    }
  }, [task]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({ title: "", description: "" });
  };

  return (
    <Card sx={{ mb: 3, boxShadow: 2 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {task ? "Edit Task" : "Create New Task"}
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Task Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            margin="normal"
          />
          <TextField
            fullWidth
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            multiline
            rows={3}
            margin="normal"
          />
          <Box display="flex" gap={2} mt={2}>
            <Button type="submit" variant="contained" color="success">
              {task ? "Update" : "Create"}
            </Button>
            {task && (
              <Button variant="outlined" color="inherit" onClick={onCancel}>
                Cancel
              </Button>
            )}
          </Box>
        </form>
      </CardContent>
    </Card>
  );
}