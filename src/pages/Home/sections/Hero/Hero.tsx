import Container from '../../../../components/Container';
import heroImage from '../../../../assets/hero.png';
import { Link } from 'react-router';
import SectionTitle from '../../../../components/SectionTitle';
import NormalText from '../../../../components/NormalText';
import { Button } from 'flowbite-react';

const Hero = () => {
    return (
        <Container asChild>
            <div className="flex flex-col gap-6 px-4 py-10 sm:gap-8 lg:flex-row">
                <div className="min-w-fit">
                    <img src={heroImage} alt="students" />
                </div>
                <div className="flex flex-col gap-6 sm:min-w-[400px] sm:gap-8 lg:justify-center">
                    <div className="flex flex-col gap-2 text-left">
                        <SectionTitle className="text-left text-4xl sm:text-5xl">
                            Your All-in-One Toolkit for Academic Success
                        </SectionTitle>
                        <NormalText>
                            Empowering students with the tools they need to
                            excel in their studies and beyond. From organization
                            to collaboration, we've got you covered.
                        </NormalText>
                    </div>
                    <div className="flex-wrap gap-3 flex">
                        <Link to="/quiz">
                            <Button size="sm">Start AI Quiz Test</Button>
                        </Link>
                        <Link to="/study">
                            <Button size="sm" color="secondary">
                                Create Study Plan
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default Hero;
