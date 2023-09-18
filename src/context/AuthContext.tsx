import { createContext, useEffect, useReducer } from 'react'
import { IAuthAction } from '@/lib/interfaces/IAuthAction'
import { AuthActions } from '@/lib/enum'

export const AuthContext = createContext(null)

export const authReducer = (state: any, action: IAuthAction) => {
  switch (action.type) {
    case AuthActions.LOGIN:
      return { user: action.payload }
    case AuthActions.LOGOUT:
      return { user: null }
    default:
      return state
  }
}

export const AuthContextProvider = ({
  children
}: {
  children: React.ReactNode
}) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null
  })

  useEffect(() => {
    const user = localStorage.getItem('user')
    if (!user) return

    const userJSON = JSON.parse(user)
    if (userJSON) dispatch({ type: AuthActions.LOGIN, payload: userJSON })
  }, [])

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  )
}
