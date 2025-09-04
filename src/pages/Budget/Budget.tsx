import Container from '../../components/Container';
import SectionHeading from '../../components/SectionHeading';
import TransactionStats from './components/TransactionStats';

import TransactionHistory from './components/TransactionHistory';
import { useGetTransactionStatsQuery } from '../../redux/api/budgetApi';
import Loader from '../../components/Loader';
import TransactionChart from './components/TransactionChart';

const Budget = () => {
    const { data: stats, isLoading } = useGetTransactionStatsQuery(undefined);
    if (isLoading) {
        return <Loader />;
    }
    return (
        <Container className="min-h-[calc(100dvh-198px)] py-10">
            <title>StudyPilot - Budget Manager</title>
            <SectionHeading
                title="Budget Manager"
                subTitle="Stay on top of your finances by tracking income, expenses, and savings"
                className="mb-0 md:mb-8"
            />
            <div className="grid grid-cols-1 md:grid-cols-3">
                <TransactionHistory />
                <div>
                    <TransactionStats stats={stats} />
                    <TransactionChart stats={stats} />
                </div>
            </div>
        </Container>
    );
};

export default Budget;
