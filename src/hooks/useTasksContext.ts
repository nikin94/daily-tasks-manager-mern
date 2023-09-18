import { useContext } from 'react'
import { TaskContext } from '@/context/TaskContext'

const useTasksContext = () => {
  const context = useContext(TaskContext)

  if (!context)
    throw Error('useTasksContext must be used inside an TaskContextProvider')

  return context
}

export default useTasksContext
