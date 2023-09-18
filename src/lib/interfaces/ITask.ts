interface ITask {
  title: string
  completed?: boolean
}

export interface ITaskJSON extends ITask {
  _id: string
  createdAt: string
  updatedAt: string
}
