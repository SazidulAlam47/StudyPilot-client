import Container from '../../../components/Container';
import featuresInfo from '../../../constants/features.constant';
import FeatureCard from './FeatureCard';

const Features = () => {
    return (
        <Container asChild>
            <div className="flex flex-col gap-6 px-4 pb-10">
                <div className="flex flex-col gap-4">
                    <h1 className="text-[#111418] text-3xl font-bold leading-tight sm:text-4xl sm:font-black sm:leading-tight sm:tracking-[-0.033em] max-w-[720px]">
                        Key Features
                    </h1>
                    <p className="text-[#111418] text-base font-normal leading-normal max-w-[720px]">
                        Discover how StudyPilot can transform your academic
                        journey.
                    </p>
                </div>
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
