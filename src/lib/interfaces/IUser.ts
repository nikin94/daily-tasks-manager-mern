interface IUser {
  email: string
  password: string
}

export interface IUserJSON extends IUser {
  _id: string
  createdAt: string
  updatedAt: string
}
