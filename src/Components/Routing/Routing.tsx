import { Route, Routes, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Fab } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import "./Routing.css";

import { AllCoupons } from "../CouponsArea/AllCoupons/AllCoupons";
import { AllCategories } from "../CategoriesArea/AllCategories/AllCategories";
import { AllCompanies } from "../CompaniesArea/AllCompanies/AllCompanies";
import LoginPage from "../AuthArea/Login/LoginPage";
import { PageNotFound } from "../PageNotFound/PageNotFound";
import { SignUp } from "../AuthArea/SignUp/SignUp";
import { OneCouponPage } from "../CouponsArea/OneCouponPage/OneCouponPage";
import { AddCouponPage } from "../CouponsArea/AddCouponPage/AddCouponPage";
import { EditCouponPage } from "../CouponsArea/EditCouponPage/EditCouponPage";
import { EditCompanyPage } from "../CompaniesArea/EditCompanyPage/EditCompanyPage";
import { EditCustomerPage } from "../CustomersArea/EditCustomerPage/EditCustomerPage";
import { AllCustomersPage } from "../CustomersArea/AllCustomersPage/AllCustomersPage";
import { About } from "../About/About";
import { Terms } from "../Terms/Terms";
import { AllCouponsByCompany } from "../CouponsArea/AllCouponsByCompany/AllCouponsByCompany";
import { AllCouponsByCategory } from "../CouponsArea/AllCouponsByCategory/AllCouponsByCategory";
import { AddCompanyPage } from "../CompaniesArea/AddCompanyPage/AddCompanyPage";
import { OneCompanyPage } from "../CompaniesArea/OneCompanyPage/OneCompanyPage";

export function Routing(): JSX.Element {
    // Access clientType from Redux store
    const clientType = useSelector((state: any) => state.auth.clientType);
    const navigate = useNavigate();

    // Function to handle FAB click event
    const handleFabClick = () => {
        navigate('/company/addcoupon');
    };

    return (
        <>
            <Routes>
                <Route path="/" element={<AllCoupons />} />
                <Route path="/coupons/company/:id" element={<AllCouponsByCompany />} />
                <Route path="/coupons/category/:id" element={<AllCouponsByCategory />} />
                <Route path="/coupon/:id" element={<OneCouponPage />} />
                <Route path="/company/addcoupon" element={<AddCouponPage />} />
                <Route path="/company/editcoupon/:id" element={<EditCouponPage />} />
                <Route path="/allcategories" element={<AllCategories />} />
                <Route path="/allcompanies" element={<AllCompanies />} />
                <Route path="/company/:id" element={<OneCompanyPage />} />
                <Route path="/admin/addcompany" element={<AddCompanyPage />} />
                <Route path="/admin/editcompany/:id" element={<EditCompanyPage />} />
                <Route path="/allcustomers" element={<AllCustomersPage />} />
                <Route path="/guest/login" element={<LoginPage />} />
                <Route path="/guest/signup" element={<SignUp />} />
                <Route path="/editcustomer/:id" element={<EditCustomerPage />} />
                <Route path="/about" element={<About />} />
                <Route path="/terms" element={<Terms />} />

                <Route path="/*" element={<PageNotFound />} />
            </Routes>

            {/* Conditional rendering of the FAB */}
            {clientType === 'COMPANY' && (
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
        </>
    );
}

export default Routing;
