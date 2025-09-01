type TTnxType = 'inflow' | 'outflow';

export type TTransaction = {
    _id: string;
    user: string;
    date: Date;
    description: string;
    amount: number;
    tnxType: TTnxType;
};

export type TTransactionStats = {
    totalInflow: number;
    totalOutflow: number;
    currentBalance: number;
    currentMonthInflow: number;
    currentMonthOutflow: number;
    currentMonth: string;
};
