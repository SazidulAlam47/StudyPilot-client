/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Modal, ModalBody, ModalHeader } from 'flowbite-react';
import { useState } from 'react';
import type { FieldValues } from 'react-hook-form';
import SForm from '../../../components/form/SForm';
import SInput from '../../../components/form/SInput';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import SDatePicker from '../../../components/form/SDatePicker';
import { useUpdateStudyGoalMutation } from '../../../redux/api/studyGoalApi';
import { studyGoalSchema } from '../../../schemas/studyGoal.schema';
import { MdOutlineEdit } from 'react-icons/md';
import type { TStudyGoal } from '../../../types';
import IconButton from '../../../components/IconButton';

type UpdateStudyGoalModalProps = {
    studyGoal: TStudyGoal;
};

const UpdateStudyGoalModal = ({ studyGoal }: UpdateStudyGoalModalProps) => {
    const [openModal, setOpenModal] = useState(false);

    const [updateStudyGoal] = useUpdateStudyGoalMutation();

    const handleCreateStudyGoal = async (data: FieldValues) => {
        setOpenModal(false);
        const toastId = toast.loading('Updating Study Goal...');

        try {
            await updateStudyGoal({
                studyGoalId: studyGoal._id,
                data,
            }).unwrap();

            toast.success('Study Goal updated', {
                id: toastId,
            });
        } catch (error: any) {
            toast.error(error.message || error.data || 'Something went wrong', {
                id: toastId,
            });
        }
    };

    const defaultValues = {
        title: studyGoal.title,
        targetDate: new Date(studyGoal.targetDate),
    };

    return (
        <>
            <IconButton onClick={() => setOpenModal(true)}>
                <MdOutlineEdit size={20} />
            </IconButton>
            <Modal
                show={openModal}
                size="md"
                onClose={() => setOpenModal(false)}
                popup
            >
                <ModalHeader className="mt-2">
                    <span className="ml-4">Update New Study Goal</span>
                </ModalHeader>
                <ModalBody>
                    <div className="space-y-6">
                        <SForm
                            onSubmit={handleCreateStudyGoal}
                            resolver={zodResolver(studyGoalSchema)}
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
