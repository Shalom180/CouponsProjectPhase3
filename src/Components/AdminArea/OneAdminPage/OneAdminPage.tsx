import React, { useEffect, useState } from 'react';
import adminService from '../../../services/AdminService';
import {
  Card,
  CardContent,
  CardHeader,
  Avatar,
  Button,
  CircularProgress,
  Typography,
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import { Admin } from '../../../models/Admin';
import { Banner } from '../../Banner/Banner';
import { store } from '../../../store';
import { Box } from '@mui/system';

const OneAdminPage = () => {
  const [admin, setAdmin] = useState<Admin | undefined>(); // Allow undefined for initial state
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const clientType = store.getState().auth.clientType;

  useEffect(() => {
    const loadAdmin = async () => {
      try {
        const response = await adminService.getAdminDetails();
        setAdmin(response);
      } catch (error) {
        console.error('Failed to load admin details:', error);
        setError('Failed to load admin details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    loadAdmin();
  }, []);
  
  if (clientType !== 'ADMINISTRATOR') {
    return (
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", backgroundColor: "grey.800" }}>
            <Typography variant="h4" color="error">
                This page is not accessible for this user.
            </Typography>
        </Box>
    );
}
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#121212]">
        <CircularProgress style={{ color: '#bb86fc' }} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#121212]">
        <Typography color="error">{error}</Typography>
      </div>
    );
  }

  if (!admin) {
    return null; // Return null if no admin data is available
  }

  


  return (
    <div className="min-h-screen bg-[#121212] p-8">
                    <Banner bannerImage="" bannerLogo="/pics/greenBGJC.jpg"></Banner>
        
      <Card
        style={{
          maxWidth: '600px',
          margin: 'auto',
          marginTop: 50,
          marginBottom: 50,
          backgroundColor: '#1e1e1e',
          border: '2px solid #bb86fc',
        }}
      >
        <CardHeader
          avatar={
            <Avatar style={{ backgroundColor: '#bb86fc', width: 80, height: 80 }}>
              <PersonIcon style={{ fontSize: 40, color: '#121212' }} />
            </Avatar>
          }
          title={
            <Typography variant="h5" style={{ color: '#e0e0e0' }}>
              {admin.name}
            </Typography>
          }
          subheader={
            <Typography style={{ color: '#b0b0b0' }}>Administrator</Typography>
          }
          style={{ borderBottom: '1px solid rgba(187, 134, 252, 0.2)', paddingBottom: 16 }}
        />
        <CardContent style={{ marginTop: 16 }}>
          <div style={{ marginBottom: 16 }}>
            <Typography style={{ color: '#b0b0b0' }}>ID</Typography>
            <Typography style={{ color: '#e0e0e0', fontSize: 18 }}>{admin.id}</Typography>
          </div>

          <div style={{ marginBottom: 16 }}>
            <Typography style={{ color: '#b0b0b0' }}>Email</Typography>
            <Typography style={{ color: '#e0e0e0', fontSize: 18 }}>{admin.email}</Typography>
          </div>

          <div style={{ marginTop: 32, paddingTop: 16, borderTop: '1px solid rgba(187, 134, 252, 0.2)' }}>
            
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OneAdminPage;
