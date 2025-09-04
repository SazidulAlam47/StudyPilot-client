/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Modal, ModalBody, ModalHeader } from 'flowbite-react';
import { useState } from 'react';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import type { TTransaction } from '../../../types';
import { MdOutlineDelete } from 'react-icons/md';
import { useDeleteTransactionMutation } from '../../../redux/api/budgetApi';
import { toast } from 'sonner';
import IconButton from '../../../components/IconButton';

type DeleteTransactionModalProps = {
    transaction: TTransaction;
};

const DeleteTransactionModal = ({
    transaction,
}: DeleteTransactionModalProps) => {
    const [openModal, setOpenModal] = useState(false);

    const [deleteTransaction] = useDeleteTransactionMutation();

    const handleDeleteTransaction = async () => {
        setOpenModal(false);
        const toastId = toast.loading('Deleting transaction...');

        try {
            await deleteTransaction(transaction._id).unwrap();

            toast.success('Transaction deleted', {
                id: toastId,
            });
        } catch (error: any) {
            toast.error(error.message || error.data || 'Something went wrong', {
                id: toastId,
            });
        }
    };

    return (
        <>
            <IconButton
                onClick={() => setOpenModal(true)}
                className="text-red-600 hover:text-red-800"
            >
                <MdOutlineDelete size={20} />
            </IconButton>
            <Modal
                show={openModal}
                size="md"
                onClose={() => setOpenModal(false)}
                popup
            >
                <ModalHeader />
                <ModalBody>
                    <div className="text-center">
                        <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                        <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                            Are you sure you want to delete this Transaction?
                        </h3>
                        <div className="flex justify-center gap-4">
                            <Button
                                color="red"
                                onClick={handleDeleteTransaction}
                            >
                                Yes, I'm sure
                            </Button>
                            <Button
                                color="alternative"
                                onClick={() => setOpenModal(false)}
                            >
                                No, cancel
                            </Button>
                        </div>
                    </div>
                </ModalBody>
            </Modal>
        </>
    );
};

export default DeleteTransactionModal;
