import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import guestService from "../../../services/GuestService";
import { Company } from "../../../models/Company";
import { Coupon } from "../../../models/Coupon";
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Fab } from "@mui/material";
import "./OneCompanyPage.css";
import { store } from "../../../store";
import { Banner } from "../../Banner/Banner";
import adminService from "../../../services/AdminService";
import { AxiosError } from "axios";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export function OneCompanyPage(): JSX.Element {
    const { id } = useParams<{ id: string }>(); // Getting company ID from URL params
    const [company, setCompany] = useState<Company | null>(null);
    const [coupons, setCoupons] = useState<Coupon[]>([]);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const clientType = store.getState().auth.clientType;
    const clientId = store.getState().auth.id;
    const navigate = useNavigate();
    
    // Function to handle Edit FAB click event
    const handleEditFabClick = () => {
        if (company?.id) {
            navigate(`/editcompany/${company.id}`);
        }
    };

    // Function to handle Delete FAB click event
    const handleDeleteFabClick = () => {
        setOpenDeleteDialog(true);
    };

    // Handle coupon deletion
    const handleDelete = async () => {
        if (!company || clientType !== "ADMINISTRATOR" ) return;

        try {
            await adminService.deleteCompany(company.id);
            alert("Company deleted successfully!");
            navigate("/allcompanies/"); // Redirect after deletion
        } catch (err: unknown) {
            if (err instanceof AxiosError) {
                const errorMessage = err.response?.data?.message || "An unknown error occurred.";
                alert(`Failed to delete company: ${errorMessage}`);
            } else {
                console.error("Unexpected error:", err);
                alert("An unexpected error occurred: " + err);
            }
        } finally {
            setOpenDeleteDialog(false); // Close delete dialog after handling
        }
    };

    // Handle Row Click to navigate to coupon detail
    const handleRowClick = (couponId: number) => {
        navigate(`/coupon/${couponId}`);
    };

    useEffect(() => {
        const fetchCompanyDetails = async () => {
            try {
                const companyData = await guestService.getOneCompany(parseInt(id!));
                setCompany(companyData);
                const companyCoupons = await guestService.getCouponsByCompanyId(parseInt(id!));
                setCoupons(companyCoupons);
            } catch (error) {
                console.error("Error fetching company details:", error);
            } finally {
                setIsLoading(false);
            }
        };

        if (id) {
            fetchCompanyDetails();
        }
    }, [id]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!(clientType === 'ADMINISTRATOR' || clientType === 'COMPANY' && clientId === company?.id)) {
        return (
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
                <Typography variant="h4" color="error">
                    This page is not accessible for this user.
                </Typography>
            </Box>
        );
    }

    return (
        <div className="OneCompanyPage" style={{ margin: "0 80px" }}> {/* Increased left and right margins */}
            <Banner bannerImage="" bannerLogo="/pics/greenBGJC.jpg" />

            {company && (
                <Box sx={{ padding: 4, backgroundColor: 'var(--background-color)', borderRadius: 'var(--border-radius)', boxShadow: 'var(--box-shadow)', marginBottom: '40px' }}>
                    <Typography variant="h3" gutterBottom sx={{ color: 'var(--primary-color)', fontWeight: 'bold' }}>
                        {company.name}
                    </Typography>
                    <Typography variant="h5" sx={{ color: 'var(--text-color)', marginBottom: '20px' }}>
                        Email: {company.email}
                    </Typography>
                    <Box sx={{ marginTop: '20px', padding: '20px', backgroundColor: 'var(--light-bg)', borderRadius: 'var(--border-radius)', boxShadow: 'var(--box-shadow)' }}>
                        <Typography variant="h6" sx={{ color: 'var(--primary-color)', fontWeight: 'bold' }}>About this Company</Typography>
                        <Typography variant="body1" sx={{ color: 'var(--text-color)', marginTop: '10px' }}>
                            {company.name} is a leading provider in its field, offering a wide range of services and products to help customers achieve their goals. With a strong commitment to innovation and quality, we aim to offer the best solutions tailored to each client.
                        </Typography>
                    </Box>
                </Box>
            )}

            {/* Coupons Table */}
            <Box sx={{ marginTop: '40px' }}>
                <Typography variant="h5" sx={{ marginBottom: '30px', color: 'var(--primary-color)', fontWeight: 'bold' }}>
                    Coupons for {company?.name}
                </Typography>

                <TableContainer component={Paper} sx={{ backgroundColor: 'var(--background-color)', borderRadius: 'var(--border-radius)', boxShadow: 'var(--box-shadow)' }}>
                    <Table sx={{ minWidth: 650 }} aria-label="company coupons table">
                        <TableHead>
                            <TableRow sx={{ backgroundColor: 'var(--header-bg)' }}>
                                <TableCell sx={{ color: 'var(--text-color)', fontWeight: 'bold' }}>Title</TableCell>
                                <TableCell align="right" sx={{ color: 'var(--text-color)', fontWeight: 'bold' }}>Category</TableCell>
                                <TableCell align="right" sx={{ color: 'var(--text-color)', fontWeight: 'bold' }}>Price</TableCell>
                                <TableCell align="right" sx={{ color: 'var(--text-color)', fontWeight: 'bold' }}>Start Date</TableCell>
                                <TableCell align="right" sx={{ color: 'var(--text-color)', fontWeight: 'bold' }}>End Date</TableCell>
                                <TableCell align="right" sx={{ color: 'var(--text-color)', fontWeight: 'bold' }}>Amount</TableCell>
                                <TableCell align="right" sx={{ color: 'var(--text-color)', fontWeight: 'bold' }}>Image</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {coupons.length > 0 ? (
                                coupons.map((coupon) => (
                                    <TableRow
                                        key={coupon.id}
                                        sx={{ '&:hover': { backgroundColor: 'var(--secondary-color)' } }}
                                        onClick={() => handleRowClick(coupon.id)}
                                    >
                                        <TableCell component="th" scope="row" sx={{ color: 'var(--text-color)' }}>
                                            {coupon.title}
                                        </TableCell>
                                        <TableCell align="right" sx={{ color: 'var(--text-color)' }}>{coupon.category.name}</TableCell>
                                        <TableCell align="right" sx={{ color: 'var(--text-color)' }}>${coupon.price}</TableCell>
                                        <TableCell align="right" sx={{ color: 'var(--text-color)' }}>{new Date(coupon.startDate).toLocaleDateString()}</TableCell>
                                        <TableCell align="right" sx={{ color: 'var(--text-color)' }}>{new Date(coupon.endDate).toLocaleDateString()}</TableCell>
                                        <TableCell align="right" sx={{ color: 'var(--text-color)' }}>{coupon.amount}</TableCell>
                                        <TableCell align="right">
                                            <img src={coupon.image} alt={coupon.title} width={50} height={50} />
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={7} align="center" sx={{ color: 'var(--text-color)', fontWeight: 'bold', padding: '20px' }}>
                                        No coupons available for this company at the moment.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>

             {/* Delete Dialog */}
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

            {/* FAB Buttons for Company */}
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
