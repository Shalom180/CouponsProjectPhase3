import { BrowserRouter, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Fab } from "@mui/material";
import AddIcon from '@mui/icons-material/Add'; // Import the plus icon
import "./Layout.css";
import { Routing } from "../Routing/Routing";
import Header from "../HeaderArea/Header/Header";
import Footer from "../FooterArea/Footer/Footer";

export function Layout(): JSX.Element {

    return (
        <div className="Layout">
            <BrowserRouter>
                <Header />
                <Routing />
                <Footer />
            </BrowserRouter>
        </div>
    );
}
