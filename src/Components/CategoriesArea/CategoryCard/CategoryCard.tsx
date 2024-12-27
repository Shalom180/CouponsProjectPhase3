import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import "./CategoryCard.css";
import { Category } from '../../../models/Category';
import { Link } from 'react-router-dom';

interface CategoryProps {
    category: Category
}

export function CategoryCard(props: CategoryProps): JSX.Element {
    return (
        <Card
            sx={{ maxWidth: 345 }}
            component={Link} // Wrap Card in Link
            to={`/coupons/category/${props.category.id}`} // Dynamic link based on coupon ID
        >
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="140"
                    image="pics/JohnCOuponLogoNoBG.png"
                    alt={props.category.name}
                    sx={{
                        objectFit: "contain", // Ensures the whole image is visible
                        objectPosition: "center", // Center the image
                        backgroundColor: "white", // Optional: Background color for transparency
                    }}
                />

                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {props.category.name}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        This is the category of {props.category.name}.
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt molestias ut velit quam voluptatum odio adipisci amet quisquam cupiditate quas rem dolores minus fugit quibusdam ab a officiis, odit quos.
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}
