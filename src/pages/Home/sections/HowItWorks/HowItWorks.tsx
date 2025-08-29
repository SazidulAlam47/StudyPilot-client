import Step from './Step';
import howItWorksImage from '../../../../assets/how-it-works.png';
import Container from '../../../../components/Container';
import { stepsData } from '../../../../constants/homePage.constant';
import SectionTitle from '../../../../components/SectionTitle';
import NormalText from '../../../../components/NormalText';

const HowItWorks = () => {
    return (
        <Container asChild>
            <div className="px-4 py-10">
                <div className="flex flex-col gap-2">
                    <SectionTitle>How It Works</SectionTitle>
                    <NormalText className="max-w-[720px] mx-auto text-center">
                        Get started with StudyPilot in just three simple steps
                        and transform your academic journey today.
                    </NormalText>
                </div>
                <div className="flex flex-col lg:flex-row gap-12 items-center mt-10">
                    <div className="flex-1 max-w-xl">
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
                    <div className="flex-1 max-w-lg">
                        <img
                            src={howItWorksImage}
                            alt="How StudyPilot Works"
                            className="w-full h-auto"
                        />
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default HowItWorks;
