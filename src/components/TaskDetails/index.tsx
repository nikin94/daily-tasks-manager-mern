import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import {
  Avatar,
  Box,
  Card,
  Checkbox,
  CircularProgress,
  Typography
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import { ITaskJSON } from '@/lib/interfaces/ITask'
import { useTaskCompletion, useTaskDelete } from '@/hooks'
import { useState } from 'react'

const TaskDetails = ({ task }: { task: ITaskJSON }) => {
  const [completed, setCompleted] = useState(task.completed)
  const { deleteTask, deleting } = useTaskDelete()
  const { setCompletion } = useTaskCompletion()

  const handleCompletion = () => {
    setCompletion(task._id, !completed)
    setCompleted(!completed)
  }

  return (
    <Card
      elevation={2}
      sx={{
        mb: 2,
        p: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}
    >
      <Checkbox
        checked={completed}
        onChange={handleCompletion}
        inputProps={{ 'aria-label': 'controlled' }}
      />
      <Box flex={1} sx={{ ml: 1 }}>
        <Typography variant='h6' component='h6' color='primary'>
          {task.title}
        </Typography>
        <Typography variant='caption'>
          {formatDistanceToNow(new Date(task.createdAt), { addSuffix: true })}
        </Typography>
      </Box>

      <Avatar
        onClick={() => deleteTask(task._id)}
        sx={{
          m: 1,
          cursor: 'pointer',
          bgcolor: 'secondary.main',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        {deleting ? (
          <CircularProgress sx={{ p: 1, color: 'white' }} />
        ) : (
          <DeleteIcon />
        )}
      </Avatar>
    </Card>
  )
}

export default TaskDetails
