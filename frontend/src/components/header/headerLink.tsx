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
        mr: 4,
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
          p: 2,
          flexGrow: 1,
          // Any additional styling
        }}
      >
        {navLinkName}
      </Typography>
      <hr style={{ marginTop: 5, maxWidth: "75%" }} />
    </Box>
  );
};

export default HeaderLink;
