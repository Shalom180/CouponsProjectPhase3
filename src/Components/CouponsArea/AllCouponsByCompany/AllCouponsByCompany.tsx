import { useEffect, useState } from "react";
import "./AllCouponsByCompany.css";
import { Coupon } from "../../../models/Coupon";
import { CouponCard } from "../CouponCard/CouponCard";
import { Box, Grid2, CircularProgress } from "@mui/material";
import guestService from "../../../services/GuestService";
import { Banner } from "../../Banner/Banner";
import { CouponsCardsGrid } from "../CouponsCardsGrid/CouponsCardsGrid";
import { SideFilterMenu } from "../SideFilterMenu/SideFilterMenu";
import { useParams } from "react-router-dom";
import { Category } from "../../../models/Category";

export function AllCouponsByCompany(): JSX.Element {
    const [coupons, setCoupons] = useState<Coupon[]>([]);
    const [loading, setLoading] = useState<boolean>(true); // Loading state
    const [error, setError] = useState<string | null>(null); // Error state
    const { id } = useParams();

    useEffect(() => {
        const companyId = Number(id);
        setLoading(true); // Set loading to true when the request is made

        guestService.getCouponsByCompanyId(companyId)
            .then(coupons => {
                setCoupons(coupons);
                setLoading(false); // Set loading to false when data is fetched
                console.log("coupons", coupons);
            })
            .catch(err => {
                setLoading(false); // Set loading to false on error
                // Check if the error has a response property before trying to access it
                if (err.response) {
                    console.error('Error response:', err.response);
                    setError("Failed to fetch coupons. Please try again later.");
                } else {
                    console.error('An unexpected error occurred:', err);
                    setError("An unexpected error occurred. Please try again later.");
                }
            });
    }, [id]);

    return (
        <div className="AllCoupons">
            <Banner bannerImage="" bannerLogo="/pics/greenBGJC.jpg" />

            <Box display="flex" m={2} p={3} justifyContent="left" alignItems="center">
                <SideFilterMenu />

                <Box>
                    {loading ? (
                        <CircularProgress /> // Show loading spinner while fetching data
                    ) : error ? (
                        <h1>{error}</h1> // Show error message if there's an error
                    ) : coupons.length > 0 ? (
                        <>
                            <h1>All {coupons[0].company.name}'s Coupons</h1>
                            <CouponsCardsGrid coupons={coupons} />
                        </>
                    ) : (
                        <h1>No Coupons Found</h1> // Show if no coupons are found
                    )}
                </Box>
            </Box>
        </div>
    );
}
