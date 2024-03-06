import { Link } from "react-router-dom";
import { Typography } from "@mui/material";

export default function BrandingBanner() {
    return (
    <div style={{ flexGrow: 1, marginTop: 5, marginBottom: 5 }}>
        {/* Logo: */}
        <Link to="/">
        <img
            src="https://firebasestorage.googleapis.com/v0/b/laar-production.appspot.com/o/photos%2Flogos%2FVAUVA%20TURKOOSI%20VALKOINEN%20REUNA.png?alt=media&token=3c6c2e81-d4ac-42d4-b037-b31047cad413"
            alt="Logo"
            style={{
            height: "45px",
            flexGrow: 1,
            marginRight: 5,
            }}
        ></img>
        <img
            src="https://firebasestorage.googleapis.com/v0/b/laar-48852.appspot.com/o/photos%2Flogos%2Flaar%20logo%20teksti%20musta%20valkoinen%20reuna.png?alt=media&token=48a12693-2d14-4238-9caa-2b6d5876464d"
            alt="Logo"
            style={{ height: "30px", flexGrow: 1 }}
        ></img>
        </Link>
        <Typography
        component="div"
        sx={{ flexGrow: 1, height: "20px", marginLeft: "4px" }}
        >
        Beta
        </Typography>
    </div>
    );
}
