import Container from '../../../../components/Container';
import SectionHeading from '../../../../components/SectionHeading';
import { featuresInfo } from '../../../../constants/homePage.constant';
import FeatureCard from './FeatureCard';

const Features = () => {
    return (
        <Container asChild>
            <div className="flex flex-col gap-6 px-4 pb-10">
                <SectionHeading
                    title="Key Features"
                    subTitle="Discover how StudyPilot can transform your academic
                        journey."
                    position="left"
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    {featuresInfo.map((feature, index) => (
                        <FeatureCard
                            key={index}
                            icon={feature.icon}
                            title={feature.title}
                            description={feature.description}
                        />
                    ))}
                </div>
            </div>
        </Container>
    );
};

export default Features;
