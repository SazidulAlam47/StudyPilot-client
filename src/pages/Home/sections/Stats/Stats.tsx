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
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
                    {statsData.map((stat, index) => (
                        <StatCard
                            key={index}
                            title={stat.title}
                            value={stat.value}
                            fullWidth={
                                statsData.length % 2 === 1 &&
                                statsData.length === index + 1
                            }
                        />
                    ))}
                </div>
            </section>
        </Container>
    );
};

export default StatsSection;
