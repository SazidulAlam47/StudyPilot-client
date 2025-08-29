import Container from '../../../../components/Container';
import NormalText from '../../../../components/NormalText';
import SectionTitle from '../../../../components/SectionTitle';
import { statsData } from '../../../../constants/homePage.constant';
import StatCard from './StatCard';

const StatsSection = () => {
    return (
        <Container asChild>
            <section className="px-4 py-12">
                <div className="flex flex-col gap-2 mb-8">
                    <SectionTitle>Our Growing Impact</SectionTitle>
                    <NormalText className="max-w-[720px] mx-auto text-center">
                        Join thousands of students who have transformed their
                        academic experience with StudyPilot's comprehensive
                        toolkit for success.
                    </NormalText>
                </div>
                <div className="flex flex-wrap gap-4 p-4">
                    {statsData.map((stat, index) => (
                        <StatCard
                            key={index}
                            title={stat.title}
                            value={stat.value}
                        />
                    ))}
                </div>
            </section>
        </Container>
    );
};

export default StatsSection;
