import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import { Link, useNavigate } from 'react-router-dom';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Fab } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useSelector } from 'react-redux';
import "./CompanyCard.css";
import { Company } from '../../../models/Company';
import adminService from '../../../services/AdminService';
import { AxiosError } from 'axios';

interface CompanyProps {
    company: Company;
}

export function CompanyCard(props: CompanyProps): JSX.Element {
    const clientType = useSelector((state: any) => state.auth.clientType);
    const navigate = useNavigate();

    const { company } = props;
    const showButtons = clientType === 'ADMINISTRATOR'; // Only show edit and delete for ADMINISTRATOR
    const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);

    const handleEditClick = (event: React.MouseEvent) => {
        event.preventDefault(); // Prevent default navigation from the card link
        event.stopPropagation(); // Prevent the link click
        navigate('/editcompany/' + company.id); // Navigate to edit page
    };

    // Function to handle Delete FAB click event
    const handleDeleteFabClick = (event: React.MouseEvent) => {
        event.preventDefault(); // Prevent default navigation from the card link
        event.stopPropagation(); // Prevent the link click
        setOpenDeleteDialog(true); // Open confirmation dialog
    };

    // Handle company deletion
    const handleDelete = async () => {
        if (clientType !== "ADMINISTRATOR") return; // Allow only ADMINISTRATOR to delete

        try {
            await adminService.deleteCompany(company.id); // Call delete service
            alert("Company deleted successfully!");
            navigate("/"); // Redirect after deletion
        } catch (err: unknown) {
            if (err instanceof AxiosError) {
                const errorMessage = err.response?.data?.message || "An unknown error occurred.";
                alert(`Failed to delete company: ${errorMessage}`);
            } else {
                console.error("Unexpected error:", err);
                alert("An unexpected error occurred.");
            }
        } finally {
            setOpenDeleteDialog(false); // Close delete dialog after handling
        }
    };

    return (
        <Card
            sx={{
                width: 345,
                height: 300,
                position: "relative", // Ensure relative positioning for Fab
                overflow: "visible", // Ensure Fab can hover outside card bounds
            }}
            component={Link}
            to={clientType === 'ADMINISTRATOR' ? '/company/' + company.id : `/coupons/company/${props.company.id}`}
        >
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="140"
                    image={"pics/JohnCOuponLogoNoBG.png"}
                    alt={props.company.name}
                    sx={{
                        objectFit: "contain",
                        objectPosition: "center",
                        backgroundColor: "white",
                    }}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {props.company.name}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        {"No description available."}
                    </Typography>
                </CardContent>
            </CardActionArea>

            {/* Conditional rendering for edit and delete buttons */}
            {showButtons && (
                <Box>
                    <Fab
                        onClick={handleEditClick}
                        color="primary"
                        aria-label="edit"
                        sx={{
                            position: "absolute",
                            bottom: 15, // Positioning outside the card
                            right: 20, // Positioning outside the card
                            zIndex: 10, // Ensure visibility over other elements
                            '&:hover': {
                                transform: "scale(1.1)", // Slightly enlarge on hover
                            },
                        }}
                    >
                        <EditIcon />
                    </Fab>
                    <Fab
                        onClick={handleDeleteFabClick}
                        color="primary"
                        aria-label="delete"
                        sx={{
                            position: "absolute",
                            bottom: 15, // Positioning outside the card
                            right: 80, // Positioning outside the card
                            zIndex: 10, // Ensure visibility over other elements
                            '&:hover': {
                                transform: "scale(1.1)", // Slightly enlarge on hover
                            },
                        }}
                    >
                        <DeleteIcon />
                    </Fab>
                </Box>
            )}

            {/* Delete Confirmation Dialog */}
            <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)}>
                <DialogTitle>Confirm Deletion</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete this company?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenDeleteDialog(false)} color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={handleDelete} color="primary" autoFocus>
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
        </Card>
    );
}
