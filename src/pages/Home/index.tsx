import { useEffect } from 'react'
import axios from 'axios'
import { useAuthContext, useTasksContext } from '@/hooks'
import { TaskDetails, TaskForm } from '@/components'
import { TaskActions } from '@/lib/enum'
import { ITaskJSON } from '@/lib/interfaces/ITask'
import API from '@/lib/API'
import styles from './styles.module.css'

const { BACKEND_API_URI, TASKS_API } = API

const Home = () => {
  const {
    tasks,
    dispatch
  }: { tasks: ITaskJSON[]; dispatch: React.Dispatch<any> } = useTasksContext()

  const { user }: { user: Record<string, string> } = useAuthContext()

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(BACKEND_API_URI + TASKS_API, {
          headers: {
            Authorization: `Bearer ${user.token}`
          }
        })
        if (response.status === 200) {
          dispatch({ type: TaskActions.SET_TASKS, payload: response.data })
        }
      } catch (err: any) {
        console.log(err.message)
      }
    }

    if (user) fetchTasks()
  }, [dispatch, user])

  return (
    <div className={styles.home}>
      <div>
        {tasks &&
          tasks.map((t: ITaskJSON) => <TaskDetails key={t._id} task={t} />)}
      </div>
      <TaskForm />
    </div>
  )
}

export default Home
