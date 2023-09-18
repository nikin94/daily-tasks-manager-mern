import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Box, Container, CssBaseline } from '@mui/material'
import { ResetPassword, RecoverPassword, Home, Login, SignUp } from '@/pages'
import { Navbar } from '@/components'
import { useAuthContext } from '@/hooks'
import routes from '@/lib/routes'

function App() {
  const { user }: { user: Record<string, string> } = useAuthContext()

  return (
    <div className='App'>
      <BrowserRouter>
        <Navbar />
        <Container component='main'>
          <CssBaseline />
          <Box
            sx={{
              paddingTop: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}
          >
            <Routes>
              <Route
                path={routes.MAIN}
                element={user ? <Home /> : <Navigate to={routes.LOGIN} />}
              />
              <Route
                path={routes.LOGIN}
                element={user ? <Navigate to={routes.MAIN} /> : <Login />}
              />
              <Route
                path={routes.SIGN_UP}
                element={user ? <Navigate to={routes.MAIN} /> : <SignUp />}
              />
              <Route
                path={routes.RECOVER_PASSWORD}
                element={
                  user ? <Navigate to={routes.MAIN} /> : <RecoverPassword />
                }
              />
              <Route
                path={routes.RESET_PASSWORD + '/:id/:token'}
                element={<ResetPassword />}
              />
            </Routes>
          </Box>
        </Container>
      </BrowserRouter>
    </div>
  )
}

export default App
