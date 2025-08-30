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
import { getUser, userLogout } from '../../utils/user';
import NormalText from '../NormalText';
import { toast } from 'sonner';
import { useState } from 'react';

const Header = () => {
    const [, forceUpdate] = useState({});
    const location = useLocation();
    const user = getUser();

    const handleLogout = async () => {
        const toastId = toast.loading('Logging out...');
        try {
            await userLogout();
            toast.success('Logout successful!', { id: toastId });
            forceUpdate({}); // Force re-render
        } catch (error: any) {
            toast.error(error.message || error.data || 'Something went wrong', {
                id: toastId,
            });
        }
    };

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
                        {user ? (
                            <>
                                <NormalText className="text-gray-600 mr-0.5">
                                    {user.name}
                                </NormalText>
                                <Button
                                    size="xs"
                                    color="red"
                                    onClick={handleLogout}
                                >
                                    Logout
                                </Button>
                            </>
                        ) : (
                            <Link to="/login">
                                <Button size="xs">Login</Button>
                            </Link>
                        )}

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
