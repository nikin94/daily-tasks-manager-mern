import { createContext, useReducer } from 'react'
import { TaskActions } from '@/lib/enum'
import { ITaskJSON } from '@/lib/interfaces/ITask'
import { ITaskAction } from '@/lib/interfaces/ITaskAction'

export const TaskContext = createContext(null)

export const taskReducer = (state: any, action: ITaskAction) => {
  switch (action.type) {
    case TaskActions.SET_TASKS:
      return { tasks: action.payload }
    case TaskActions.CREATE_TASK:
      return { tasks: [action.payload, ...state.tasks] }
    case TaskActions.DELETE_TASK:
      return {
        tasks: state.tasks.filter(
          (t: ITaskJSON) => t._id !== action.payload._id
        )
      }
    default:
      return state
  }
}

export const TaskContextProvider = ({
  children
}: {
  children: React.ReactNode
}) => {
  const [state, dispatch] = useReducer(taskReducer, {
    tasks: null
  })

  return (
    <TaskContext.Provider value={{ ...state, dispatch }}>
      {children}
    </TaskContext.Provider>
  )
}
