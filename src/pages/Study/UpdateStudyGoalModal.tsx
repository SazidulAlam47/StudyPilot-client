/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Modal, ModalBody, ModalHeader } from 'flowbite-react';
import { useState } from 'react';
import type { FieldValues } from 'react-hook-form';
import SForm from '../../components/form/SForm';
import SInput from '../../components/form/SInput';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import SDatePicker from '../../components/form/SDatePicker';
import { useUpdateStudyGoalMutation } from '../../redux/api/studyGoalApi';
import { createStudyGoalSchema } from '../../schemas/studyGoal.schema';
import { MdOutlineEdit } from 'react-icons/md';
import type { TStudyGoal } from '../../types';

type UpdateStudyGoalModalProps = {
    studyGoal: TStudyGoal;
};

const UpdateStudyGoalModal = ({ studyGoal }: UpdateStudyGoalModalProps) => {
    const [openModal, setOpenModal] = useState(false);

    const [updateStudyGoal] = useUpdateStudyGoalMutation();

    const handleCreateStudyGoal = async (data: FieldValues) => {
        const toastId = toast.loading('Updating Study Goal...');

        try {
            await updateStudyGoal({
                studyGoalId: studyGoal._id,
                data,
            }).unwrap();

            toast.success('Study Goal updated', {
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
        title: studyGoal.title,
        targetDate: new Date(studyGoal.targetDate),
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
                    <span className="ml-4">Update New Study Goal</span>
                </ModalHeader>
                <ModalBody>
                    <div className="space-y-6">
                        <SForm
                            onSubmit={handleCreateStudyGoal}
                            resolver={zodResolver(createStudyGoalSchema)}
                            defaultValues={defaultValues}
                        >
                            <SInput
                                name="title"
                                label="Goal"
                                placeholder="Enter transaction description"
                            />
                            <SDatePicker
                                name="targetDate"
                                label="Target Date"
                                minDate={new Date()}
                                placeholder="Please Select a target date"
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

export default UpdateStudyGoalModal;
