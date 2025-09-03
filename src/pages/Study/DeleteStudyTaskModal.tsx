/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Modal, ModalBody, ModalHeader } from 'flowbite-react';
import { useState } from 'react';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import type { TStudyTask } from '../../types';
import { MdOutlineDelete } from 'react-icons/md';
import { toast } from 'sonner';
import { useDeleteStudyTaskMutation } from '../../redux/api/studyGoalApi';
import IconButton from '../../components/IconButton';

type DeleteStudyTaskModalProps = {
    studyTask: TStudyTask;
};

const DeleteStudyTaskModal = ({ studyTask }: DeleteStudyTaskModalProps) => {
    const [openModal, setOpenModal] = useState(false);

    const [deleteStudyTask] = useDeleteStudyTaskMutation();

    const handleDeleteTransaction = async () => {
        setOpenModal(false);
        const toastId = toast.loading('Deleting study task...');

        try {
            await deleteStudyTask(studyTask._id).unwrap();

            toast.success('Study task deleted', {
                id: toastId,
            });
            setOpenModal(false);
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
                            Are you sure you want to delete this Task?
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

export default DeleteStudyTaskModal;
