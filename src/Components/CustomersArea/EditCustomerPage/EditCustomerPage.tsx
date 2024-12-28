import React, { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Customer } from "../../../models/Customer";
import adminService from "../../../services/AdminService";
import { Box, Button, TextField, Typography, Grid, Paper, CircularProgress } from "@mui/material";
import { AxiosError } from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "./EditCustomerPage.css";
import { store } from "../../../store";

export function EditCustomerPage(): JSX.Element {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const { register, handleSubmit, reset, formState: { errors } } = useForm<Customer>();
    const clientType = store.getState().auth.clientType;

    useEffect(() => {
        const fetchCustomer = async () => {
            try {
                if (id) {
                    const customer = await adminService.getOneCustomer(parseInt(id, 10));
                    reset(customer);
                }
            } catch (err) {
                console.error("Error fetching customer:", err);
                setError("Failed to fetch customer details. Please try again later.");
            }
        };

        fetchCustomer();
    }, [id, reset]);

    const onSubmit: SubmitHandler<Customer> = async (data) => {
        setLoading(true);
        setError(null);

        try {
            await adminService.updateCustomer(data);
            alert(`Customer ${data.firstName} ${data.lastName} has been updated successfully.`);
            navigate(`/onecustomer/${id}`);
        } catch (error) {
            console.error("Update error:", error);

            if (error instanceof AxiosError && error.response) {
                const errorMessage = error.response.data?.message || "Failed to update customer. Please try again later.";
                setError(errorMessage);
            } else {
                setError("Failed to update customer. Please try again later.");
            }
        } finally {
            setLoading(false);
        }
    }

    if (!(clientType === 'ADMINISTRATOR')) {
        return (
            <div className="OneCustomerPage">
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                    <Typography variant="h5">You are not authorized to view this page</Typography>
                </Box>
            </div>
        );
    }

    return (
        <div className="EditCustomerPage">
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh", backgroundColor: "var(--background-color)", padding: "var(--spacing-md)" }}>
                <Paper elevation={3} sx={{ padding: "var(--spacing-md)", borderRadius: "var(--border-radius)", backgroundColor: "var(--header-bg)", color: "var(--text-color)", boxShadow: "var(--box-shadow)", width: "100%", maxWidth: 400 }}>
                    <Typography variant="h4" sx={{ fontFamily: "var(--font-family-heading)", textAlign: "center", marginBottom: "var(--spacing-sm)" }}>
                        Edit Customer
                    </Typography>
                    {error && (
                        <Typography color="error" sx={{ marginBottom: "var(--spacing-sm)", textAlign: "center" }}>
                            {error}
                        </Typography>
                    )}
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    label="First Name"
                                    fullWidth
                                    variant="outlined"
                                    {...register("firstName", { required: "First name is required" })}
                                    error={!!errors.firstName}
                                    helperText={errors.firstName?.message}
                                    InputLabelProps={{ shrink: true, style: { color: "var(--text-color)" } }}
                                    InputProps={{ style: { color: "var(--text-color)" } }}
                                    sx={{
                                        '& .MuiInputLabel-shrink': {
                                            backgroundColor: 'var(--header-bg)',
                                            padding: '0 8px',
                                        },
                                        '& .MuiOutlinedInput-root': {
                                            '& fieldset': {
                                                borderColor: 'var(--text-color)',
                                            },
                                            '&:hover fieldset': {
                                                borderColor: 'var(--primary-color)',
                                            },
                                            '&.Mui-focused fieldset': {
                                                borderColor: 'var(--primary-color)',
                                            },
                                        },
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="Last Name"
                                    fullWidth
                                    variant="outlined"
                                    {...register("lastName", { required: "Last name is required" })}
                                    error={!!errors.lastName}
                                    helperText={errors.lastName?.message}
                                    InputLabelProps={{ shrink: true, style: { color: "var(--text-color)" } }}
                                    InputProps={{ style: { color: "var(--text-color)" } }}
                                    sx={{
                                        '& .MuiInputLabel-shrink': {
                                            backgroundColor: 'var(--header-bg)',
                                            padding: '0 8px',
                                        },
                                        '& .MuiOutlinedInput-root': {
                                            '& fieldset': {
                                                borderColor: 'var(--text-color)',
                                            },
                                            '&:hover fieldset': {
                                                borderColor: 'var(--primary-color)',
                                            },
                                            '&.Mui-focused fieldset': {
                                                borderColor: 'var(--primary-color)',
                                            },
                                        },
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="Email"
                                    fullWidth
                                    variant="outlined"
                                    {...register("email", {
                                        required: "Email is required",
                                        pattern: {
                                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                            message: "Invalid email address",
                                        },
                                    })}
                                    error={!!errors.email}
                                    helperText={errors.email?.message}
                                    InputLabelProps={{ shrink: true, style: { color: "var(--text-color)" } }}
                                    InputProps={{ style: { color: "var(--text-color)" } }}
                                    sx={{
                                        '& .MuiInputLabel-shrink': {
                                            backgroundColor: 'var(--header-bg)',
                                            padding: '0 8px',
                                        },
                                        '& .MuiOutlinedInput-root': {
                                            '& fieldset': {
                                                borderColor: 'var(--text-color)',
                                            },
                                            '&:hover fieldset': {
                                                borderColor: 'var(--primary-color)',
                                            },
                                            '&.Mui-focused fieldset': {
                                                borderColor: 'var(--primary-color)',
                                            },
                                        },
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="Password"
                                    fullWidth
                                    variant="outlined"
                                    type="password"
                                    {...register("password", {
                                        minLength: {
                                            value: 8,
                                            message: "Password must be at least 8 characters long",
                                        },
                                        pattern: {
                                            value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%&*]).{8,20}$/,
                                            message: "Password must include upper, lower, digit, and special character.",
                                        },
                                    })}
                                    error={!!errors.password}
                                    helperText={errors.password?.message}
                                    InputLabelProps={{ shrink: true, style: { color: "var(--text-color)" } }}
                                    InputProps={{ style: { color: "var(--text-color)" } }}
                                    sx={{
                                        '& .MuiInputLabel-shrink': {
                                            backgroundColor: 'var(--header-bg)',
                                            padding: '0 8px',
                                        },
                                        '& .MuiOutlinedInput-root': {
                                            '& fieldset': {
                                                borderColor: 'var(--text-color)',
                                            },
                                            '&:hover fieldset': {
                                                borderColor: 'var(--primary-color)',
                                            },
                                            '&.Mui-focused fieldset': {
                                                borderColor: 'var(--primary-color)',
                                            },
                                        },
                                    }}
                                />
                                <Typography variant="body2" sx={{ marginTop: "8px", color: "var(--secondary-color)", fontSize: "0.875rem", fontStyle: "italic" }}>
                                    Leave password blank to keep the current password. If changing, password must be 8-20 characters, with at least one digit, one uppercase letter, one lowercase letter, and one special character (!@#$%&*).
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ backgroundColor: "var(--primary-color)", color: "var(--text-color)", "&:hover": { backgroundColor: "var(--secondary-color)" }, padding: "var(--spacing-sm)" }}
                                    disabled={loading}
                                >
                                    {loading ? <CircularProgress size={24} sx={{ color: "var(--text-color)" }} /> : "Update Customer"}
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </Paper>
            </Box>
        </div>
    );
}

