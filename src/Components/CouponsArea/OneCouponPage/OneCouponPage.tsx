import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Coupon } from "../../../models/Coupon";
import guestService from "../../../services/GuestService";
import customerService from "../../../services/CustomerService";
import companyService from "../../../services/CompanyService";
import { store } from "../../../store"; 
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {
    Box,
    Button,
    Card,
    CardContent,
    CardMedia,
    Typography,
    Grid,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Fab,
} from "@mui/material";
import { AxiosError } from "axios";
import "./OneCouponPage.css";

export function OneCouponPage(): JSX.Element {
    const [coupon, setCoupon] = useState<Coupon | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [openPurchaseDialog, setOpenPurchaseDialog] = useState(false);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [isCouponPurchased, setIsCouponPurchased] = useState(false);
    const { id } = useParams();
    const navigate = useNavigate();

    // Function to handle Edit FAB click event
    const handleEditFabClick = () => {
        if (coupon?.id) {
            navigate(`/company/editcoupon/${coupon.id}`);
        }
    };

    // Function to handle Delete FAB click event
    const handleDeleteFabClick = () => {
        setOpenDeleteDialog(true);
    };

    // Fetch the coupon data based on ID from URL parameters
    useEffect(() => {
        if (id) {
            const couponId = Number(id);
            if (!isNaN(couponId)) {
                guestService.getOneCoupon(couponId)
                    .then(response => {
                        setCoupon(response);
                    })
                    .catch(err => {
                        console.error("Error fetching coupon: ", err);
                    })
                    .finally(() => setIsLoading(false));
            } else {
                console.error("Invalid coupon ID");
                setIsLoading(false);
            }
        } else {
            setIsLoading(false);
        }
    }, [id]);

    // Check if the coupon is already purchased by the customer
    useEffect(() => {
        if (coupon && store.getState().auth.clientType === "CUSTOMER") {
            customerService.getCustomerCoupons()
                .then(response => {
                    if (response) {
                        setIsCouponPurchased(response.some(purchasedCoupon => purchasedCoupon.id === coupon.id));
                    }
                })
                .catch(err => {
                    console.error("Error fetching customer coupons:", err);
                });
        }
    }, [coupon]);

    // Handle coupon purchase
    const handlePurchase = async () => {
        if (!coupon || isCouponPurchased) return;

        try {
            await customerService.purchasecoupon(coupon);
            setIsCouponPurchased(true);
            alert("Coupon purchased successfully!");
        } catch (err: unknown) {
            if (err instanceof AxiosError) {
                const errorMessage = err.response?.data?.message || "An unknown error occurred.";
                // Check for specific error messages
                if (errorMessage.includes("quantity is below one") || errorMessage.includes("end date has already passed")) {
                    alert("You cannot purchase this coupon because its quantity is below one or the end date has already passed.");
                } else {
                    alert(`Failed to purchase coupon: ${errorMessage}`);
                }
            } else {
                console.error("Unexpected error:", err);
                alert("An unexpected error occurred.");
            }
        } finally {
            setOpenPurchaseDialog(false); // Close purchase dialog after handling
        }
    };

    // Handle coupon deletion
    const handleDelete = async () => {
        if (!coupon || store.getState().auth.clientType !== "COMPANY" || store.getState().auth.id !== coupon.company.id) return;

        try {
            await companyService.deleteCoupon(coupon.id);
            alert("Coupon deleted successfully!");
            navigate("coupons/company/"+ coupon.company.id); // Redirect after deletion
        } catch (err: unknown) {
            if (err instanceof AxiosError) {
                const errorMessage = err.response?.data?.message || "An unknown error occurred.";
                alert(`Failed to delete coupon: ${errorMessage}`);
            } else {
                console.error("Unexpected error:", err);
                alert("An unexpected error occurred.");
            }
        } finally {
            setOpenDeleteDialog(false); // Close delete dialog after handling
        }
    };

    // Show loading state or null coupon state
    if (isLoading || !coupon) {
        return (
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
                <Typography variant="h6">Loading...</Typography>
            </Box>
        );
    }

    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                paddingTop: "var(--spacing-md)",
                backgroundColor: "var(--background-color)",
                position: "relative", // To position FABs relative to this container
            }}
        >
            <Card
                sx={{
                    maxWidth: 1200,
                    width: "100%",
                    boxShadow: "var(--box-shadow)",
                    borderRadius: "var(--border-radius)",
                    backgroundColor: "var(--background-color)",
                }}
            >
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <CardMedia
                            component="img"
                            height="400"
                            image={coupon.image}  // Assuming image is always present
                            alt={coupon.title}
                            sx={{ objectFit: "cover", borderRadius: "var(--border-radius)" }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <CardContent>
                            <Typography
                                variant="h4"
                                sx={{
                                    fontWeight: "bold",
                                    marginBottom: "var(--spacing-sm)",
                                    color: "var(--text-color)",
                                }}
                            >
                                {coupon.title}
                            </Typography>
                            <Typography
                                variant="body1"
                                paragraph
                                sx={{
                                    marginBottom: "var(--spacing-md)",
                                    color: "var(--text-color)",
                                }}
                            >
                                {coupon.description}
                            </Typography>
                            <Box sx={{ marginBottom: "var(--spacing-sm)" }}>
                                <Typography variant="h6" sx={{ fontWeight: "bold", color: "var(--text-color)" }}>
                                    Category: {coupon.category?.name || "N/A"}
                                </Typography>
                                <Typography variant="h6" sx={{ fontWeight: "bold", color: "var(--text-color)" }}>
                                    Company: {coupon.company?.name || "N/A"}
                                </Typography>
                            </Box>
                            <Box sx={{ display: "flex", justifyContent: "space-between", marginBottom: "var(--spacing-sm)" }}>
                                <Typography variant="body2" sx={{ color: "var(--text-color)" }}>
                                    Start Date: {new Date(coupon.startDate).toLocaleDateString()}
                                </Typography>
                                <Typography variant="body2" sx={{ color: "var(--text-color)" }}>
                                    End Date: {new Date(coupon.endDate).toLocaleDateString()}
                                </Typography>
                            </Box>
                            <Box sx={{ display: "flex", justifyContent: "space-between", marginBottom: "var(--spacing-sm)" }}>
                                <Typography variant="body2" sx={{ color: "var(--text-color)" }}>
                                    Amount Available: {coupon.amount}
                                </Typography>
                                <Typography variant="body2" sx={{ color: "var(--text-color)" }}>
                                    Price: ${coupon.price}
                                </Typography>
                            </Box>
                            {store.getState().auth.clientType === "CUSTOMER" && (
                                isCouponPurchased ? (
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        size="large"
                                        sx={{
                                            width: "100%",
                                            backgroundColor: "var(--secondary-color)",
                                            "&:hover": { backgroundColor: "var(--primary-color)" },
                                        }}
                                        disabled
                                    >
                                        Coupon Was Already Purchased
                                    </Button>
                                ) : (
                                    <Button
                                        onClick={() => setOpenPurchaseDialog(true)}
                                        variant="contained"
                                        color="primary"
                                        size="large"
                                        sx={{
                                            width: "100%",
                                            backgroundColor: "var(--secondary-color)",
                                            "&:hover": { backgroundColor: "var(--primary-color)" },
                                        }}
                                    >
                                        Buy Coupon
                                    </Button>
                                )
                            )}
                        </CardContent>
                    </Grid>
                </Grid>
            </Card>

            {/* Purchase Dialog */}
            <Dialog open={openPurchaseDialog} onClose={() => setOpenPurchaseDialog(false)}>
                <DialogTitle>Confirm Purchase</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to purchase this coupon?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenPurchaseDialog(false)} color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={handlePurchase} color="primary" autoFocus>
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Delete Dialog */}
            <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)}>
                <DialogTitle>Confirm Deletion</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete this coupon?
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

            {/* FAB Buttons for Company */}
            {store.getState().auth.clientType === "COMPANY" && store.getState().auth.id === coupon.company.id && (
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
        </Box>
    );
}
