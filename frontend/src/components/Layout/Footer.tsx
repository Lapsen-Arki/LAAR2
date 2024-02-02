import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import { Typography, Tooltip } from "@mui/material";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer>
      <div className="footer-column-left">
        <h3>LAAR</h3>
        <div className="footer-contact-info">
          <Link to="/" className="footer-link">
            lapsen-arki.fi
          </Link>
          <div className="footer-icons">
            <Tooltip title="Facebook">
              <Link to="#" className="footer-link">
                <FacebookIcon />
              </Link>
            </Tooltip>
            <Tooltip title="Instagram">
              <Link to="#" className="footer-link">
                <InstagramIcon sx={{ ml: 1 }} />
              </Link>
            </Tooltip>
          </div>
        </div>
      </div>
      <Typography sx={{ mt: 3 }}>
        &copy; Copyright {new Date().getFullYear()}{" "}
        <Link className="footer-li footer-link" to="https://www.lapsen-arki.fi">
          lapsen-arki.fi
        </Link>
      </Typography>
      <div className="footer-column-right">
        <div className="footer-list">
          <Link className="footer-li footer-link" to="/">
            Kauppa
          </Link>
          <Link className="footer-li footer-link" to="/">
            Tietoa meistä
          </Link>
          <Link className="footer-li footer-link" to="/">
            Tietosuojaseloste
          </Link>
        </div>
      </div>
    </footer>
  );
}
