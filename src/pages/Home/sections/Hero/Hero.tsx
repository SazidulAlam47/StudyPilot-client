import Container from '../../../../components/Container';
import heroImage from '../../../../assets/hero.png';
import { Link } from 'react-router';
import TitleText from '../../../../components/TitleText';
import NormalText from '../../../../components/NormalText';
import { Button } from 'flowbite-react';

const Hero = () => {
    return (
        <Container asChild>
            <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-3 pb-10 md:py-10 ">
                <div className="min-w-fit">
                    <img src={heroImage} alt="students" className="mx-auto" />
                </div>
                <div className="flex flex-col gap-6 sm:min-w-[400px] sm:gap-8 lg:justify-center">
                    <div className="flex flex-col gap-2 text-left">
                        <TitleText className="text-left text-4xl sm:text-5xl">
                            Your All-in-One Toolkit for Academic Success
                        </TitleText>
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
