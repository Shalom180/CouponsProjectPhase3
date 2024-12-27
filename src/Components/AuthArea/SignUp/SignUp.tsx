import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Customer } from "../../../models/Customer"; // Adjust path as needed
import guestService from "../../../services/GuestService";
import { Box, Button, TextField, Typography, Grid, Paper, CircularProgress } from "@mui/material";
import { AxiosError } from "axios"; // For error handling
import { useDispatch } from "react-redux"; // Use useDispatch hook
import { authSlice } from "../../../reducers/AuthSlice"; // Redux auth slice
import authService from "../../../services/AuthService"; // AuthService for login
import { LoginRequest } from "../../../models/LoginRequest"; // Model for login request
import { useNavigate } from "react-router"; // For navigation after login

export function SignUp(): JSX.Element {
    const { register, handleSubmit, reset, formState: { errors } } = useForm<Customer>({
        defaultValues: {
            id: 0,
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            coupons: [],
        },
    });

    const [loading, setLoading] = useState(false); // Loading state to show spinner
    const [passwordError, setPasswordError] = useState<string | null>(null); // For custom password errors
    const dispatch = useDispatch(); // Use dispatch to call redux actions
    const navigate = useNavigate(); // For navigation after login

    // The login function that calls the authService to log in
    const login = async (email: string, password: string) => {
        try {
            const response = await authService.login(new LoginRequest(email, password));
            if (response) {
                dispatch(authSlice.actions.login(response)); // Dispatch action to store the JWT
                navigate('/'); // Redirect to the home page
            }
        } catch (err) {
            console.error("Login error:", err); // Handle login error
        }
    };

    // Form submission handler
    const onSubmit: SubmitHandler<Customer> = async (data) => {
        setLoading(true); // Set loading to true to show the spinner
        setPasswordError(null); // Reset password error message

        try {
            // Attempt to sign up the customer via guestService
            const response = await guestService.customerSignUp(data);
            alert(`Welcome, ${data.firstName}! Your account has been created successfully.`);

            reset(); // Reset form fields

            // Call login after successful sign-up
            await login(data.email, data.password);
        } catch (error) {
            console.error("Sign-up error:", error);

            // Error handling based on AxiosError instance
            if (error instanceof AxiosError && error.response) {
                const errorMessage = error.response.data?.message || "Failed to sign up. Please try again later.";
                if (errorMessage.includes("password")) {
                    setPasswordError(errorMessage); // Handle password-related errors
                } else {
                    alert(`Error: ${errorMessage}`);
                }
            } else {
                alert("Failed to sign up. Please try again later.");
            }
        } finally {
            setLoading(false); // Reset loading state
        }
    };

    return (
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", backgroundColor: "var(--background-color)" }}>
            <Paper elevation={3} sx={{ padding: "var(--spacing-md)", borderRadius: "var(--border-radius)", backgroundColor: "var(--header-bg)", color: "var(--text-color)", boxShadow: "var(--box-shadow)", width: "100%", maxWidth: 400 }}>
                <Typography variant="h4" sx={{ fontFamily: "var(--font-family-heading)", textAlign: "center", marginBottom: "var(--spacing-sm)" }}>
                    Sign Up
                </Typography>
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
                                InputLabelProps={{ style: { color: "var(--text-color)" } }}
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
                                InputLabelProps={{ style: { color: "var(--text-color)" } }}
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
                                InputLabelProps={{ style: { color: "var(--text-color)" } }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Password"
                                fullWidth
                                variant="outlined"
                                type="password"
                                {...register("password", {
                                    required: "Password is required",
                                    minLength: {
                                        value: 8,
                                        message: "Password must be at least 8 characters long",
                                    },
                                    pattern: {
                                        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%&*]).{8,20}$/,
                                        message: "Password must include upper, lower, digit, and special character.",
                                    },
                                })}
                                error={!!errors.password || !!passwordError}
                                helperText={passwordError || errors.password?.message}
                                InputLabelProps={{ style: { color: "var(--text-color)" } }}
                            />
                            <Typography variant="body2" sx={{ marginTop: "8px", color: "var(--secondary-color)", fontSize: "0.875rem", fontStyle: "italic" }}>
                                Password must be 8-20 characters, with at least one digit, one uppercase letter, one lowercase letter, and one special character (!@#$%&*).
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
                                {loading ? <CircularProgress size={24} sx={{ color: "var(--text-color)" }} /> : "Sign Up"}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Box>
    );
}
