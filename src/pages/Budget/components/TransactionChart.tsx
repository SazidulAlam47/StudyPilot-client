import { Chart } from 'react-google-charts';
import { MdPieChart } from 'react-icons/md';
import type { TTransactionStats } from '../../../types';

type TransactionChartProps = {
    stats?: TTransactionStats;
};

const TransactionChart = ({ stats }: TransactionChartProps) => {
    const hasData =
        (stats?.currentMonthInflow || 0) > 0 ||
        (stats?.currentMonthOutflow || 0) > 0;

    // If no data, show a placeholder
    if (!hasData) {
        return (
            <div
                className="flex flex-col items-center justify-center text-center"
                style={{ width: '100%', height: '250px' }}
            >
                <div className="text-gray-400 mb-2">
                    <MdPieChart size={64} />
                </div>
                <h3 className="text-lg font-medium text-gray-600 dark:text-gray-300 mb-1">
                    No Data Available
                </h3>
                <p className="max-w-[300px] text-sm text-gray-500 dark:text-gray-400">
                    Add transactions to see your{' '}
                    {stats?.currentMonth || 'monthly'} financial breakdown chart
                </p>
            </div>
        );
    }

    const data = [
        ['Category', 'Amount'],
        [`${stats?.currentMonth} Inflow`, stats?.currentMonthInflow || 0],
        [`${stats?.currentMonth} Outflow`, stats?.currentMonthOutflow || 0],
    ];

    const options = {
        title: `${stats?.currentMonth || 'Monthly'} Financial Overview`,
        titleTextStyle: {
            fontSize: 15,
            bold: true,
        },
        pieSliceTextStyle: {
            fontSize: 14,
        },
    };

    return (
        <Chart
            chartType="PieChart"
            data={data}
            options={options}
            width={'100%'}
            height={'250px'}
        />
    );
};

export default TransactionChart;
