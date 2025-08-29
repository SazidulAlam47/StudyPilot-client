import {
    Navbar,
    NavbarBrand,
    NavbarCollapse,
    NavbarLink,
    NavbarToggle,
} from 'flowbite-react';
import Container from '../Container';
import logo from '../../assets/logo.png';
import { Link, useLocation } from 'react-router';
import SButton from '../SButton';

const Header = () => {
    const location = useLocation();
    return (
        <>
            <Container asChild>
                <Navbar className="border0 py-4 ">
                    <Link to="/">
                        <NavbarBrand>
                            <img
                                src={logo}
                                className="mr-3 h-10"
                                alt="Flowbite React Logo"
                            />
                        </NavbarBrand>
                    </Link>
                    <div className="flex md:order-2 gap-2 items-center">
                        <Link to="/login">
                            <SButton size="small">Login</SButton>
                        </Link>
                        <Link to="/register">
                            <SButton size="small" variant="secondary">
                                Register
                            </SButton>
                        </Link>
                        <NavbarToggle />
                    </div>
                    <NavbarCollapse>
                        <Link to="/">
                            <NavbarLink active={location.pathname === '/'}>
                                Home
                            </NavbarLink>
                        </Link>
                        <Link to="/dashboard/schedule">
                            <NavbarLink>My Schedule</NavbarLink>
                        </Link>
                        <Link to="/dashboard/budget">
                            <NavbarLink>Budget Manager</NavbarLink>
                        </Link>
                        <Link to="/dashboard/exam">
                            <NavbarLink>Exam Generator</NavbarLink>
                        </Link>
                        <Link to="/dashboard/study">
                            <NavbarLink>Study Planner</NavbarLink>
                        </Link>
                    </NavbarCollapse>
                </Navbar>
            </Container>
            <hr className="text-gray-200" />
        </>
    );
};

export default Header;
