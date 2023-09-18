import { TaskActions } from '@/lib/enum'

export interface ITaskAction {
  type: TaskActions
  payload: any
}
