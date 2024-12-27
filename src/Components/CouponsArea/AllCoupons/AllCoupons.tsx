import { useEffect, useState } from "react";
import "./AllCoupons.css";
import { Coupon } from "../../../models/Coupon";
import { CouponCard } from "../CouponCard/CouponCard";
import { Box, Grid2 } from "@mui/material";
import guestService from "../../../services/GuestService";
import { Banner } from "../../Banner/Banner";
import { CouponsCardsGrid } from "../CouponsCardsGrid/CouponsCardsGrid";
import { SideFilterMenu } from "../SideFilterMenu/SideFilterMenu";

export function AllCoupons(): JSX.Element {
    const [coupons, setCoupons] = useState<Coupon[]>([]);

    //todo
    useEffect(()=>{
        guestService.getCoupons()
        .then(coupons=>{setCoupons(coupons); console.log("coupons", coupons)})
        .catch(err => {
            // Check if the error has a response property before trying to access it
            if (err.response) {
              console.error('Error response:', err.response);
            } else {
              console.error('An unexpected error occurred:', err);
            }
          });
          
    }, [])

    return (
        <div className="AllCoupons">

            <Banner bannerImage="" bannerLogo="/pics/greenBGJC.jpg"></Banner>
            <Box display="flex" m={2} p={3} justifyContent="center" alignItems="center">
              <SideFilterMenu></SideFilterMenu>
              <Box>
                <h1>All Coupons</h1>
              <CouponsCardsGrid coupons={coupons}></CouponsCardsGrid>
              </Box>
            </Box>
        </div>
    );
}
