import Container from '../../../components/Container';
import TitleText from '../../../components/TitleText';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeadCell,
    TableRow,
} from 'flowbite-react';
import type { TTransactionStats } from '../../../types';
import { TbCurrencyTaka } from 'react-icons/tb';
import { cn } from '../../../utils/cn';

type TransactionStatsProps = {
    stats?: TTransactionStats;
};

const TransactionStats = ({ stats }: TransactionStatsProps) => {
    const statsData = [
        {
            label: `${stats?.currentMonth} Inflow`,
            value: stats?.currentMonthInflow || 0,
            type: 'inflow',
        },
        {
            label: `${stats?.currentMonth} Outflow`,
            value: stats?.currentMonthOutflow || 0,
            type: 'outflow',
        },
        {
            label: 'Lifetime Inflow',
            value: stats?.totalInflow || 0,
            type: 'inflow',
        },
        {
            label: 'Lifetime Outflow',
            value: stats?.totalOutflow || 0,
            type: 'outflow',
        },
        {
            label: 'Current Balance',
            value: stats?.currentBalance || 0,
            type: 'balance',
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
                            <TableRow key={index} className="bg-white">
                                <TableCell className="px-2 py-2 sm:px-4 sm:py-3 whitespace-nowrap font-medium text-gray-900">
                                    {stat.label}
                                </TableCell>
                                <TableCell className="px-2 py-2 sm:px-4 sm:py-3">
                                    <span
                                        className={cn(
                                            'font-semibold text-lg flex items-center',
                                            {
                                                'text-green-600':
                                                    stat.type === 'inflow',
                                                'text-red-600':
                                                    stat.type === 'outflow',
                                                'text-gray-900':
                                                    stat.type === 'balance',
                                            },
                                        )}
                                    >
                                        <TbCurrencyTaka />
                                        {stat.value.toLocaleString()}
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
