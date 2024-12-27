import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Box, Button, TextField, Typography, Grid, Paper, CircularProgress, MenuItem } from '@mui/material';
import companyService from '../../../services/CompanyService';
import guestService from '../../../services/GuestService';
import { Coupon } from '../../../models/Coupon';
import { Category } from '../../../models/Category';
import { useSelector } from 'react-redux';

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

export function EditCouponPage(): JSX.Element {
    const { id } = useParams();
    const [coupon, setCoupon] = useState<Coupon>();
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(false);
    const [fetchError, setFetchError] = useState<string>('');

    const { register, handleSubmit, setValue, formState: { errors } } = useForm<FormInputs>();
    const clientType = useSelector((state: any) => state.auth.clientType);
    const clientIdFromStore = useSelector((state: any) => state.auth.id);
    const navigate = useNavigate();

    // Fetch coupon details based on couponId
    useEffect(() => {
        if (id) {
            setLoading(true);
            guestService.getOneCoupon(parseInt(id))
                .then((data) => {
                    setCoupon(data);
                    // Set form values from coupon data
                    setValue('title', data.title);
                    setValue('description', data.description);
                    setValue('startDate', new Date(data.startDate).toISOString().split('T')[0]); // Correct date handling
                    setValue('endDate', new Date(data.endDate).toISOString().split('T')[0]); // Correct date handling
                    setValue('amount', data.amount);
                    setValue('price', data.price);
                    setValue('image', data.image);
                    setValue('categoryId', data.category.id);
                })
                .catch((err) => {
                    setFetchError('Failed to fetch coupon details');
                    console.error(err);
                })
                .finally(() => setLoading(false));
        }

        // Fetch categories
        guestService.getCategories()
            .then(c => setCategories(c))
            .catch(err => console.error("Error fetching categories:", err));
    }, [id, setValue]);


    const onSubmit: SubmitHandler<FormInputs> = async (data) => {
        if (!coupon) return;

        if (coupon.company.id !== clientIdFromStore) {
            alert("You are not authorized to edit this coupon.");
            return;
        }

        setLoading(true);
        try {
            const updatedCoupon: Coupon = {
                ...coupon,
                title: data.title,
                description: data.description,
                startDate: new Date(data.startDate),
                endDate: new Date(data.endDate),
                amount: data.amount,
                price: data.price,
                image: data.image,
                category: { id: data.categoryId, name: "" },
                company: coupon.company, // Don't change company
                customers: coupon.customers,
            };

            await companyService.updateCoupon(updatedCoupon);
            alert('Coupon updated successfully!');
            navigate(`/coupon/${coupon.id}`); // Redirect to the coupon page after success
        } catch (error) {
            console.error('Error updating coupon:', error);
            alert('Failed to update coupon');
        } finally {
            setLoading(false);
        }
    };

    const today = new Date().toISOString().split('T')[0]; // Get today's date in yyyy-mm-dd format

    return (
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", backgroundColor: "var(--background-color)" }}>
            <Paper elevation={3} sx={{ padding: "var(--spacing-md)", borderRadius: "var(--border-radius)", backgroundColor: "var(--header-bg)", color: "var(--text-color)", boxShadow: "var(--box-shadow)", width: "100%", maxWidth: 400 }}>
                <Typography variant="h4" sx={{ fontFamily: "var(--font-family-heading)", textAlign: "center", marginBottom: "var(--spacing-sm)", color: "white" }}>
                    Edit Coupon
                </Typography>
                {loading ? (
                    <CircularProgress />
                ) : (
                    <>
                        {fetchError && <Typography color="error">{fetchError}</Typography>}
                        {coupon && (
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <TextField
                                            label="Title"
                                            fullWidth
                                            variant="outlined"
                                            {...register("title", { required: "Title is required" })}
                                            error={!!errors.title}
                                            helperText={errors.title?.message}
                                            InputLabelProps={{ style: { color: "white" } }}
                                            sx={{ color: "white", "& .MuiInputBase-input": { color: "white" } }}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            label="Description"
                                            multiline
                                            rows={3}
                                            fullWidth
                                            variant="outlined"
                                            {...register("description", { required: "Description is required" })}
                                            error={!!errors.description}
                                            helperText={errors.description?.message}
                                            InputLabelProps={{ style: { color: "white" } }}
                                            sx={{ color: "white", "& .MuiInputBase-input": { color: "white" } }}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField
                                            label="Start Date"
                                            type="date"
                                            fullWidth
                                            InputLabelProps={{ shrink: true, style: { color: "white" } }}
                                            {...register("startDate", {
                                                required: "Start Date is required",
                                            })}
                                            error={!!errors.startDate}
                                            helperText={errors.startDate?.message}
                                            sx={{ "& .MuiInputBase-input": { color: "white" } }}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField
                                            label="End Date"
                                            type="date"
                                            fullWidth
                                            InputLabelProps={{ shrink: true, style: { color: "white" } }}
                                            {...register("endDate", {
                                                required: "End Date is required",
                                                validate: value => value >= today || "End date cannot be in the past"
                                            })}
                                            error={!!errors.endDate}
                                            helperText={errors.endDate?.message}
                                            sx={{ "& .MuiInputBase-input": { color: "white" } }}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField
                                            label="Amount"
                                            type="number"
                                            fullWidth
                                            variant="outlined"
                                            {...register("amount", {
                                                required: "Amount is required",
                                                min: 1,
                                                valueAsNumber: true,
                                                validate: value => Number.isInteger(value) || "Amount must be an integer"
                                            })}
                                            error={!!errors.amount}
                                            helperText={errors.amount?.message}
                                            InputLabelProps={{ style: { color: "white" } }}
                                            sx={{ color: "white", "& .MuiInputBase-input": { color: "white" } }}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField
                                            label="Price"
                                            type="text" // Change type to "text" for better control
                                            fullWidth
                                            variant="outlined"
                                            {...register("price", {
                                                required: "Price is required",
                                                min: 0.01,
                                                valueAsNumber: true, // This ensures that the price is treated as a number
                                                validate: value => {
                                                    if (value <= 0) return "Price must be positive";
                                                    // Validate that the price has at most two decimals
                                                    const priceString = value.toString();
                                                    if (!/^\d+(\.\d{0,2})?$/.test(priceString)) {
                                                        return "Price must be a valid number with up to two decimals";
                                                    }
                                                }
                                            })}
                                            error={!!errors.price}
                                            helperText={errors.price?.message}
                                            InputLabelProps={{ style: { color: "white" } }}
                                            sx={{ color: "white", "& .MuiInputBase-input": { color: "white" } }}
                                        />
                                    </Grid>

                                    <Grid item xs={12}>
                                        <TextField
                                            label="Image URL"
                                            fullWidth
                                            variant="outlined"
                                            {...register("image")}
                                            error={!!errors.image}
                                            helperText={errors.image?.message}
                                            InputLabelProps={{ style: { color: "white" } }}
                                            sx={{ color: "white", "& .MuiInputBase-input": { color: "white" } }}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            label="Category"
                                            select
                                            fullWidth
                                            variant="outlined"
                                            {...register("categoryId", { required: "Category is required" })}
                                            error={!!errors.categoryId}
                                            helperText={errors.categoryId?.message}
                                            InputLabelProps={{ style: { color: "white" } }}
                                            sx={{ color: "white", "& .MuiInputBase-input": { color: "white" } }}
                                        >
                                            {categories.map(c => (
                                                <MenuItem key={c.id} value={c.id}>
                                                    {c.name}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Button
                                            type="submit"
                                            fullWidth
                                            variant="contained"
                                            sx={{ backgroundColor: "var(--primary-color)", color: "white", "&:hover": { backgroundColor: "var(--secondary-color)" }, padding: "var(--spacing-sm)" }}
                                            disabled={loading}
                                        >
                                            {loading ? <CircularProgress size={24} sx={{ color: "white" }} /> : "Save Changes"}
                                        </Button>
                                    </Grid>
                                </Grid>
                            </form>
                        )}
                    </>
                )}
            </Paper>
        </Box>
    );
}
