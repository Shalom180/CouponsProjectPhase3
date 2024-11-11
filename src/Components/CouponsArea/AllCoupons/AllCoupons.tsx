import { useEffect, useState } from "react";
import "./AllCoupons.css";
import { Coupon } from "../../../models/Coupon";
import { CouponCard } from "../CouponCard/CouponCard";
import { Grid2 } from "@mui/material";
import guestService from "../../../services/GuestService";
import { Banner } from "../../Banner/Banner";
import { CouponsCardsGrid } from "../CouponsCardsGrid/CouponsCardsGrid";
import { SideFilterMenu } from "../SideFilterMenu/SideFilterMenu";

export function AllCoupons(): JSX.Element {
    const [coupons, setCoupons] = useState<Coupon[]>([]);

    //todo
    useEffect(()=>{
        guestService.getCoupons()
        .then(coupons=>setCoupons(coupons))
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
			<h2>Coupons</h2>
            <SideFilterMenu></SideFilterMenu>
            <CouponsCardsGrid coupons={coupons}></CouponsCardsGrid>
        </div>
    );
}
