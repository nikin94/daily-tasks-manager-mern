import { useState } from 'react'
import axios from 'axios'
import API from '@/lib/API'

const { BACKEND_API_URI, USERS_API } = API

const usePasswordReset = () => {
  const [error, setError] = useState('')

  const reset = async (password: string, userId: string, token: string) => {
    try {
      const response = await axios.post(
        BACKEND_API_URI + USERS_API + 'reset-password',
        { password, userId, token }
      )

      if (response.status === 200) return true
    } catch (err: any) {
      setError(err.response.data.error)
    }
  }

  return { reset, error }
}

export default usePasswordReset
