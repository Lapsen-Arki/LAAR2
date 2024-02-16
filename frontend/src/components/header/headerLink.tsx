import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom"; // Assuming you're using react-router

// HeaderLinks component for individual links
const HeaderLink = ({
  setOpen,
  navLinkTo,
  navLinkName,
}: {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  navLinkTo: string;
  navLinkName: string;
}) => {
  return (
    <Box
      sx={{
        margin: 1.5,
        mt: 3,
        mr: 5,
        "&:hover": {
          transform: "scale(1.05)",
          transition: "transform 0.1s ease-in-out",
        },
      }}
    >
      <Typography
        component={Link}
        to={navLinkTo}
        onClick={() => setOpen(false)}
        sx={{
          flexGrow: 1,
          color: '000000',
          textDecoration: 'none',
          // Any additional styling
        }}
      >
        {navLinkName}
      </Typography>
      <hr />
    </Box>
  );
};

export default HeaderLink;
