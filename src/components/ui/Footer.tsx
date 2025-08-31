import {
    Footer as FlowbiteFooter,
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
                    <div className="w-full py-4 flex flex-col items-center gap-3 md:flex-row md:justify-between">
                        <Link to="/">
                            <img
                                src={logo}
                                alt="StudyPilot Logo"
                                className="w-20  md:w-12"
                            />
                        </Link>
                        <FooterLinkGroup className="">
                            <FooterLink
                                href="#"
                                className="text-gray-700 hover:text-gray-900 transition-colors"
                            >
                                About
                            </FooterLink>
                            <FooterLink
                                href="http://github.com/sazidulAlam47/StudyPilot-client"
                                target="_blank"
                                className="text-gray-700 hover:text-gray-900 transition-colors"
                            >
                                Frontend Code
                            </FooterLink>
                            <FooterLink
                                href="http://github.com/sazidulAlam47/StudyPilot-server"
                                target="_blank"
                                className="text-gray-700 hover:text-gray-900 transition-colors"
                            >
                                Backend Code
                            </FooterLink>
                        </FooterLinkGroup>
                    </div>
                </Container>
                <hr className="text-gray-300" />
                <FooterCopyright
                    by="StudyPilot. All rights reserved."
                    year={new Date().getFullYear()}
                    className="text-gray-600 py-2 md:py-3"
                />
            </div>
        </FlowbiteFooter>
    );
};

export default Footer;
