/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Modal, ModalBody, ModalHeader } from 'flowbite-react';
import { useState } from 'react';
import { tnxTypeOptions } from '../../constants/budget.constant';
import type { FieldValues } from 'react-hook-form';
import SForm from '../../components/form/SForm';
import SInput from '../../components/form/SInput';
import SSelect from '../../components/form/SSelect';
import SDatePicker from '../../components/form/SDatePicker';
import { zodResolver } from '@hookform/resolvers/zod';
import { createTransactionSchema } from '../../schemas/budget.schema';
import { toast } from 'sonner';
import { useUpdateTransactionMutation } from '../../redux/api/budgetApi';
import type { TTransaction } from '../../types';
import { MdOutlineEdit } from 'react-icons/md';

type UpdateTransactionModalProps = {
    transaction: TTransaction;
};

const UpdateTransactionModal = ({
    transaction,
}: UpdateTransactionModalProps) => {
    const [openModal, setOpenModal] = useState(false);

    const [updateTransaction] = useUpdateTransactionMutation();

    const handleUpdateTransaction = async (data: FieldValues) => {
        const toastId = toast.loading('Updating transaction...');

        try {
            await updateTransaction({ id: transaction._id, data }).unwrap();

            toast.success('Transaction updated', {
                id: toastId,
            });
            setOpenModal(false);
        } catch (error: any) {
            toast.error(error.message || error.data || 'Something went wrong', {
                id: toastId,
            });
        }
    };
    function onCloseModal() {
        setOpenModal(false);
    }

    const defaultValues = {
        date: new Date(transaction.date),
        description: transaction.description,
        amount: transaction.amount.toString(),
        tnxType: transaction.tnxType,
    };

    return (
        <>
            <button
                onClick={() => setOpenModal(true)}
                className="text-blue-600 hover:text-blue-800 transition-colors duration-200 cursor-pointer p-1.5 rounded-full hover:bg-gray-200"
            >
                <MdOutlineEdit size={20} />
            </button>
            <Modal show={openModal} size="md" onClose={onCloseModal} popup>
                <ModalHeader className="mt-2">
                    <span className="ml-4">Update Transaction</span>
                </ModalHeader>
                <ModalBody>
                    <div className="space-y-6">
                        <SForm
                            onSubmit={handleUpdateTransaction}
                            resolver={zodResolver(createTransactionSchema)}
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
