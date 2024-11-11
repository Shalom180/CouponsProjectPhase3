import { Grid2 } from "@mui/material";
import "./CouponsCardsGrid.css";
import { Coupon } from "../../../models/Coupon";
import { CouponCard } from "../CouponCard/CouponCard";

interface CouponsCardsGridProps {
    coupons:Coupon[];
}

export function CouponsCardsGrid(props:CouponsCardsGridProps): JSX.Element {
    return (
        <div className="CouponsCardsGrid">
			<Grid2 container>
                {props.coupons.length===0? <p>Loading...</p>:props.coupons.map(c=><CouponCard coupon={c} key={c.id}></CouponCard>)}
            </Grid2>
        </div>
    );
}
