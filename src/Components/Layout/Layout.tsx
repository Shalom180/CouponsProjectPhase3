import { BrowserRouter, Route } from "react-router-dom";
import "./Layout.css";
import { Routing } from "../Routing/Routing";
import Header from "../HeaderArea/Header/Header";
import Footer from "../FooterArea/Footer/Footer";

export function Layout(): JSX.Element {
    return (
        <div className="Layout">
			<BrowserRouter>
                <Header/>
                <Routing/>
                <Footer/>
            </BrowserRouter>
        </div>
    );
}
