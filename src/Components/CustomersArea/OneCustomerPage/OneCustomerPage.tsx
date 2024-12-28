import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Paper, Typography, Grid, Avatar, Chip, Card, CardContent, CardActions, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Fab } from '@mui/material';
import { Person, Email, ShoppingCart, Edit, Delete } from '@mui/icons-material';

import "./OneCustomerPage.css";
import { Coupon } from '../../../models/Coupon';
import { Customer } from '../../../models/Customer';
import adminService from '../../../services/AdminService';
import { store } from '../../../store';
import customerService from '../../../services/CustomerService';
import { Banner } from '../../Banner/Banner';
import { AxiosError } from 'axios';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export function OneCustomerPage(): JSX.Element {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [customer, setCustomer] = useState<Customer | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
        const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const clientType = store.getState().auth.clientType;
    const clientId = store.getState().auth.id;

    // Function to handle Edit FAB click event
    const handleEditFabClick = () => {
        if (customer?.id) {
            navigate(`/editcustomer/${customer.id}`);
        }
    };

    // Function to handle Delete FAB click event
    const handleDeleteFabClick = () => {
        setOpenDeleteDialog(true);
    };

    // Handle customer deletion
    const handleDelete = async () => {
        if (!customer || clientType !== "ADMINISTRATOR" ) return;

        try {
            await adminService.deleteCustomer(customer.id);
            alert("Customer deleted successfully!");
            navigate("/allcustomers/"); // Redirect after deletion
        } catch (err: unknown) {
            if (err instanceof AxiosError) {
                const errorMessage = err.response?.data?.message || "An unknown error occurred.";
                alert(`Failed to delete customer: ${errorMessage}`);
            } else {
                console.error("Unexpected error:", err);
                alert("An unexpected error occurred: " + err);
            }
        } finally {
            setOpenDeleteDialog(false); // Close delete dialog after handling
        }
    };

    useEffect(() => {
        const fetchCustomer = async () => {
            if (clientType === 'ADMINISTRATOR'){
                try {
                    if (id) {
                        const fetchedCustomer = await adminService.getOneCustomer(parseInt(id, 10));
                        // Ensure coupons is always a Set
                        fetchedCustomer.coupons = new Set(Array.isArray(fetchedCustomer.coupons) ? fetchedCustomer.coupons : fetchedCustomer.coupons);
                        setCustomer(fetchedCustomer);
                    }
                } catch (err) {
                    setError('Failed to fetch customer details. Please try again later.');
                    console.error('Error fetching customer:', err);
                } finally {
                    setLoading(false);
                }
            } else if (clientType === 'CUSTOMER' && clientId === Number(id)){
                try {
                    const fetchedCustomer = await customerService.getCustomerDetails();
                    // Ensure coupons is always a Set
                    fetchedCustomer.coupons = new Set(Array.isArray(fetchedCustomer.coupons) ? fetchedCustomer.coupons : fetchedCustomer.coupons);
                    setCustomer(fetchedCustomer);
                } catch (err) {
                    setError('Failed to fetch customer details. Please try again later.');
                    console.error('Error fetching customer:', err);
                } finally {
                    setLoading(false);
                }
            } else {
                setError('You are not authorized to view this page');
                setLoading(false);
            }
        };

        fetchCustomer();
    }, [id, clientType, clientId]);

    if (loading) {
        return (
            <div className="OneCustomerPage">
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                    <CircularProgress sx={{ color: 'white' }} />
                </Box>
            </div>
        );
    }

    if (error || !customer) {
        return (
            <div className="OneCustomerPage">
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                    <Typography variant="h5">{error || 'Customer not found'}</Typography>
                </Box>
            </div>
        );
    }

    if(!(clientType === 'ADMINISTRATOR' || (clientType === 'CUSTOMER' && clientId === Number(id)))){
        return (
            <div className="OneCustomerPage">
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                    <Typography variant="h5">You are not authorized to view this page</Typography>
                </Box>
            </div>
        );
    }

    function handleCouponClick(id: number): void {
        navigate(`/coupon/${id}`);
    }

    return (
        <div className="OneCustomerPage">
            <Banner bannerImage="" bannerLogo="/pics/greenBGJC.jpg" />
            <Box sx={{ 
                minHeight: '100vh', 
                padding: { xs: 2, md: 4 },
                maxWidth: '1200px',
                margin: '0 auto',
                width: '100%'
            }}>
                <Paper elevation={3} sx={{ 
                    padding: { xs: 2, md: 4 }, 
                    backgroundColor: 'var(--header-bg)', 
                    color: 'white',
                    borderRadius: 'var(--border-radius)'
                }}>
                    <Grid container spacing={4}>
                        <Grid item xs={12} md={4} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
                            <Avatar sx={{ width: 150, height: 150, fontSize: '4rem' }}>
                                {customer.firstName[0]}{customer.lastName[0]}
                            </Avatar>
                        </Grid>
                        <Grid item xs={12} md={8}>
                            <Typography variant="h4" gutterBottom>
                                {customer.firstName} {customer.lastName}
                            </Typography>
                            <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                <Person sx={{ mr: 1 }} /> ID: {customer.id}
                            </Typography>
                            <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                <Email sx={{ mr: 1 }} /> {customer.email}
                            </Typography>
                            <Chip 
                                icon={<ShoppingCart />} 
                                label={`${customer.coupons.size} Coupons Purchased`} 
                                sx={{ mt: 2, backgroundColor: 'primary.main', color: 'white' }}
                            />
                        </Grid>
                    </Grid>
                </Paper>

                <Typography variant="h5" sx={{ mt: 4, mb: 2 }}>Purchased Coupons</Typography>
                <Grid container spacing={3}>
                    {customer.coupons.size === 0 && (
                        <Grid item xs={12}> 
                            <Typography variant="body1">No coupons purchased</Typography>   
                        </Grid>
                    )}
                    {Array.from(customer.coupons).map((coupon: Coupon) => (
                        <Grid item xs={12} sm={6} md={4} key={coupon.id}>
                            <Card sx={{ 
                                backgroundColor: 'var(--header-bg)', 
                                color: 'white',
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column'
                            }}>
                                <CardContent sx={{ flexGrow: 1 }}>
                                    <Typography variant="h6" gutterBottom>{coupon.title}</Typography>
                                    <Typography variant="body2">{coupon.description}</Typography>
                                </CardContent>
                                <CardActions>
                                    <Button onClick={() => handleCouponClick(coupon.id)} size="small" sx={{ color: 'primary.main' }}>View Details</Button>
                                    <Typography variant="body2" sx={{ marginLeft: 'auto' }}>
                                        Price: ${coupon.price.toFixed(2)}
                                    </Typography>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Box>
            {/* Delete Dialog */}
            <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)}>
                <DialogTitle>Confirm Deletion</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete this customer?
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

            {/* FAB Buttons for Customer */}
            {clientType === "ADMINISTRATOR" && (
                <Box>
                    <Fab
                        color="primary"
                        aria-label="edit"
                        onClick={handleEditFabClick}
                        sx={{ position: "fixed", bottom: 220, right: 50, zIndex: 1000 }}
                    >
                        <EditIcon />
                    </Fab>
                    <Fab
                        color="primary"
                        aria-label="delete"
                        onClick={handleDeleteFabClick}
                        sx={{ position: "fixed", bottom: 150, right: 50, zIndex: 1000 }}
                    >
                        <DeleteIcon />
                    </Fab>
                </Box>
            )}
        </div>
    );
}

