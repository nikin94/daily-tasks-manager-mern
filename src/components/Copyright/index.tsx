import Typography from '@mui/material/Typography'
import Link from '@mui/material/Link'
import routes from '@/lib/routes'

const Copyright = (props: any) => {
  return (
    <Typography
      variant='body2'
      color='text.secondary'
      align='center'
      {...props}
    >
      {'Copyright © '}
      <Link color='inherit' href={routes.MAIN}>
        Game project
      </Link>
      {` ${new Date().getFullYear()}.`}
    </Typography>
  )
}

export default Copyright
