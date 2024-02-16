import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import { Typography, Tooltip, Grid } from "@mui/material";
import Link from '@mui/material/Link';

export default function Footer() {
  return (
    
    <footer>
      <Grid 
        sx={{
          display: 'flex',
          maxWidth: "100vw",
          flexDirection: {
            xs: 'column',
            sm: 'row',
          },
          flexWrap: 'nowrap',
          justifyContent: 'space-between',
          padding: 2,
          paddingLeft: 4,
          paddingRight: 4,
        }}
      >
        <Grid item sx={{
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          alignSelf: 'flex-end',
          width: {
            xs: '100%',
            sm: '200px',
            md: '220px',
          },
          textAlign: {
            xs: 'center',
            sm: 'left',
          },
        }}>
          <Typography variant="h5">LAAR</Typography>
          
          <Grid item sx={{
            display: 'flex',
            justifyContent: {
              xs: 'center',
              sm: 'left',
              xl: 'flex-start',
            },
            flexDirection: 'row',
          }}>
          <Tooltip title="Facebook">
              <Link to="/" >
                <FacebookIcon />
              </Link>
            </Tooltip>
            <Tooltip title="Instagram">
              <Link to="/" >
                <InstagramIcon sx={{ ml: 1 }} />
              </Link>
            </Tooltip>
            </Grid>
        </Grid>
        
        <Grid item sx={{
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          alignSelf: 'flex-end',
          width: {
            xs: '100%',
            sm: '300px',
          },
          textAlign: 'center',
        }}>
          <Typography variant="body1">
          &copy; Copyright {new Date().getFullYear()}{" "}<Link to="https://www.lapsen-arki.fi" style={{ textDecoration: 'none' }}>lapsen-arki.fi</Link></Typography>
        </Grid>
        
        <Grid item sx={{
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          alignSelf: 'flex-end',
          width: {
            xs: '100%',
            sm: '200px',
            md: '220px',
          },
          textAlign: {
            xs: 'center',
            sm: 'right',
          },
        }}>
          <Typography variant="body2"><Link to="#" style={{ textDecoration: 'none' }}>Kauppa</Link></Typography>
          <Typography variant="body2"><Link to="/about-us" style={{ textDecoration: 'none' }}>Tietoa meistä</Link></Typography>
          <Typography variant="body2"><Link to="/terms" style={{ textDecoration: 'none' }}>Käyttöehdot ja Tietosuojaseloste</Link></Typography>
        </Grid>
      </Grid>
    </footer>
  );
}
