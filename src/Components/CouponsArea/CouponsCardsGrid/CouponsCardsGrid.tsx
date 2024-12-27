import { Grid2 } from "@mui/material";
import "./CouponsCardsGrid.css";
import { Coupon } from "../../../models/Coupon";
import { CouponCard } from "../CouponCard/CouponCard";

interface CouponsCardsGridProps {
    coupons: Coupon[];
}

export function CouponsCardsGrid(props: CouponsCardsGridProps): JSX.Element {
    console.log("Coupons received:", props.coupons);

    // Defensive check for invalid props
    if (!Array.isArray(props.coupons)) {
        console.error("Invalid coupons data:", props.coupons);
        return <div>Error: Invalid data received</div>;
    }

    return (
        <div className="CouponsCardsGrid">


            
            <Grid2 container spacing={2} direction="row" wrap="wrap" width="80%">
                {props.coupons.length === 0 ? (
                    <p>Loading...</p>
                ) : (
                    props.coupons.map(c => <CouponCard coupon={c} key={c.id} />)
                )}
            </Grid2>
        </div>
    );
}
