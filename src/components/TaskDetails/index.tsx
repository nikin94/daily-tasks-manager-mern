import { Dispatch } from 'react'
import axios from 'axios'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import { Avatar, Box, Card, Typography } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import { useAuthContext, useTasksContext } from '@/hooks'
import { ITaskJSON } from '@/lib/interfaces/ITask'
import { ITaskAction } from '@/lib/interfaces/ITaskAction'
import { TaskActions } from '@/lib/enum'
import API from '@/lib/API'

const { BACKEND_API_URI, TASKS_API } = API

const TaskDetails = ({ task }: { task: ITaskJSON }) => {
  const { dispatch }: { dispatch: Dispatch<ITaskAction> } = useTasksContext()
  const { user }: { user: Record<string, string> } = useAuthContext()

  const handleClick = async () => {
    if (!user) return

    const response = await axios.delete(
      BACKEND_API_URI + TASKS_API + task._id,
      {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      }
    )

    if (response.status === 200) {
      dispatch({ type: TaskActions.DELETE_TASK, payload: response.data })
    }
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
      <Box>
        <Typography variant='h6' component='h6' color='primary'>
          {task.title}
        </Typography>
        <Typography variant='caption'>
          {formatDistanceToNow(new Date(task.createdAt), { addSuffix: true })}
        </Typography>
      </Box>

      <Avatar
        onClick={handleClick}
        sx={{ m: 1, cursor: 'pointer', bgcolor: 'secondary.main' }}
      >
        <DeleteIcon />
      </Avatar>
    </Card>
  )
}

export default TaskDetails
