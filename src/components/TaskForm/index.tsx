import { useState } from 'react'
import axios from 'axios'
import Button from '@mui/material/Button'
import { useAuthContext, useTasksContext } from '@/hooks'
import { TaskActions } from '@/lib/enum'
import API from '@/lib/API'
import styles from './styles.module.css'

const { BACKEND_API_URI, TASKS_API } = API

const TaskForm = () => {
  const { dispatch }: { dispatch: React.Dispatch<any> } = useTasksContext()
  const { user }: { user: Record<string, string> } = useAuthContext()

  const [title, setTitle] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [emptyFields, setEmptyFields] = useState<String[]>([])

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault()

    if (!user) return setError('You must be logged in')

    try {
      const response = await axios.post(
        BACKEND_API_URI + TASKS_API,
        { title },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${user.token}`
          }
        }
      )

      if (response.status === 200) {
        setTitle('')
        setError(null)
        setEmptyFields([])
        dispatch({ type: TaskActions.CREATE_TASK, payload: response.data })
      }
    } catch (err: any) {
      if (err.response) {
        const { error, emptyFields } = err.response?.data
        setError(error)
        setEmptyFields(emptyFields)
      } else {
        console.log(err.message)
      }
    }
  }

  return (
    <form className={styles['task-form']} onSubmit={handleSubmit}>
      <label>Task title:</label>
      <input
        type='text'
        onChange={e => setTitle(e.target.value)}
        value={title}
        className={emptyFields.includes('title') ? 'error' : ''}
      />

      <Button type='submit' variant='contained'>
        Add task
      </Button>
      {error && <div className='error'>{error}</div>}
    </form>
  )
}

export default TaskForm
