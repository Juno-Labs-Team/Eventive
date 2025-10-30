import { Link } from "react-router";
import '../styles/navbar.css';

export default function Navbar() {
    return (
        <nav>
            <Link to="/account">Account</Link>
        </nav>
    );
}