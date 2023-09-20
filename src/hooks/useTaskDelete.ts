import { Dispatch, useEffect, useState } from 'react'
import axios from 'axios'
import { TaskActions } from '@/lib/enum'
import API from '@/lib/API'
import { useAuthContext, useTasksContext } from '@/hooks'
import { ITaskJSON } from '@/lib/interfaces/ITask'
import { ITaskAction } from '@/lib/interfaces/ITaskAction'

const { BACKEND_API_URI, TASKS_API } = API

const useTaskDelete = () => {
  const [deleting, setDeleting] = useState<boolean>(false)
  const { dispatch }: { dispatch: Dispatch<ITaskAction> } = useTasksContext()
  const { user }: { user: Record<string, string> } = useAuthContext()

  const deleteTask = async (taskId: string) => {
    if (!user) return
    setDeleting(true)

    try {
      const response = await axios.delete(
        BACKEND_API_URI + TASKS_API + taskId,
        {
          headers: {
            Authorization: `Bearer ${user.token}`
          }
        }
      )

      if (response.status === 200)
        dispatch({ type: TaskActions.DELETE_TASK, payload: response.data })
    } catch (err: any) {
      console.log(err.message)
    } finally {
      setDeleting(false)
    }
  }

  return { deleteTask, deleting }
}

export default useTaskDelete
