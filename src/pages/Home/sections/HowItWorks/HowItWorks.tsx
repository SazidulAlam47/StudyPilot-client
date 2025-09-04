import Step from './Step';
import howItWorksImage from '../../../../assets/how-it-works.png';
import Container from '../../../../components/Container';
import { stepsData } from '../../../../constants/homePage.constant';
import SectionHeading from '../../../../components/SectionHeading';

const HowItWorks = () => {
    return (
        <Container asChild>
            <div className="px-4 py-10">
                <SectionHeading
                    title="How It Works"
                    subTitle="Get started with StudyPilot in just three simple steps
                        and transform your academic journey today."
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-3 items-center mt-10">
                    <div className="order-2 md:order-1">
                        {stepsData.map((step, index) => (
                            <Step
                                key={index}
                                icon={step.icon}
                                title={step.title}
                                description={step.description}
                                hasLine={index !== stepsData.length - 1}
                            />
                        ))}
                    </div>
                    <div className="order-1 md:order-2">
                        <img
                            src={howItWorksImage}
                            alt="How StudyPilot Works"
                            className="w-xl mx-auto"
                        />
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default HowItWorks;
