import { TaskDetails, TaskForm } from '@/components'
import { ITaskJSON } from '@/lib/interfaces/ITask'
import styles from './styles.module.css'
import { useTasks } from '@/hooks'
import { Skeleton } from '@mui/material'

const Home = () => {
  const { tasks, loading } = useTasks()

  return (
    <div className={styles.home}>
      <div>
        {loading ? (
          <>
            <Skeleton variant='rectangular' height={72} sx={{ mb: 2 }} />
            <Skeleton variant='rectangular' height={72} sx={{ mb: 2 }} />
            <Skeleton variant='rectangular' height={72} />
          </>
        ) : (
          tasks &&
          tasks.map((t: ITaskJSON) => <TaskDetails key={t._id} task={t} />)
        )}
      </div>
      <TaskForm />
    </div>
  )
}

export default Home
