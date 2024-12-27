import React, { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from "react-hook-form";
import { Box, Button, TextField, Typography, Grid, Paper, CircularProgress, MenuItem, Snackbar, Alert } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import { store } from '../../../store';
import { Coupon } from "../../../models/Coupon";
import { Company } from '../../../models/Company';
import { Category } from '../../../models/Category';
import companyService from "../../../services/CompanyService";
import guestService from '../../../services/GuestService';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

interface FormInputs {
    title: string;
    description: string;
    startDate: Date;
    endDate: Date;
    amount: number;
    price: number;
    image: string;
    categoryId: number;
}

export function AddCouponPage(): JSX.Element {
    const [company, setCompany] = useState<Company>();
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(false);
    const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: 'success' | 'error' }>({
        open: false,
        message: '',
        severity: 'success',
    });

    const { register, handleSubmit, formState: { errors }, control } = useForm<FormInputs>();
    const navigate = useNavigate();

    const onSubmit: SubmitHandler<FormInputs> = async (data) => {
        setLoading(true);
        try {
            const authState = store.getState().auth;

            if (authState.clientType !== 'COMPANY') {
                throw new Error("Only a company is allowed to add a new coupon.");
            }

            if (!company) {
                throw new Error("Company details are not available.");
            }

            if (authState.id !== company.id) {
                throw new Error("You can only add coupons for your own company.");
            }

            const coupon: Coupon = {
                id: 0,
                title: data.title,
                description: data.description,
                startDate: data.startDate,
                endDate: data.endDate,
                amount: data.amount,
                price: data.price,
                image: data.image,
                category: { id: data.categoryId, name: "" },
                company: company,
                customers: new Set(),
            };

            await companyService.addCoupon(coupon);
            setSnackbar({ open: true, message: "Coupon added successfully!", severity: 'success' });
            setTimeout(() => navigate("/coupons/company/" + coupon.company.id), 2000);
        } catch (error: any) {
            console.error("Error adding coupon:", error);
            setSnackbar({ open: true, message: error.message || "Failed to add coupon.", severity: 'error' });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const authState = store.getState().auth;
        if (authState.clientType !== 'COMPANY') {
            setSnackbar({ open: true, message: "You are not authorized to access this page.", severity: 'error' });
            setTimeout(() => navigate("/"), 2000);
            return;
        }

        companyService.getCompanyDetails()
            .then(setCompany)
            .catch(err => {
                console.error("Error fetching company details:", err);
                setSnackbar({ open: true, message: "Failed to fetch company details.", severity: 'error' });
            });

        guestService.getCategories()
            .then(setCategories)
            .catch(err => {
                console.error("Error fetching categories:", err);
                setSnackbar({ open: true, message: "Failed to fetch categories.", severity: 'error' });
            });
    }, [navigate]);

    const inputProps = {
        style: { 
            color: 'white',
        }
    };

    const textFieldSx = {
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: 'rgba(255, 255, 255, 0.23)',
            },
            '&:hover fieldset': {
                borderColor: 'rgba(255, 255, 255, 0.5)',
            },
            '&.Mui-focused fieldset': {
                borderColor: 'primary.main',
            },
        },
        '& .MuiInputLabel-root': {
            color: 'rgba(255, 255, 255, 0.7)',
        },
        '& .MuiSelect-icon': {
            color: 'white',
        },
        '& .MuiOutlinedInput-input': {
            color: 'white',
        },
        '& .MuiInputBase-input::placeholder': {
            color: 'rgba(255, 255, 255, 0.5)',
            opacity: 1,
        },
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh", backgroundColor: "var(--background-color)", padding: "var(--spacing-md)" }}>
                <Paper elevation={3} sx={{ padding: "var(--spacing-md)", borderRadius: "var(--border-radius)", backgroundColor: "var(--header-bg)", color: "var(--text-color)", boxShadow: "var(--box-shadow)", width: "100%", maxWidth: 500 }}>
                    <Typography variant="h4" sx={{ fontFamily: "var(--font-family-heading)", textAlign: "center", marginBottom: "var(--spacing-sm)", color: "white" }}>
                        Add New Coupon
                    </Typography>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Title"
                                    {...register("title", { required: "Title is required" })}
                                    error={!!errors.title}
                                    helperText={errors.title?.message}
                                    InputProps={inputProps}
                                    sx={textFieldSx}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Description"
                                    multiline
                                    rows={4}
                                    {...register("description", { required: "Description is required" })}
                                    error={!!errors.description}
                                    helperText={errors.description?.message}
                                    InputProps={inputProps}
                                    sx={textFieldSx}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <DatePicker
                                    label="Start Date"
                                    {...register("startDate", { required: "Start date is required" })}
                                    renderInput={(params) => 
                                        <TextField 
                                            {...params} 
                                            fullWidth 
                                            error={!!errors.startDate}
                                            helperText={errors.startDate?.message}
                                            InputProps={{ ...params.InputProps, ...inputProps }}
                                            sx={textFieldSx}
                                        />
                                    }
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <DatePicker
                                    label="End Date"
                                    {...register("endDate", { required: "End date is required" })}
                                    renderInput={(params) => 
                                        <TextField 
                                            {...params} 
                                            fullWidth 
                                            error={!!errors.endDate}
                                            helperText={errors.endDate?.message}
                                            InputProps={{ ...params.InputProps, ...inputProps }}
                                            sx={textFieldSx}
                                        />
                                    }
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    fullWidth
                                    label="Amount"
                                    type="number"
                                    {...register("amount", { required: "Amount is required", min: 1 })}
                                    error={!!errors.amount}
                                    helperText={errors.amount?.message}
                                    InputProps={inputProps}
                                    sx={textFieldSx}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    fullWidth
                                    label="Price"
                                    type="number"
                                    {...register("price", { required: "Price is required", min: 0 })}
                                    error={!!errors.price}
                                    helperText={errors.price?.message}
                                    InputProps={inputProps}
                                    sx={textFieldSx}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Image URL"
                                    {...register("image", { required: "Image URL is required" })}
                                    error={!!errors.image}
                                    helperText={errors.image?.message}
                                    InputProps={inputProps}
                                    sx={textFieldSx}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    select
                                    label="Category"
                                    {...register("categoryId", { required: "Category is required" })}
                                    error={!!errors.categoryId}
                                    helperText={errors.categoryId?.message}
                                    InputProps={inputProps}
                                    sx={textFieldSx}
                                >
                                    {categories.map((category) => (
                                        <MenuItem key={category.id} value={category.id}>
                                            {category.name}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                            <Grid item xs={12}>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    disabled={loading}
                                    sx={{ 
                                        height: 56,
                                        fontSize: '1.2rem',
                                        fontWeight: 'bold',
                                        textTransform: 'none',
                                    }}
                                >
                                    {loading ? <CircularProgress size={24} /> : "Add Coupon"}
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </Paper>
                <Snackbar 
                    open={snackbar.open} 
                    autoHideDuration={6000} 
                    onClose={() => setSnackbar({ ...snackbar, open: false })}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                >
                    <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity} sx={{ width: '100%' }}>
                        {snackbar.message}
                    </Alert>
                </Snackbar>
            </Box>
        </LocalizationProvider>
    );
}

