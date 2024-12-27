import React, { useEffect, useState } from 'react';
import "./AddCouponPage.css";
import { useForm, SubmitHandler } from "react-hook-form";
import { Coupon } from "../../../models/Coupon";
import companyService from "../../../services/CompanyService";
import guestService from '../../../services/GuestService';
import { Box, Button, TextField, Typography, Grid, Paper, CircularProgress, MenuItem } from "@mui/material";
import { Company } from '../../../models/Company';
import { Category } from '../../../models/Category';
import { useNavigate } from 'react-router-dom';
import { store } from '../../../store';

interface FormInputs {
    title: string;
    description: string;
    startDate: string;
    endDate: string;
    amount: number;
    price: number;
    image: string;
    categoryId: number;
}

export function AddCouponPage(): JSX.Element {
    const [company, setCompany] = useState<Company>();
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const { register, handleSubmit, formState: { errors } } = useForm<FormInputs>();
    const navigate = useNavigate();

    const onSubmit: SubmitHandler<FormInputs> = async (data) => {
        setLoading(true);
        setErrorMessage(null);
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
                startDate: new Date(data.startDate),
                endDate: new Date(data.endDate),
                amount: data.amount,
                price: data.price,
                image: data.image,
                category: { id: data.categoryId, name: "" },
                company: company,
                customers: new Set(),
            };

            await companyService.addCoupon(coupon);
            alert("Coupon added successfully!");
            navigate("/coupons/company/" + coupon.company.id);
        } catch (error: any) {
            console.error("Error adding coupon:", error);
            setErrorMessage(error.message || "Failed to add coupon.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const authState = store.getState().auth;
        console.log("Auth State:", authState);

        if (authState.clientType !== 'COMPANY') {
            console.log("User is not a company");
            return;
        }

        companyService.getCompanyDetails()
            .then(c => {
                console.log("Company details:", c);
                setCompany(c);
            })
            .catch(err => {
                console.error("Error fetching company details:", err);
                setErrorMessage("Failed to fetch company details.");
            });

        guestService.getCategories()
            .then(c => {
                console.log("Categories:", c);
                setCategories(c);
            })
            .catch(err => {
                console.error("Error fetching categories:", err);
                setErrorMessage("Failed to fetch categories.");
            });
    }, []);

    const authState = store.getState().auth;
    console.log("Rendering with auth state:", authState);

    if (authState.clientType !== 'COMPANY') {
        return (
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", backgroundColor: "grey.800" }}>
                <Typography variant="h4" color="error">
                    This page is not accessible for this user.
                </Typography>
            </Box>
        );
    }

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
    };

    return (
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh", backgroundColor: "var(--background-color)", padding: "var(--spacing-md)" }}>
            <Paper elevation={3} sx={{ padding: "var(--spacing-md)", borderRadius: "var(--border-radius)", backgroundColor: "var(--header-bg)", color: "var(--text-color)", boxShadow: "var(--box-shadow)", width: "100%", maxWidth: 400 }}>
                <Typography variant="h4" sx={{ fontFamily: "var(--font-family-heading)", textAlign: "center", marginBottom: "var(--spacing-sm)", color: "white" }}>
                    Add New Coupon
                </Typography>
                {errorMessage && (
                    <Typography variant="body1" color="error" sx={{ marginBottom: "var(--spacing-sm)", textAlign: "center" }}>
                        {errorMessage}
                    </Typography>
                )}
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Grid container spacing={2}>
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
                            <TextField
                                fullWidth
                                label="Start Date"
                                type="date"
                                InputLabelProps={{ shrink: true }}
                                {...register("startDate", { required: "Start date is required" })}
                                error={!!errors.startDate}
                                helperText={errors.startDate?.message}
                                InputProps={inputProps}
                                sx={textFieldSx}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                label="End Date"
                                type="date"
                                InputLabelProps={{ shrink: true }}
                                {...register("endDate", { required: "End date is required" })}
                                error={!!errors.endDate}
                                helperText={errors.endDate?.message}
                                InputProps={inputProps}
                                sx={textFieldSx}
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
                            >
                                {loading ? <CircularProgress size={24} /> : "Add Coupon"}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Box>
    );
}

