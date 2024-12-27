import "./CouponCard.css";
import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import { Coupon } from "../../../models/Coupon";
import { Link, useNavigate } from "react-router-dom";  // Use useNavigate for programmatic navigation
import { Fab } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import { useSelector } from 'react-redux';  // Import useSelector to access the Redux store
import { useTheme } from "@mui/material/styles";

interface CouponProps {
  coupon: Coupon;
}

export function CouponCard(props: CouponProps): JSX.Element {
  const clientType = useSelector((state: any) => state.auth.clientType);  // Assuming auth slice contains clientType
  const clientIdFromStore = useSelector((state: any) => state.auth.id);  // Assuming companyId is in auth

  const { coupon } = props;
  const theme = useTheme();  // Access theme for color usage
  const navigate = useNavigate();  // Access navigate function for routing

  // Determine if the edit button should be displayed
  const showEditButton = clientType === 'COMPANY' && clientIdFromStore === coupon.company.id;

  // Handle Fab click event to navigate to the edit page
  const handleEditClick = () => {
    navigate('/company/editcoupon/' + coupon.id);  // Navigate to the edit coupon page
  };

  return (
    <Card
      sx={{
        width: 345,
        height: 320, // Fixed height for the card
        textDecoration: "none", // Prevent underline on text
        position: "relative", // Required for absolute positioning of the Fab button
        display: "flex",  // Use flexbox for layout
        flexDirection: "column", // Stack the content vertically
      }}
    >
      <CardActionArea component={Link} to={`/coupon/${coupon.id}`} sx={{ flex: 1 }}>
        <CardMedia
          component="img"
          height="140"
          image={coupon.image}
          alt={coupon.title}
        />
        <CardContent
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",  // Distribute space between title and description
            paddingBottom: 2,  // Add some bottom padding for spacing
          }}
        >
          <Typography gutterBottom variant="h5" component="div" noWrap>
            {coupon.title}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary', overflow: 'hidden', textOverflow: 'ellipsis', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', display: '-webkit-box' }}>
            {coupon.description}
          </Typography>
        </CardContent>
      </CardActionArea>

      {showEditButton && (
        <Fab
          onClick={handleEditClick}  // Trigger navigate when the button is clicked
          color="primary"
          aria-label="edit"
          sx={{
            position: "absolute",
            bottom: 16,
            right: 16,
            backgroundColor: theme.palette.primary.main,  // Use theme's primary color
            '&:hover': {
              backgroundColor: theme.palette.primary.dark,  // Use theme's primary dark color for hover
            }
          }}
        >
          <EditIcon sx={{ color: theme.palette.common.white }} /> {/* Use theme's white color */}
        </Fab>
      )}
    </Card>
  );
}
