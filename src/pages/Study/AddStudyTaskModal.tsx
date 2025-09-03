/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Modal, ModalBody, ModalHeader } from 'flowbite-react';
import { useState } from 'react';
import type { FieldValues } from 'react-hook-form';
import SForm from '../../components/form/SForm';
import SInput from '../../components/form/SInput';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import SDatePicker from '../../components/form/SDatePicker';
import { useAddStudyTaskMutation } from '../../redux/api/studyGoalApi';
import { studyTaskSchema } from '../../schemas/studyGoal.schema';
import SSelect from '../../components/form/SSelect';
import {
    studyTaskDefaultValues,
    daysOptions,
    priorityOptions,
} from '../../constants/studyGoal.constant';
import SCheckBox from '../../components/form/SCheckBox';

type AddTaskGoalModalProps = {
    studyGoalId: string;
    buttonText: string;
};

const AddStudyTaskModal = ({
    studyGoalId,
    buttonText,
}: AddTaskGoalModalProps) => {
    const [openModal, setOpenModal] = useState(false);

    const [addStudyTask] = useAddStudyTaskMutation();

    const handleCreateStudyGoal = async (data: FieldValues) => {
        setOpenModal(false);
        const toastId = toast.loading('Adding Study Task...');

        try {
            await addStudyTask({ studyGoalId, data }).unwrap();

            toast.success('Study task added', {
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
            <Button size="xs" onClick={() => setOpenModal(true)}>
                {buttonText}
            </Button>
            <Modal
                show={openModal}
                size="md"
                onClose={() => setOpenModal(false)}
                popup
            >
                <ModalHeader className="mt-2">
                    <span className="ml-4">Add Study Task</span>
                </ModalHeader>
                <ModalBody>
                    <div className="space-y-6">
                        <SForm
                            onSubmit={handleCreateStudyGoal}
                            resolver={zodResolver(studyTaskSchema)}
                            defaultValues={studyTaskDefaultValues}
                        >
                            <SInput
                                name="topic"
                                label="Topic"
                                placeholder="Enter topic"
                            />

                            <SSelect
                                name="priority"
                                label="Priority"
                                options={priorityOptions}
                            />
                            <SDatePicker
                                name="deadline"
                                label="Deadline"
                                minDate={new Date()}
                                placeholder="Please Select a Deadline"
                            />
                            <SCheckBox
                                name="days"
                                options={daysOptions}
                                label="Select days"
                            />
                            <SInput
                                name="timeSlot"
                                label="Time Slot"
                                placeholder="HH:MM"
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

export default AddStudyTaskModal;
