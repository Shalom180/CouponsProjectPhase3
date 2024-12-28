import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
    Table, 
    TableBody, 
    TableCell, 
    TableContainer, 
    TableHead, 
    TableRow, 
    Paper, 
    Typography, 
    CircularProgress, 
    Box
} from '@mui/material';
import adminService from '../../../services/AdminService';
import { Customer } from '../../../models/Customer';
import "./AllCustomersPage.css";
import { Banner } from '../../Banner/Banner';

export function AllCustomersPage(): JSX.Element {
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCustomers = async () => {
            try {
                const fetchedCustomers = await adminService.getAllCustomers();
                setCustomers(fetchedCustomers);
            } catch (err) {
                console.error("Error fetching customers:", err);
                setError("Failed to fetch customers. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchCustomers();
    }, []);

    const handleRowClick = (customerId: number) => {
        navigate(`/onecustomer/${customerId}`);
    };

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <Typography color="error">{error}</Typography>
            </Box>
        );
    }

    return (
        <div className="AllCustomersPage">
            <Banner bannerImage="" bannerLogo="/pics/greenBGJC.jpg" />
            <Box sx={{ width: '100%', maxWidth: 1200, margin: '0 auto', padding: 3 }}>
                <Typography variant="h4" component="h1" gutterBottom sx={{ textAlign: 'left', color: 'var(--text-color)' }}>
                    All Customers
                </Typography>
                <TableContainer component={Paper} sx={{ backgroundColor: 'var(--header-bg)', color: 'var(--text-color)' }}>
                    <Table sx={{ minWidth: 650 }} aria-label="customers table">
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ color: 'var(--text-color)', fontWeight: 'bold' }}>ID</TableCell>
                                <TableCell sx={{ color: 'var(--text-color)', fontWeight: 'bold' }}>First Name</TableCell>
                                <TableCell sx={{ color: 'var(--text-color)', fontWeight: 'bold' }}>Last Name</TableCell>
                                <TableCell sx={{ color: 'var(--text-color)', fontWeight: 'bold' }}>Email</TableCell>
                                <TableCell sx={{ color: 'var(--text-color)', fontWeight: 'bold' }}>Number of Coupons <br/> Purchased</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {customers.map((customer) => (
                                <TableRow
                                    key={customer.id}
                                    onClick={() => handleRowClick(customer.id)}
                                    sx={{ 
                                        '&:hover': { 
                                            backgroundColor: 'var(--primary-color)', 
                                            cursor: 'pointer' 
                                        },
                                        transition: 'background-color 0.3s'
                                    }}
                                >
                                    <TableCell sx={{ color: 'var(--text-color)' }}>{customer.id}</TableCell>
                                    <TableCell sx={{ color: 'var(--text-color)' }}>{customer.firstName}</TableCell>
                                    <TableCell sx={{ color: 'var(--text-color)' }}>{customer.lastName}</TableCell>
                                    <TableCell sx={{ color: 'var(--text-color)' }}>{customer.email}</TableCell>
                                    <TableCell sx={{ color: 'var(--text-color)' }}>{Array.from(customer.coupons).length}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </div>
    );
}

