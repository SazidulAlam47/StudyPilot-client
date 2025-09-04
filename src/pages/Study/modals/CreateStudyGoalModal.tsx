/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Modal, ModalBody, ModalHeader } from 'flowbite-react';
import { useState } from 'react';
import type { FieldValues } from 'react-hook-form';
import SForm from '../../../components/form/SForm';
import SInput from '../../../components/form/SInput';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import SDatePicker from '../../../components/form/SDatePicker';
import { useCreateStudyGoalMutation } from '../../../redux/api/studyGoalApi';
import { studyGoalSchema } from '../../../schemas/studyGoal.schema';

const CreateStudyGoalModal = () => {
    const [openModal, setOpenModal] = useState(false);

    const [createStudyGoal, { isLoading }] = useCreateStudyGoalMutation();

    const handleCreateStudyGoal = async (data: FieldValues) => {
        setOpenModal(false);
        const toastId = toast.loading('Creating Study Goal...');

        try {
            await createStudyGoal(data).unwrap();

            toast.success('Study Goal created', {
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
            <Button
                size="xs"
                onClick={() => setOpenModal(true)}
                disabled={isLoading}
            >
                Create New Study Goal
            </Button>
            <Modal
                show={openModal}
                size="md"
                onClose={() => setOpenModal(false)}
                popup
            >
                <ModalHeader className="mt-2">
                    <span className="ml-4">Create New Study Goal</span>
                </ModalHeader>
                <ModalBody>
                    <div className="space-y-6">
                        <SForm
                            onSubmit={handleCreateStudyGoal}
                            resolver={zodResolver(studyGoalSchema)}
                        >
                            <SInput
                                name="title"
                                label="Goal"
                                placeholder="Enter you Study Goal"
                            />
                            <SDatePicker
                                name="targetDate"
                                label="Target Date"
                                minDate={new Date()}
                                placeholder="Please Select a target date"
                            />

                            <Button type="submit" className="w-full">
                                Create
                            </Button>
                        </SForm>
                    </div>
                </ModalBody>
            </Modal>
        </>
    );
};

export default CreateStudyGoalModal;
