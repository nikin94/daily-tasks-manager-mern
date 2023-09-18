import { useEffect, useState } from 'react'
import axios from 'axios'
import { TaskActions } from '@/lib/enum'
import API from '@/lib/API'
import { useAuthContext, useTasksContext } from '@/hooks'
import { ITaskJSON } from '@/lib/interfaces/ITask'

const { BACKEND_API_URI, TASKS_API } = API

const useTasks = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const {
    tasks,
    dispatch
  }: { tasks: ITaskJSON[]; dispatch: React.Dispatch<any> } = useTasksContext()

  const { user }: { user: Record<string, string> } = useAuthContext()

  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true)

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
      } finally {
        setLoading(false)
      }
    }

    if (user) fetchTasks()
  }, [dispatch, user])

  return { tasks, loading }
}

export default useTasks
