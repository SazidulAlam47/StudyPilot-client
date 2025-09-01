import Container from '../../components/Container';
import Loader from '../../components/Loader';
import TitleText from '../../components/TitleText';
import { useGetTransactionStatsQuery } from '../../redux/api/budgetApi';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeadCell,
    TableRow,
} from 'flowbite-react';

const TransactionStats = () => {
    const { data: stats, isLoading } = useGetTransactionStatsQuery(undefined);

    if (isLoading)
        return (
            <div className="my-10 space-y-3">
                <TitleText className="font-bold text-2xl sm:font-bold sm:text-3xl">
                    Financial Overview
                </TitleText>
                <Loader className="min-h-[40dvh]" />
            </div>
        );

    const statsData = [
        {
            label: `${stats?.currentMonth} Inflow`,
            value: stats?.currentMonthInflow || 0,
            type: 'inflow',
            description: 'Money earned this month',
        },
        {
            label: `${stats?.currentMonth} Outflow`,
            value: stats?.currentMonthOutflow || 0,
            type: 'outflow',
            description: 'Money spent this month',
        },
        {
            label: 'Lifetime Inflow',
            value: stats?.totalInflow || 0,
            type: 'inflow',
            description: 'Total money earned',
        },
        {
            label: 'Lifetime Outflow',
            value: stats?.totalOutflow || 0,
            type: 'outflow',
            description: 'Total money spent',
        },
        {
            label: 'Current Balance',
            value: stats?.currentBalance || 0,
            type: 'balance',
            description: 'Available balance',
        },
    ];

    return (
        <Container className="my-10 space-y-7">
            <TitleText className="font-bold text-2xl sm:font-bold sm:text-3xl">
                Financial Overview
            </TitleText>
            <div className="overflow-x-auto rounded-md ">
                <Table className="text-xs sm:text-base" hoverable>
                    <TableHead>
                        <TableRow>
                            <TableHeadCell className="px-2 py-2 sm:px-4 sm:py-3">
                                Category
                            </TableHeadCell>
                            <TableHeadCell className="px-2 py-2 sm:px-4 sm:py-3">
                                Amount
                            </TableHeadCell>
                        </TableRow>
                    </TableHead>
                    <TableBody className="divide-y divide-gray-200">
                        {statsData.map((stat, index) => (
                            <TableRow
                                key={index}
                                className="bg-white dark:border-gray-700 dark:bg-gray-800"
                            >
                                <TableCell className="px-2 py-2 sm:px-4 sm:py-3 whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                    {stat.label}
                                </TableCell>
                                <TableCell className="px-2 py-2 sm:px-4 sm:py-3">
                                    <span
                                        className={`font-semibold text-lg ${
                                            stat.type === 'inflow'
                                                ? 'text-green-600'
                                                : stat.type === 'outflow'
                                                ? 'text-red-600'
                                                : 'text-gray-900 dark:text-white'
                                        }`}
                                    >
                                        {stat.type === 'inflow' && '+'}
                                        {stat.type === 'outflow' && '-'}
                                        <span className="text-xl">
                                            &#x09F3;
                                        </span>
                                        {Math.abs(stat.value).toLocaleString()}
                                    </span>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </Container>
    );
};

export default TransactionStats;
