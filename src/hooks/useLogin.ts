import { useState, Dispatch } from 'react'
import axios from 'axios'
import { useAuthContext } from '@/hooks'
import API from '@/lib/API'
import { AuthActions } from '@/lib/enum'

const { BACKEND_API_URI, USERS_API } = API

const useLogin = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { dispatch }: { dispatch: Dispatch<any> } = useAuthContext()

  const login = async (
    email: string | undefined,
    password: string | undefined
  ) => {
    try {
      setIsLoading(true)
      setError(null)
      const response = await axios.post(
        BACKEND_API_URI + USERS_API + 'login',
        { email, password },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )
      // save user to local storage
      localStorage.setItem('user', JSON.stringify(response.data))

      // update the auth context
      dispatch({ type: AuthActions.LOGIN, payload: response.data })

      if (response.status === 200) {
        // save user to local storage
        localStorage.setItem('user', JSON.stringify(response.data))

        // update the auth context
        dispatch({ type: AuthActions.LOGIN, payload: response.data })
      } else {
        setError(response.data.error)
      }
    } catch (err: any) {
      setError(err.response?.data.error)
    } finally {
      setIsLoading(false)
    }
  }

  return { login, isLoading, error }
}

export default useLogin
