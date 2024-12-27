import { useEffect, useState } from "react";
import "./AllCategories.css";
import { Category } from "../../../models/Category";
import { Box, Grid, Grid2 } from "@mui/material";
import guestService from "../../../services/GuestService";
import { CategoryCard } from "../CategoryCard/CategoryCard";
import { Banner } from "../../Banner/Banner";
import { SideFilterMenu } from "../../CouponsArea/SideFilterMenu/SideFilterMenu";

export function AllCategories(): JSX.Element {
    const [categories, setCategories] = useState<Category[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        guestService
            .getCategories()
            .then((fetchedCategories) => {
                setCategories(fetchedCategories);
                console.log("Categories:", fetchedCategories);
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
        <div className="AllCategories">

            <Banner bannerImage="" bannerLogo="/pics/greenBGJC.jpg"></Banner>
            <Box
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                minHeight="100vh"
            >
                <Box sx={{ width: "80%", textAlign: "left", paddingLeft: "100px" }}>
                    <h1>All Categories</h1>
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
                    ) : categories.length === 0 ? (
                        <p>No categories available.</p>
                    ) : (
                        categories.map((category) => <CategoryCard category={category} key={category.id} />)
                    )}
                </Grid2>
            </Box>




        </div>
    );
}
