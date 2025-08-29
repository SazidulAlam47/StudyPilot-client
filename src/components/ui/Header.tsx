import {
    Button,
    Navbar,
    NavbarBrand,
    NavbarCollapse,
    NavbarLink,
    NavbarToggle,
} from 'flowbite-react';
import Container from '../Container';
import logo from '../../assets/logo.png';
import { Link, useLocation } from 'react-router';
import { headerLinks } from '../../constants/header.constant';

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
                            <Button size="xs">Login</Button>
                        </Link>
                        <NavbarToggle />
                    </div>
                    <NavbarCollapse>
                        {headerLinks.map((headerLink, index) => (
                            <Link key={index} to={headerLink.path}>
                                <NavbarLink
                                    active={
                                        location.pathname === headerLink.path
                                    }
                                >
                                    {headerLink.title}
                                </NavbarLink>
                            </Link>
                        ))}
                    </NavbarCollapse>
                </Navbar>
            </Container>
            <hr className="text-gray-200" />
        </>
    );
};

export default Header;
