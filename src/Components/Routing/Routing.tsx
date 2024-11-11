import { Route, Routes } from "react-router-dom";
import "./Routing.css";
import { AllCoupons } from "../CouponsArea/AllCoupons/AllCoupons";
import { AllCategories } from "../CategoriesArea/AllCategories/AllCategories";
import { AllCompanies } from "../CompaniesArea/AllCompanies/AllCompanies";
import LoginPage from "../AuthArea/Login/LoginPage";

export function Routing(): JSX.Element {
    return (
        <Routes>
            <Route path="/" Component={AllCoupons} />
            <Route path="/allcategories" Component={AllCategories}/>
            <Route path="/allcompanies" Component={AllCompanies}/>
            <Route path="/guest/login" Component={LoginPage}/>
        </Routes>
    );
}

export default Routing;
