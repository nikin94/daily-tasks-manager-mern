import { useState } from 'react'
import axios from 'axios'
import API from '@/lib/API'

const { BACKEND_API_URI, USERS_API } = API

const usePasswordRecoveryEmail = () => {
  const [error, setError] = useState(null)

  const send = async (email: string | undefined) => {
    try {
      setError(null)

      const response = await axios.post(
        BACKEND_API_URI + USERS_API + 'recover-password',
        { email }
      )

      if (response.status === 200) return true
    } catch (err: any) {
      setError(err.response?.data.error)
    }
  }

  return { send, error }
}

export default usePasswordRecoveryEmail
