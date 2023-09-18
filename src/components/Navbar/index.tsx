import { Link } from 'react-router-dom'
import { Box, Button, Typography } from '@mui/material'
import routes from '@/lib/routes'
import styles from './styles.module.css'
import { useAuthContext, useLogout } from '@/hooks'
import { IUserJSON } from '@/lib/interfaces/IUser'

const Navbar = () => {
  const { user }: { user: IUserJSON } = useAuthContext()
  const { logout } = useLogout()

  const handleClick = () => {
    logout()
  }

  return (
    <header className={styles.home}>
      <div className={styles.container}>
        <Link to={routes.MAIN}>
          <h2>Game</h2>
        </Link>
        <nav>
          {user ? (
            <Box>
              <Typography variant='body2' sx={{ display: 'inline' }}>
                {user.email}
              </Typography>
              <Button onClick={handleClick} sx={{ display: 'inline', ml: 1 }}>
                Log out
              </Button>
            </Box>
          ) : (
            <>
              <Link to={routes.LOGIN}>
                <Button variant='text'>Login</Button>
              </Link>
              <Link to={routes.SIGN_UP}>
                <Button variant='contained' sx={{ ml: 1 }}>
                  Sign Up
                </Button>
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  )
}

export default Navbar
