import Container from '../../../../components/Container';
import SectionHeading from '../../../../components/SectionHeading';
import { statsData } from '../../../../constants/homePage.constant';
import StatCard from './StatCard';

const StatsSection = () => {
    return (
        <Container asChild>
            <section className="px-4 py-12">
                <SectionHeading
                    title="Our Growing Impact"
                    subTitle="Join thousands of students who have transformed their
                        academic experience with StudyPilot's comprehensive
                        toolkit for success."
                />
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
