import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import {
  Avatar,
  Box,
  Button,
  Container,
  FormHelperText,
  TextField,
  Typography
} from '@mui/material'
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined'
import { usePasswordReset } from '@/hooks'
import routes from '@/lib/routes'

const ResetPassword = () => {
  const [password, setPassword] = useState<string>('')
  const [confirmPassword, setConfirmPassword] = useState<string>('')
  const [error, setError] = useState<string>('')
  const [success, setSuccess] = useState<boolean>(false)

  const { id = '', token = '' } = useParams()

  const { reset, error: backendError } = usePasswordReset()

  useEffect(() => {
    setError(backendError)
  }, [backendError])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!password && !confirmPassword)
      return setError('Please fill the password')
    if (password !== confirmPassword) return setError("Passwords don't match")

    const res = await reset(password, id, token)
    setSuccess(!!res)
  }

  return (
    <Container component='main' maxWidth='xs'>
      <Box
        component='form'
        onSubmit={handleSubmit}
        noValidate
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          pt: 8
        }}
      >
        {success ? (
          <>
            <Avatar sx={{ bgcolor: 'secondary.main', mb: 1 }}>
              <CheckOutlinedIcon />
            </Avatar>
            <Typography component='h5' variant='h5'>
              Password changed!
            </Typography>
            <Link to={routes.LOGIN}>
              <Button variant='contained' sx={{ mt: 2 }}>
                Go back to the login page
              </Button>
            </Link>
          </>
        ) : (
          <>
            <TextField
              margin='normal'
              required
              fullWidth
              id='password'
              label='New password'
              type='password'
              name='password'
              error={!!error}
              value={password}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setPassword(event.target.value)
              }}
              onFocus={() => setError('')}
            />
            <TextField
              margin='normal'
              required
              fullWidth
              id='confirmPassword'
              label='Confirm password'
              type='password'
              name='confirmPassword'
              error={!!error}
              value={confirmPassword}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setConfirmPassword(event.target.value)
              }}
              onFocus={() => setError('')}
            />
            <FormHelperText error={!!error}>{error}</FormHelperText>

            <Button type='submit' fullWidth variant='contained' sx={{ mt: 3 }}>
              Submit
            </Button>
          </>
        )}
      </Box>
    </Container>
  )
}

export default ResetPassword
