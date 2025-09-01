import Container from '../../components/Container';
import SectionHeading from '../../components/SectionHeading';

import TransactionTable from './TransactionTable';

const Budget = () => {
    return (
        <Container className="min-h-[calc(100dvh-198px)] py-10">
            <SectionHeading
                title="Budget Manager"
                subTitle="Stay on top of your finances by tracking income, expenses, and savings"
                className="mb-8"
            />
            <div className="grid grid-cols-1 md:grid-cols-3">
                <TransactionTable />

                <div></div>
            </div>
        </Container>
    );
};

export default Budget;
