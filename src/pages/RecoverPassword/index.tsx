import { useState } from 'react'
import { Link } from 'react-router-dom'
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
import { usePasswordRecoveryEmail } from '@/hooks'
import routes from '@/lib/routes'

const RecoverPassword = () => {
  const [email, setEmail] = useState<string>('')
  const [message, setMessage] = useState<string>('')
  const { send, error } = usePasswordRecoveryEmail()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const success = await send(email)

    if (success)
      setMessage('If this email exists we will send recovery link to it')
  }

  const RecoveryForm = () => (
    <>
      <Typography component='p' variant='caption'>
        Enter the email address associated with your account and we will send
        you a link to reset your password.
      </Typography>
      <Box
        component='form'
        onSubmit={handleSubmit}
        noValidate
        sx={{ mt: 1, width: '100%' }}
      >
        <TextField
          margin='normal'
          required
          fullWidth
          id='email'
          label='Email Address'
          type='email'
          name='email'
          autoComplete='email'
          autoFocus
          error={!!error}
          helperText={error}
          value={email}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setEmail(event.target.value)
          }}
        />

        <FormHelperText>{message}</FormHelperText>
        <Button
          type='submit'
          fullWidth
          variant='contained'
          sx={{ mt: 3, mb: 2 }}
        >
          Send
        </Button>
        <Box component='span' display='flex' justifyContent='flex-end'>
          <Link to={routes.SIGN_UP}>Don't have an account? Sign Up</Link>
        </Box>
      </Box>
    </>
  )

  return (
    <Container component='main' maxWidth='xs'>
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        {message ? (
          <>
            <Avatar sx={{ bgcolor: 'secondary.main', mb: 1 }}>
              <CheckOutlinedIcon />
            </Avatar>
            <Typography component='h4' variant='h4'>
              Got it!
            </Typography>
            <Typography component='p' variant='body2' sx={{ mt: 1 }}>
              {message}
            </Typography>
            <Link to={routes.LOGIN}>
              <Button variant='contained' sx={{ mt: 2 }}>
                Go back to the login page
              </Button>
            </Link>
          </>
        ) : (
          <RecoveryForm />
        )}
      </Box>
    </Container>
  )
}

export default RecoverPassword
