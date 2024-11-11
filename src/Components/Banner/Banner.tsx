import React from 'react';
import { Box, Typography, Grid } from '@mui/material';
import "./Banner.css";

interface BannerProps {
    bannerImage: string;
    bannerLogo?: string;
    logoPhrase?: string;
    bannerTitle?: string;
    textAlignment?: 'left' | 'center' | 'right'; // Control text alignment
    logoSize?: string; // Control logo size (default: 150px)
}

export function Banner(props: BannerProps): JSX.Element {
    return (
        <Box
            className="Banner"
            sx={{
                position: 'relative',
                width: '100%',
                height: '300px', // Fixed height for the banner, adjust as necessary
                backgroundImage: `url(${props.bannerImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                textAlign: props.textAlignment || 'center', // Default to center
                color: 'white',
                padding: '20px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'rgba(0, 0, 0, 0.3)', // Add dark overlay to banner for better text contrast
            }}
        >
            {/* Banner title if provided */}
            {props.bannerTitle && (
                <Typography variant="h4" sx={{ fontWeight: 'bold', marginBottom: '10px' }}>
                    {props.bannerTitle}
                </Typography>
            )}

            {/* Logo section */}
{props.bannerLogo && (
    <Box
        id="logoImageContainer"
        sx={{
            marginBottom: props.logoPhrase ? '10px' : '0', // Adjust spacing if there's a logo phrase
            maxWidth: '200px', // You can adjust this based on how wide you want the logo to appear
            display: 'flex',
            justifyContent: 'center',
        }}
    >
        <img
            id="logoImage"
            src={props.bannerLogo}
            alt="Site Logo"
            style={{
                width: props.logoSize || '150px', // Control the size of the logo (default 150px)
                height: '150px', // Ensure the height matches the width to maintain a circle shape
                objectFit: 'cover', // Keeps the image aspect ratio intact
                borderRadius: '50%', // Makes the logo image round
            }}
        />
    </Box>
)}


            {/* Logo phrase text if provided */}
            {props.logoPhrase && (
                <Typography variant="h6" sx={{ fontStyle: 'italic', marginTop: '10px' }}>
                    {props.logoPhrase}
                </Typography>
            )}
        </Box>
    );
}
