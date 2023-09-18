import { AuthActions } from '@/lib/enum'

export interface IAuthAction {
  type: AuthActions
  payload: any
}
