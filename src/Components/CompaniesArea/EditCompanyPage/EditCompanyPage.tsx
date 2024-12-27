import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Box, Button, TextField, Typography, Grid, Paper, CircularProgress } from "@mui/material";
import adminService from "../../../services/AdminService";
import { useNavigate, useParams } from "react-router-dom";
import { store } from "../../../store";
import "./EditCompanyPage.css";

interface FormInputs {
    id: number;
    name: string;
    email: string;
    password: string;
}

interface Company {
    id: number;
    name: string;
    email: string;
    password: string;
}

export function EditCompanyPage(): JSX.Element {
    const [loading, setLoading] = useState(false);
    const [company, setCompany] = useState<Company | null>(null);
    const { register, handleSubmit, formState: { errors }, setValue } = useForm<FormInputs>();
    const navigate = useNavigate();
    const { id } = useParams(); // To get the company ID from the URL

    useEffect(() => {
        // Fetch company data based on the ID
        const fetchCompany = async () => {
            try {
                setLoading(true);
                const response = await adminService.getOneCompany(Number(id)); // Assuming this service exists
                setCompany(response);
                if (response) {
                    // Set default values for the form fields
                    setValue("id", response.id);
                    setValue("name", response.name);
                    setValue("email", response.email);
                    setValue("password", response.password); // You may decide to hide or mask password field
                }
            } catch (error) {
                console.error("Error fetching company:", error);
                alert("Failed to load company data.");
            } finally {
                setLoading(false);
            }
        };
        if (id) {
            fetchCompany();
        }
    }, [id, setValue]);

    const onSubmit: SubmitHandler<FormInputs> = async (data) => {
        setLoading(true);
        try {
            if (store.getState().auth.clientType !== "ADMINISTRATOR") {
                throw new Error("Only an admin can edit company data.");
            }

            // Assuming the `updateCompany` function exists in your `adminService`
            await adminService.updateCompany(data);
            alert("Company updated successfully!");
            navigate("/allcompanies");
        } catch (error: any) {
            console.error("Error updating company:", error);
            alert(error.message || "Failed to update company.");
        } finally {
            setLoading(false);
        }
    };

    const authState = store.getState().auth;

    if (authState.clientType !== "ADMINISTRATOR") {
        return (
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
                <Typography variant="h4" color="error">
                    This page is not accessible for this user.
                </Typography>
            </Box>
        );
    }

    if (loading || !company) {
        return (
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
                <CircularProgress size={50} />
            </Box>
        );
    }

    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
                backgroundColor: "var(--background-color)",
            }}
        >
            <Paper
                elevation={3}
                sx={{
                    padding: "var(--spacing-md)",
                    borderRadius: "var(--border-radius)",
                    backgroundColor: "var(--header-bg)",
                    color: "var(--text-color)",
                    boxShadow: "var(--box-shadow)",
                    width: "100%",
                    maxWidth: 400,
                }}
            >
                <Typography
                    variant="h4"
                    sx={{
                        fontFamily: "var(--font-family-heading)",
                        textAlign: "center",
                        marginBottom: "var(--spacing-sm)",
                        color: "white",
                    }}
                >
                    Edit Company
                </Typography>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                label="Name"
                                fullWidth
                                variant="outlined"
                                {...register("name", { required: "Name is required" })}
                                error={!!errors.name}
                                helperText={errors.name?.message}
                                InputLabelProps={{ style: { color: "white" } }}
                                sx={{ "& .MuiInputBase-input": { color: "white" } }}
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
                                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                        message: "Invalid email format",
                                    },
                                })}
                                error={!!errors.email}
                                helperText={errors.email?.message}
                                InputLabelProps={{ style: { color: "white" } }}
                                sx={{ "& .MuiInputBase-input": { color: "white" } }}
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
                                error={!!errors.password}
                                helperText={errors.password?.message}
                                InputLabelProps={{ style: { color: "white" } }}
                            />
                            <Typography
                                variant="body2"
                                sx={{
                                    marginTop: "8px",
                                    color: "var(--secondary-color)",
                                    fontSize: "0.875rem",
                                    fontStyle: "italic",
                                }}
                            >
                                Password must be 8-20 characters, with at least one digit, one uppercase letter, one
                                lowercase letter, and one special character (!@#$%&*).
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{
                                    backgroundColor: "var(--primary-color)",
                                    color: "white",
                                    "&:hover": { backgroundColor: "var(--secondary-color)" },
                                    padding: "var(--spacing-sm)",
                                }}
                                disabled={loading}
                            >
                                {loading ? <CircularProgress size={24} sx={{ color: "white" }} /> : "Update Company"}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Box>
    );
}
