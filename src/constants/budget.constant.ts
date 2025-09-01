import createOptions from '../utils/createOptions';

export const tnxType = ['inflow', 'outflow'];

export const tnxTypeOptions = createOptions(tnxType);

export const initialTransaction = {
    date: new Date(),
    description: '',
    amount: '',
    tnxType: 'outflow',
};
