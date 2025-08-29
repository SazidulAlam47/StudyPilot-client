import Features from './sections/Features/Features';
import Hero from './sections/Hero/Hero';
import HowItWorks from './sections/HowItWorks/HowItWorks';
import StatsSection from './sections/Stats/Stats';

const Home = () => {
    return (
        <>
            <Hero />
            <Features />
            <HowItWorks />
            <StatsSection />
        </>
    );
};

export default Home;
