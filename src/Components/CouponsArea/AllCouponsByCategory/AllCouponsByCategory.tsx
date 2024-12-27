import { useEffect, useState } from "react";
import "./AllCouponsByCategory.css";
import { Coupon } from "../../../models/Coupon";
import { CouponCard } from "../CouponCard/CouponCard";
import { Box, Grid2 } from "@mui/material";
import guestService from "../../../services/GuestService";
import { Banner } from "../../Banner/Banner";
import { CouponsCardsGrid } from "../CouponsCardsGrid/CouponsCardsGrid";
import { SideFilterMenu } from "../SideFilterMenu/SideFilterMenu";
import { useParams } from "react-router-dom";
import { Category } from "../../../models/Category";

export function AllCouponsByCategory(): JSX.Element {
    const [coupons, setCoupons] = useState<Coupon[]>([]);
    const [category, setCategory] = useState<Category>();
    const { id } = useParams();

    useEffect(()=>{
        const categoryId = Number(id);
        guestService.getCouponsByCategoryId(categoryId)
        .then(coupons=>{setCoupons(coupons); console.log("coupons", coupons)})
        .catch(err => {
            // Check if the error has a response property before trying to access it
            if (err.response) {
              console.error('Error response:', err.response);
            } else {
              console.error('An unexpected error occurred:', err);
            }
          });
          
    }, [id])
    
    useEffect(() => {
        const categoryId = Number(id);
    
        if (!isNaN(categoryId)) {
            guestService
                .getCategories() // Assuming this returns a promise that resolves to an array
                .then(categories => {
                    const category = categories.find(c => c.id === categoryId);
                    if (category) {
                        setCategory(category); // Update state with the found category
                        console.log("Category:", category);
                    } else {
                        console.warn("No category found with the given ID.");
                    }
                })
                .catch(err => {
                    if (err.response) {
                        console.error("Error response:", err.response);
                    } else if (err instanceof Error) {
                        console.error("An unexpected error occurred:", err.message);
                    } else {
                        console.error("An unknown error occurred.");
                    }
                });
        } else {
            console.error("Invalid category ID:", id);
        }
    }, [id]);
    

    return (
        <div className="AllCoupons">

            <Banner bannerImage="" bannerLogo="/pics/greenBGJC.jpg"></Banner>
            <Box display="flex" m={2} p={3} justifyContent="center" alignItems="center">
              <SideFilterMenu></SideFilterMenu>
              <Box>
                <h1>All {category?.name} Coupons</h1>
              <CouponsCardsGrid coupons={coupons}></CouponsCardsGrid>
              </Box>
              </Box>
        </div>
    );
}
