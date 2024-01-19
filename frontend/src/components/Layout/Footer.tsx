import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import { Link } from 'react-router-dom';


export default function Footer() {
  return (
	<footer>
		<div className="footer-column-left">
			<h3>LAAR</h3>
			<div className="footer-contact-info">
				<Link to="/" className="footer-link">lapsen-arki.fi</Link>
				<div className="footer-icons">
					<a href="link" target="_blank" rel="noopener noreferrer">
						<FacebookIcon/>
					</a>
					<a href="link" target="_blank" rel="noopener noreferrer">
						<InstagramIcon/>
					</a>
				</div>
			</div>
		</div>
		<div className="footer-column-right">
			<div className="footer-list">
				<Link className="footer-li footer-link" to="/">Kauppa</Link>
				<Link className="footer-li footer-link" to="/">Tietoa meistä</Link>
				<Link className="footer-li footer-link" to="/">Tietosuojaseloste</Link>
			</div>
		</div>
	</footer>
  );
}