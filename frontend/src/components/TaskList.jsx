import { Box, Typography } from "@mui/material";
import TaskCard from "./TaskCard";

export default function TaskList({ tasks, onEdit, onDelete }) {
  if (tasks.length === 0) {
    return <Typography color="textSecondary" align="center">No tasks yet. Create one!</Typography>;
  }

  return (
    <Box>
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </Box>
  );
}