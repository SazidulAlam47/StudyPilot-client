/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    Avatar,
    Button,
    Dropdown,
    DropdownDivider,
    DropdownHeader,
    DropdownItem,
    Navbar,
    NavbarCollapse,
    NavbarToggle,
} from 'flowbite-react';
import Container from '../Container';
import logo from '../../assets/logo.png';
import { Link, useLocation, useNavigate } from 'react-router';
import { headerLinks } from '../../constants/header.constant';
import { getUser, userLogout } from '../../utils/user';
import { toast } from 'sonner';
import { useState } from 'react';
import { cn } from '../../utils/cn';
import { useGetMeQuery } from '../../redux/api/user.api';
import { useAppDispatch } from '../../redux/hooks';
import { baseApi } from '../../redux/api/baseApi';

const Header = () => {
    const { data: user } = useGetMeQuery(undefined);
    const dispatch = useAppDispatch();
    const decodedUser = getUser();

    const [, forceUpdate] = useState({});
    const location = useLocation();
    const navigate = useNavigate();

    const handleLogout = async () => {
        const toastId = toast.loading('Logging out...');
        try {
            await userLogout();
            toast.success('Logout successful!', { id: toastId });
            forceUpdate({}); // Force re-render
            dispatch(baseApi.util.invalidateTags(['me']));
            navigate('/');
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
                        <img
                            src={logo}
                            className="mr-3 h-10"
                            alt="Flowbite React Logo"
                        />
                    </Link>
                    <div className="flex md:order-2 gap-2 items-center">
                        {user && decodedUser ? (
                            <Dropdown
                                arrowIcon={false}
                                inline
                                label={
                                    <Avatar
                                        alt="User settings"
                                        img={user.profilePhoto || undefined}
                                        rounded
                                    />
                                }
                                className="cursor-pointer"
                            >
                                <DropdownHeader>
                                    <span className="block text-sm">
                                        {user.name}
                                    </span>
                                    <span className="block truncate text-sm font-medium">
                                        {user.email}
                                    </span>
                                </DropdownHeader>
                                {user.hasPassword ? (
                                    <Link to="/change-password">
                                        <DropdownItem>
                                            Change Password
                                        </DropdownItem>
                                    </Link>
                                ) : (
                                    <Link to="/set-password">
                                        <DropdownItem>
                                            Set Password
                                        </DropdownItem>
                                    </Link>
                                )}
                                <DropdownDivider />
                                <DropdownItem onClick={handleLogout}>
                                    Sign out
                                </DropdownItem>
                            </Dropdown>
                        ) : (
                            <Link to="/login">
                                <Button size="xs">Login</Button>
                            </Link>
                        )}

                        <NavbarToggle />
                    </div>
                    <NavbarCollapse>
                        {headerLinks.map((headerLink, index) => (
                            <Link
                                key={index}
                                to={headerLink.path}
                                className={cn(
                                    'block py-2 pl-3 pr-4 md:p-0 hover:text-primary-700 transition-all',
                                    {
                                        'text-primary-700':
                                            location.pathname ===
                                            headerLink.path,
                                    }
                                )}
                            >
                                {headerLink.title}
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
