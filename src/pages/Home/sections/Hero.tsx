import Container from '../../../components/Container';
import heroImage from '../../../assets/hero.png';
import SButton from '../../../components/SButton';

const Hero = () => {
    return (
        <Container asChild>
            <div className="flex flex-col gap-6 px-4 py-10 sm:gap-8 lg:flex-row">
                <div className="min-w-fit">
                    <img src={heroImage} alt="students" />
                </div>
                <div className="flex flex-col gap-6 sm:min-w-[400px] sm:gap-8 lg:justify-center">
                    <div className="flex flex-col gap-2 text-left">
                        <h1 className="text-[#111418] text-4xl font-black leading-tight tracking-[-0.033em] sm:text-5xl sm:font-black sm:leading-tight sm:tracking-[-0.033em]">
                            Your All-in-One Toolkit for Academic Success
                        </h1>
                        <h2 className="text-[#111418] text-sm font-normal leading-normal sm:text-base sm:font-normal sm:leading-normal">
                            Empowering students with the tools they need to
                            excel in their studies and beyond. From organization
                            to collaboration, we've got you covered.
                        </h2>
                    </div>
                    <div className="flex-wrap gap-3 flex">
                        <SButton>Generate Practice Exam</SButton>
                        <SButton variant="secondary">Create Study Plan</SButton>
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default Hero;
