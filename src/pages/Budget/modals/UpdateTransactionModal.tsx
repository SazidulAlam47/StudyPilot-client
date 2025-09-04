/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Modal, ModalBody, ModalHeader } from 'flowbite-react';
import { useState } from 'react';
import { tnxTypeOptions } from '../../../constants/budget.constant';
import type { FieldValues } from 'react-hook-form';
import SForm from '../../../components/form/SForm';
import SInput from '../../../components/form/SInput';
import SSelect from '../../../components/form/SSelect';
import SDatePicker from '../../../components/form/SDatePicker';
import { zodResolver } from '@hookform/resolvers/zod';
import { transactionSchema } from '../../../schemas/budget.schema';
import { toast } from 'sonner';
import { useUpdateTransactionMutation } from '../../../redux/api/budgetApi';
import type { TTransaction } from '../../../types';
import { MdOutlineEdit } from 'react-icons/md';
import IconButton from '../../../components/IconButton';

type UpdateTransactionModalProps = {
    transaction: TTransaction;
};

const UpdateTransactionModal = ({
    transaction,
}: UpdateTransactionModalProps) => {
    const [openModal, setOpenModal] = useState(false);

    const [updateTransaction, { isLoading }] = useUpdateTransactionMutation();

    const handleUpdateTransaction = async (data: FieldValues) => {
        setOpenModal(false);
        const toastId = toast.loading('Updating transaction...');

        try {
            await updateTransaction({ id: transaction._id, data }).unwrap();

            toast.success('Transaction updated', {
                id: toastId,
            });
        } catch (error: any) {
            toast.error(error.message || error.data || 'Something went wrong', {
                id: toastId,
            });
        }
    };

    const defaultValues = {
        date: new Date(transaction.date),
        description: transaction.description,
        amount: transaction.amount.toString(),
        tnxType: transaction.tnxType,
    };

    return (
        <>
            <IconButton onClick={() => setOpenModal(true)} disabled={isLoading}>
                <MdOutlineEdit size={20} />
            </IconButton>
            <Modal
                show={openModal}
                size="md"
                onClose={() => setOpenModal(false)}
                popup
            >
                <ModalHeader className="mt-2">
                    <span className="ml-4">Update Transaction</span>
                </ModalHeader>
                <ModalBody>
                    <div className="space-y-6">
                        <SForm
                            onSubmit={handleUpdateTransaction}
                            resolver={zodResolver(transactionSchema)}
                            defaultValues={defaultValues}
                        >
                            <SDatePicker
                                name="date"
                                label="Date"
                                maxDate={new Date()}
                                placeholder="Enter transaction date"
                            />
                            <SInput
                                name="description"
                                label="Description"
                                placeholder="Enter transaction description"
                            />
                            <SInput
                                name="amount"
                                label="Amount"
                                placeholder="Enter transaction amount"
                            />
                            <SSelect
                                name="tnxType"
                                label="Transaction Type"
                                options={tnxTypeOptions}
                            />
                            <Button type="submit" className="w-full">
                                Update
                            </Button>
                        </SForm>
                    </div>
                </ModalBody>
            </Modal>
        </>
    );
};

export default UpdateTransactionModal;
