import Container from '../../../components/Container';
import Loader from '../../../components/Loader';
import { useGetMyTransactionsQuery } from '../../../redux/api/budgetApi';
import {
    Badge,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeadCell,
    TableRow,
} from 'flowbite-react';
import moment from 'moment';
import { MdAccountBalanceWallet } from 'react-icons/md';
import capitalize from '../../../utils/capitalize';
import TitleText from '../../../components/TitleText';
import AddTransactionModal from '../modals/AddTransactionModal';
import UpdateTransactionModal from '../modals/UpdateTransactionModal';
import DeleteTransactionModal from '../modals/DeleteTransactionModal';
import { TbCurrencyTaka } from 'react-icons/tb';
import { cn } from '../../../utils/cn';

const TransactionHistory = () => {
    const { data: transactions, isLoading } =
        useGetMyTransactionsQuery(undefined);

    return (
        <Container className="md:col-span-2 my-10 space-y-3">
            <TitleText className="font-bold text-2xl sm:font-bold sm:text-3xl">
                Transaction History
            </TitleText>

            {isLoading ? (
                <Loader className="min-h-[40dvh]" />
            ) : transactions?.length ? (
                <div className="space-y-3">
                    <AddTransactionModal />
                    <div className="overflow-x-auto rounded-md">
                        <Table className="text-xs sm:text-base" hoverable>
                            <TableHead>
                                <TableRow>
                                    <TableHeadCell className="px-2 py-2 sm:px-4 sm:py-3">
                                        Date
                                    </TableHeadCell>
                                    <TableHeadCell className="px-2 py-2 sm:px-4 sm:py-3">
                                        Description
                                    </TableHeadCell>
                                    <TableHeadCell className="px-2 py-2 sm:px-4 sm:py-3">
                                        Type
                                    </TableHeadCell>
                                    <TableHeadCell className="px-2 py-2 sm:px-4 sm:py-3">
                                        Amount
                                    </TableHeadCell>
                                    <TableHeadCell className="px-2 py-2 sm:px-4 sm:py-3">
                                        Action
                                    </TableHeadCell>
                                </TableRow>
                            </TableHead>
                            <TableBody className="divide-y divide-gray-200">
                                {transactions?.map((transaction) => (
                                    <TableRow
                                        key={transaction._id}
                                        className="bg-white dark:border-gray-700 dark:bg-gray-800"
                                    >
                                        <TableCell className="px-2 py-2 sm:px-4 sm:py-3 whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                            {moment(transaction.date).format(
                                                'Do MMM, YYYY',
                                            )}
                                        </TableCell>
                                        <TableCell className="px-2 py-2 sm:px-4 sm:py-3">
                                            {transaction.description}
                                        </TableCell>
                                        <TableCell className="px-2 py-2 sm:px-4 sm:py-3">
                                            <Badge
                                                color={
                                                    transaction.tnxType ===
                                                    'inflow'
                                                        ? 'success'
                                                        : 'failure'
                                                }
                                                className="w-fit px-2 py-1 rounded-xl"
                                            >
                                                {capitalize(
                                                    transaction.tnxType,
                                                )}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="px-2 py-2 sm:px-4 sm:py-3">
                                            <span
                                                className={cn(
                                                    'font-semibold flex items-center',
                                                    {
                                                        'text-green-600':
                                                            transaction.tnxType ===
                                                            'inflow',
                                                        'text-red-600':
                                                            transaction.tnxType ===
                                                            'outflow',
                                                    },
                                                )}
                                            >
                                                <TbCurrencyTaka />
                                                {transaction.amount.toLocaleString()}
                                            </span>
                                        </TableCell>
                                        <TableCell className="px-2 py-2 sm:px-4 sm:py-3 flex items-center">
                                            <UpdateTransactionModal
                                                transaction={transaction}
                                            />
                                            <DeleteTransactionModal
                                                transaction={transaction}
                                            />
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </div>
            ) : (
                <div className="min-h-[40dvh] rounded-lg flex flex-col justify-center items-center text-center p-8">
                    <div className="text-gray-400 mb-4">
                        <MdAccountBalanceWallet size={80} />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        No Transactions Yet
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400 mb-4">
                        You haven't recorded any transactions yet. Start
                        tracking your budget by adding your first transaction!
                    </p>
                    <AddTransactionModal />
                </div>
            )}
        </Container>
    );
};

export default TransactionHistory;
