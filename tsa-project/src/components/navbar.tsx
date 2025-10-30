import { BrowserRouter, Routes, Route, Link } from "react-router";
import Account from "../pages/account.tsx";

export default function Navbar() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="account" element={<Account />}/>
                    <Link to="/account"/>
                </Routes>
            </BrowserRouter>
        </>
    );
}