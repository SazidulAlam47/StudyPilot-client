/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Modal, ModalBody, ModalHeader } from 'flowbite-react';
import { useState } from 'react';
import { HiOutlinePlusSm } from 'react-icons/hi';
import {
    initialTransaction,
    tnxTypeOptions,
} from '../../constants/budget.constant';
import type { FieldValues } from 'react-hook-form';
import SForm from '../../components/form/SForm';
import SInput from '../../components/form/SInput';
import SSelect from '../../components/form/SSelect';
import SDatePicker from '../../components/form/SDatePicker';
import { zodResolver } from '@hookform/resolvers/zod';
import { createTransactionSchema } from '../../schemas/budget.schema';
import { toast } from 'sonner';
import { useCreateTransactionMutation } from '../../redux/api/budgetApi';

const BudgetModal = () => {
    const [openModal, setOpenModal] = useState(false);

    const [createTransaction] = useCreateTransactionMutation();

    const handleCreateTransaction = async (data: FieldValues) => {
        const toastId = toast.loading('Adding transaction...');

        try {
            await createTransaction(data).unwrap();

            toast.success('Transaction added', {
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

    return (
        <>
            <Button onClick={() => setOpenModal(true)}>
                <HiOutlinePlusSm size={20} /> Add Transaction
            </Button>
            <Modal show={openModal} size="md" onClose={onCloseModal} popup>
                <ModalHeader className="mt-2">
                    <span className="ml-4">Add new Transaction</span>
                </ModalHeader>
                <ModalBody>
                    <div className="space-y-6">
                        <SForm
                            onSubmit={handleCreateTransaction}
                            resolver={zodResolver(createTransactionSchema)}
                            defaultValues={initialTransaction}
                        >
                            <SDatePicker
                                name="date"
                                label="Date"
                                maxDate={new Date()}
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
                                Add
                            </Button>
                        </SForm>
                    </div>
                </ModalBody>
            </Modal>
        </>
    );
};

export default BudgetModal;
