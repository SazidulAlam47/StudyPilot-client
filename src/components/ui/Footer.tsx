import {
    Footer as FlowbiteFooter,
    FooterBrand,
    FooterCopyright,
    FooterLink,
    FooterLinkGroup,
} from 'flowbite-react';
import Container from '../Container';
import logo from '../../assets/logo.png';
import { Link } from 'react-router';

const Footer = () => {
    return (
        <FlowbiteFooter>
            <div className="w-full text-center bg-gray-100">
                <Container asChild>
                    <div className="w-full my-3 justify-between sm:flex sm:items-center sm:justify-between">
                        <Link to="/">
                            <FooterBrand
                                src={logo}
                                alt="StudyPilot Logo"
                                className="size-10"
                            />
                        </Link>
                        <FooterLinkGroup>
                            <FooterLink
                                href="#"
                                className="text-gray-700 hover:text-gray-900 transition-colors"
                            >
                                About
                            </FooterLink>
                            <FooterLink
                                href="#"
                                className="text-gray-700 hover:text-gray-900 transition-colors"
                            >
                                Frontend Code
                            </FooterLink>
                            <FooterLink
                                href="#"
                                className="text-gray-700 hover:text-gray-900 transition-colors"
                            >
                                Backend Code
                            </FooterLink>
                        </FooterLinkGroup>
                    </div>
                </Container>
                <hr className="text-gray-300" />
                <FooterCopyright
                    by="StudyPilot"
                    year={new Date().getFullYear()}
                    className="text-gray-600 my-2"
                />
            </div>
        </FlowbiteFooter>
    );
};

export default Footer;
