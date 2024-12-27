import { useEffect, useState } from "react";
import "./AllCompanies.css";
import { Box, Fab, Grid, Grid2 } from "@mui/material";
import guestService from "../../../services/GuestService";
import { Banner } from "../../Banner/Banner";
import { Company } from "../../../models/Company";
import { CompanyCard } from "../CompanyCard/CompanyCard";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import AddIcon from '@mui/icons-material/Add'; 

export function AllCompanies(): JSX.Element {
    const [companies, setCompanies] = useState<Company[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    // Access clientType from Redux store
    const clientType = useSelector((state: any) => state.auth.clientType);
 const navigate = useNavigate();
 

    // Function to handle FAB click event
    const handleFabClick = () => {
        navigate('/admin/addcompany');
    };

    useEffect(() => {
        guestService
            .getAllCompanies()
            .then((result) => {
               
                setCompanies(result);
                console.log("Companies:", companies);
            })
            .catch((err) => {
                if (err.response) {
                    console.error("Error response:", err.response);
                } else if (err instanceof Error) {
                    console.error("An unexpected error occurred:", err.message);
                } else {
                    console.error("An unknown error occurred.");
                }
            })
            .finally(() => {
                setIsLoading(false); // Mark loading as complete
            });
    
        // Cleanup function (not necessary here, but for completeness)
        return () => {
            // Optional cleanup logic if needed
        };
    }, []);
    

    return (
        <div className="AllCompanies">
            // Add banner with box
            
            <Banner bannerImage="" bannerLogo="/pics/greenBGJC.jpg" />
            <Box
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                minHeight="100vh"
            >
                <Box sx={{ width: "80%", textAlign: "left", paddingLeft: "100px" }}>
                    <h1>All Companies</h1>
                </Box>
                <Grid2
                    container
                    spacing={2}
                    direction="row"
                    wrap="wrap"
                    sx={{ width: "80%", justifyContent: "center" }}
                >
                    {isLoading ? (
                        <p>Loading...</p>
                    ) : companies.length === 0 ? (
                        <p>No categories available.</p>
                    ) : (
                        companies.map((company) => <CompanyCard company={company} key={company.id} />)
                    )}
                </Grid2>
            </Box>
            {/* Conditional rendering of the FAB */}
         {clientType === 'ADMINISTRATOR' && (
            <Fab
                color="primary"
                aria-label="add"
                onClick={handleFabClick}
                sx={{
                    position: "fixed",
                    bottom: 80, // Adjust as needed
                    right: 50, // Adjust as needed
                    zIndex: 1000, // Ensure the FAB is above other elements
                }}
            >
                <AddIcon />
            </Fab>
        )}
        </div>
        
    );
}
