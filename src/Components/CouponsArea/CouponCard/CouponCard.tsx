import "./CouponCard.css";
import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import { Coupon } from "../../../models/Coupon";

interface CouponProps{
    coupon: Coupon
}

export function CouponCard(props: CouponProps): JSX.Element {
    return (
        <Card sx={{ maxWidth: 345 }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="140"
            image={props.coupon.image}
            alt={props.coupon.title}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {props.coupon.title}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {props.coupon.description}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    );
}
