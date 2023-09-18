import { Dispatch } from 'react'
import { useAuthContext, useTasksContext } from '@/hooks'
import { AuthActions, TaskActions } from '@/lib/enum'

const useLogout = () => {
  const { dispatch: authDispatch }: { dispatch: Dispatch<any> } =
    useAuthContext()
  const { dispatch: tasksDispatch }: { dispatch: Dispatch<any> } =
    useTasksContext()

  const logout = () => {
    // remove user from storage
    localStorage.removeItem('user')

    // dispatch logout action
    authDispatch({ type: AuthActions.LOGOUT })
    tasksDispatch({ type: TaskActions.SET_TASKS, payload: null })
  }

  return { logout }
}

export default useLogout
