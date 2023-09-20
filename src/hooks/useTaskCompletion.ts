import { Dispatch, useState } from 'react'
import axios from 'axios'
import { TaskActions } from '@/lib/enum'
import API from '@/lib/API'
import { useAuthContext, useTasksContext } from '@/hooks'
import { ITaskAction } from '@/lib/interfaces/ITaskAction'

const { BACKEND_API_URI, TASKS_API } = API

const useTaskCompletion = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const { dispatch }: { dispatch: Dispatch<ITaskAction> } = useTasksContext()
  const { user }: { user: Record<string, string> } = useAuthContext()

  const setCompletion = async (taskId: string, status: boolean) => {
    if (!user) return
    setLoading(true)

    try {
      const response = await axios.patch(
        BACKEND_API_URI + TASKS_API + taskId,
        { completed: status },
        {
          headers: {
            Authorization: `Bearer ${user.token}`
          }
        }
      )

      if (response.status === 200)
        dispatch({ type: TaskActions.COMPLETE_TASK, payload: response.data })
    } catch (err: any) {
      console.log(err.message)
    } finally {
      setLoading(false)
    }
  }

  return { setCompletion, loading }
}

export default useTaskCompletion
